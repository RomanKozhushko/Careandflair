export function formatSupabaseAdminError(message: string, tableName?: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("could not find the table") || lower.includes("relation") || lower.includes("schema cache")) {
    const table = tableName ? ` ${tableName}` : "";
    const sqlFile = tableName === "site_content" || tableName === "site_content_drafts" ? "docs/supabase-site-content.sql" : "docs/supabase-quote-requests.sql";
    return `Supabase table${table} is not ready. Run ${sqlFile} in the Supabase SQL Editor.`;
  }

  return message;
}
