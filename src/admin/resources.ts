export type AdminResourceKey =
  | "site-settings"
  | "quote-builder"
  | "interactive-tools"
  | "audience-modes"
  | "readiness-scores"
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
  | "homepage-transformations"
  | "cta-mappings";

export type AdminResource = {
  key: AdminResourceKey;
  label: string;
  fileName: string;
  kind?: "array" | "object";
  group: "Core" | "Homepage" | "Quote" | "Services" | "Proof" | "Local";
  description: string;
  publicPath?: string;
};

export const adminResources: AdminResource[] = [
  { key: "site-settings", label: "Site Settings", fileName: "site-settings.json", kind: "object", group: "Core", description: "Business details, navigation, footer links and global brand copy.", publicPath: "/" },
  { key: "cta-mappings", label: "CTA Buttons & Links", fileName: "cta-mappings.json", group: "Core", description: "Reusable button labels and destinations used across the site.", publicPath: "/" },
  { key: "homepage-sections", label: "Homepage Sections", fileName: "homepage-sections.json", group: "Homepage", description: "Hero copy, homepage section copy, order and visibility.", publicPath: "/" },
  { key: "homepage-transformations", label: "Homepage Transformations", fileName: "homepage-transformations.json", kind: "object", group: "Homepage", description: "Before/after carousel copy, badges and images.", publicPath: "/" },
  { key: "quote-builder", label: "Quote Builder", fileName: "quote-builder.json", kind: "object", group: "Quote", description: "Quote page copy, step labels, buttons and confirmation text.", publicPath: "/quote" },
  { key: "interactive-tools", label: "Interactive Tools", fileName: "interactive-tools.json", kind: "object", group: "Quote", description: "Interactive diagnosis tool copy and visibility.", publicPath: "/" },
  { key: "audience-modes", label: "Audience Modes", fileName: "audience-modes.json", group: "Quote", description: "Landlord, agent, homeowner and host modes for diagnosis.", publicPath: "/" },
  { key: "problem-categories", label: "Problem Categories", fileName: "problem-categories.json", group: "Quote", description: "Visible blockers, score weights and recommended actions.", publicPath: "/" },
  { key: "readiness-scores", label: "Readiness Scores", fileName: "readiness-scores.json", kind: "object", group: "Quote", description: "Score bands and rules behind the reset recommendation.", publicPath: "/" },
  { key: "property-categories", label: "Property Categories", fileName: "property-categories.json", group: "Quote", description: "Property category options in the quote builder.", publicPath: "/quote" },
  { key: "property-types", label: "Property Types", fileName: "property-types.json", group: "Quote", description: "Property type options tied to categories.", publicPath: "/quote" },
  { key: "pricing-matrix", label: "Pricing Matrix", fileName: "pricing-matrix.json", group: "Quote", description: "From-prices by package, category and property type.", publicPath: "/quote" },
  { key: "optional-upgrades", label: "Optional Upgrades", fileName: "optional-upgrades.json", group: "Quote", description: "Add-on services and base prices.", publicPath: "/quote" },
  { key: "packages", label: "Packages", fileName: "packages.json", group: "Services", description: "24h, 48h and 72h reset package cards.", publicPath: "/reset-packages" },
  { key: "solutions", label: "Solutions", fileName: "solutions.json", group: "Services", description: "Service cards for the visible problems Care & Flair fixes.", publicPath: "/services" },
  { key: "guardian-plans", label: "Guardian Plans", fileName: "guardian-plans.json", group: "Services", description: "Ongoing care plan copy and included checks.", publicPath: "/guardian-plans" },
  { key: "before-after", label: "Before/After", fileName: "before-after.json", group: "Proof", description: "Transformation cases, images and gallery text.", publicPath: "/before-after" },
  { key: "before-after-matches", label: "Before/After Matches", fileName: "before-after-matches.json", group: "Proof", description: "Rules that match diagnosis problems to case studies.", publicPath: "/" },
  { key: "faqs", label: "FAQs", fileName: "faqs.json", group: "Proof", description: "Frequently asked questions shown on public pages.", publicPath: "/" },
  { key: "testimonials", label: "Testimonials", fileName: "testimonials.json", group: "Proof", description: "Client proof entries, ready for future public display.", publicPath: "/" },
  { key: "areas", label: "Areas Served", fileName: "areas.json", group: "Local", description: "Local area cards and area landing pages.", publicPath: "/areas" },
];

export function getAdminResource(key: string): AdminResource | undefined {
  return adminResources.find((resource) => resource.key === key);
}
