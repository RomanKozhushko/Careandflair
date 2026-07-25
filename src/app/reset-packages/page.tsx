import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { MarketingLandingPage } from "@/marketing/MarketingLandingPage";
import { marketingPages } from "@/marketing/pageContent";

export const revalidate = 3600;

const page = marketingPages["reset-packages"];

export const metadata = pageMetadata({
  title: "24h, 48h & 72h Property Reset Packages | Care & Flair",
  description: page.description,
  path: "/reset-packages",
});

export default async function ResetPackagesPage() {
  const content = await getPublicContentBundle();
  return <MarketingLandingPage content={content} page={page} />;
}
