import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { MarketingLandingPage } from "@/marketing/MarketingLandingPage";
import type { MarketingPageContent } from "@/marketing/pageContent";

export const revalidate = 3600;

const page: MarketingPageContent = {
  slug: "areas",
  title: "Property reset areas across Bromley, South East London, Kent, Medway and Rochester",
  description:
    "Care & Flair covers property reset, cleaning and minor maintenance work across Bromley, South East London, Kent, Medway and Rochester.",
  eyebrow: "Areas served",
  intro:
    "Our core operating area is focused on Bromley, South East London, Kent, Medway and Rochester. Send the postcode with photos so we can confirm availability and travel before quoting.",
  primaryCta: "Check your postcode",
  secondaryCta: "Get a quote",
  bullets: ["Bromley", "South East London", "Kent", "Medway", "Rochester"],
  sections: [
    {
      title: "Local property reset support",
      text: "We focus on properties that need visible readiness work before viewings, handover, sale photos, move-in or Airbnb launch/recovery.",
    },
    {
      title: "Quote from postcode and photos",
      text: "Availability depends on location, urgency, access, parking, materials and selected scope.",
    },
  ],
};

export const metadata = pageMetadata({
  title: "Areas Served | Care & Flair Property Reset",
  description: page.description,
  path: "/areas",
});

export default async function AreasPage() {
  const content = await getPublicContentBundle();
  return <MarketingLandingPage content={content} page={page} showAreaLinks />;
}
