import { isAdminRouteRequestAuthorized } from "@/admin/auth";
import { isQuoteRequestStatus } from "@/lib/quoteRequests";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!isAdminRouteRequestAuthorized(request)) {
    return Response.json({ success: false, error: "Admin password required." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as { status?: unknown; admin_notes?: unknown } | null;
  const updates: { status?: string; admin_notes?: string | null } = {};

  if (body && "status" in body) {
    if (!isQuoteRequestStatus(body.status)) {
      return Response.json({ success: false, error: "Invalid quote request status." }, { status: 400 });
    }
    updates.status = body.status;
  }

  if (body && "admin_notes" in body) {
    updates.admin_notes = typeof body.admin_notes === "string" && body.admin_notes.trim().length > 0 ? body.admin_notes.trim() : null;
  }

  if (Object.keys(updates).length === 0) {
    return Response.json({ success: false, error: "No valid updates provided." }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (supabase.error) {
    return Response.json({ success: false, error: supabase.error }, { status: 503 });
  }
  const client = supabase.client;
  if (!client) {
    return Response.json({ success: false, error: "Supabase is not configured." }, { status: 503 });
  }

  const { data, error } = await client
    .from("quote_requests")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, item: data });
}
