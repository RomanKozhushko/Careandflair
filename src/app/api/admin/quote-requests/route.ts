import { isAdminRouteRequestAuthorized } from "@/admin/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRouteRequestAuthorized(request)) {
    return Response.json({ success: false, error: "Admin password required." }, { status: 401 });
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
    return Response.json({ success: false, error: error.message, items: [] }, { status: 500 });
  }

  return Response.json({ success: true, items: data ?? [] });
}
