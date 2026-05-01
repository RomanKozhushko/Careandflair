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
  const featuredCount = items.filter((item) => item.featured).length;

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,181,109,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_24%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7b56d]">Before & After Gallery</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Visual proof for property resets.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Browse transformation examples for bathrooms, kitchens, mould recovery, carpets, kerb appeal, windows and full property resets across Bromley, South East London, Kent and Medway.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#gallery" className="inline-flex justify-center rounded-full bg-[#d7b56d] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e4c77f]">Browse Gallery</Link>
                  <Link href="/quote" className="inline-flex justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">Get Quote for Similar Result</Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-3xl font-bold text-white">{items.length}</p>
                  <p className="mt-1 text-sm text-slate-300">JSON-managed visual cases</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-3xl font-bold text-white">{featuredCount}</p>
                  <p className="mt-1 text-sm text-slate-300">Featured proof blocks</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="mt-1 text-sm text-slate-300">Hardcoded media paths in components</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-[#f8f5ef] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {featuredItem ? <FeaturedTransformation item={featuredItem} /> : null}
            <BeforeAfterCarousel items={items} />
            <BeforeAfterGrid items={items} />
            <div className="rounded-[2rem] bg-slate-950 p-8 text-center text-white lg:p-10">
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
