import { Suspense } from "react";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { getPublicContentBundle } from "@/lib/siteContent";
import { QuoteBuilder } from "@/quote-builder/QuoteBuilder";

export const dynamic = "force-dynamic";

export default async function QuotePage() {
  const content = await getPublicContentBundle();
  const config = content.quoteBuilderConfig;

  return (
    <div className="min-h-screen bg-[var(--cf-ivory)] text-[var(--cf-text)]">
      <Header content={content} />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold)]">{config.page.eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold tracking-[-0.035em] text-[var(--cf-navy)] sm:text-6xl">{config.page.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[var(--cf-text-soft)]">{config.page.intro}</p>
            <p className="mt-4 rounded-[22px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-4 text-sm font-semibold leading-6 text-[var(--cf-navy)] shadow-[var(--cf-shadow-soft)]">{config.page.mockNotice}</p>
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
