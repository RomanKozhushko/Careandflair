"use client";

import { useMemo, useRef, useState } from "react";
import { AdminQuoteRequests } from "@/admin/components/AdminQuoteRequests";
import type { AdminResourceKey } from "@/admin/resources";
import type { JsonRecord } from "@/admin/jsonStore";
import { ApprovedHomePage } from "@/homepage/ApprovedHomePage";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import type { ContentBundle } from "@/lib/content";
import type { ContentSource } from "@/lib/siteContent";
import type { EditableResourceKey, EditableSectionActions, VisualEditorAdapter, EditableButtonConfig, EditableImageConfig } from "@/lib/visualEditor";
import type {
  Area,
  AudienceMode,
  BeforeAfterItem,
  BeforeAfterMatch,
  CtaMapping,
  FaqItem,
  GuardianPlan,
  HomepageSection,
  HomepageTransformationsContent,
  InteractiveToolsConfig,
  OptionalUpgrade,
  PricingMatrixRow,
  ProblemCategory,
  PropertyCategory,
  PropertyType,
  QuoteBuilderConfig,
  ReadinessScoresConfig,
  ServicePackage,
  SiteSettings,
  Solution,
  Visibility,
} from "@/lib/types";

type ResourceData = Record<AdminResourceKey, JsonRecord[]>;
type ResourceState = {
  source: ContentSource | "draft";
  configured: boolean;
  message?: string;
  hasDraft?: boolean;
};
type ResourceStateData = Record<AdminResourceKey, ResourceState>;
type SaveState = "idle" | "saving" | "saved" | "error";
type AdminView = "home" | "quote" | "before-after" | "packages" | "faq" | "areas" | "footer" | "settings" | "quote-requests";
type PreviewDevice = "desktop" | "tablet" | "mobile";
type UploadResponse = { success?: boolean; url?: string; publicUrl?: string; error?: string };

const homepageResources: EditableResourceKey[] = [
  "site-settings",
  "homepage-sections",
  "homepage-transformations",
  "cta-mappings",
  "packages",
  "solutions",
  "guardian-plans",
  "faqs",
  "areas",
  "testimonials",
  "before-after",
];
const sidebarItems: { id: AdminView; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "quote", label: "Quote" },
  { id: "before-after", label: "Before & After" },
  { id: "packages", label: "Packages" },
  { id: "faq", label: "FAQ" },
  { id: "areas", label: "Areas" },
  { id: "footer", label: "Footer" },
  { id: "settings", label: "Settings" },
  { id: "quote-requests", label: "Quote Requests" },
];

function pathKey(resource: EditableResourceKey, path: Array<string | number>) {
  return `${resource}:${path.join(".")}`;
}

function isPlainRecord(value: unknown): value is JsonRecord {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function setValueAtPath<T>(source: T, path: Array<string | number>, value: unknown): T {
  const clone = structuredClone(source) as T;
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

function resourceItemsToContent(data: ResourceData): ContentBundle {
  return {
    siteSettings: (data["site-settings"][0] ?? {}) as SiteSettings,
    ctaMappings: data["cta-mappings"] as CtaMapping[],
    homepageSections: data["homepage-sections"] as HomepageSection[],
    homepageTransformations: (data["homepage-transformations"][0] ?? {}) as HomepageTransformationsContent,
    interactiveTools: (data["interactive-tools"][0] ?? {}) as InteractiveToolsConfig,
    audienceModes: data["audience-modes"] as AudienceMode[],
    problemCategories: data["problem-categories"] as ProblemCategory[],
    readinessScores: (data["readiness-scores"][0] ?? {}) as ReadinessScoresConfig,
    servicePackages: data.packages as ServicePackage[],
    propertyCategories: data["property-categories"] as PropertyCategory[],
    propertyTypes: data["property-types"] as PropertyType[],
    optionalUpgrades: data["optional-upgrades"] as OptionalUpgrade[],
    pricingMatrix: data["pricing-matrix"] as PricingMatrixRow[],
    quoteBuilderConfig: (data["quote-builder"][0] ?? {}) as QuoteBuilderConfig,
    solutions: data.solutions as Solution[],
    guardianPlans: data["guardian-plans"] as GuardianPlan[],
    beforeAfterItems: data["before-after"] as BeforeAfterItem[],
    beforeAfterMatches: data["before-after-matches"] as BeforeAfterMatch[],
    areas: data.areas as Area[],
    faqs: data.faqs as FaqItem[],
    testimonials: data.testimonials as Visibility[],
  };
}

async function compressImage(file: File): Promise<File> {
  if (file.type === "image/webp" && file.size < 1_400_000) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");

  if (!context) return file;
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));
  if (!blob || blob.size >= file.size) return file;

  return new File([blob], file.name.replace(/\.[a-z0-9]+$/i, ".webp"), { type: "image/webp" });
}

export default function AdminClient({
  initialData,
  initialResourceStates,
}: {
  initialData: ResourceData;
  initialResourceStates: ResourceStateData;
}) {
  const [view, setView] = useState<AdminView>("home");
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [data, setData] = useState<ResourceData>(initialData);
  const [resourceStates, setResourceStates] = useState<ResourceStateData>(initialResourceStates);
  const [dirtyResources, setDirtyResources] = useState<Set<EditableResourceKey>>(() => new Set());
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const content = useMemo(() => resourceItemsToContent(data), [data]);
  const quoteCtaIndex = content.ctaMappings.findIndex((cta) => cta.id === "build-your-quote");
  const quoteCta = content.ctaMappings[quoteCtaIndex] ?? { id: "build-your-quote", label: "Get quote", href: "/quote" };
  const whatsappHref = content.siteSettings.headerWhatsappHref ?? `https://wa.me/${content.siteSettings.phone.replace(/\D/g, "")}`;
  const draftReady = homepageResources.every((resource) => resourceStates[resource]?.configured);
  const hasExistingDraft = homepageResources.some((resource) => resourceStates[resource]?.hasDraft || resourceStates[resource]?.source === "draft");
  const hasDirtyChanges = dirtyResources.size > 0;
  const deviceClass = device === "desktop" ? "max-w-full" : device === "tablet" ? "max-w-[820px]" : "max-w-[390px]";

  function markDirty(resource: EditableResourceKey) {
    setDirtyResources((current) => new Set(current).add(resource));
    setSaveState("idle");
    setNotice("");
    setError("");
  }

  function updateResourcePath(resource: EditableResourceKey, path: Array<string | number>, value: unknown) {
    setData((current) => ({ ...current, [resource]: setValueAtPath(current[resource], path, value) as JsonRecord[] }));
    markDirty(resource);
  }

  async function saveResource(resource: EditableResourceKey) {
    const response = await fetch(`/api/admin/${resource}?version=draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: data[resource] }),
    });
    const result = (await response.json().catch(() => null)) as { items?: JsonRecord[]; source?: ContentSource | "draft"; hasDraft?: boolean; message?: string; error?: string } | null;

    if (!response.ok || !result?.items) {
      throw new Error(result?.error ?? `${resource} could not be saved.`);
    }

    setData((current) => ({ ...current, [resource]: result.items ?? current[resource] }));
    setResourceStates((current) => ({
      ...current,
      [resource]: {
        source: result.source ?? "draft",
        configured: true,
        hasDraft: result.hasDraft ?? true,
        message: result.message,
      },
    }));
  }

  async function saveDraft() {
    if (!draftReady) {
      setSaveState("error");
      setError("Supabase draft storage is not configured, so draft saving is disabled.");
      return;
    }

    setSaveState("saving");
    setNotice("");
    setError("");

    try {
      const resources = dirtyResources.size ? Array.from(dirtyResources) : homepageResources;
      await Promise.all(resources.map((resource) => saveResource(resource)));
      setDirtyResources(new Set());
      setSaveState("saved");
      setNotice("Draft saved. The live website has not changed yet.");
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Draft save failed.");
    }
  }

  async function publishDraft() {
    if (hasDirtyChanges) {
      setSaveState("error");
      setError("Save the draft before publishing.");
      return;
    }

    if (!hasExistingDraft) {
      setSaveState("error");
      setError("There is no saved homepage draft to publish.");
      return;
    }

    if (!window.confirm("Publish the saved homepage draft to the live website?")) return;

    setSaveState("saving");
    setNotice("");
    setError("");

    try {
      await Promise.all(
        homepageResources
          .filter((resource) => resourceStates[resource]?.hasDraft || resourceStates[resource]?.source === "draft")
          .map(async (resource) => {
          const response = await fetch(`/api/admin/${resource}?action=publish`, { method: "POST" });
          const result = (await response.json().catch(() => null)) as { items?: JsonRecord[]; source?: ContentSource; error?: string } | null;

          if (!response.ok || !result?.items) {
            throw new Error(result?.error ?? `${resource} could not be published.`);
          }

          setData((current) => ({ ...current, [resource]: result.items ?? current[resource] }));
          setResourceStates((current) => ({
            ...current,
            [resource]: { ...current[resource], source: result.source ?? "supabase", configured: true, hasDraft: false },
          }));
        }),
      );
      setSaveState("saved");
      setNotice("Homepage draft published to the live website.");
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Publish failed.");
    }
  }

  async function discardDraft() {
    if (!window.confirm("Discard the homepage draft and return to the live version?")) return;

    setSaveState("saving");
    setNotice("");
    setError("");

    try {
      await Promise.all(
        homepageResources.map(async (resource) => {
          const response = await fetch(`/api/admin/${resource}?action=discard`, { method: "POST" });
          const result = (await response.json().catch(() => null)) as { items?: JsonRecord[]; source?: ContentSource | "draft"; message?: string; error?: string } | null;

          if (!response.ok || !result?.items) {
            throw new Error(result?.error ?? `${resource} draft could not be discarded.`);
          }

          setData((current) => ({ ...current, [resource]: result.items ?? current[resource] }));
          setResourceStates((current) => ({
            ...current,
            [resource]: { ...current[resource], source: result.source ?? "supabase", configured: result.source !== "json", hasDraft: false, message: result.message },
          }));
        }),
      );
      setDirtyResources(new Set());
      setSaveState("idle");
      setNotice("Draft discarded. You are viewing the live homepage content.");
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Discard failed.");
    }
  }

  async function uploadImage(resource: EditableResourceKey, path: Array<string | number>, file: File | null) {
    if (!file) return;
    const key = pathKey(resource, path);
    setUploadingKey(key);
    setError("");
    setNotice("");

    try {
      if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Use a JPG, PNG or WebP image.");
      }

      const uploadFile = await compressImage(file);
      if (uploadFile.size > 5 * 1024 * 1024) {
        throw new Error("Image is too large after compression. Maximum size is 5 MB.");
      }

      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as UploadResponse | null;
      const uploadedUrl = result?.url ?? result?.publicUrl;

      if (!response.ok || !result?.success || !uploadedUrl) {
        throw new Error(result?.error ?? "Upload failed.");
      }

      updateResourcePath(resource, path, uploadedUrl);
      setNotice("Image uploaded into the draft preview. Press Save Draft to keep it.");
    } catch (caught) {
      setSaveState("error");
      setError(caught instanceof Error ? caught.message : "Image upload failed.");
    } finally {
      setUploadingKey(null);
    }
  }

  function renderEditableText(resource: EditableResourceKey, path: Array<string | number>, value: string) {
    const key = pathKey(resource, path);
    const active = editingKey === key;

    return (
      <span className="group/editor-text relative inline rounded-[6px] outline-none ring-[#b07e33]/0 transition hover:ring-2 hover:ring-[#b07e33]/45">
        <span
          contentEditable={active}
          suppressContentEditableWarning
          onDoubleClick={() => setEditingKey(key)}
          onBlur={(event) => {
            setEditingKey(null);
            const next = event.currentTarget.textContent ?? "";
            if (next !== value) updateResourcePath(resource, path, next);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.blur();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              setEditingKey(null);
              event.currentTarget.textContent = value;
              event.currentTarget.blur();
            }
          }}
          className={active ? "cursor-text rounded-[6px] bg-white/70 px-1 shadow-[0_0_0_3px_rgba(176,126,51,0.24)]" : "cursor-text"}
          title="Double click to edit"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={() => setEditingKey(key)}
          className="absolute -right-7 -top-3 hidden h-6 w-6 place-items-center rounded-full bg-[#0a2a24] text-xs font-black text-white shadow-lg group-hover/editor-text:grid"
          aria-label="Edit text"
        >
          ✎
        </button>
      </span>
    );
  }

  function renderEditableButton(config: EditableButtonConfig) {
    const labelKey = pathKey(config.resource, config.labelPath);
    const hrefKey = pathKey(config.resource, config.hrefPath);
    const isEditing = editingKey === labelKey || editingKey === hrefKey;
    const variantClass =
      config.variant === "whatsapp"
        ? "gap-2 border border-[rgba(8,27,45,0.18)] bg-white text-[var(--cf-navy)] shadow-sm hover:border-[rgba(37,211,102,0.35)] hover:bg-[rgba(37,211,102,0.08)]"
        : config.variant === "secondary"
          ? "border border-[rgba(8,27,45,0.15)] bg-white text-[var(--cf-navy)] shadow-sm"
          : config.variant === "ghost"
            ? "border border-white/30 bg-transparent text-white hover:bg-white/10"
            : config.variant === "link"
              ? "h-auto rounded-none bg-transparent px-0 text-current shadow-none"
              : "bg-[var(--cf-cherry)] text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] hover:bg-[var(--cf-cherry-2)]";

    return (
      <span className="group/editor-button relative inline-flex">
        <span className={`inline-flex h-12 items-center justify-center rounded-[14px] px-6 text-sm font-bold transition hover:-translate-y-px ${variantClass} ${config.className}`}>
          {config.icon}
          {renderEditableText(config.resource, config.labelPath, config.label)}
        </span>
        <span className="absolute left-0 top-[calc(100%+0.5rem)] z-50 hidden min-w-72 rounded-2xl border border-[#E6D6BD] bg-white p-3 text-sm shadow-2xl group-hover/editor-button:block">
          <label className="block font-bold text-[#0a2a24]">
            Text
            <input
              value={config.label}
              onFocus={() => setEditingKey(labelKey)}
              onChange={(event) => updateResourcePath(config.resource, config.labelPath, event.target.value)}
              className="mt-2 min-h-10 w-full rounded-xl border border-[#E6D6BD] px-3 text-sm text-[#14241F] outline-none focus:border-[#b07e33]"
            />
          </label>
          <label className="mt-3 block font-bold text-[#0a2a24]">
            Destination
            <input
              value={config.href}
              onFocus={() => setEditingKey(hrefKey)}
              onChange={(event) => updateResourcePath(config.resource, config.hrefPath, event.target.value)}
              className="mt-2 min-h-10 w-full rounded-xl border border-[#E6D6BD] px-3 text-sm text-[#14241F] outline-none focus:border-[#b07e33]"
            />
          </label>
          <a href={config.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-bold text-[#8A0F2E]">
            Open in new tab
          </a>
        </span>
        {isEditing ? <span className="sr-only">Editing button</span> : null}
      </span>
    );
  }

  function renderEditableImage(config: EditableImageConfig) {
    const { resource, path, value, label, children } = config;
    const key = pathKey(resource, path);
    const inputId = `image-${key}`.replace(/[^a-zA-Z0-9_-]/g, "-");

    return (
      <div
        className="group/editor-image relative h-full min-h-[inherit]"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void uploadImage(resource, path, event.dataTransfer.files?.[0] ?? null);
        }}
      >
        {children}
        <div className="absolute inset-0 z-40 hidden place-items-center bg-black/48 p-4 text-white backdrop-blur-[2px] group-hover/editor-image:grid">
          <div className="rounded-2xl border border-white/20 bg-[#061A17]/92 p-4 text-center shadow-2xl">
            <p className="text-sm font-black">{label}</p>
            <p className="mt-1 text-xs text-white/72">Drop an image here or replace it from your device.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <input
                ref={(node) => {
                  fileInputs.current[key] = node;
                }}
                id={inputId}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={(event) => {
                  void uploadImage(resource, path, event.target.files?.[0] ?? null);
                  event.currentTarget.value = "";
                }}
                className="sr-only"
              />
              <button type="button" onClick={() => fileInputs.current[key]?.click()} className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#061A17]">
                {uploadingKey === key ? "Uploading..." : "Replace"}
              </button>
              <button type="button" onClick={() => updateResourcePath(resource, path, "")} disabled={!value} className="rounded-full border border-white/30 px-4 py-2 text-xs font-black text-white disabled:opacity-45">
                Remove
              </button>
              {value ? (
                <a href={value} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-4 py-2 text-xs font-black text-white">
                  Preview
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function sectionAction(actions: EditableSectionActions | undefined, type: "up" | "down" | "hide" | "delete" | "duplicate") {
    if (!actions) return;
    const items = data[actions.resource];
    const current = items[actions.index];
    if (!current) return;

    if (type === "hide" || type === "delete") {
      updateResourcePath(actions.resource, [actions.index, "visible"], false);
      return;
    }

    if (type === "duplicate") {
      const clone = structuredClone(current) as JsonRecord;
      const suffix = `${Date.now()}`.slice(-5);
      if (typeof clone.id === "string") clone.id = `${clone.id}-copy-${suffix}`;
      if (typeof clone.slug === "string") clone.slug = `${clone.slug}-copy-${suffix}`;
      const next = [...items.slice(0, actions.index + 1), clone, ...items.slice(actions.index + 1)];
      setData((currentData) => ({ ...currentData, [actions.resource]: next }));
      markDirty(actions.resource);
      return;
    }

    const target = actions.index + (type === "up" ? -1 : 1);
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(actions.index, 1);
    next.splice(target, 0, moved);
    setData((currentData) => ({ ...currentData, [actions.resource]: next.map((item, index) => ({ ...item, order: index + 1 })) }));
    markDirty(actions.resource);
  }

  const editor: VisualEditorAdapter = {
    section: (id, label, children, actions) => (
      <section className="group/editor-section relative" data-editor-section={id}>
        <div className="pointer-events-none absolute left-3 top-3 z-50 hidden rounded-full border border-[#E6D6BD]/85 bg-white/92 px-2 py-1 shadow-xl backdrop-blur group-hover/editor-section:block">
          <div className="pointer-events-auto flex items-center gap-1 text-xs font-black text-[#0a2a24]">
            <span className="px-2">{label}</span>
            <button type="button" className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#f5ecdc]" title="Edit">✎</button>
            <button type="button" onClick={() => sectionAction(actions, "up")} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#f5ecdc]" title="Move up">↑</button>
            <button type="button" onClick={() => sectionAction(actions, "down")} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#f5ecdc]" title="Move down">↓</button>
            <button type="button" onClick={() => sectionAction(actions, "hide")} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#f5ecdc]" title="Hide">👁</button>
            <button type="button" onClick={() => sectionAction(actions, "duplicate")} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#f5ecdc]" title="Duplicate">⧉</button>
            <button type="button" onClick={() => sectionAction(actions, "delete")} className="grid h-7 w-7 place-items-center rounded-full hover:bg-red-50 hover:text-red-800" title="Delete">×</button>
          </div>
        </div>
        {children}
      </section>
    ),
    text: renderEditableText,
    button: renderEditableButton,
    image: renderEditableImage,
  };

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-[#e8ddcb] text-[#14241F]">
      <div className="grid min-h-screen lg:grid-cols-[14rem_1fr]">
        <aside className="border-r border-[#d9c7a8] bg-[#061A17] p-3 text-white lg:sticky lg:top-0 lg:h-screen">
          <button type="button" onClick={() => setView("home")} className="mb-4 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-white/10">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#b07e33] text-sm font-black text-white">CF</span>
            <span>
              <b className="block text-sm">Care & Flair</b>
              <small className="text-xs text-[#E6D6BD]">Visual editor</small>
            </span>
          </button>
          <nav className="grid gap-1" aria-label="Admin pages">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${view === item.id ? "bg-white text-[#061A17]" : "text-[#E6D6BD] hover:bg-white/10 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button type="button" onClick={() => void logout()} className="mt-5 w-full rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10">
            Logout
          </button>
        </aside>

        <section className="min-w-0">
          <div className="sticky top-0 z-[90] border-b border-[#d9c7a8] bg-[#fbf6ee]/96 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#746754]">Editing {view === "home" ? "Home" : sidebarItems.find((item) => item.id === view)?.label}</p>
                <p className="text-sm font-semibold text-[#0a2a24]">
                  {view === "home" ? "The homepage below is the editable preview. Double click text or hover sections/images." : view === "quote-requests" ? "Production quote inbox. Unchanged." : "This page is queued for a later phase."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(["desktop", "tablet", "mobile"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDevice(item)}
                    className={`rounded-full px-4 py-2 text-sm font-black capitalize ${device === item ? "bg-[#0a2a24] text-white" : "border border-[#d9c7a8] bg-white text-[#0a2a24]"}`}
                  >
                    {item}
                  </button>
                ))}
                <button type="button" onClick={() => setNotice("You are already previewing the draft in this canvas.")} className="rounded-full border border-[#d9c7a8] bg-white px-4 py-2 text-sm font-black text-[#0a2a24]">
                  Preview
                </button>
                <button type="button" onClick={() => void saveDraft()} disabled={!hasDirtyChanges || saveState === "saving"} className="rounded-full bg-[#0a2a24] px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#746754]">
                  {saveState === "saving" ? "Saving..." : "Save Draft"}
                </button>
                <button type="button" onClick={() => void publishDraft()} disabled={hasDirtyChanges || !hasExistingDraft || saveState === "saving"} className="rounded-full bg-[#b07e33] px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#746754]">
                  Publish
                </button>
                <button type="button" onClick={() => void discardDraft()} disabled={saveState === "saving" || (!hasExistingDraft && !hasDirtyChanges)} className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-black text-red-900 disabled:cursor-not-allowed disabled:opacity-45">
                  Discard
                </button>
              </div>
            </div>
            {notice ? <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-950">{notice}</p> : null}
            {error ? <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-950">{error}</p> : null}
          </div>

          {view === "quote-requests" ? (
            <div className="mx-auto max-w-7xl p-4 sm:p-6">
              <AdminQuoteRequests />
            </div>
          ) : null}

          {view === "home" ? (
            <div className="overflow-auto p-4 sm:p-6">
              <div className={`mx-auto overflow-hidden rounded-[18px] bg-[var(--cf-ivory)] shadow-2xl shadow-[#061A17]/18 transition-all duration-300 ${deviceClass}`}>
                <div className="min-h-screen overflow-x-clip bg-[var(--cf-ivory)] pb-16 text-[var(--cf-text)] sm:pb-0">
                  <Header content={content} editor={editor} />
                  <main>
                    <ApprovedHomePage content={content} editor={editor} />
                  </main>
                  <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/30 bg-[var(--cf-navy)]/96 p-3 shadow-[0_-16px_38px_rgba(6,29,51,0.22)] backdrop-blur sm:hidden">
                    <div className="grid grid-cols-2 gap-2">
                      {editor.button({
                        id: "mobile-whatsapp",
                        resource: "site-settings",
                        label: content.siteSettings.headerWhatsappLabel ?? "WhatsApp",
                        href: whatsappHref,
                        labelPath: [0, "headerWhatsappLabel"],
                        hrefPath: [0, "headerWhatsappHref"],
                        className: "w-full",
                        variant: "whatsapp",
                      })}
                      {quoteCtaIndex >= 0
                        ? editor.button({ id: quoteCta.id, resource: "cta-mappings", label: quoteCta.label, href: quoteCta.href, labelPath: [quoteCtaIndex, "label"], hrefPath: [quoteCtaIndex, "href"], className: "w-full", variant: "primary" })
                        : null}
                    </div>
                  </div>
                  <Footer content={content} editor={editor} />
                </div>
              </div>
            </div>
          ) : null}

          {view !== "home" && view !== "quote-requests" ? (
            <div className="grid min-h-[60vh] place-items-center p-6">
              <div className="max-w-lg rounded-3xl border border-[#d9c7a8] bg-white p-8 text-center shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#b07e33]">Later phase</p>
                <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0a2a24]">{sidebarItems.find((item) => item.id === view)?.label}</h1>
                <p className="mt-3 text-sm leading-6 text-[#746754]">Homepage visual editing is Phase 1. This page will be wired after approval.</p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
