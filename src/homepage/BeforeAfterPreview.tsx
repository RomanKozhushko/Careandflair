import Link from "next/link";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { visualCtaHref } from "@/before-after/cta";
import { beforeAfterItems, findSection, visibleSorted } from "@/lib/content";
import { ParallaxLayer } from "@/ui/ParallaxLayer";
import { SectionHeader } from "@/ui/SectionHeader";

export function BeforeAfterPreview() {
  const section = findSection("before-after");
  const items = visibleSorted(beforeAfterItems).filter((item) => item.showOnHomepage);
  const strongestItem = items.find((item) => item.featured) ?? items[0];

  if (!strongestItem) return null;

  return (
    <section id="before-after" className="bg-[#f8f5ef] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeader title={section.title} subtitle={section.subtitle} />
          <ParallaxLayer depth={5} className="rounded-3xl border border-amber-200 bg-white/80 px-5 py-4 text-sm font-semibold leading-6 text-amber-950 shadow-sm">
            Strong visual proof block: slider, result story and direct quote CTA, all powered by `before-after.json`.
          </ParallaxLayer>
        </div>

        <ParallaxLayer depth={10} scaleDepth={0.004} perspective className="mt-8 grid gap-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/5 sm:p-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <BeforeAfterSlider item={strongestItem} />
          <ParallaxLayer depth={-5} className="p-2 sm:p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b7b35]">Strongest visual proof</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{strongestItem.title}</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{strongestItem.category} · {strongestItem.location}</p>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-600">
              <p><span className="font-semibold text-slate-950">Problem:</span> {strongestItem.problem}</p>
              <p><span className="font-semibold text-slate-950">Solution:</span> {strongestItem.solution}</p>
              <p><span className="font-semibold text-slate-950">Result:</span> {strongestItem.result}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/before-after" className="inline-flex justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                View Transformations
              </Link>
              <Link href={visualCtaHref(strongestItem.ctaPreset)} className="inline-flex justify-center rounded-full bg-[#d7b56d] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e4c77f]">
                Get Quote for Similar Result
              </Link>
            </div>
          </ParallaxLayer>
        </ParallaxLayer>
      </div>
    </section>
  );
}
