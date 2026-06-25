import { normalizeQuoteRequestPayload } from "@/lib/quoteRequests";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const { data, errors } = normalizeQuoteRequestPayload(payload);

  if (errors.length > 0) {
    return Response.json({ success: false, errors }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (supabase.error) {
    return Response.json({ success: false, error: supabase.error }, { status: 503 });
  }
  const client = supabase.client;
  if (!client) {
    return Response.json({ success: false, error: "Supabase is not configured." }, { status: 503 });
  }

  const { data: inserted, error } = await client
    .from("quote_requests")
    .insert(data)
    .select("id")
    .single();

  if (error || !inserted?.id) {
    return Response.json(
      { success: false, error: error?.message ?? "Quote request could not be saved." },
      { status: 500 },
    );
  }

  return Response.json({ success: true, id: inserted.id });
}
