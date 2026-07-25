import { Suspense } from "react";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";
import { QuoteBuilder } from "@/quote-builder/QuoteBuilder";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Get a Property Reset Quote | Care & Flair",
  description:
    "Request a clear quote for 24h, 48h or 72h property reset work across Bromley, South East London, Kent, Medway and Rochester.",
  path: "/quote",
});

export default async function QuotePage() {
  const content = await getPublicContentBundle();
  const config = content.quoteBuilderConfig;

  return (
    <div className="min-h-screen bg-[var(--cf-ivory)] text-[var(--cf-text)]">
      <Header content={content} />
      <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-7 grid gap-6 lg:grid-cols-[0.86fr_1fr] lg:items-end">
            <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold)]">{config.page.eyebrow}</p>
              <h1 className="mt-4 font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--cf-navy)] sm:text-6xl">{config.page.title}</h1>
              <p className="mt-5 text-base leading-7 text-[var(--cf-text-soft)] sm:text-lg sm:leading-8">{config.page.intro}</p>
            </div>
            <div className="grid gap-3 rounded-[22px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-4 text-sm font-semibold leading-6 text-[var(--cf-navy)] shadow-[var(--cf-shadow-soft)] sm:grid-cols-3 lg:mb-1">
              <span>Clear quote before work</span>
              <span>Photo proof after</span>
              <span>WhatsApp updates</span>
            </div>
          </div>
          <Suspense fallback={null}>
            <QuoteBuilder content={content} />
          </Suspense>
        </div>
      </main>
      <Footer content={content} />
    </div>
  );
}
