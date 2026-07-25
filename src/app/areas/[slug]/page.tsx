import { notFound } from "next/navigation";
import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { MarketingLandingPage } from "@/marketing/MarketingLandingPage";
import { areaPages } from "@/marketing/pageContent";

export const revalidate = 3600;

export function generateStaticParams() {
  return Object.keys(areaPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = areaPages[slug];
  if (!page) return {};

  return pageMetadata({
    title: `${page.title} | Care & Flair`,
    description: page.description,
    path: `/areas/${slug}`,
  });
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = areaPages[slug];
  if (!page) notFound();

  const content = await getPublicContentBundle();
  return <MarketingLandingPage content={content} page={page} />;
}
