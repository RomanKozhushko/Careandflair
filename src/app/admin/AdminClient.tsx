"use client";

import { useMemo, useState } from "react";
import { adminResources, type AdminResourceKey } from "@/admin/resources";

type JsonRecord = Record<string, unknown>;
type ResourceData = Record<AdminResourceKey, JsonRecord[]>;

type SaveState = "idle" | "saving" | "saved" | "error";

function itemTitle(item: JsonRecord, index: number): string {
  const title = item.name ?? item.title ?? item.headline ?? item.question ?? item.id;
  return typeof title === "string" && title.trim().length > 0 ? title : `Item ${index + 1}`;
}

function createBlankItem(items: JsonRecord[]): JsonRecord {
  const sample = items[0];

  if (!sample) {
    return { id: "new-item", visible: true, order: 1 };
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

export default function AdminClient({ initialData }: { initialData: ResourceData }) {
  const [activeResource, setActiveResource] = useState<AdminResourceKey>(adminResources[0].key);
  const [data, setData] = useState<ResourceData>(initialData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState(() => JSON.stringify(initialData[adminResources[0].key][0] ?? {}, null, 2));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState("");

  const activeItems = data[activeResource] ?? [];
  const activeMeta = useMemo(
    () => adminResources.find((resource) => resource.key === activeResource) ?? adminResources[0],
    [activeResource],
  );

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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200/20 bg-slate-900 p-6 shadow-2xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Login placeholder</p>
          <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Care & Flair Admin MVP</h1>
              <p className="mt-2 max-w-3xl text-slate-300">
                Temporary admin screen for editing JSON content. Real authentication comes later.
              </p>
            </div>
            <span className="rounded-full border border-amber-300/40 px-4 py-2 text-sm text-amber-100">Local JSON editor</span>
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
                      ? "bg-amber-300 text-slate-950"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
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
                  <p className="text-sm text-slate-400">{activeItems.length} items</p>
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-200"
                >
                  Add
                </button>
              </div>

              <div className="max-h-[620px] space-y-2 overflow-auto pr-1">
                {activeItems.map((item, index) => (
                  <button
                    key={`${activeResource}-${index}-${String(item.id ?? "item")}`}
                    type="button"
                    onClick={() => selectItem(index)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      index === selectedIndex
                        ? "border-amber-300 bg-amber-300/15"
                        : "border-white/10 bg-slate-900/70 hover:border-white/30"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-white">{itemTitle(item, index)}</span>
                    <span className="mt-1 block truncate text-xs text-slate-400">{String(item.id ?? `index-${index}`)}</span>
                  </button>
                ))}
              </div>
            </aside>

            <form
              className="rounded-3xl border border-white/10 bg-slate-900 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                void saveItem();
              }}
            >
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Edit item</h3>
                  <p className="text-sm text-slate-400">Edit the JSON fields, then save to src/data/{activeMeta.fileName}.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void deleteItem()}
                    className="rounded-full border border-red-300/40 px-4 py-2 text-sm font-bold text-red-100 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-amber-300 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-amber-200"
                  >
                    {saveState === "saving" ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>

              <textarea
                value={draft}
                onChange={(event) => {
                  setDraft(event.target.value);
                  setSaveState("idle");
                }}
                spellCheck={false}
                className="min-h-[560px] w-full rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100 outline-none ring-amber-300/40 focus:ring-4"
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
