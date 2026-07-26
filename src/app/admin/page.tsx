import { cookies } from "next/headers";
import { adminAuthCookieName, getAdminPassword, isAdminTokenValid } from "@/admin/auth";
import { adminResources, type AdminResourceKey } from "@/admin/resources";
import type { JsonRecord } from "@/admin/jsonStore";
import { readDraftResource, type DraftResourceResult } from "@/lib/siteContent";
import AdminClient from "@/app/admin/AdminClient";
import AdminLogin from "@/app/admin/AdminLogin";

export const metadata = {
  title: "Admin MVP | Care & Flair",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(adminAuthCookieName)?.value;
  const adminPassword = getAdminPassword();

  if (!isAdminTokenValid(authToken)) {
    return <AdminLogin passwordConfigured={Boolean(adminPassword)} />;
  }

  const resourceEntries = await Promise.all(
    adminResources.map(async (resource) => [resource.key, await readDraftResource(resource.key)] as const),
  );
  const editableData = Object.fromEntries(resourceEntries.map(([key, result]) => [key, result.items])) as Record<AdminResourceKey, JsonRecord[]>;
  const resourceStates = Object.fromEntries(
    resourceEntries.map(([key, result]) => [
      key,
      {
        source: result.source,
        configured: result.configured,
        message: result.message,
        hasDraft: result.hasDraft,
      },
    ]),
  ) as Record<AdminResourceKey, Pick<DraftResourceResult, "source" | "configured" | "message" | "hasDraft">>;

  return <AdminClient initialData={editableData} initialResourceStates={resourceStates} />;
}
