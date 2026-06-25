import { cookies } from "next/headers";
import { AdminShell } from "@/admin/components/AdminShell";
import { adminAuthCookieName, getAdminPassword, isAdminTokenValid } from "@/admin/auth";
import { adminResources, type AdminResourceKey } from "@/admin/resources";
import { readResource, type JsonRecord } from "@/admin/jsonStore";
import type { AdminSection } from "@/admin/types";
import areas from "@/data/areas.json";
import beforeAfter from "@/data/before-after.json";
import faqs from "@/data/faqs.json";
import homepageSections from "@/data/homepage-sections.json";
import interactiveTools from "@/data/interactive-tools.json";
import packages from "@/data/packages.json";
import problemCategories from "@/data/problem-categories.json";
import quoteBuilder from "@/data/quote-builder.json";
import solutions from "@/data/solutions.json";
import AdminClient from "@/app/admin/AdminClient";
import AdminLogin from "@/app/admin/AdminLogin";

export const metadata = {
  title: "Admin MVP | Care & Flair",
  robots: { index: false, follow: false },
};

function countVisible(items: unknown): number {
  if (!Array.isArray(items)) return 0;
  return items.filter((item) => !item || typeof item !== "object" || !("visible" in item) || item.visible !== false).length;
}

const sections: AdminSection[] = [
  {
    id: "homepage-sections",
    label: "Homepage Sections",
    description: "Hero, trust, package, solution, FAQ and CTA content blocks used by the homepage.",
    fileName: "homepage-sections.json",
    status: "mock",
    items: homepageSections,
    previewFields: ["id", "type", "visible", "order", "headline"],
  },
  {
    id: "reset-packages",
    label: "Reset Packages",
    description: "Package cards, starting prices, inclusions and CTA mappings.",
    fileName: "packages.json",
    status: "mock",
    items: packages,
    previewFields: ["id", "name", "startingPrice", "visible", "order"],
  },
  {
    id: "flair-solutions",
    label: "What We Fix",
    description: "Service cards, visual assets, problem/solution/result copy and quote mappings.",
    fileName: "solutions.json",
    status: "mock",
    items: solutions,
    previewFields: ["id", "title", "category", "location", "visible"],
  },
  {
    id: "before-after",
    label: "Before / After",
    description: "Transformation case studies used by homepage preview and before/after route.",
    fileName: "before-after.json",
    status: "mock",
    items: beforeAfter,
    previewFields: ["id", "title", "category", "location", "featured"],
  },
  {
    id: "quote-builder",
    label: "Quote Builder",
    description: "Guided quote builder configuration, page copy, steps, actions and contact fields.",
    fileName: "quote-builder.json",
    status: "mock",
    items: quoteBuilder,
    previewFields: ["key", "value"],
  },
  {
    id: "interactive-tools",
    label: "Interactive Tools",
    description: "Build the Reset diagnosis configuration plus linked problem categories for future editable admin.",
    fileName: "interactive-tools.json + problem-categories.json",
    status: "mock",
    items: {
      interactiveTools,
      problemCategories,
    },
    previewFields: ["key", "value"],
  },
  {
    id: "faqs",
    label: "FAQs",
    description: "Frequently asked questions shown on the homepage.",
    fileName: "faqs.json",
    status: "mock",
    items: faqs,
    previewFields: ["id", "question", "visible", "order"],
  },
  {
    id: "areas-served",
    label: "Areas Served",
    description: "Local service area cards for Bromley, South East London, Kent and Medway positioning.",
    fileName: "areas.json",
    status: "mock",
    items: areas,
    previewFields: ["id", "name", "visible", "order"],
  },
  {
    id: "settings",
    label: "Settings",
    description: "Foundation slot for site settings, business details, SEO defaults and integration status in later phases.",
    fileName: "site-settings.json later",
    status: "coming-soon",
    items: [
      { id: "database", label: "Database connection", status: "Not connected", phase: "Future" },
      { id: "auth", label: "Production authentication", status: "Not connected", phase: "Future" },
      { id: "notifications", label: "CRM/email/Telegram notifications", status: "Not connected", phase: "Future" },
    ],
    previewFields: ["id", "label", "status", "phase"],
  },
];

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(adminAuthCookieName)?.value;
  const adminPassword = getAdminPassword();

  if (!isAdminTokenValid(authToken)) {
    return <AdminLogin passwordConfigured={Boolean(adminPassword)} />;
  }

  const editableData = Object.fromEntries(
    await Promise.all(adminResources.map(async (resource) => [resource.key, await readResource(resource.key)])),
  ) as Record<AdminResourceKey, JsonRecord[]>;

  return (
    <>
      <AdminShell
        sections={sections}
        stats={{
          packages: countVisible(packages),
          solutions: countVisible(solutions),
          beforeAfter: countVisible(beforeAfter),
          interactiveProblems: countVisible(problemCategories),
          faqs: countVisible(faqs),
        }}
        activeRoutes={["/", "/before-after", "/quote", "/admin"]}
      />
      <AdminClient initialData={editableData} />
    </>
  );
}
