import { isAdminRouteRequestAuthorized } from "@/admin/auth";
import { formatSupabaseAdminError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRouteRequestAuthorized(request)) {
    return Response.json({ success: false, error: "Login required." }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();
  if (supabase.error) {
    return Response.json({ success: false, error: supabase.error, items: [] }, { status: 503 });
  }
  const client = supabase.client;
  if (!client) {
    return Response.json({ success: false, error: "Supabase is not configured.", items: [] }, { status: 503 });
  }

  const { data, error } = await client
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return Response.json({ success: false, error: formatSupabaseAdminError(error.message, "quote_requests"), items: [] }, { status: 500 });
  }

  return Response.json({ success: true, items: data ?? [] });
}
