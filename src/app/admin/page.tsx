import { cookies } from "next/headers";
import { adminAuthCookieName, getAdminPassword, isAdminTokenValid } from "@/admin/auth";
import { adminResources, type AdminResourceKey } from "@/admin/resources";
import { readResource, type JsonRecord } from "@/admin/jsonStore";
import AdminClient from "./AdminClient";
import AdminLogin from "./AdminLogin";

type ResourceData = Record<AdminResourceKey, JsonRecord[]>;

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const adminPassword = getAdminPassword();
  const cookieStore = await cookies();
  const isAuthorized = isAdminTokenValid(cookieStore.get(adminAuthCookieName)?.value);

  if (!adminPassword || !isAuthorized) {
    return <AdminLogin passwordConfigured={Boolean(adminPassword)} />;
  }

  const entries = await Promise.all(
    adminResources.map(async (resource) => [resource.key, await readResource(resource.key)] as const),
  );
  const initialData = Object.fromEntries(entries) as ResourceData;

  return <AdminClient initialData={initialData} />;
}
