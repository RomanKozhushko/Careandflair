import Image from "next/image";
import Link from "next/link";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { createContentHelpers } from "@/lib/content";
import { getPublicContentBundle } from "@/lib/siteContent";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Before & After Property Reset Results | Care & Flair",
  description:
    "Before and after property reset examples for bathrooms, mould, carpets, driveways and rental presentation across Bromley, South East London, Kent, Medway and Rochester.",
  path: "/before-after",
});

export default async function BeforeAfterPage() {
  const content = await getPublicContentBundle();
  const { beforeAfterItems, visibleSorted } = createContentHelpers(content);
  const items = visibleSorted(beforeAfterItems).filter((item) => item.beforeImage || item.afterImage);

  return (
    <div className="min-h-screen bg-[var(--cf-ivory)] text-[var(--cf-text)]">
      <Header content={content} />
      <main>
        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-[28px] border border-[var(--cf-border-dark)] bg-[linear-gradient(135deg,var(--cf-navy),var(--cf-navy-2))] p-6 text-white shadow-[var(--cf-shadow-navy)] lg:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold-soft)]">Before & after</p>
            <h1 className="mt-5 max-w-3xl font-serif text-[42px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl">
              Visible proof before someone walks in.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-white/78">
              Property reset examples for landlords, agents, sellers, new homeowners and hosts. The goal is practical readiness: cleaner, fresher and easier to trust.
            </p>
            <Link href="/quote" className="mt-7 inline-flex h-12 items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-6 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              Get a quote for a similar result
            </Link>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[26px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] shadow-[var(--cf-shadow-soft)]">
              <div className="grid min-h-[320px] grid-cols-2 bg-[var(--cf-warm-card)]">
                <div className="relative min-h-[320px]">
                  <Image src={item.beforeImage || item.image || "/images/generated/bathroom-before.jpg"} alt={item.beforeAlt || `${item.title} before`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-extrabold uppercase text-[var(--cf-navy)]">Before</span>
                </div>
                <div className="relative min-h-[320px]">
                  <Image src={item.afterImage || item.image || "/images/generated/bathroom-after.jpg"} alt={item.afterAlt || `${item.title} after`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  <span className="absolute right-4 top-4 rounded-full bg-[var(--cf-navy)] px-3 py-1 text-xs font-extrabold uppercase text-white">After</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold)]">{item.location} / {item.category}</p>
                <h2 className="mt-3 text-2xl font-extrabold text-[var(--cf-navy)]">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--cf-text-soft)]"><span className="font-extrabold text-[var(--cf-navy)]">Problem:</span> {item.problem}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--cf-text-soft)]"><span className="font-extrabold text-[var(--cf-navy)]">Result:</span> {item.result}</p>
                <Link href={`/quote?preset=${item.ctaPreset}`} className="mt-5 inline-flex h-11 items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-5 text-sm font-extrabold text-white">
                  {item.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer content={content} />
    </div>
  );
}
