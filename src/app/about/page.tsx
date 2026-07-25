import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { MarketingLandingPage } from "@/marketing/MarketingLandingPage";
import { marketingPages } from "@/marketing/pageContent";

export const revalidate = 3600;

const page = marketingPages.about;

export const metadata = pageMetadata({
  title: "About Care & Flair | Property Reset Specialist",
  description: page.description,
  path: "/about",
});

export default async function AboutPage() {
  const content = await getPublicContentBundle();
  return <MarketingLandingPage content={content} page={page} />;
}
