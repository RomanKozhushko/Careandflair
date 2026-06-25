"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AdminQuoteRequests } from "@/admin/components/AdminQuoteRequests";
import { adminResources, type AdminResourceKey } from "@/admin/resources";
import type { ContentSource } from "@/lib/siteContent";

type JsonRecord = Record<string, unknown>;
type ResourceData = Record<AdminResourceKey, JsonRecord[]>;
type ResourceState = {
  source: ContentSource;
  configured: boolean;
  message?: string;
};
type ResourceStateData = Record<AdminResourceKey, ResourceState>;
type SaveState = "idle" | "saving" | "saved" | "error";
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
type Diagnostics = {
  supabaseUrlConfigured: boolean;
  serviceKeyConfigured: boolean;
  siteContentTableReachable: boolean;
  quoteRequestsTableReachable: boolean;
  siteContentError?: string;
  quoteRequestsError?: string;
};

const imageFields: ImageField[] = ["image", "imageUrl", "src", "beforeImage", "afterImage", "imageBefore", "imageAfter", "heroImage", "media"];
const altFields: AltField[] = ["imageAlt", "beforeAlt", "afterAlt", "heroImageAlt", "visualLabel"];

const preferredImageFieldsByResource: Partial<Record<AdminResourceKey, ImageField[]>> = {
  packages: ["image"],
  solutions: ["image", "beforeImage", "afterImage"],
  "before-after": ["beforeImage", "afterImage", "image"],
  "homepage-sections": ["heroImage", "image"],
};

const resourceHelp: Partial<Record<AdminResourceKey, string>> = {
  "site-settings": "Business details, phone, email, navigation, footer copy and core positioning.",
  "homepage-sections": "Hero copy, section titles, process steps and homepage CTA blocks.",
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
  { label: "Site Settings", href: "#content-editor" },
  { label: "Homepage", href: "#content-editor" },
  { label: "Packages", href: "#content-editor" },
  { label: "Services", href: "#content-editor" },
  { label: "Upgrades", href: "#content-editor" },
  { label: "Quote Builder", href: "#content-editor" },
  { label: "Before / After", href: "#content-editor" },
  { label: "FAQ", href: "#content-editor" },
  { label: "Areas", href: "#content-editor" },
];

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

function formatItem(items: JsonRecord[], index: number): string {
  return JSON.stringify(items[index] ?? createBlankItem(items), null, 2);
}

function sourceLabel(state?: ResourceState) {
  if (!state) return "Unknown";
  if (state.source === "supabase") return "Supabase";
  if (state.source === "json-fallback") return "JSON fallback";
  return "Not configured";
}

function sourceClass(state?: ResourceState) {
  if (state?.source === "supabase") return "border-emerald-200 bg-emerald-50 text-emerald-950";
  if (state?.source === "json-fallback") return "border-amber-200 bg-amber-50 text-amber-950";
  return "border-red-200 bg-red-50 text-red-950";
}

function boolLabel(value?: boolean) {
  return value ? "Yes" : "No";
}

function countItems(data: ResourceData) {
  return Object.values(data).reduce((total, items) => total + items.length, 0);
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
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);
  const [diagnosticsMessage, setDiagnosticsMessage] = useState("");

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
    const existing = imageFields.filter((field) => draftItem && field in draftItem);
    return Array.from(new Set([...preferred, ...existing]));
  }, [activeResource, draftItem]);
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
  }

  function selectResource(resourceKey: AdminResourceKey) {
    if (resourceKey === activeResource) return;
    if (!confirmLeaveDirty()) return;
    const items = data[resourceKey] ?? [];
    setActiveResource(resourceKey);
    setSelectedIndex(0);
    setDraft(formatItem(items, 0));
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

    const response = await fetch(`/api/admin/${resourceKey}`);
    const result = (await response.json().catch(() => null)) as {
      items?: JsonRecord[];
      source?: ContentSource;
      message?: string;
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
      },
    }));

    if (resourceKey === activeResource) {
      setSelectedIndex(0);
      setDraft(formatItem(result.items, 0));
    }

    setSaveState("idle");
    setNotice("Reloaded latest content.");
  }

  async function uploadFile(field: ImageField, file: File | null) {
    if (!file) return;

    setUploadingField(field);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json()) as UploadResponse;
      const uploadedUrl = result.url ?? result.publicUrl;

      if (!response.ok || !result.success || !uploadedUrl) {
        throw new Error(result.error ?? "Upload failed");
      }

      updateDraftField(field, uploadedUrl);
      setNotice("Image uploaded. Remember to save this resource.");
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
    setNotice("");

    const response = await fetch(`/api/admin/${activeResource}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = (await response.json().catch(() => null)) as {
      items?: JsonRecord[];
      source?: ContentSource;
      message?: string;
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
      },
    }));
    setSaveState("saved");
    setNotice("Saved to Supabase.");
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

  function addItem() {
    const nextItem = createBlankItem(activeItems);
    setSelectedIndex(activeItems.length);
    setDraft(JSON.stringify(nextItem, null, 2));
    resetMessages();
  }

  async function deleteItem() {
    if (!confirmLeaveDirty()) return;
    if (selectedIndex >= activeItems.length) {
      selectItem(0);
      return;
    }

    if (!window.confirm("Delete this item from live content?")) return;

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
  function renderSaveButton() {
    return (
      <button
        type="button"
        onClick={() => void saveItem()}
        disabled={Boolean(saveDisabledReason)}
        title={saveDisabledReason || "Save live content to Supabase"}
        className="rounded-full bg-[#0a2a24] px-5 py-2.5 text-sm font-bold text-white ring-1 ring-[#b07e33]/20 transition hover:bg-[#061A17] disabled:cursor-not-allowed disabled:bg-[#746754] disabled:opacity-60"
      >
        {saveState === "saving" ? "Saving..." : "Save changes"}
      </button>
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
            </div>
          </section>

          <AdminQuoteRequests />

          <section id="content-editor" className="scroll-mt-6 rounded-[2rem] border border-[#E6D6BD] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#746754]">Site content editor</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a2a24]">{activeMeta.label}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#746754]">
                  {resourceHelp[activeResource] ?? "Edit this resource as structured JSON. Keep field names unchanged unless you know the public component uses the new field."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1.5 text-xs font-bold ${sourceClass(activeState)}`}>{sourceLabel(activeState)}</span>
                <button type="button" onClick={() => void reloadResource()} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-semibold text-[#0a2a24] hover:border-[#b07e33]/55">
                  Reload
                </button>
                {renderSaveButton()}
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

            <div className="mt-6 grid gap-5 xl:grid-cols-[18rem_1fr]">
              <nav className="rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-3">
                <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#746754]">Resources</p>
                <div className="grid gap-1">
                  {adminResources.map((resource) => (
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
              </nav>

              <div className="grid gap-5 2xl:grid-cols-[20rem_1fr]">
                <aside className="rounded-2xl border border-[#E6D6BD] bg-[#fbf6ee] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0a2a24]">Items</h3>
                      <p className="text-sm text-[#746754]">{isObjectResource ? "Single settings object" : `${activeItems.length} items`}</p>
                    </div>
                    {!isObjectResource ? (
                      <button type="button" onClick={addItem} className="rounded-full bg-[#0a2a24] px-4 py-2 text-sm font-bold text-white hover:bg-[#061A17]">
                        Add
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-4 max-h-[34rem] space-y-2 overflow-auto pr-1">
                    {activeItems.map((item, index) => (
                      <button
                        key={`${activeResource}-${index}-${String(item.id ?? "item")}`}
                        type="button"
                        onClick={() => selectItem(index)}
                        className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                          index === selectedIndex ? "border-[#b07e33] bg-white" : "border-[#E6D6BD] bg-[#f5ecdc] hover:bg-white"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-[#0a2a24]">{itemTitle(item, index)}</span>
                        <span className="mt-1 block truncate text-xs text-[#746754]">{String(item.id ?? `index-${index}`)}</span>
                      </button>
                    ))}
                    {isNewItem ? (
                      <div className="rounded-xl border border-[#b07e33] bg-white px-3 py-3 text-sm font-semibold text-[#0a2a24]">New unsaved item</div>
                    ) : null}
                  </div>
                </aside>

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
                      <p className="mt-1 text-sm text-[#746754]">You are editing live site content. Save writes to Supabase, not project files.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={resetDraft} disabled={!isDirty} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-bold text-[#0a2a24] hover:border-[#b07e33]/55 disabled:cursor-not-allowed disabled:opacity-50">
                        Reset
                      </button>
                      {!isObjectResource ? (
                        <button type="button" onClick={() => void deleteItem()} className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-900 hover:bg-red-50">
                          Delete
                        </button>
                      ) : null}
                      {renderSaveButton()}
                    </div>
                  </div>

                  {saveDisabledReason ? <p className="mt-3 text-sm font-semibold text-[#746754]">{saveDisabledReason}</p> : null}

                  <div className="mt-5 rounded-2xl border border-[#E6D6BD] bg-white p-4">
                    <div className="mb-4 flex flex-col gap-1">
                      <h4 className="font-bold text-[#0a2a24]">Visual fields</h4>
                      <p className="text-sm text-[#746754]">Upload public website images to Supabase Storage, preview them here, then save the resource.</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {visibleImageFields.map((field) => {
                        const value = draftItem?.[field];
                        const path = typeof value === "string" ? value : "";

                        return (
                          <div key={field} className="rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-3">
                            <label className="text-sm font-bold text-[#14241F]">{displayLabel(field)}</label>
                            <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-[#E6D6BD] bg-white">
                              {path ? <Image src={path} alt="" fill sizes="(min-width: 768px) 16rem, 100vw" className="object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-[#746754]">No image</div>}
                            </div>
                            <input
                              value={path}
                              onChange={(event) => updateDraftField(field, event.target.value)}
                              placeholder="https://...supabase.co/storage/v1/object/public/site-images/image.webp"
                              className="mt-3 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-2 text-sm text-[#14241F] outline-none focus:border-[#b07e33]"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) => void uploadFile(field, event.target.files?.[0] ?? null)}
                              className="mt-3 block w-full text-sm text-[#746754] file:mr-3 file:rounded-full file:border-0 file:bg-[#0a2a24] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
                            />
                            <p className="mt-2 text-xs text-[#746754]">Upload image / replace image</p>
                            {uploadingField === field && <p className="mt-2 text-xs font-semibold text-[#746754]">Uploading...</p>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {visibleAltFields.map((field) => (
                        <label key={field} className="text-sm font-bold text-[#14241F]">
                          {displayLabel(field)}
                          <input
                            value={typeof draftItem?.[field] === "string" ? String(draftItem[field]) : ""}
                            onChange={(event) => updateDraftField(field, event.target.value)}
                            placeholder="Alternative text / visual label"
                            className="mt-2 w-full rounded-xl border border-[#E6D6BD] bg-white px-3 py-2 text-sm font-normal text-[#14241F] outline-none focus:border-[#b07e33]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="mt-5 block text-sm font-bold text-[#14241F]">
                    Structured content JSON
                    <textarea
                      value={draft}
                      onChange={(event) => {
                        setDraft(event.target.value);
                        resetMessages();
                      }}
                      spellCheck={false}
                      className="mt-2 min-h-[34rem] w-full resize-y rounded-2xl border border-[#E6D6BD] bg-white p-4 font-mono text-sm leading-6 text-[#14241F] outline-none ring-[#b07e33]/20 focus:ring-4"
                    />
                  </label>

                  <div className="mt-4 flex flex-col gap-3 border-t border-[#E6D6BD] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-[#746754]">
                      {isDirty ? "Unsaved changes" : "No unsaved changes"} · {isJsonValid ? "JSON valid" : "JSON invalid"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => void reloadResource()} className="rounded-full border border-[#E6D6BD] px-4 py-2 text-sm font-bold text-[#0a2a24] hover:border-[#b07e33]/55">
                        Reload
                      </button>
                      {renderSaveButton()}
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
