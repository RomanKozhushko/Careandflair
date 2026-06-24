import Link from "next/link";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { visualCtaHref } from "@/before-after/cta";
import { beforeAfterItems, findSection, visibleSorted } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function BeforeAfterPreview() {
  const section = findSection("before-after");
  const items = visibleSorted(beforeAfterItems).filter((item) => item.showOnHomepage).slice(0, 3);
  const strongestItem = items.find((item) => item.featured) ?? items[0];

  if (!strongestItem) return null;

  return (
    <section id="before-after" className="bg-[#f5ecdc] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeader eyebrow="Before someone books a viewing" title={section.title} subtitle={section.subtitle} />
          <div className="rounded-3xl border border-[#b07e33]/30 bg-white/75 px-5 py-4 text-sm font-semibold leading-6 text-[#14241F] shadow-sm">
            Use these as examples of the visible issues we can quote for: bathrooms, carpets, windows, entrances and tired rooms.
          </div>
        </div>

        <div className="mt-8 grid gap-8 overflow-hidden rounded-[2rem] border border-[#E6D6BD] bg-white p-4 shadow-md shadow-[#0a2a24]/5 sm:p-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <BeforeAfterSlider item={strongestItem} />
          <div className="p-2 sm:p-4">
            <p className="brand-label text-xs brass-text">Common property problem</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a2a24]">{strongestItem.title}</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#746754]">{strongestItem.category} · {strongestItem.location}</p>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-[#746754]">
              <p><span className="font-semibold text-[#0a2a24]">Problem:</span> {strongestItem.problem}</p>
              <p><span className="font-semibold text-[#0a2a24]">Solution:</span> {strongestItem.solution}</p>
              <p><span className="font-semibold text-[#0a2a24]">Result:</span> {strongestItem.result}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/before-after" className="inline-flex justify-center rounded-full brass-fill px-6 py-3 text-sm font-semibold text-[#061A17] transition hover:brightness-105">
                See before and after
              </Link>
              <Link href={visualCtaHref(strongestItem.ctaPreset)} className="inline-flex justify-center rounded-full brass-fill px-6 py-3 text-sm font-semibold text-[#061A17] transition hover:brightness-105">
                Get a quote for this
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
