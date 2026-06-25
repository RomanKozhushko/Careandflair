import dynamic from "next/dynamic";
import Link from "next/link";
import { FeaturedTransformation } from "@/before-after/FeaturedTransformation";
import { beforeAfterItems, visibleSorted } from "@/lib/content";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";

const BeforeAfterCarousel = dynamic(() => import("@/before-after/BeforeAfterCarousel").then((mod) => mod.BeforeAfterCarousel), {
  loading: () => <section className="h-72 rounded-[2rem] bg-white/70" aria-label="Before and after carousel loading" />,
});

const BeforeAfterGrid = dynamic(() => import("@/before-after/BeforeAfterGrid").then((mod) => mod.BeforeAfterGrid), {
  loading: () => <section className="h-96 rounded-[2rem] bg-white/70" aria-label="Before and after grid loading" />,
});

export default function BeforeAfterPage() {
  const items = visibleSorted(beforeAfterItems);
  const featuredItem = items.find((item) => item.featured) ?? items[0];
  const featuredCount = items.filter((item) => item.featured).length;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5ecdc] text-[#14241F]">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[#E6D6BD] bg-[#fbf6ee] px-4 py-16 text-[#0a2a24] sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(176,126,51,0.08),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-[#746754]">Before and after examples</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">See the property problems we quote for.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#746754]">A tired bathroom, stained carpet, greasy kitchen, dirty frames or neglected entrance can stop a property feeling ready. These examples show the kind of visible issues we can quote for.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#gallery" className="inline-flex justify-center rounded-full border border-[#E6D6BD] bg-white px-6 py-3 text-sm font-semibold text-[#061A17] transition hover:border-[#b07e33]/55">See examples</Link>
                  <Link href="/quote" className="inline-flex justify-center rounded-full bg-[#0a2a24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#061A17]">Send photos for a quote</Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-xl border border-[#E6D6BD] bg-white p-5 shadow-sm">
                  <p className="text-3xl font-bold text-[#0a2a24]">{items.length}</p>
                  <p className="mt-1 text-sm text-[#746754]">Property examples</p>
                </div>
                <div className="rounded-xl border border-[#E6D6BD] bg-white p-5 shadow-sm">
                  <p className="text-3xl font-bold text-[#0a2a24]">{featuredCount}</p>
                  <p className="mt-1 text-sm text-[#746754]">Common problem types</p>
                </div>
                <div className="rounded-xl border border-[#E6D6BD] bg-white p-5 shadow-sm">
                  <p className="text-3xl font-bold text-[#0a2a24]">0</p>
                  <p className="mt-1 text-sm text-[#746754]">Hardcoded media paths</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-[#f5ecdc] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {featuredItem ? <FeaturedTransformation item={featuredItem} /> : null}
            <BeforeAfterCarousel items={items} />
            <BeforeAfterGrid items={items} />
            <div className="rounded-xl border border-[#E6D6BD] bg-white p-8 text-center text-[#0a2a24] shadow-sm lg:p-10">
              <p className="text-sm font-semibold text-[#746754]">Need this sorted quickly?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Make the property ready before the next step</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#746754]">Send the property details, photos, access notes and deadline. We will match the right reset option for viewing, move-in, sale photos or launch/recovery work.</p>
              <Link href="/quote" className="mt-6 inline-flex rounded-full bg-[#0a2a24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#061A17]">
                Send photos for a quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
