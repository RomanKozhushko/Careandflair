import areasData from "@/data/areas.json";
import beforeAfterData from "@/data/before-after.json";
import ctaMappingsData from "@/data/cta-mappings.json";
import faqsData from "@/data/faqs.json";
import guardianPlansData from "@/data/guardian-plans.json";
import homepageSectionsData from "@/data/homepage-sections.json";
import homepageTransformationsData from "@/data/homepage-transformations.json";
import optionalUpgradesData from "@/data/optional-upgrades.json";
import packagesData from "@/data/packages.json";
import pricingMatrixData from "@/data/pricing-matrix.json";
import propertyCategoriesData from "@/data/property-categories.json";
import propertyTypesData from "@/data/property-types.json";
import quoteBuilderData from "@/data/quote-builder.json";
import siteSettingsData from "@/data/site-settings.json";
import solutionsData from "@/data/solutions.json";
import type { Area, BeforeAfterItem, CtaMapping, FaqItem, GuardianPlan, HomepageSection, HomepageTransformationsContent, OptionalUpgrade, PricingMatrixRow, PropertyCategory, PropertyType, QuoteBuilderConfig, ServicePackage, SiteSettings, Solution, Visibility } from "@/lib/types";

export const siteSettings = siteSettingsData as SiteSettings;
export const ctaMappings = ctaMappingsData as CtaMapping[];
export const homepageSections = homepageSectionsData as HomepageSection[];
export const homepageTransformations = homepageTransformationsData as HomepageTransformationsContent;
export const servicePackages = packagesData as ServicePackage[];
export const propertyCategories = propertyCategoriesData as PropertyCategory[];
export const propertyTypes = propertyTypesData as PropertyType[];
export const optionalUpgrades = optionalUpgradesData as OptionalUpgrade[];
export const pricingMatrix = pricingMatrixData as PricingMatrixRow[];
export const quoteBuilderConfig = quoteBuilderData as QuoteBuilderConfig;
export const solutions = solutionsData as Solution[];
export const guardianPlans = guardianPlansData as GuardianPlan[];
export const beforeAfterItems = beforeAfterData as BeforeAfterItem[];
export const areas = areasData as Area[];
export const faqs = faqsData as FaqItem[];

export type ContentBundle = {
  siteSettings: SiteSettings;
  ctaMappings: CtaMapping[];
  homepageSections: HomepageSection[];
  homepageTransformations: HomepageTransformationsContent;
  servicePackages: ServicePackage[];
  propertyCategories: PropertyCategory[];
  propertyTypes: PropertyType[];
  optionalUpgrades: OptionalUpgrade[];
  pricingMatrix: PricingMatrixRow[];
  quoteBuilderConfig: QuoteBuilderConfig;
  solutions: Solution[];
  guardianPlans: GuardianPlan[];
  beforeAfterItems: BeforeAfterItem[];
  areas: Area[];
  faqs: FaqItem[];
};

export const fallbackContent: ContentBundle = {
  siteSettings,
  ctaMappings,
  homepageSections,
  homepageTransformations,
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

export function visibleSorted<T extends Visibility>(items: T[]): T[] {
  return items.filter((item) => item.visible).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function findCta(id?: string): CtaMapping | undefined {
  if (!id) return undefined;
  return ctaMappings.find((cta) => cta.id === id);
}

export function findSection(id: string): HomepageSection {
  const section = homepageSections.find((item) => item.id === id);
  if (!section) throw new Error(`Missing homepage section: ${id}`);
  return section;
}

export function createContentHelpers(content: ContentBundle = fallbackContent) {
  return {
    ...content,
    visibleSorted,
    findCta(id?: string): CtaMapping | undefined {
      if (!id) return undefined;
      return content.ctaMappings.find((cta) => cta.id === id);
    },
    findSection(id: string): HomepageSection {
      const section = content.homepageSections.find((item) => item.id === id);
      if (!section) throw new Error(`Missing homepage section: ${id}`);
      return section;
    },
  };
}
