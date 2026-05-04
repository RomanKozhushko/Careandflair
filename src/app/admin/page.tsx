import { adminResources, type AdminResourceKey } from "@/admin/resources";
import { readResource, type JsonRecord } from "@/admin/jsonStore";
import AdminClient from "./AdminClient";

type ResourceData = Record<AdminResourceKey, JsonRecord[]>;

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const entries = await Promise.all(
    adminResources.map(async (resource) => [resource.key, await readResource(resource.key)] as const),
  );
  const initialData = Object.fromEntries(entries) as ResourceData;

  return <AdminClient initialData={initialData} />;
}
