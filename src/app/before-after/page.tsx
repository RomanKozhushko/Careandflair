import Link from "next/link";
import { BeforeAfterCarousel } from "@/before-after/BeforeAfterCarousel";
import { BeforeAfterGrid } from "@/before-after/BeforeAfterGrid";
import { FeaturedTransformation } from "@/before-after/FeaturedTransformation";
import { beforeAfterItems, visibleSorted } from "@/lib/content";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";

export default function BeforeAfterPage() {
  const items = visibleSorted(beforeAfterItems);
  const featuredItem = items.find((item) => item.featured) ?? items[0];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <main>
        <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7b56d]">Before & After Gallery</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Visual proof for property resets.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Browse transformation examples for bathrooms, carpets, exterior kerb appeal and hygiene-focused reset work across Bromley, South East London, Kent and Medway.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-slate-300">
                Every visual card is driven by `src/data/before-after.json`, with fallback media handling and quote-intent CTA routing.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8f5ef] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {featuredItem ? <FeaturedTransformation item={featuredItem} /> : null}
            <BeforeAfterCarousel items={items} />
            <BeforeAfterGrid items={items} />
            <div className="rounded-[2rem] bg-slate-950 p-8 text-center text-white">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d7b56d]">Need a similar result?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Get Quote for Similar Result</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">Send the property details, condition and deadline. We’ll help match the right reset package or visual upgrade.</p>
              <Link href="/quote" className="mt-6 inline-flex rounded-full bg-[#d7b56d] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e4c77f]">
                Get Quote for Similar Result
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
