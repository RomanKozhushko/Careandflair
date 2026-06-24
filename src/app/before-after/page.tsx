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
        <section className="relative overflow-hidden bg-[#0a2a24] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(176,126,51,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.055),transparent_24%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="brand-label text-xs brass-text">Before and after examples</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">See the kinds of problems we fix.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#E6D6BD]">Bathrooms that look neglected, carpets with stains or smells, dirty windows and tired entrances can stop a property feeling ready. These examples show the type of visible reset we quote for.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#gallery" className="inline-flex justify-center rounded-full brass-fill px-6 py-3 text-sm font-semibold text-[#061A17] transition hover:brightness-105">See examples</Link>
                  <Link href="/quote" className="inline-flex justify-center rounded-full border border-[#b07e33]/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Get a quote</Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-3xl border border-[#b07e33]/20 bg-white/[0.045] p-5">
                  <p className="text-3xl font-bold text-white">{items.length}</p>
                  <p className="mt-1 text-sm text-[#E6D6BD]">Property examples</p>
                </div>
                <div className="rounded-3xl border border-[#b07e33]/20 bg-white/[0.045] p-5">
                  <p className="text-3xl font-bold text-white">{featuredCount}</p>
                  <p className="mt-1 text-sm text-[#E6D6BD]">Common problem types</p>
                </div>
                <div className="rounded-3xl border border-[#b07e33]/20 bg-white/[0.045] p-5">
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="mt-1 text-sm text-[#E6D6BD]">Hardcoded media paths</p>
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
            <div className="rounded-[2rem] border border-[#b07e33]/18 bg-[#061A17] p-8 text-center text-white lg:p-10">
              <p className="brand-label text-xs brass-text">Need this sorted quickly?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Get a quote for your property</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#E6D6BD]">Send the property details, condition, photos and deadline. We will match the right reset package and quote the practical work.</p>
              <Link href="/quote" className="mt-6 inline-flex rounded-full brass-fill px-6 py-3 text-sm font-semibold text-[#061A17] transition hover:brightness-105">
                Get a quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
