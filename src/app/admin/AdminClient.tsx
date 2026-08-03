"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AdminQuoteRequests } from "@/admin/components/AdminQuoteRequests";
import { adminResources, type AdminResourceKey } from "@/admin/resources";
import type { ContentSource } from "@/lib/siteContent";

type JsonRecord = Record<string, unknown>;
type ResourceData = Record<AdminResourceKey, JsonRecord[]>;
type ResourceState = {
  source: ContentSource | "draft";
  configured: boolean;
  message?: string;
  hasDraft?: boolean;
};
type ResourceStateData = Record<AdminResourceKey, ResourceState>;
type SaveState = "idle" | "saving" | "saved" | "error";
type PreviewDevice = "desktop" | "tablet" | "mobile";
type ImageField = string;
type AltField = "imageAlt" | "beforeAlt" | "afterAlt" | "heroImageAlt" | "visualLabel";
type UploadResponse = {
  success?: boolean;
  name?: string;
  url?: string;
  publicUrl?: string;
  path?: string;
  storagePath?: string;
  error?: string;
};
type ImageTarget = {
  key: string;
  label: string;
  path: Array<string | number>;
  value: string;
};
type NestedFieldTarget = {
  key: string;
  label: string;
  field: string;
  path: Array<string | number>;
  value: string | number | boolean | string[];
};
type Diagnostics = {
  supabaseUrlConfigured: boolean;
  serviceKeyConfigured: boolean;
  siteContentTableReachable: boolean;
  quoteRequestsTableReachable: boolean;
  siteContentError?: string;
  quoteRequestsError?: string;
};

const imageFields: ImageField[] = ["image", "imageUrl", "image_url", "src", "url", "beforeImage", "afterImage", "imageBefore", "imageAfter", "before", "after", "heroImage", "hero_image", "media", "photos", "gallery"];
const altFields: AltField[] = ["imageAlt", "beforeAlt", "afterAlt", "heroImageAlt", "visualLabel"];

const preferredImageFieldsByResource: Partial<Record<AdminResourceKey, ImageField[]>> = {
  packages: ["image", "imageUrl", "src"],
  solutions: ["image", "imageUrl", "src", "beforeImage", "afterImage", "imageBefore", "imageAfter"],
  "before-after": ["beforeImage", "afterImage", "image", "src", "url", "before", "after"],
  "homepage-sections": ["heroImage", "hero_image", "image", "imageUrl", "image_url", "src"],
  "homepage-transformations": [],
};

const resourceHelp: Partial<Record<AdminResourceKey, string>> = {
  "site-settings": "Business details, phone, email, navigation, footer copy and core positioning.",
  "homepage-sections": "Hero copy, section titles, process steps and homepage CTA blocks.",
  "homepage-transformations": "Homepage before/after carousel: section copy, slide text, badges and nested before/after images.",
  packages: "Reset package cards, prices, included services and package positioning.",
  solutions: "Service cards for the visible problems Care & Flair fixes.",
  "optional-upgrades": "Add-on services shown in the quote builder.",
  "quote-builder": "Quote page copy, step labels, helper text and submission labels.",
  "before-after": "Before/after examples used on the homepage and gallery page.",
  faqs: "Frequently asked questions shown on the public site.",
  areas: "Local service area cards.",
};

const sidebarLinks: { label: string; href: string }[] = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Quote Requests", href: "#quote-requests" },
  { label: "Content Editor", href: "#content-editor" },
];

const resourceGroups = Array.from(new Set(adminResources.map((resource) => resource.group)));

function itemTitle(item: JsonRecord, index: number): string {
  const title = item.name ?? item.title ?? item.headline ?? item.question ?? item.id;
  return typeof title === "string" && title.trim().length > 0 ? title : `Item ${index + 1}`;
}

function createBlankItem(items: JsonRecord[]): JsonRecord {
  const sample = items[0];

  if (!sample) {
    return { id: "new-item", title: "New item", image: "", imageAlt: "", visible: true, order: 1 };
  }

  return Object.fromEntries(
    Object.entries(sample).map(([key, value]) => {
      if (key === "id") return [key, "new-item"];
      if (key === "slug") return [key, "new-item"];
      if (typeof value === "boolean") return [key, true];
      if (typeof value === "number") return [key, 0];
      if (Array.isArray(value)) return [key, []];
      if (value && typeof value === "object") return [key, {}];
      return [key, ""];
    }),
  );
}

function parseDraft(draft: string): JsonRecord | null {
  try {
    const parsed = JSON.parse(draft) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as JsonRecord) : null;
  } catch {
    return null;
  }
}

function displayLabel(field: string): string {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function pathLabel(path: Array<string | number>): string {
  return path
    .map((part) => (typeof part === "number" ? `[${part + 1}]` : displayLabel(part)))
    .join(" / ");
}

function altFieldFor(imageField: ImageField): AltField {
  if (imageField === "beforeImage" || imageField === "imageBefore") return "beforeAlt";
  if (imageField === "afterImage" || imageField === "imageAfter") return "afterAlt";
  if (imageField === "heroImage") return "heroImageAlt";
  return "imageAlt";
}

function formatItem(items: JsonRecord[], index: number): string {
  return JSON.stringify(items[index] ?? createBlankItem(items), null, 2);
}

function sourceLabel(state?: ResourceState) {
  if (!state) return "Unknown";
  if (state.source === "draft") return "Draft";
  if (state.source === "supabase") return "Supabase";
  if (state.source === "json-fallback") return "JSON fallback";
  return "Not configured";
}

function sourceClass(state?: ResourceState) {
  if (state?.source === "supabase") return "border-emerald-200 bg-emerald-50 text-emerald-950";
  if (state?.source === "draft") return "border-sky-200 bg-sky-50 text-sky-950";
  if (state?.source === "json-fallback") return "border-amber-200 bg-amber-50 text-amber-950";
  return "border-red-200 bg-red-50 text-red-950";
}

function boolLabel(value?: boolean) {
  return value ? "Yes" : "No";
}

function isPlainRecord(value: unknown): value is JsonRecord {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isImageFieldName(field: string) {
  return imageFields.includes(field) || /image|photo|gallery|media/i.test(field);
}

function setValueAtPath(source: JsonRecord, path: Array<string | number>, value: unknown): JsonRecord {
  const clone = structuredClone(source) as JsonRecord;
  let cursor: unknown = clone;

  path.forEach((part, index) => {
    if (index === path.length - 1) {
      if (Array.isArray(cursor) && typeof part === "number") cursor[part] = value;
      else if (isPlainRecord(cursor) && typeof part === "string") cursor[part] = value;
      return;
    }

    if (Array.isArray(cursor) && typeof part === "number") cursor = cursor[part];
    else if (isPlainRecord(cursor) && typeof part === "string") cursor = cursor[part];
  });

  return clone;
}

function collectNestedImageTargets(value: unknown, path: Array<string | number> = []): ImageTarget[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectNestedImageTargets(item, [...path, index]));
  }

  if (!isPlainRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([field, fieldValue]) => {
    const nextPath = [...path, field];
    const directTarget =
      isImageFieldName(field) && typeof fieldValue === "string"
        ? [{ key: nextPath.join("."), label: pathLabel(nextPath), path: nextPath, value: fieldValue }]
        : [];

    return [...directTarget, ...collectNestedImageTargets(fieldValue, nextPath)];
  });
}

function collectNestedEditableTargets(value: unknown, path: Array<string | number> = []): NestedFieldTarget[] {
  if (Array.isArray(value)) {
    if (isStringArray(value)) {
      const field = String(path[path.length - 1] ?? "items");
      return [{ key: path.join("."), label: pathLabel(path), field, path, value }];
    }

    return value.flatMap((item, index) => collectNestedEditableTargets(item, [...path, index]));
  }

  if (!isPlainRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([field, fieldValue]) => {
    const nextPath = [...path, field];

    if (isImageFieldName(field)) {
      return collectNestedEditableTargets(fieldValue, nextPath);
    }

    if (typeof fieldValue === "string" || typeof fieldValue === "number" || typeof fieldValue === "boolean" || isStringArray(fieldValue)) {
      return nextPath.length > 1 ? [{ key: nextPath.join("."), label: pathLabel(nextPath), field, path: nextPath, value: fieldValue }] : [];
    }

    return collectNestedEditableTargets(fieldValue, nextPath);
  });
}

function shouldUseTextarea(field: string, value: string) {
  const lower = field.toLowerCase();
  return value.length > 80 || ["description", "intro", "message", "summary", "subheadline", "subtitle", "problem", "solution", "result", "answer"].some((term) => lower.includes(term));
}

function countItems(data: ResourceData) {
  return Object.values(data).reduce((total, items) => total + items.length, 0);
}

function itemMatchesQuery(item: JsonRecord, index: number, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return `${itemTitle(item, index)} ${String(item.id ?? "")} ${String(item.slug ?? "")} ${String(item.category ?? "")}`
    .toLowerCase()
    .includes(normalizedQuery);
}

function hasSupabaseContentConfigured(states: ResourceStateData) {
  return Object.values(states).some((state) => state.configured);
}

export default function AdminClient({
  initialData,
  initialResourceStates,
}: {
  initialData: ResourceData;
  initialResourceStates: ResourceStateData;
}) {
  const [activeResource, setActiveResource] = useState<AdminResourceKey>("site-settings");
  const [data, setData] = useState<ResourceData>(initialData);
  const [resourceStates, setResourceStates] = useState<ResourceStateData>(initialResourceStates);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState(() => formatItem(initialData["site-settings"] ?? [], 0));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadMessages, setUploadMessages] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);
  const [diagnosticsMessage, setDiagnosticsMessage] = useState("");
  const [testUploading, setTestUploading] = useState(false);
  const [testUploadMessage, setTestUploadMessage] = useState("");
  const [testUploadUrl, setTestUploadUrl] = useState("");
  const [resourceQuery, setResourceQuery] = useState("");
  const [itemQuery, setItemQuery] = useState("");
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");

  const activeItems = useMemo(() => data[activeResource] ?? [], [activeResource, data]);
  const activeState = resourceStates[activeResource];
  const activeMeta = useMemo(
    () => adminResources.find((resource) => resource.key === activeResource) ?? adminResources[0],
    [activeResource],
  );
  const draftItem = useMemo(() => parseDraft(draft), [draft]);
  const currentStoredDraft = useMemo(() => formatItem(activeItems, selectedIndex), [activeItems, selectedIndex]);
  const isObjectResource = activeMeta.kind === "object";
  const isNewItem = selectedIndex >= activeItems.length;
  const isDirty = isNewItem || draft !== currentStoredDraft;
  const isJsonValid = Boolean(draftItem);
  const liveSavingConfigured = activeState?.configured;
  const saveDisabledReason = !liveSavingConfigured
    ? "Supabase is not configured. Live saving is disabled."
    : !isJsonValid
      ? "Fix the JSON error before saving."
      : !isDirty
        ? "No changes to save."
        : saveState === "saving"
          ? "Saving..."
          : "";
  const visibleImageFields = useMemo(() => {
    const preferred = preferredImageFieldsByResource[activeResource] ?? ["image"];
    const existing = imageFields.filter((field) => draftItem && field in draftItem && typeof draftItem[field] === "string");
    return Array.from(new Set([...preferred, ...existing]));
  }, [activeResource, draftItem]);
  const imageTargets = useMemo(() => {
    const preferredTargets: ImageTarget[] = visibleImageFields.map((field) => ({
      key: field,
      label: displayLabel(field),
      path: [field],
      value: typeof draftItem?.[field] === "string" ? String(draftItem[field]) : "",
    }));
    const nestedTargets = collectNestedImageTargets(draftItem);
    const targetMap = new Map<string, ImageTarget>();

    [...preferredTargets, ...nestedTargets].forEach((target) => {
      targetMap.set(target.key, target);
    });

    return Array.from(targetMap.values());
  }, [draftItem, visibleImageFields]);
  const nestedFieldTargets = useMemo(() => {
    return collectNestedEditableTargets(draftItem);
  }, [draftItem]);
  const filteredItems = useMemo(
    () => activeItems.map((item, index) => ({ item, index })).filter(({ item, index }) => itemMatchesQuery(item, index, itemQuery)),
    [activeItems, itemQuery],
  );
  const groupedResources = useMemo(
    () =>
      resourceGroups.map((group) => ({
        group,
        resources: adminResources.filter((resource) => {
          const query = resourceQuery.trim().toLowerCase();
          if (!query) return resource.group === group;
          return (
            resource.group === group &&
            `${resource.label} ${resource.key} ${resource.description}`
              .toLowerCase()
              .includes(query)
          );
        }),
      })).filter((group) => group.resources.length > 0),
    [resourceQuery],
  );
  const visibleAltFields = useMemo(() => {
    const existing = altFields.filter((field) => draftItem && field in draftItem);
    const paired = visibleImageFields.map(altFieldFor);
    return Array.from(new Set([...paired, ...existing]));
  }, [draftItem, visibleImageFields]);

  function confirmLeaveDirty() {
    if (!isDirty) return true;
    return window.confirm("You have unsaved changes. Leave this item without saving?");
  }

  function resetMessages() {
    setSaveState("idle");
    setError("");
    setNotice("");
    setUploadMessages({});
  }

  function selectResource(resourceKey: AdminResourceKey) {
    if (resourceKey === activeResource) return;
    if (!confirmLeaveDirty()) return;
    const items = data[resourceKey] ?? [];
    setActiveResource(resourceKey);
    setSelectedIndex(0);
    setDraft(formatItem(items, 0));
    setItemQuery("");
    resetMessages();
  }

  function selectItem(index: number) {
    if (index === selectedIndex) return;
    if (!confirmLeaveDirty()) return;
    setSelectedIndex(index);
    setDraft(formatItem(activeItems, index));
    resetMessages();
  }

  function updateDraftField(field: string, value: unknown) {
    const parsed = parseDraft(draft);

    if (!parsed) {
      setSaveState("error");
      setError("Fix invalid JSON before using visual fields.");
      return;
    }

    setDraft(JSON.stringify({ ...parsed, [field]: value }, null, 2));
    resetMessages();
  }

  function updateDraftPath(path: Array<string | number>, value: unknown) {
    const parsed = parseDraft(draft);

    if (!parsed) {
      setSaveState("error");
      setError("Fix invalid JSON before using visual fields.");
      return;
    }

    setDraft(JSON.stringify(setValueAtPath(parsed, path, value), null, 2));
    resetMessages();
  }

  function updateStringListField(field: string, value: string) {
    updateDraftField(
      field,
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  }

  function updateStringListPath(path: Array<string | number>, value: string) {
    updateDraftPath(
      path,
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  }

  async function loadDiagnostics() {
    setDiagnosticsMessage("");
    const response = await fetch("/api/admin/diagnostics");
    const result = (await response.json().catch(() => null)) as { diagnostics?: Diagnostics; error?: string } | null;

    if (!response.ok || !result?.diagnostics) {
      setDiagnostics(null);
      setDiagnosticsMessage(result?.error ?? "Diagnostics could not be loaded.");
      return;
    }

    setDiagnostics(result.diagnostics);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function reloadResource(resourceKey = activeResource) {
    if (resourceKey === activeResource && !confirmLeaveDirty()) return;
    setNotice("Loading latest content...");
    setError("");

    const response = await fetch(`/api/admin/${resourceKey}?version=draft`);
    const result = (await response.json().catch(() => null)) as {
      items?: JsonRecord[];
      source?: ContentSource | "draft";
      message?: string;
      hasDraft?: boolean;
      error?: string;
    } | null;

    if (!response.ok || !result?.items || !result.source) {
      setSaveState("error");
      setError(result?.error ?? "Resource could not be loaded.");
      setNotice("");
      return;
    }

    setData((current) => ({ ...current, [resourceKey]: result.items ?? [] }));
    setResourceStates((current) => ({
      ...current,
      [resourceKey]: {
        source: result.source ?? "json",
        configured: result.source !== "json",
        message: result.message,
        hasDraft: result.hasDraft,
      },
    }));

    if (resourceKey === activeResource) {
      setSelectedIndex(0);
      setDraft(formatItem(result.items, 0));
    }

    setSaveState("idle");
    setNotice("Reloaded latest content.");
  }

  async function uploadFile(target: ImageTarget, file: File | null) {
    if (!file) return;

    setUploadingField(target.key);
    setError("");
    setUploadMessages((current) => ({ ...current, [target.key]: "Upload button clicked. Uploading image..." }));

    try {
      if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Invalid file type. Use JPG, PNG or WebP.");
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File too large. Maximum size is 5 MB.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json()) as UploadResponse;
      const uploadedUrl = result.url ?? result.publicUrl;

      if (!response.ok || !result.success || !uploadedUrl) {
        throw new Error(result.error ?? "Upload failed");
      }

      updateDraftPath(target.path, uploadedUrl);
      setNotice("Image uploaded. Click Save changes to publish it.");
      setUploadMessages((current) => ({ ...current, [target.key]: "Image uploaded. Click Save changes to publish it." }));
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Upload failed";
      setSaveState("error");
      setError(message);
      setUploadMessages((current) => ({ ...current, [target.key]: `Upload failed: ${message}` }));
    } finally {
      setUploadingField(null);
    }
  }

  async function uploadTestFile(file: File | null) {
    if (!file) return;

    setTestUploading(true);
    setTestUploadMessage("Upload test started...");
    setTestUploadUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json()) as UploadResponse;
      const uploadedUrl = result.url ?? result.publicUrl;

      if (!response.ok || !result.success || !uploadedUrl) {
        throw new Error(result.error ?? "Upload failed");
      }

      setTestUploadUrl(uploadedUrl);
      setTestUploadMessage("Upload API works. The file is in Supabase Storage.");
    } catch (caught) {
      setTestUploadMessage(caught instanceof Error ? `Upload failed: ${caught.message}` : "Upload failed.");
    } finally {
      setTestUploading(false);
    }
  }

  function removeImage(target: ImageTarget) {
    updateDraftPath(target.path, "");
    setNotice("Image removed from this page. Click Save changes to publish it.");
    setUploadMessages((current) => ({ ...current, [target.key]: "Removed from page. Click Save changes to publish it." }));
  }

  async function request(method: "POST" | "PUT" | "PATCH" | "DELETE", body: unknown) {
    setSaveState("saving");
    setError("");
    setNotice("");

    const response = await fetch(`/api/admin/${activeResource}?version=draft`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = (await response.json().catch(() => null)) as {
      items?: JsonRecord[];
      source?: ContentSource | "draft";
      message?: string;
      hasDraft?: boolean;
      error?: string;
    } | null;

    if (!response.ok || !result?.items) {
      throw new Error(result?.error ?? "Save failed");
    }

    setData((current) => ({ ...current, [activeResource]: result.items ?? [] }));
    setResourceStates((current) => ({
      ...current,
      [activeResource]: {
        source: result.source ?? "supabase",
        configured: true,
        message: result.message,
        hasDraft: result.hasDraft,
      },
    }));
    setSaveState("saved");
    setNotice("Draft saved. Publish when you want it live.");
    return result.items;
  }

  async function saveItem() {
    if (saveDisabledReason) {
      setError(saveDisabledReason);
      setSaveState("error");
      return;
    }

    try {
      const item = JSON.parse(draft) as JsonRecord;
      const items = await request(selectedIndex >= activeItems.length ? "POST" : "PUT", {
        index: selectedIndex,
        item,
      });
      const nextIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));
      setSelectedIndex(nextIndex);
      setDraft(formatItem(items, nextIndex));
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Invalid JSON or save failed");
    }
  }

  async function publishResource() {
    if (isDirty) {
      setError("Save the draft before publishing.");
      setSaveState("error");
      return;
    }

    if (!activeState?.hasDraft && activeState?.source !== "draft") {
      setError("There is no draft to publish.");
      setSaveState("error");
      return;
    }

    if (!window.confirm("Publish this draft to the live website?")) return;

    setSaveState("saving");
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/admin/${activeResource}?action=publish`, { method: "POST" });
      const result = (await response.json().catch(() => null)) as {
        items?: JsonRecord[];
        source?: ContentSource | "draft";
        message?: string;
        hasDraft?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.items) {
        throw new Error(result?.error ?? "Publish failed.");
      }

      setData((current) => ({ ...current, [activeResource]: result.items ?? [] }));
      setResourceStates((current) => ({
        ...current,
        [activeResource]: {
          source: result.source ?? "supabase",
          configured: true,
          message: result.message,
          hasDraft: false,
        },
      }));
      setSelectedIndex(0);
      setDraft(formatItem(result.items, 0));
      setSaveState("saved");
      setNotice("Published to the live website.");
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Publish failed.");
    }
  }

  async function discardResourceDraft() {
    if (!activeState?.hasDraft && activeState?.source !== "draft") {
      setError("There is no draft to discard.");
      setSaveState("error");
      return;
    }

    if (!window.confirm("Discard this draft and return to the live version?")) return;

    setSaveState("saving");
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/admin/${activeResource}?action=discard`, { method: "POST" });
      const result = (await response.json().catch(() => null)) as {
        items?: JsonRecord[];
        source?: ContentSource | "draft";
        message?: string;
        hasDraft?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.items) {
        throw new Error(result?.error ?? "Discard failed.");
      }

      setData((current) => ({ ...current, [activeResource]: result.items ?? [] }));
      setResourceStates((current) => ({
        ...current,
        [activeResource]: {
          source: result.source ?? "supabase",
          configured: result.source !== "json",
          message: result.message,
          hasDraft: false,
        },
      }));
      setSelectedIndex(0);
      setDraft(formatItem(result.items, 0));
      setSaveState("idle");
      setNotice("Draft discarded. You are viewing the live version.");
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Discard failed.");
    }
  }

  function addItem() {
    const nextItem = createBlankItem(activeItems);
    setSelectedIndex(activeItems.length);
    setDraft(JSON.stringify(nextItem, null, 2));
    resetMessages();
  }

  async function duplicateItem() {
    if (isObjectResource || selectedIndex >= activeItems.length) return;
    if (!confirmLeaveDirty()) return;

    const sourceItem = activeItems[selectedIndex];
    const suffix = `${Date.now()}`.slice(-5);
    const clonedItem = structuredClone(sourceItem) as JsonRecord;

    if (typeof clonedItem.id === "string") clonedItem.id = `${clonedItem.id}-copy-${suffix}`;
    if (typeof clonedItem.slug === "string") clonedItem.slug = `${clonedItem.slug}-copy-${suffix}`;
    if (typeof clonedItem.title === "string") clonedItem.title = `${clonedItem.title} copy`;
    if (typeof clonedItem.name === "string") clonedItem.name = `${clonedItem.name} copy`;
    if (typeof clonedItem.order === "number") clonedItem.order = clonedItem.order + 1;

    try {
      const items = await request("PATCH", { items: [...activeItems.slice(0, selectedIndex + 1), clonedItem, ...activeItems.slice(selectedIndex + 1)] });
      const nextIndex = Math.min(selectedIndex + 1, Math.max(items.length - 1, 0));
      setSelectedIndex(nextIndex);
      setDraft(formatItem(items, nextIndex));
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Duplicate failed");
    }
  }

  async function moveItem(direction: -1 | 1) {
    if (isObjectResource || isDirty || selectedIndex >= activeItems.length) return;
    const targetIndex = selectedIndex + direction;
    if (targetIndex < 0 || targetIndex >= activeItems.length) return;

    const nextItems = [...activeItems];
    const [movedItem] = nextItems.splice(selectedIndex, 1);
    nextItems.splice(targetIndex, 0, movedItem);

    try {
      const items = await request("PATCH", { items: nextItems });
      setSelectedIndex(targetIndex);
      setDraft(formatItem(items, targetIndex));
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Reorder failed");
    }
  }

  async function deleteItem() {
    if (!confirmLeaveDirty()) return;
    if (selectedIndex >= activeItems.length) {
      selectItem(0);
      return;
    }

    if (!window.confirm("Delete this item from the draft?")) return;

    try {
      const items = await request("DELETE", { index: selectedIndex });
      const nextIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));
      setSelectedIndex(nextIndex);
      setDraft(formatItem(items, nextIndex));
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Delete failed");
    }
  }

  function resetDraft() {
    if (!isDirty) return;
    if (!window.confirm("Reset unsaved changes for this item?")) return;
    setDraft(currentStoredDraft);
    resetMessages();
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadDiagnostics();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const supabaseConfigured = hasSupabaseContentConfigured(resourceStates);
  const totalItems = countItems(data);
  const previewWidth = previewDevice === "desktop" ? "max-w-full" : previewDevice === "tablet" ? "max-w-3xl" : "max-w-sm";
  const previewStringFields = draftItem
    ? Object.entries(draftItem).filter(([field, value]) => typeof value === "string" && !isImageFieldName(field) && !altFields.includes(field as AltField))
    : [];
  const previewTitleField = previewStringFields.find(([field]) => ["headline", "title", "name", "question", "heading", "siteName", "sectionLabel"].includes(field));
  const previewTextFields = previewStringFields.filter(([field]) => previewTitleField?.[0] !== field).slice(0, 5);
  const primaryImageTarget = imageTargets.find((target) => target.value) ?? imageTargets[0];
  function renderSaveButton() {
    return (
      <button
        type="button"
        onClick={() => void saveItem()}
        disabled={Boolean(saveDisabledReason)}
        title={saveDisabledReason || "Save a draft without changing the public website"}
        className="rounded-full bg-[#0a2a24] px-5 py-2.5 text-sm font-bold text-white ring-1 ring-[#b07e33]/20 transition hover:bg-[#061A17] disabled:cursor-not-allowed disabled:bg-[#746754] disabled:opacity-60"
      >
        {saveState === "saving" ? "Saving..." : "Save Draft"}
      </button>
    );
  }

  function renderWorkflowButtons() {
    const hasDraft = Boolean(activeState?.hasDraft || activeState?.source === "draft");

    return (
      <>
        {renderSaveButton()}
        <button
          type="button"
          onClick={() => void publishResource()}
          disabled={isDirty || !hasDraft || saveState === "saving"}
          title={isDirty ? "Save the draft before publishing." : hasDraft ? "Publish draft to the public website" : "No draft to publish"}
          className="rounded-full bg-[#b07e33] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#8d6328] disabled:cursor-not-allowed disabled:bg-[#746754] disabled:opacity-60"
        >
          Publish
        </button>
        <button
          type="button"
          onClick={() => void discardResourceDraft()}
          disabled={!hasDraft || saveState === "saving"}
          title={hasDraft ? "Discard draft and return to live content" : "No draft to discard"}
          className="rounded-full border border-red-200 px-5 py-2.5 text-sm font-bold text-red-900 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Discard Changes
        </button>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5ecdc] text-[#14241F]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="rounded-[2rem] border border-[#b07e33]/20 bg-[#061A17] p-5 text-white shadow-xl shadow-[#061A17]/10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F7DFA6]">Care & Flair</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">Admin</h1>
            <p className="mt-3 text-sm leading-6 text-[#E6D6BD]">Edit live site content and manage quote requests.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-white/10 px-3 py-1">Protected</span>
              <span className={`rounded-full px-3 py-1 ${supabaseConfigured ? "bg-emerald-300 text-emerald-950" : "bg-red-100 text-red-950"}`}>
                {supabaseConfigured ? "Supabase ready" : "Supabase needed"}
              </span>
            </div>
            <nav className="mt-6 grid gap-2" aria-label="Admin sections">
              {sidebarLinks.map((link) => (
                <a key={link.label} href={link.href} className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#E6D6BD] transition hover:bg-white/10 hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>
            <button type="button" onClick={() => void logout()} className="mt-6 w-full rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Logout
            </button>
          </div>
        </aside>

        <div className="grid gap-6">
          <section id="dashboard" className="scroll-mt-6 rounded-[2rem] border border-[#E6D6BD] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#746754]">Admin dashboard</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a2a24]">Care & Flair control panel</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#746754]">
                  Edit content carefully. Public pages read Supabase first and use JSON as fallback when Supabase is missing.
                </p>
              </div>
              <button type="button" onClick={() => void loadDiagnostics()} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-semibold text-[#0a2a24] hover:border-[#b07e33]/55">
                Refresh diagnostics
              </button>
            </div>

            {!supabaseConfigured ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-950">
                Supabase is not configured. Live saving is disabled. Public site still works from JSON fallback.
              </div>
            ) : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-[#E6D6BD] bg-[#f5ecdc] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#746754]">Quote Requests</p>
                <p className="mt-2 text-sm font-semibold text-[#0a2a24]">Inbox below</p>
              </div>
              <div className="rounded-2xl border border-[#E6D6BD] bg-[#f5ecdc] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#746754]">Site Content</p>
                <p className="mt-2 text-3xl font-black text-[#0a2a24]">{totalItems}</p>
              </div>
              <div className="rounded-2xl border border-[#E6D6BD] bg-[#f5ecdc] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#746754]">Supabase Status</p>
                <p className="mt-2 text-sm font-semibold text-[#0a2a24]">{supabaseConfigured ? "Configured" : "Not configured"}</p>
              </div>
              <div className="rounded-2xl border border-[#E6D6BD] bg-[#f5ecdc] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#746754]">Last Save Status</p>
                <p className="mt-2 text-sm font-semibold text-[#0a2a24]">{saveState === "saved" ? "Saved" : saveState === "error" ? "Needs attention" : "No recent save"}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#E6D6BD] p-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#746754]">Supabase diagnostics</h3>
              {diagnosticsMessage ? <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-950">{diagnosticsMessage}</p> : null}
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl bg-[#fbf6ee] p-3 text-sm"><span className="font-semibold">URL configured:</span> {boolLabel(diagnostics?.supabaseUrlConfigured)}</div>
                <div className="rounded-xl bg-[#fbf6ee] p-3 text-sm"><span className="font-semibold">Service key:</span> {boolLabel(diagnostics?.serviceKeyConfigured)}</div>
                <div className="rounded-xl bg-[#fbf6ee] p-3 text-sm"><span className="font-semibold">site_content:</span> {boolLabel(diagnostics?.siteContentTableReachable)}</div>
                <div className="rounded-xl bg-[#fbf6ee] p-3 text-sm"><span className="font-semibold">quote_requests:</span> {boolLabel(diagnostics?.quoteRequestsTableReachable)}</div>
              </div>
              {diagnostics?.siteContentError ? <p className="mt-3 text-sm font-semibold text-red-900">site_content: {diagnostics.siteContentError}</p> : null}
              {diagnostics?.quoteRequestsError ? <p className="mt-2 text-sm font-semibold text-red-900">quote_requests: {diagnostics.quoteRequestsError}</p> : null}

              <div className="mt-5 rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h4 className="font-bold text-[#0a2a24]">Image upload test</h4>
                    <p className="mt-1 text-sm text-[#746754]">Use this to check Supabase Storage separately from the page editor.</p>
                  </div>
                  <div>
                    <input
                      id="admin-upload-test"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(event) => {
                        void uploadTestFile(event.target.files?.[0] ?? null);
                        event.currentTarget.value = "";
                      }}
                      className="sr-only"
                    />
                    <label htmlFor="admin-upload-test" className="inline-flex cursor-pointer justify-center rounded-full bg-[#0a2a24] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#061A17]">
                      {testUploading ? "Uploading..." : "Upload test image"}
                    </label>
                  </div>
                </div>
                {testUploadMessage ? <p className="mt-3 rounded-xl border border-[#E6D6BD] bg-white p-3 text-sm font-semibold text-[#14241F]">{testUploadMessage}</p> : null}
                {testUploadUrl ? <input value={testUploadUrl} readOnly className="mt-3 min-h-12 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-sm text-[#14241F]" /> : null}
              </div>
            </div>
          </section>

          <AdminQuoteRequests />

          <section id="content-editor" className="scroll-mt-6 rounded-[2rem] border border-[#E6D6BD] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#746754]">Site content editor</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a2a24]">{activeMeta.label}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#746754]">
                  {activeMeta.description || resourceHelp[activeResource] || "Edit this resource as structured JSON. Keep field names unchanged unless you know the public component uses the new field."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1.5 text-xs font-bold ${sourceClass(activeState)}`}>{sourceLabel(activeState)}</span>
                {activeMeta.publicPath ? (
                  <a href={activeMeta.publicPath} target="_blank" rel="noreferrer" className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-semibold text-[#0a2a24] hover:border-[#b07e33]/55">
                    Open page
                  </a>
                ) : null}
                <button type="button" onClick={() => void reloadResource()} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-semibold text-[#0a2a24] hover:border-[#b07e33]/55">
                  Reload
                </button>
                {renderWorkflowButtons()}
              </div>
            </div>

            {activeState?.message ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">
                {activeState.message}
              </div>
            ) : null}
            {notice ? <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-950">{notice}</div> : null}
            {error ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-950">{error}</div> : null}
            {!isJsonValid ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-950">JSON parse error. Check commas, quotes and brackets before saving.</div> : null}

            <div className="mt-6 grid gap-5 xl:grid-cols-[16rem_1fr]">
              <nav className="rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-3">
                <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#746754]">Resources</p>
                <input
                  value={resourceQuery}
                  onChange={(event) => setResourceQuery(event.target.value)}
                  placeholder="Search sections"
                  className="mb-3 min-h-11 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-2 text-sm text-[#14241F] outline-none focus:border-[#b07e33]"
                />
                <div className="grid max-h-[42rem] gap-4 overflow-auto pr-1">
                  {groupedResources.map((group) => (
                    <div key={group.group}>
                      <p className="px-3 pb-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#746754]">{group.group}</p>
                      <div className="grid gap-1">
                        {group.resources.map((resource) => (
                          <button
                            key={resource.key}
                            type="button"
                            onClick={() => selectResource(resource.key)}
                            className={`rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                              resource.key === activeResource ? "bg-[#0a2a24] text-white" : "text-[#14241F] hover:bg-white"
                            }`}
                          >
                            <span className="block">{resource.label}</span>
                            <span className="mt-0.5 block text-xs opacity-70">{data[resource.key]?.length ?? 0} item(s)</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </nav>

              <div className="grid gap-5">
                <aside className="rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0a2a24]">1. Choose what to edit</h3>
                      <p className="text-sm text-[#746754]">{isObjectResource ? "Single settings object" : `${activeItems.length} items in this section`}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {!isObjectResource ? (
                        <>
                          <button type="button" onClick={addItem} className="rounded-full bg-[#0a2a24] px-4 py-2 text-sm font-bold text-white hover:bg-[#061A17]">
                            Add
                          </button>
                          <button type="button" onClick={() => void duplicateItem()} disabled={selectedIndex >= activeItems.length || isDirty} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-bold text-[#0a2a24] hover:border-[#b07e33]/55 disabled:cursor-not-allowed disabled:opacity-50">
                            Duplicate
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>

                  {!isObjectResource ? (
                    <input
                      value={itemQuery}
                      onChange={(event) => setItemQuery(event.target.value)}
                      placeholder="Search items"
                      className="mt-4 min-h-11 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-2 text-sm text-[#14241F] outline-none focus:border-[#b07e33]"
                    />
                  ) : null}

                  <div className="mt-4 grid max-h-[28rem] gap-2 overflow-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
                    {filteredItems.map(({ item, index }) => (
                      <button
                        key={`${activeResource}-${index}-${String(item.id ?? "item")}`}
                        type="button"
                        onClick={() => selectItem(index)}
                        className={`min-h-20 w-full rounded-xl border px-4 py-3 text-left transition ${
                          index === selectedIndex ? "border-[#b07e33] bg-white" : "border-[#E6D6BD] bg-[#f5ecdc] hover:bg-white"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-[#0a2a24]">{itemTitle(item, index)}</span>
                        <span className="mt-1 block truncate text-xs text-[#746754]">{String(item.id ?? `index-${index}`)}</span>
                      </button>
                    ))}
                    {!filteredItems.length ? (
                      <div className="rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-sm font-semibold text-[#746754]">No matching items.</div>
                    ) : null}
                    {isNewItem ? (
                      <div className="rounded-xl border border-[#b07e33] bg-white px-3 py-3 text-sm font-semibold text-[#0a2a24]">New unsaved item</div>
                    ) : null}
                  </div>
                </aside>

                <section className="rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2a24]">Live preview</h3>
                      <p className="mt-1 text-sm text-[#746754]">Click text in the preview to edit it. Save Draft keeps it private until Publish.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(["desktop", "tablet", "mobile"] as const).map((device) => (
                        <button
                          key={device}
                          type="button"
                          onClick={() => setPreviewDevice(device)}
                          className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${
                            previewDevice === device ? "bg-[#0a2a24] text-white" : "border border-[#E6D6BD] bg-white text-[#0a2a24] hover:border-[#b07e33]/55"
                          }`}
                        >
                          {device}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 overflow-auto rounded-2xl border border-[#E6D6BD] bg-[#e8ddcb] p-4">
                    <div className={`mx-auto transition-all duration-300 ${previewWidth}`}>
                      <div className="overflow-hidden rounded-[1.75rem] border border-[#d9c7a8] bg-[#fbf6ee] shadow-xl shadow-[#061A17]/10">
                        <div className={`grid ${previewDevice === "mobile" ? "grid-cols-1" : "lg:grid-cols-[0.92fr_1.08fr]"} gap-0`}>
                          <div className="p-6 sm:p-8">
                            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#b07e33]">{activeMeta.group}</p>
                            {previewTitleField ? (
                              <input
                                value={String(previewTitleField[1])}
                                onChange={(event) => updateDraftField(previewTitleField[0], event.target.value)}
                                className="mt-4 w-full border-0 bg-transparent font-serif text-4xl font-semibold leading-tight text-[#061d33] outline-none ring-[#b07e33]/20 focus:ring-4 sm:text-5xl"
                              />
                            ) : (
                              <h4 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#061d33]">{itemTitle(draftItem ?? {}, selectedIndex)}</h4>
                            )}
                            <div className="mt-5 grid gap-3">
                              {previewTextFields.map(([field, value]) => (
                                <label key={field} className="block">
                                  <span className="sr-only">{displayLabel(field)}</span>
                                  {shouldUseTextarea(field, String(value)) ? (
                                    <textarea
                                      value={String(value)}
                                      rows={3}
                                      onChange={(event) => updateDraftField(field, event.target.value)}
                                      className="w-full resize-none border-0 bg-transparent text-base leading-7 text-[#4c4438] outline-none ring-[#b07e33]/20 focus:ring-4"
                                    />
                                  ) : (
                                    <input
                                      value={String(value)}
                                      onChange={(event) => updateDraftField(field, event.target.value)}
                                      className="w-full border-0 bg-transparent text-base font-semibold text-[#4c4438] outline-none ring-[#b07e33]/20 focus:ring-4"
                                    />
                                  )}
                                </label>
                              ))}
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                              <span className="inline-flex min-h-12 items-center rounded-[14px] bg-[#8A0F2E] px-5 text-sm font-black text-white">Primary CTA</span>
                              <span className="inline-flex min-h-12 items-center rounded-[14px] border border-[#d9c7a8] bg-white px-5 text-sm font-bold text-[#061d33]">Secondary CTA</span>
                            </div>
                          </div>
                          <div className="relative min-h-72 bg-[#061A17]">
                            {primaryImageTarget?.value ? (
                              <Image src={primaryImageTarget.value} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                            ) : (
                              <div className="grid h-full min-h-72 place-items-center p-8 text-center text-sm font-semibold text-white/72">No image selected for this block</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <form
                  className="rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void saveItem();
                  }}
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2a24]">Edit item</h3>
                      <p className="mt-1 text-sm text-[#746754]">Draft changes stay private until you publish them.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={resetDraft} disabled={!isDirty} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-bold text-[#0a2a24] hover:border-[#b07e33]/55 disabled:cursor-not-allowed disabled:opacity-50">
                        Reset
                      </button>
                      {!isObjectResource ? (
                        <>
                          <button type="button" onClick={() => void moveItem(-1)} disabled={isDirty || selectedIndex <= 0} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-bold text-[#0a2a24] hover:border-[#b07e33]/55 disabled:cursor-not-allowed disabled:opacity-50">
                            Move up
                          </button>
                          <button type="button" onClick={() => void moveItem(1)} disabled={isDirty || selectedIndex >= activeItems.length - 1} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-bold text-[#0a2a24] hover:border-[#b07e33]/55 disabled:cursor-not-allowed disabled:opacity-50">
                            Move down
                          </button>
                          <button type="button" onClick={() => void deleteItem()} className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-900 hover:bg-red-50">
                            Delete
                          </button>
                        </>
                      ) : null}
                      {renderWorkflowButtons()}
                    </div>
                  </div>

                  {saveDisabledReason ? <p className="mt-3 text-sm font-semibold text-[#746754]">{saveDisabledReason}</p> : null}

                  <div className="mt-5 rounded-2xl border border-[#E6D6BD] bg-white p-5">
                    <div className="mb-4 flex flex-col gap-1">
                      <h4 className="text-lg font-bold text-[#0a2a24]">2. Text and data</h4>
                      <p className="text-sm text-[#746754]">Simple fields update the preview instantly.</p>
                    </div>

                    {draftItem ? (
                      <div className="grid gap-4">
                        {Object.entries(draftItem).map(([field, value]) => {
                          if (visibleImageFields.includes(field)) return null;
                          const label = displayLabel(field);

                          if (typeof value === "boolean") {
                            return (
                              <label key={field} className="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] px-4 py-3 text-sm font-bold text-[#14241F]">
                                <span>{label}</span>
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={(event) => updateDraftField(field, event.target.checked)}
                                  className="h-5 w-5 accent-[#0a2a24]"
                                />
                              </label>
                            );
                          }

                          if (typeof value === "number") {
                            return (
                              <label key={field} className="block rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4 text-sm font-bold text-[#14241F]">
                                {label}
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(event) => updateDraftField(field, Number(event.target.value))}
                                  className="mt-2 min-h-12 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                                />
                              </label>
                            );
                          }

                          if (typeof value === "string") {
                            return (
                              <label key={field} className="block rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4 text-sm font-bold text-[#14241F]">
                                {label}
                                {shouldUseTextarea(field, value) ? (
                                  <textarea
                                    value={value}
                                    rows={4}
                                    onChange={(event) => updateDraftField(field, event.target.value)}
                                    className="mt-2 min-h-32 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal leading-7 text-[#14241F] outline-none focus:border-[#b07e33]"
                                  />
                                ) : (
                                  <input
                                    value={value}
                                    onChange={(event) => updateDraftField(field, event.target.value)}
                                    className="mt-2 min-h-12 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                                  />
                                )}
                              </label>
                            );
                          }

                          if (isStringArray(value)) {
                            return (
                              <label key={field} className="block rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4 text-sm font-bold text-[#14241F]">
                                {label}
                                <textarea
                                  value={value.join("\n")}
                                  rows={Math.min(Math.max(value.length, 3), 8)}
                                  onChange={(event) => updateStringListField(field, event.target.value)}
                                  className="mt-2 min-h-32 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal leading-7 text-[#14241F] outline-none focus:border-[#b07e33]"
                                />
                                <span className="mt-1 block text-xs font-normal text-[#746754]">One item per line.</span>
                              </label>
                            );
                          }

                          if (Array.isArray(value) || isPlainRecord(value)) {
                            return (
                              <div key={field} className="rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4 text-sm text-[#14241F]">
                                <p className="font-bold">{label}</p>
                                <p className="mt-1 text-xs leading-5 text-[#746754]">Grouped field. Edit this in the advanced JSON box below.</p>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    ) : (
                      <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-950">Fix JSON before using the simple editor.</p>
                    )}
                  </div>

                  {nestedFieldTargets.length > 0 ? (
                    <div className="mt-5 rounded-2xl border border-[#E6D6BD] bg-white p-5">
                      <div className="mb-4 flex flex-col gap-1">
                        <h4 className="text-lg font-bold text-[#0a2a24]">Grouped fields</h4>
                        <p className="text-sm text-[#746754]">Edit nested copy, settings, order, active state and badges without touching the JSON.</p>
                      </div>
                      <div className="grid gap-4">
                        {nestedFieldTargets.map((target) => {
                          if (typeof target.value === "boolean") {
                            return (
                              <label key={target.key} className="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] px-4 py-3 text-sm font-bold text-[#14241F]">
                                <span>{target.label}</span>
                                <input
                                  type="checkbox"
                                  checked={target.value}
                                  onChange={(event) => updateDraftPath(target.path, event.target.checked)}
                                  className="h-5 w-5 accent-[#0a2a24]"
                                />
                              </label>
                            );
                          }

                          if (typeof target.value === "number") {
                            return (
                              <label key={target.key} className="block rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4 text-sm font-bold text-[#14241F]">
                                {target.label}
                                <input
                                  type="number"
                                  value={target.value}
                                  onChange={(event) => updateDraftPath(target.path, Number(event.target.value))}
                                  className="mt-2 min-h-12 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                                />
                              </label>
                            );
                          }

                          if (Array.isArray(target.value)) {
                            return (
                              <label key={target.key} className="block rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4 text-sm font-bold text-[#14241F]">
                                {target.label}
                                <textarea
                                  value={target.value.join("\n")}
                                  rows={Math.min(Math.max(target.value.length, 3), 8)}
                                  onChange={(event) => updateStringListPath(target.path, event.target.value)}
                                  className="mt-2 min-h-32 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal leading-7 text-[#14241F] outline-none focus:border-[#b07e33]"
                                />
                                <span className="mt-1 block text-xs font-normal text-[#746754]">One badge per line.</span>
                              </label>
                            );
                          }

                          return (
                            <label key={target.key} className="block rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4 text-sm font-bold text-[#14241F]">
                              {target.label}
                              {shouldUseTextarea(target.field, target.value) ? (
                                <textarea
                                  value={target.value}
                                  rows={4}
                                  onChange={(event) => updateDraftPath(target.path, event.target.value)}
                                  className="mt-2 min-h-32 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal leading-7 text-[#14241F] outline-none focus:border-[#b07e33]"
                                />
                              ) : (
                                <input
                                  value={target.value}
                                  onChange={(event) => updateDraftPath(target.path, event.target.value)}
                                  className="mt-2 min-h-12 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                                />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 rounded-2xl border border-[#E6D6BD] bg-white p-5">
                    <div className="mb-4 flex flex-col gap-1">
                      <h4 className="text-lg font-bold text-[#0a2a24]">3. Pictures</h4>
                      <p className="text-sm text-[#746754]">Upload or replace website images. After upload, press Save Draft so the new URL is stored privately.</p>
                    </div>

                    <div className="grid gap-4">
                      {imageTargets.map((target) => {
                        const path = target.value;
                        const inputId = `${activeResource}-${selectedIndex}-${target.key}-upload`.replace(/[^a-zA-Z0-9_-]/g, "-");
                        const fieldMessage = uploadMessages[target.key];

                        return (
                          <div key={target.key} className="rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <label className="text-sm font-bold text-[#14241F]" htmlFor={inputId}>{target.label}</label>
                              <span className="text-xs font-semibold text-[#746754]">{path ? "Current image set" : "No image on page"}</span>
                            </div>
                            <div className="relative mt-3 aspect-video max-h-[26rem] overflow-hidden rounded-xl border border-[#E6D6BD] bg-white">
                              {path ? <Image src={path} alt="" fill sizes="(min-width: 768px) 16rem, 100vw" className="object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-[#746754]">No image</div>}
                            </div>
                            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#746754]">Image URL / path</p>
                            <input
                              value={path}
                              onChange={(event) => updateDraftPath(target.path, event.target.value)}
                              placeholder="https://...supabase.co/storage/v1/object/public/site-images/image.webp"
                              className="mt-3 min-h-12 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base text-[#14241F] outline-none focus:border-[#b07e33]"
                            />
                            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                              <input
                                id={inputId}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={(event) => {
                                  void uploadFile(target, event.target.files?.[0] ?? null);
                                  event.currentTarget.value = "";
                                }}
                                className="sr-only"
                              />
                              <label htmlFor={inputId} className="inline-flex cursor-pointer justify-center rounded-full bg-[#0a2a24] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#061A17]">
                                {path ? "Replace image" : "Upload image"}
                              </label>
                              <button
                                type="button"
                                onClick={() => removeImage(target)}
                                disabled={!path}
                                className="inline-flex justify-center rounded-full border border-red-200 px-5 py-2.5 text-sm font-bold text-red-900 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-45"
                              >
                                Remove from page
                              </button>
                              {uploadingField === target.key ? <span className="text-sm font-semibold text-[#746754]">Uploading...</span> : null}
                            </div>
                            {fieldMessage ? <p className="mt-3 rounded-xl border border-[#E6D6BD] bg-white p-3 text-sm font-semibold text-[#14241F]">{fieldMessage}</p> : null}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 grid gap-3">
                      {visibleAltFields.map((field) => (
                        <label key={field} className="text-sm font-bold text-[#14241F]">
                          {displayLabel(field)}
                          <input
                            value={typeof draftItem?.[field] === "string" ? String(draftItem[field]) : ""}
                            onChange={(event) => updateDraftField(field, event.target.value)}
                            placeholder="Alternative text / visual label"
                            className="mt-2 min-h-12 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-3 text-base font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <details className="mt-5 rounded-2xl border border-[#E6D6BD] bg-white p-5">
                    <summary className="cursor-pointer text-sm font-bold text-[#14241F]">Advanced structure</summary>
                    <label className="mt-4 block text-sm font-bold text-[#14241F]">
                      JSON fallback
                      <textarea
                        value={draft}
                        onChange={(event) => {
                          setDraft(event.target.value);
                          resetMessages();
                        }}
                        spellCheck={false}
                        className="mt-2 min-h-[26rem] w-full resize-y rounded-2xl border border-[#E6D6BD] bg-white p-4 font-mono text-sm leading-6 text-[#14241F] outline-none ring-[#b07e33]/20 focus:ring-4"
                      />
                    </label>
                  </details>

                  <div className="mt-4 flex flex-col gap-3 border-t border-[#E6D6BD] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-[#746754]">
                      {isDirty ? "Unsaved changes" : "No unsaved changes"} · {isJsonValid ? "JSON valid" : "JSON invalid"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => void reloadResource()} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-bold text-[#0a2a24] hover:border-[#b07e33]/55">
                        Reload
                      </button>
                      {renderWorkflowButtons()}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
