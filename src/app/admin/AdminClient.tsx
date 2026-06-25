"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { adminResources, type AdminResourceKey } from "@/admin/resources";

type JsonRecord = Record<string, unknown>;
type ResourceData = Record<AdminResourceKey, JsonRecord[]>;

type SaveState = "idle" | "saving" | "saved" | "error";
type ImageField = "image" | "beforeImage" | "afterImage" | "imageBefore" | "imageAfter" | "heroImage";
type AltField = "imageAlt" | "beforeAlt" | "afterAlt" | "heroImageAlt" | "visualLabel";

const imageFields: ImageField[] = ["image", "beforeImage", "afterImage", "imageBefore", "imageAfter", "heroImage"];
const altFields: AltField[] = ["imageAlt", "beforeAlt", "afterAlt", "heroImageAlt", "visualLabel"];

const preferredImageFieldsByResource: Partial<Record<AdminResourceKey, ImageField[]>> = {
  packages: ["image"],
  solutions: ["image", "beforeImage", "afterImage"],
  "before-after": ["beforeImage", "afterImage", "image"],
  "homepage-sections": ["heroImage", "image"],
};

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

function altFieldFor(imageField: ImageField): AltField {
  if (imageField === "beforeImage" || imageField === "imageBefore") return "beforeAlt";
  if (imageField === "afterImage" || imageField === "imageAfter") return "afterAlt";
  if (imageField === "heroImage") return "heroImageAlt";
  return "imageAlt";
}

export default function AdminClient({ initialData }: { initialData: ResourceData }) {
  const [activeResource, setActiveResource] = useState<AdminResourceKey>(adminResources[0].key);
  const [data, setData] = useState<ResourceData>(initialData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState(() => JSON.stringify(initialData[adminResources[0].key][0] ?? {}, null, 2));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [error, setError] = useState("");

  const activeItems = data[activeResource] ?? [];
  const draftItem = useMemo(() => parseDraft(draft), [draft]);
  const activeMeta = useMemo(
    () => adminResources.find((resource) => resource.key === activeResource) ?? adminResources[0],
    [activeResource],
  );
  const isObjectResource = activeMeta.kind === "object";
  const visibleImageFields = useMemo(() => {
    const preferred = preferredImageFieldsByResource[activeResource] ?? ["image"];
    const existing = imageFields.filter((field) => draftItem && field in draftItem);
    return Array.from(new Set([...preferred, ...existing]));
  }, [activeResource, draftItem]);
  const visibleAltFields = useMemo(() => {
    const existing = altFields.filter((field) => draftItem && field in draftItem);
    const paired = visibleImageFields.map(altFieldFor);
    return Array.from(new Set([...paired, ...existing]));
  }, [draftItem, visibleImageFields]);

  function selectResource(resourceKey: AdminResourceKey) {
    const items = data[resourceKey] ?? [];
    setActiveResource(resourceKey);
    setSelectedIndex(0);
    setDraft(JSON.stringify(items[0] ?? createBlankItem(items), null, 2));
    setSaveState("idle");
    setError("");
  }

  function selectItem(index: number) {
    setSelectedIndex(index);
    setDraft(JSON.stringify(activeItems[index] ?? {}, null, 2));
    setSaveState("idle");
    setError("");
  }

  function updateDraftField(field: string, value: unknown) {
    const parsed = parseDraft(draft);

    if (!parsed) {
      setSaveState("error");
      setError("Fix invalid JSON before using visual fields.");
      return;
    }

    setDraft(JSON.stringify({ ...parsed, [field]: value }, null, 2));
    setSaveState("idle");
    setError("");
  }

  async function uploadFile(field: ImageField, file: File | null) {
    if (!file) return;

    setUploadingField(field);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json()) as { success?: boolean; name?: string; error?: string };

      if (!response.ok || !result.success || !result.name) {
        throw new Error(result.error ?? "Upload failed");
      }

      updateDraftField(field, `/uploads/${result.name}`);
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Upload failed");
    } finally {
      setUploadingField(null);
    }
  }

  async function request(method: "POST" | "PUT" | "DELETE", body: unknown) {
    setSaveState("saving");
    setError("");

    const response = await fetch(`/api/admin/${activeResource}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = (await response.json()) as { items?: JsonRecord[]; error?: string };

    if (!response.ok || !result.items) {
      throw new Error(result.error ?? "Save failed");
    }

    setData((current) => ({ ...current, [activeResource]: result.items ?? [] }));
    setSaveState("saved");
    return result.items;
  }

  async function saveItem() {
    try {
      const item = JSON.parse(draft) as JsonRecord;
      const items = await request(selectedIndex >= activeItems.length ? "POST" : "PUT", {
        index: selectedIndex,
        item,
      });
      const nextIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));
      setSelectedIndex(nextIndex);
      setDraft(JSON.stringify(items[nextIndex] ?? createBlankItem(items), null, 2));
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Invalid JSON or save failed");
    }
  }

  async function addItem() {
    const nextItem = createBlankItem(activeItems);
    setSelectedIndex(activeItems.length);
    setDraft(JSON.stringify(nextItem, null, 2));
    setSaveState("idle");
    setError("");
  }

  async function deleteItem() {
    if (selectedIndex >= activeItems.length) {
      selectItem(0);
      return;
    }

    try {
      const items = await request("DELETE", { index: selectedIndex });
      const nextIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));
      setSelectedIndex(nextIndex);
      setDraft(JSON.stringify(items[nextIndex] ?? createBlankItem(items), null, 2));
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Delete failed");
    }
  }

  return (
    <main id="content-editor" className="min-h-screen scroll-mt-6 bg-[#061A17] text-[#f5ecdc]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#b07e33]/20 bg-[#0a2a24] p-6 shadow-2xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Site content editor</p>
          <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Edit Care & Flair Website Content</h1>
              <p className="mt-2 max-w-3xl text-[#E6D6BD]">
                Edit packages, service cards, before/after examples, FAQs, testimonials, areas and homepage sections.
              </p>
            </div>
            <span className="rounded-full border border-amber-300/40 px-4 py-2 text-sm text-amber-100">JSON content + image uploads</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <nav className="rounded-3xl border border-white/10 bg-white/5 p-3">
            <div className="space-y-2">
              {adminResources.map((resource) => (
                <button
                  key={resource.key}
                  type="button"
                  onClick={() => selectResource(resource.key)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    resource.key === activeResource
                      ? "bg-white text-[#0a2a24]"
                      : "text-[#E6D6BD] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {resource.label}
                  <span className="ml-2 text-xs opacity-70">{data[resource.key]?.length ?? 0}</span>
                </button>
              ))}
            </div>
          </nav>

          <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">{activeMeta.label}</h2>
                  <p className="text-sm text-[#746754]">{isObjectResource ? "Single settings object" : `${activeItems.length} items`}</p>
                </div>
                {!isObjectResource ? (
                  <button
                    type="button"
                    onClick={addItem}
                    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0a2a24] hover:bg-[#f5ecdc]"
                  >
                    Add
                  </button>
                ) : null}
              </div>

              <div className="max-h-[620px] space-y-2 overflow-auto pr-1">
                {activeItems.map((item, index) => (
                  <button
                    key={`${activeResource}-${index}-${String(item.id ?? "item")}`}
                    type="button"
                    onClick={() => selectItem(index)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      index === selectedIndex
                        ? "border-[#b07e33] bg-[#b07e33]/10"
                        : "border-[#b07e33]/15 bg-[#0a2a24]/70 hover:border-white/30"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-white">{itemTitle(item, index)}</span>
                    <span className="mt-1 block truncate text-xs text-[#746754]">{String(item.id ?? `index-${index}`)}</span>
                  </button>
                ))}
              </div>
            </aside>

            <form
              className="rounded-3xl border border-[#b07e33]/15 bg-[#0a2a24] p-4"
              onSubmit={(event) => {
                event.preventDefault();
                void saveItem();
              }}
            >
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Edit item</h3>
                  <p className="text-sm text-[#746754]">Upload visuals, edit alt text, then save to src/data/{activeMeta.fileName}.</p>
                </div>
                <div className="flex gap-2">
                  {!isObjectResource ? (
                    <button
                      type="button"
                      onClick={() => void deleteItem()}
                      className="rounded-full border border-red-300/40 px-4 py-2 text-sm font-bold text-red-100 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  ) : null}
                  <button
                    type="submit"
                    className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#0a2a24] ring-1 ring-[#b07e33]/20 hover:bg-[#f5ecdc]"
                  >
                    {saveState === "saving" ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-2xl border border-[#b07e33]/15 bg-[#061A17]/60 p-4">
                <div className="mb-4 flex flex-col gap-1">
                  <h4 className="font-bold text-white">Visual content</h4>
                  <p className="text-sm text-[#746754]">Files upload to public/uploads and update the JSON path automatically.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {visibleImageFields.map((field) => {
                    const value = draftItem?.[field];
                    const path = typeof value === "string" ? value : "";

                    return (
                      <div key={field} className="rounded-2xl border border-[#b07e33]/15 bg-[#0a2a24] p-3">
                        <label className="text-sm font-bold text-[#E6D6BD]">{displayLabel(field)}</label>
                        <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-[#b07e33]/15 bg-[#061A17]">
                          {path ? <Image src={path} alt="" fill sizes="(min-width: 768px) 16rem, 100vw" className="object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-[#746754]">No image</div>}
                        </div>
                        <input
                          value={path}
                          onChange={(event) => updateDraftField(field, event.target.value)}
                          placeholder="/uploads/image.jpg"
                          className="mt-3 w-full rounded-xl border border-[#b07e33]/15 bg-[#061A17] px-3 py-2 text-sm text-[#f5ecdc] outline-none focus:border-[#b07e33]"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => void uploadFile(field, event.target.files?.[0] ?? null)}
                          className="mt-3 block w-full text-sm text-[#E6D6BD] file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#0a2a24]"
                        />
                        {uploadingField === field && <p className="mt-2 text-xs text-amber-200">Uploading...</p>}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {visibleAltFields.map((field) => (
                    <label key={field} className="text-sm font-bold text-[#E6D6BD]">
                      {displayLabel(field)}
                      <input
                        value={typeof draftItem?.[field] === "string" ? String(draftItem[field]) : ""}
                        onChange={(event) => updateDraftField(field, event.target.value)}
                        placeholder="Alternative text / visual label"
                        className="mt-2 w-full rounded-xl border border-[#b07e33]/15 bg-[#061A17] px-3 py-2 text-sm font-normal text-[#f5ecdc] outline-none focus:border-[#b07e33]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                value={draft}
                onChange={(event) => {
                  setDraft(event.target.value);
                  setSaveState("idle");
                }}
                spellCheck={false}
                className="min-h-[480px] w-full rounded-2xl border border-[#b07e33]/15 bg-[#061A17] p-4 font-mono text-sm leading-6 text-[#f5ecdc] outline-none ring-[#b07e33]/30 focus:ring-4"
              />

              <div className="mt-4 min-h-6 text-sm">
                {saveState === "saved" && <p className="text-emerald-300">Saved to JSON.</p>}
                {saveState === "error" && <p className="text-red-300">{error}</p>}
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
