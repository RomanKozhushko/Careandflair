import { promises as fs } from "fs";
import path from "path";
import { getAdminResource, type AdminResourceKey } from "./resources";

export type JsonRecord = Record<string, unknown>;

const dataDirectory = path.join(process.cwd(), "src", "data");

function getResourcePath(resourceKey: AdminResourceKey): string {
  const resource = getAdminResource(resourceKey);

  if (!resource) {
    throw new Error(`Unknown admin resource: ${resourceKey}`);
  }

  return path.join(dataDirectory, resource.fileName);
}

export async function readResource(resourceKey: AdminResourceKey): Promise<JsonRecord[]> {
  const filePath = getResourcePath(resourceKey);
  const file = await fs.readFile(filePath, "utf8");
  const parsed: unknown = JSON.parse(file);

  if (!Array.isArray(parsed)) {
    throw new Error(`Admin resource ${resourceKey} must be a JSON array.`);
  }

  return parsed as JsonRecord[];
}

export async function writeResource(resourceKey: AdminResourceKey, items: JsonRecord[]): Promise<JsonRecord[]> {
  const filePath = getResourcePath(resourceKey);
  await fs.writeFile(filePath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  return items;
}

export function getItemTitle(item: JsonRecord, index: number): string {
  const title = item.name ?? item.title ?? item.headline ?? item.question ?? item.id;
  return typeof title === "string" && title.trim().length > 0 ? title : `Item ${index + 1}`;
}
