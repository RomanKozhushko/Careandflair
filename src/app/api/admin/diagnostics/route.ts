import { isAdminRouteRequestAuthorized } from "@/admin/auth";
import { formatSupabaseAdminError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

async function checkTable(client: NonNullable<ReturnType<typeof getSupabaseServerClient>["client"]>, table: string) {
  const { error } = await client.from(table).select("id", { count: "exact", head: true }).limit(1);
  return {
    reachable: !error,
    error: error ? formatSupabaseAdminError(error.message, table) : undefined,
  };
}

export async function GET(request: Request) {
  if (!isAdminRouteRequestAuthorized(request)) {
    return Response.json({ success: false, error: "Login required." }, { status: 401 });
  }

  const urlConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim());
  const serviceKeyConfigured = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
  const supabase = getSupabaseServerClient();

  if (supabase.error || !supabase.client) {
    return Response.json({
      success: true,
      diagnostics: {
        supabaseUrlConfigured: urlConfigured,
        serviceKeyConfigured,
        siteContentTableReachable: false,
        quoteRequestsTableReachable: false,
        siteContentError: urlConfigured && serviceKeyConfigured ? supabase.error : undefined,
        quoteRequestsError: urlConfigured && serviceKeyConfigured ? supabase.error : undefined,
      },
    });
  }

  const [siteContent, quoteRequests] = await Promise.all([
    checkTable(supabase.client, "site_content"),
    checkTable(supabase.client, "quote_requests"),
  ]);

  return Response.json({
    success: true,
    diagnostics: {
      supabaseUrlConfigured: urlConfigured,
      serviceKeyConfigured,
      siteContentTableReachable: siteContent.reachable,
      quoteRequestsTableReachable: quoteRequests.reachable,
      siteContentError: siteContent.error,
      quoteRequestsError: quoteRequests.error,
    },
  });
}
