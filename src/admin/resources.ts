export type AdminResourceKey =
  | "site-settings"
  | "quote-builder"
  | "interactive-tools"
  | "audience-modes"
  | "packages"
  | "solutions"
  | "before-after"
  | "before-after-matches"
  | "problem-categories"
  | "property-categories"
  | "property-types"
  | "pricing-matrix"
  | "optional-upgrades"
  | "guardian-plans"
  | "faqs"
  | "testimonials"
  | "areas"
  | "homepage-sections"
  | "cta-mappings";

export type AdminResource = {
  key: AdminResourceKey;
  label: string;
  fileName: string;
  kind?: "array" | "object";
};

export const adminResources: AdminResource[] = [
  { key: "site-settings", label: "Site Settings", fileName: "site-settings.json", kind: "object" },
  { key: "homepage-sections", label: "Homepage Sections", fileName: "homepage-sections.json" },
  { key: "quote-builder", label: "Quote Builder", fileName: "quote-builder.json", kind: "object" },
  { key: "interactive-tools", label: "Interactive Tools", fileName: "interactive-tools.json", kind: "object" },
  { key: "cta-mappings", label: "CTA Buttons & Links", fileName: "cta-mappings.json" },
  { key: "audience-modes", label: "Audience Modes", fileName: "audience-modes.json" },
  { key: "packages", label: "Packages", fileName: "packages.json" },
  { key: "solutions", label: "Solutions", fileName: "solutions.json" },
  { key: "before-after", label: "Before/After", fileName: "before-after.json" },
  { key: "before-after-matches", label: "Before/After Matches", fileName: "before-after-matches.json" },
  { key: "problem-categories", label: "Problem Categories", fileName: "problem-categories.json" },
  { key: "property-categories", label: "Property Categories", fileName: "property-categories.json" },
  { key: "property-types", label: "Property Types", fileName: "property-types.json" },
  { key: "pricing-matrix", label: "Pricing Matrix", fileName: "pricing-matrix.json" },
  { key: "optional-upgrades", label: "Optional Upgrades", fileName: "optional-upgrades.json" },
  { key: "guardian-plans", label: "Guardian Plans", fileName: "guardian-plans.json" },
  { key: "faqs", label: "FAQs", fileName: "faqs.json" },
  { key: "testimonials", label: "Testimonials", fileName: "testimonials.json" },
  { key: "areas", label: "Areas Served", fileName: "areas.json" },
];

export function getAdminResource(key: string): AdminResource | undefined {
  return adminResources.find((resource) => resource.key === key);
}
