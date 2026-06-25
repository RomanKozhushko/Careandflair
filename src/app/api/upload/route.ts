import { randomUUID } from "crypto";
import { isAdminRouteRequestAuthorized } from "@/admin/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const bucketName = "site-images";
const maxFileSize = 5 * 1024 * 1024;
const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function safeFileName(name: string): string {
  const baseName = name
    .replace(/\.[a-z0-9]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return baseName || "site-image";
}

function friendlyStorageError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("bucket") && (lower.includes("not found") || lower.includes("does not exist"))) {
    return "Supabase Storage bucket site-images is missing. Create a public bucket named site-images.";
  }

  if (lower.includes("row-level security") || lower.includes("permission")) {
    return "Supabase Storage rejected the upload. Check the site-images bucket permissions.";
  }

  return message;
}

async function ensureSiteImagesBucket(client: NonNullable<ReturnType<typeof getSupabaseServerClient>["client"]>) {
  const { error: readError } = await client.storage.getBucket(bucketName);

  if (!readError) {
    return;
  }

  const { error: createError } = await client.storage.createBucket(bucketName, {
    public: true,
    allowedMimeTypes: Object.keys(allowedTypes),
    fileSizeLimit: maxFileSize,
  });

  if (createError) {
    throw new Error(friendlyStorageError(createError.message));
  }
}

export async function POST(request: Request) {
  if (!isAdminRouteRequestAuthorized(request)) {
    return Response.json({ success: false, error: "Login required." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ success: false, error: "Missing file." }, { status: 400 });
  }

  const extension = allowedTypes[file.type];

  if (!extension) {
    return Response.json({ success: false, error: "Only JPG, PNG and WebP images can be uploaded." }, { status: 400 });
  }

  if (file.size > maxFileSize) {
    return Response.json({ success: false, error: "Image is too large. Maximum size is 5 MB." }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();

  if (supabase.error || !supabase.client) {
    return Response.json(
      { success: false, error: "Supabase Storage is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 },
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const name = `${safeFileName(file.name)}-${randomUUID()}.${extension}`;
  const storagePath = `${today}/${name}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  try {
    await ensureSiteImagesBucket(supabase.client);
  } catch (caught) {
    return Response.json({ success: false, error: caught instanceof Error ? caught.message : "Supabase Storage bucket could not be prepared." }, { status: 500 });
  }

  const { error } = await supabase.client.storage.from(bucketName).upload(storagePath, bytes, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return Response.json({ success: false, error: friendlyStorageError(error.message) }, { status: 500 });
  }

  const { data } = supabase.client.storage.from(bucketName).getPublicUrl(storagePath);

  return Response.json({
    success: true,
    bucket: bucketName,
    name,
    path: storagePath,
    storagePath,
    url: data.publicUrl,
    publicUrl: data.publicUrl,
  });
}
