import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

function safeFileName(name: string): string {
  const extension = path.extname(name).toLowerCase();
  const baseName = path
    .basename(name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${baseName || "upload"}-${Date.now()}${extension}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ success: false, error: "Missing file." }, { status: 400 });
  }

  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDirectory, { recursive: true });

  const name = safeFileName(file.name);
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDirectory, name), bytes);

  return Response.json({ success: true, name });
}
