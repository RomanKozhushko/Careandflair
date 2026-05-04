export type AdminResourceKey =
  | "packages"
  | "solutions"
  | "before-after"
  | "property-categories"
  | "property-types"
  | "pricing-matrix"
  | "optional-upgrades"
  | "guardian-plans"
  | "faqs"
  | "testimonials"
  | "areas"
  | "homepage-sections";

export type AdminResource = {
  key: AdminResourceKey;
  label: string;
  fileName: string;
};

export const adminResources: AdminResource[] = [
  { key: "packages", label: "Packages", fileName: "packages.json" },
  { key: "solutions", label: "Solutions", fileName: "solutions.json" },
  { key: "before-after", label: "Before/After", fileName: "before-after.json" },
  { key: "property-categories", label: "Property Categories", fileName: "property-categories.json" },
  { key: "property-types", label: "Property Types", fileName: "property-types.json" },
  { key: "pricing-matrix", label: "Pricing Matrix", fileName: "pricing-matrix.json" },
  { key: "optional-upgrades", label: "Optional Upgrades", fileName: "optional-upgrades.json" },
  { key: "guardian-plans", label: "Guardian Plans", fileName: "guardian-plans.json" },
  { key: "faqs", label: "FAQs", fileName: "faqs.json" },
  { key: "testimonials", label: "Testimonials", fileName: "testimonials.json" },
  { key: "areas", label: "Areas Served", fileName: "areas.json" },
  { key: "homepage-sections", label: "Homepage Sections", fileName: "homepage-sections.json" },
];

export function getAdminResource(key: string): AdminResource | undefined {
  return adminResources.find((resource) => resource.key === key);
}
