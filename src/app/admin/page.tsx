import { cookies } from "next/headers";
import { adminAuthCookieName, getAdminPassword, isAdminTokenValid } from "@/admin/auth";
import { adminResources, type AdminResourceKey } from "@/admin/resources";
import type { JsonRecord } from "@/admin/jsonStore";
import { readEditableResource, type ReadResourceResult } from "@/lib/siteContent";
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
    adminResources.map(async (resource) => [resource.key, await readEditableResource(resource.key)] as const),
  );
  const editableData = Object.fromEntries(resourceEntries.map(([key, result]) => [key, result.items])) as Record<AdminResourceKey, JsonRecord[]>;
  const resourceStates = Object.fromEntries(
    resourceEntries.map(([key, result]) => [
      key,
      {
        source: result.source,
        configured: result.configured,
        message: result.message,
      },
    ]),
  ) as Record<AdminResourceKey, Pick<ReadResourceResult, "source" | "configured" | "message">>;

  return <AdminClient initialData={editableData} initialResourceStates={resourceStates} />;
}
