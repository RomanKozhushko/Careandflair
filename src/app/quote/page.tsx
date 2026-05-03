import { Suspense } from "react";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { quoteBuilderConfig } from "@/lib/content";
import { QuoteBuilder } from "@/quote-builder/QuoteBuilder";

export default function QuotePage() {
  const config = quoteBuilderConfig;

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-slate-950">
      <Header />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#9b7b35]">{config.page.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl">{config.page.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{config.page.intro}</p>
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">{config.page.mockNotice}</p>
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
