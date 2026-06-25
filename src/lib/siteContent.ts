import { readResource, type JsonRecord } from "@/admin/jsonStore";
import { getAdminResource, type AdminResourceKey } from "@/admin/resources";
import { fallbackContent, type ContentBundle } from "@/lib/content";
import { formatSupabaseAdminError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Area,
  BeforeAfterItem,
  CtaMapping,
  FaqItem,
  GuardianPlan,
  HomepageSection,
  OptionalUpgrade,
  PricingMatrixRow,
  PropertyCategory,
  PropertyType,
  QuoteBuilderConfig,
  ServicePackage,
  SiteSettings,
  Solution,
} from "@/lib/types";

export type ContentSource = "supabase" | "json" | "json-fallback";

export type ReadResourceResult = {
  items: JsonRecord[];
  source: ContentSource;
  configured: boolean;
  message?: string;
};

type SaveResourceResult = {
  items: JsonRecord[];
  source: "supabase";
};

const supabaseConfigMessage =
  "Supabase content storage is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then create the site_content table.";

function normalizeToItems(resourceKey: AdminResourceKey, content: unknown): JsonRecord[] {
  const resource = getAdminResource(resourceKey);

  if (resource?.kind === "object") {
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      throw new Error(`Supabase content for ${resourceKey} must be a JSON object.`);
    }
    return [content as JsonRecord];
  }

  if (!Array.isArray(content)) {
    throw new Error(`Supabase content for ${resourceKey} must be a JSON array.`);
  }

  return content as JsonRecord[];
}

function normalizeForSave(resourceKey: AdminResourceKey, items: JsonRecord[]): JsonRecord | JsonRecord[] {
  const resource = getAdminResource(resourceKey);
  return resource?.kind === "object" ? (items[0] ?? {}) : items;
}

async function readFallback(resourceKey: AdminResourceKey, source: ContentSource, message?: string): Promise<ReadResourceResult> {
  return {
    items: await readResource(resourceKey),
    source,
    configured: source !== "json",
    message,
  };
}

export async function readEditableResource(resourceKey: AdminResourceKey): Promise<ReadResourceResult> {
  const supabase = getSupabaseServerClient();

  if (supabase.error) {
    return readFallback(resourceKey, "json", supabaseConfigMessage);
  }

  const client = supabase.client;
  if (!client) {
    return readFallback(resourceKey, "json", supabaseConfigMessage);
  }

  const { data, error } = await client
    .from("site_content")
    .select("content")
    .eq("resource_key", resourceKey)
    .maybeSingle();

  if (error) {
    return readFallback(resourceKey, "json-fallback", formatSupabaseAdminError(error.message, "site_content"));
  }

  if (!data?.content) {
    return readFallback(resourceKey, "json-fallback");
  }

  return {
    items: normalizeToItems(resourceKey, data.content),
    source: "supabase",
    configured: true,
  };
}

export async function saveEditableResource(resourceKey: AdminResourceKey, items: JsonRecord[]): Promise<SaveResourceResult> {
  const supabase = getSupabaseServerClient();

  if (supabase.error) {
    throw new Error(supabaseConfigMessage);
  }

  const client = supabase.client;
  if (!client) {
    throw new Error(supabaseConfigMessage);
  }

  const content = normalizeForSave(resourceKey, items);
  const { data, error } = await client
    .from("site_content")
    .upsert({ resource_key: resourceKey, content }, { onConflict: "resource_key" })
    .select("content")
    .single();

  if (error) {
    throw new Error(formatSupabaseAdminError(error.message, "site_content"));
  }

  return {
    items: normalizeToItems(resourceKey, data.content),
    source: "supabase",
  };
}

async function readPublicValue<T>(resourceKey: AdminResourceKey, fallback: T): Promise<T> {
  const supabase = getSupabaseServerClient();

  if (supabase.error) {
    return fallback;
  }

  const client = supabase.client;
  if (!client) {
    return fallback;
  }

  const { data, error } = await client
    .from("site_content")
    .select("content")
    .eq("resource_key", resourceKey)
    .maybeSingle();

  if (error || !data?.content) {
    return fallback;
  }

  return data.content as T;
}

export async function getPublicContentBundle(): Promise<ContentBundle> {
  const [
    siteSettings,
    ctaMappings,
    homepageSections,
    servicePackages,
    propertyCategories,
    propertyTypes,
    optionalUpgrades,
    pricingMatrix,
    quoteBuilderConfig,
    solutions,
    guardianPlans,
    beforeAfterItems,
    areas,
    faqs,
  ] = await Promise.all([
    readPublicValue<SiteSettings>("site-settings", fallbackContent.siteSettings),
    readPublicValue<CtaMapping[]>("cta-mappings", fallbackContent.ctaMappings),
    readPublicValue<HomepageSection[]>("homepage-sections", fallbackContent.homepageSections),
    readPublicValue<ServicePackage[]>("packages", fallbackContent.servicePackages),
    readPublicValue<PropertyCategory[]>("property-categories", fallbackContent.propertyCategories),
    readPublicValue<PropertyType[]>("property-types", fallbackContent.propertyTypes),
    readPublicValue<OptionalUpgrade[]>("optional-upgrades", fallbackContent.optionalUpgrades),
    readPublicValue<PricingMatrixRow[]>("pricing-matrix", fallbackContent.pricingMatrix),
    readPublicValue<QuoteBuilderConfig>("quote-builder", fallbackContent.quoteBuilderConfig),
    readPublicValue<Solution[]>("solutions", fallbackContent.solutions),
    readPublicValue<GuardianPlan[]>("guardian-plans", fallbackContent.guardianPlans),
    readPublicValue<BeforeAfterItem[]>("before-after", fallbackContent.beforeAfterItems),
    readPublicValue<Area[]>("areas", fallbackContent.areas),
    readPublicValue<FaqItem[]>("faqs", fallbackContent.faqs),
  ]);

  return {
    siteSettings,
    ctaMappings,
    homepageSections,
    servicePackages,
    propertyCategories,
    propertyTypes,
    optionalUpgrades,
    pricingMatrix,
    quoteBuilderConfig,
    solutions,
    guardianPlans,
    beforeAfterItems,
    areas,
    faqs,
  };
}
