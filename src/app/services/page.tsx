import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { MarketingLandingPage } from "@/marketing/MarketingLandingPage";
import { marketingPages } from "@/marketing/pageContent";

export const revalidate = 3600;

const page = marketingPages.services;

export const metadata = pageMetadata({
  title: "Property Reset Services | Care & Flair Bromley",
  description: page.description,
  path: "/services",
});

export default async function ServicesPage() {
  const content = await getPublicContentBundle();
  return <MarketingLandingPage content={content} page={page} />;
}
