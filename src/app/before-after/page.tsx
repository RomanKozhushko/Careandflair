import dynamicImport from "next/dynamic";
import Link from "next/link";
import { FeaturedTransformation } from "@/before-after/FeaturedTransformation";
import { createContentHelpers } from "@/lib/content";
import { getPublicContentBundle } from "@/lib/siteContent";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";

const BeforeAfterCarousel = dynamicImport(() => import("@/before-after/BeforeAfterCarousel").then((mod) => mod.BeforeAfterCarousel), {
  loading: () => <section className="h-72 rounded-[2rem] bg-white/70" aria-label="Before and after carousel loading" />,
});

const BeforeAfterGrid = dynamicImport(() => import("@/before-after/BeforeAfterGrid").then((mod) => mod.BeforeAfterGrid), {
  loading: () => <section className="h-96 rounded-[2rem] bg-white/70" aria-label="Before and after grid loading" />,
});

export const dynamic = "force-dynamic";

export default async function BeforeAfterPage() {
  const content = await getPublicContentBundle();
  const { beforeAfterItems, visibleSorted } = createContentHelpers(content);
  const items = visibleSorted(beforeAfterItems);
  const featuredItem = items.find((item) => item.featured) ?? items[0];
  const featuredCount = items.filter((item) => item.featured).length;

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--cf-bg)] text-[var(--cf-text)]">
      <Header content={content} />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--cf-line)] bg-[var(--cf-bg-soft)] px-4 py-16 text-[var(--cf-deep-green)] sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,232,106,0.18),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-[var(--cf-muted)]">Before and after examples</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">See the property problems we quote for.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--cf-muted)]">A tired bathroom, stained carpet, greasy kitchen, dirty frames or neglected entrance can stop a property feeling ready. These examples show the kind of visible issues we can quote for.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="#gallery" className="inline-flex justify-center rounded-full border border-[rgba(8,47,40,0.18)] bg-white px-6 py-3 text-sm font-semibold text-[var(--cf-deep-green)] transition hover:border-[var(--cf-lime)]">See examples</Link>
                  <Link href="/quote" className="inline-flex justify-center rounded-full bg-[var(--cf-deep-green)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(8,47,40,0.18)] transition hover:bg-[var(--cf-green-2)]">Send photos for a quote</Link>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="light-glass-panel rounded-xl p-5">
                  <p className="text-3xl font-bold text-[var(--cf-deep-green)]">{items.length}</p>
                  <p className="mt-1 text-sm text-[var(--cf-muted)]">Property examples</p>
                </div>
                <div className="light-glass-panel rounded-xl p-5">
                  <p className="text-3xl font-bold text-[var(--cf-deep-green)]">{featuredCount}</p>
                  <p className="mt-1 text-sm text-[var(--cf-muted)]">Common problem types</p>
                </div>
                <div className="light-glass-panel rounded-xl p-5">
                  <p className="text-3xl font-bold text-[var(--cf-deep-green)]">0</p>
                  <p className="mt-1 text-sm text-[var(--cf-muted)]">Hardcoded media paths</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-[var(--cf-bg)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">
            {featuredItem ? <FeaturedTransformation item={featuredItem} /> : null}
            <BeforeAfterCarousel items={items} />
            <BeforeAfterGrid items={items} />
            <div className="light-glass-panel rounded-xl p-8 text-center text-[var(--cf-deep-green)] lg:p-10">
              <p className="text-sm font-semibold text-[var(--cf-muted)]">Need this sorted quickly?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Make the property ready before the next step</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--cf-muted)]">Send the property details, photos, access notes and deadline. We will match the right reset option for viewing, move-in, sale photos or launch/recovery work.</p>
              <Link href="/quote" className="mt-6 inline-flex rounded-full bg-[var(--cf-deep-green)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cf-green-2)]">
                Send photos for a quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer content={content} />
    </div>
  );
}
