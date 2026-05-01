import Link from "next/link";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { beforeAfterItems, findSection, visibleSorted } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function BeforeAfterPreview() {
  const section = findSection("before-after");
  const items = visibleSorted(beforeAfterItems).filter((item) => item.showOnHomepage);
  const strongestItem = items.find((item) => item.featured) ?? items[0];

  if (!strongestItem) return null;

  return (
    <section id="before-after" className="bg-[#f8f5ef] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader title={section.title} subtitle={section.subtitle} />
          <div className="rounded-3xl border border-amber-200 bg-white/80 px-5 py-4 text-sm font-semibold leading-6 text-amber-950 shadow-sm">
            Visual proof is a core conversion layer: every card is JSON-driven, responsive and protected by branded fallbacks.
          </div>
        </div>

        <div className="mt-10 grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <BeforeAfterSlider item={strongestItem} />
          <div className="p-2 sm:p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b7b35]">Strongest visual proof</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{strongestItem.title}</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{strongestItem.category} · {strongestItem.location}</p>
            <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-600">
              <p><span className="font-semibold text-slate-950">Problem:</span> {strongestItem.problem}</p>
              <p><span className="font-semibold text-slate-950">Solution:</span> {strongestItem.solution}</p>
              <p><span className="font-semibold text-slate-950">Result:</span> {strongestItem.result}</p>
            </div>
            <Link href="/before-after" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              View Before & After Gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
