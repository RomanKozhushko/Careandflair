import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminApiRequestAuthorized } from "@/admin/auth";
import { getAdminResource, type AdminResourceKey } from "@/admin/resources";
import type { JsonRecord } from "@/admin/jsonStore";
import { readEditableResource, saveEditableResource } from "@/lib/siteContent";

type AdminResponse = {
  items?: JsonRecord[];
  error?: string;
  source?: string;
  message?: string;
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

function parseItems(value: unknown): JsonRecord[] {
  if (!Array.isArray(value) || value.some((item) => !item || typeof item !== "object" || Array.isArray(item))) {
    throw new Error("Items must be a JSON array of objects.");
  }

  return value as JsonRecord[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AdminResponse>) {
  if (!isAdminApiRequestAuthorized(req)) {
    return res.status(401).json({ error: "Login required." });
  }

  const resourceParam = req.query.resource;
  const resourceKey = Array.isArray(resourceParam) ? resourceParam[0] : resourceParam;

  if (!resourceKey || !getAdminResource(resourceKey)) {
    return res.status(404).json({ error: "Unknown admin resource." });
  }

  const key = resourceKey as AdminResourceKey;

  try {
    const result = await readEditableResource(key);
    const items = result.items;

    if (req.method === "GET") {
      return res.status(200).json({ items, source: result.source, message: result.message });
    }

    if (req.method === "POST") {
      const item = parseItem(req.body?.item);
      const nextItems = [...items, item];
      const saved = await saveEditableResource(key, nextItems);
      return res.status(200).json({ items: saved.items, source: saved.source });
    }

    if (req.method === "PUT") {
      const index = parseIndex(req.body?.index, items.length - 1);
      const item = parseItem(req.body?.item);
      const nextItems = items.map((currentItem, currentIndex) => (currentIndex === index ? item : currentItem));
      const saved = await saveEditableResource(key, nextItems);
      return res.status(200).json({ items: saved.items, source: saved.source });
    }

    if (req.method === "PATCH") {
      const nextItems = parseItems(req.body?.items);
      const saved = await saveEditableResource(key, nextItems);
      return res.status(200).json({ items: saved.items, source: saved.source });
    }

    if (req.method === "DELETE") {
      const index = parseIndex(req.body?.index, items.length - 1);
      const nextItems = items.filter((_, currentIndex) => currentIndex !== index);
      const saved = await saveEditableResource(key, nextItems);
      return res.status(200).json({ items: saved.items, source: saved.source });
    }

    res.setHeader("Allow", "GET, POST, PUT, PATCH, DELETE");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "Admin API error.";
    const status = message.includes("Supabase content storage is not configured") ? 503 : 400;
    return res.status(status).json({ error: message });
  }
}
