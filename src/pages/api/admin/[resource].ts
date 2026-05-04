import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminApiRequestAuthorized } from "@/admin/auth";
import { getAdminResource, type AdminResourceKey } from "@/admin/resources";
import { readResource, writeResource, type JsonRecord } from "@/admin/jsonStore";

type AdminResponse = {
  items?: JsonRecord[];
  error?: string;
};

function parseIndex(value: unknown, maxInclusive: number): number {
  const index = Number(value);

  if (!Number.isInteger(index) || index < 0 || index > maxInclusive) {
    throw new Error("Invalid item index.");
  }

  return index;
}

function parseItem(value: unknown): JsonRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Item must be a JSON object.");
  }

  return value as JsonRecord;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AdminResponse>) {
  if (!isAdminApiRequestAuthorized(req)) {
    return res.status(401).json({ error: "Admin password required." });
  }

  const resourceParam = req.query.resource;
  const resourceKey = Array.isArray(resourceParam) ? resourceParam[0] : resourceParam;

  if (!resourceKey || !getAdminResource(resourceKey)) {
    return res.status(404).json({ error: "Unknown admin resource." });
  }

  const key = resourceKey as AdminResourceKey;

  try {
    const items = await readResource(key);

    if (req.method === "GET") {
      return res.status(200).json({ items });
    }

    if (req.method === "POST") {
      const item = parseItem(req.body?.item);
      const nextItems = [...items, item];
      return res.status(200).json({ items: await writeResource(key, nextItems) });
    }

    if (req.method === "PUT") {
      const index = parseIndex(req.body?.index, items.length - 1);
      const item = parseItem(req.body?.item);
      const nextItems = items.map((currentItem, currentIndex) => (currentIndex === index ? item : currentItem));
      return res.status(200).json({ items: await writeResource(key, nextItems) });
    }

    if (req.method === "DELETE") {
      const index = parseIndex(req.body?.index, items.length - 1);
      const nextItems = items.filter((_, currentIndex) => currentIndex !== index);
      return res.status(200).json({ items: await writeResource(key, nextItems) });
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (caught) {
    return res.status(400).json({ error: caught instanceof Error ? caught.message : "Admin API error." });
  }
}
