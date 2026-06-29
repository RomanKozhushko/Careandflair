import Link from "next/link";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { visualCtaHref } from "@/before-after/cta";
import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function BeforeAfterPreview({ content }: { content?: ContentBundle }) {
  const { beforeAfterItems, findSection, visibleSorted } = createContentHelpers(content);
  const section = findSection("before-after");
  const items = visibleSorted(beforeAfterItems).filter((item) => item.showOnHomepage).slice(0, 3);
  const strongestItem = items.find((item) => item.featured) ?? items[0];

  if (!strongestItem) return null;

  return (
    <section id="before-after" className="bg-[var(--cf-bg-soft)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeader eyebrow="Before someone books a viewing" title={section.title} subtitle={section.subtitle} />
          <div className="light-glass-panel rounded-3xl px-5 py-4 text-sm font-semibold leading-6 text-[var(--cf-text)]">
            Use these as examples of the visible issues we can quote for: bathrooms, carpets, windows, entrances and tired rooms.
          </div>
        </div>

        <div className="glass-card mt-8 grid gap-8 overflow-hidden rounded-[2rem] p-4 sm:p-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <BeforeAfterSlider item={strongestItem} />
          <div className="p-2 sm:p-4">
            <p className="brand-label text-xs brass-text">Common property problem</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--cf-deep-green)]">{strongestItem.title}</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--cf-muted)]">{strongestItem.category} · {strongestItem.location}</p>
            <div className="mt-5 inline-flex rounded-full bg-[var(--cf-mint)] px-4 py-2 text-sm font-semibold text-[var(--cf-deep-green)]">Visible result before viewing</div>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-[var(--cf-muted)]">
              <p><span className="font-semibold text-[var(--cf-deep-green)]">Problem:</span> {strongestItem.problem}</p>
              <p><span className="font-semibold text-[var(--cf-deep-green)]">Solution:</span> {strongestItem.solution}</p>
              <p><span className="font-semibold text-[var(--cf-deep-green)]">Result:</span> {strongestItem.result}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/before-after" className="inline-flex justify-center rounded-full border border-[rgba(8,47,40,0.18)] bg-white/72 px-6 py-3 text-sm font-semibold text-[var(--cf-deep-green)] transition hover:border-[var(--cf-lime)] hover:bg-white">
                See before and after
              </Link>
              <Link href={visualCtaHref(strongestItem.ctaPreset)} className="inline-flex justify-center rounded-full bg-[var(--cf-deep-green)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(8,47,40,0.18)] transition hover:bg-[var(--cf-green-2)]">
                Get a quote for this
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
