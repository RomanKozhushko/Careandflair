import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { MarketingLandingPage } from "@/marketing/MarketingLandingPage";
import { marketingPages } from "@/marketing/pageContent";

export const revalidate = 3600;

const page = marketingPages.contact;

export const metadata = pageMetadata({
  title: "Contact Care & Flair | Get a Property Reset Quote",
  description: page.description,
  path: "/contact",
});

export default async function ContactPage() {
  const content = await getPublicContentBundle();
  return <MarketingLandingPage content={content} page={page} />;
}
