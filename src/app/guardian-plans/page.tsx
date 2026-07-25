import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { MarketingLandingPage } from "@/marketing/MarketingLandingPage";
import { marketingPages } from "@/marketing/pageContent";

export const revalidate = 3600;

const page = marketingPages["guardian-plans"];

export const metadata = pageMetadata({
  title: "Guardian Property Oversight Plans | Care & Flair",
  description: page.description,
  path: "/guardian-plans",
});

export default async function GuardianPlansPage() {
  const content = await getPublicContentBundle();
  return <MarketingLandingPage content={content} page={page} />;
}
