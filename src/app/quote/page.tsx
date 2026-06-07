import { Suspense } from "react";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { quoteBuilderConfig } from "@/lib/content";
import { QuoteBuilder } from "@/quote-builder/QuoteBuilder";

export default function QuotePage() {
  const config = quoteBuilderConfig;

  return (
    <div className="min-h-screen bg-[#f5ecdc] text-[#14241F]">
      <Header />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="brand-label text-xs text-[#b07e33]">{config.page.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#0a2a24] sm:text-6xl">{config.page.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[#746754]">{config.page.intro}</p>
            <p className="mt-4 rounded-2xl border border-[#E6D6BD] bg-white/70 p-4 text-sm font-medium text-[#14241F] shadow-sm">{config.page.mockNotice}</p>
          </div>
          <Suspense fallback={null}>
            <QuoteBuilder />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
