import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { VisualMedia } from "@/ui/VisualMedia";
import { visualCtaHref } from "@/before-after/cta";

type BeforeAfterCardProps = {
  item: BeforeAfterItem;
};

export function BeforeAfterCard({ item }: BeforeAfterCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#E8D9C3] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0B342C]/10">
      <div className="grid h-56 grid-cols-2 overflow-hidden">
        <div className="relative border-r border-[#F7F1E6]">
          <VisualMedia src={item.beforeImage} alt={item.beforeAlt ?? `${item.title} before`} label={`${item.title} before`} className="h-full" sizes="(min-width: 1024px) 17vw, 50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#17352F]">Before</span>
        </div>
        <div className="relative">
          <VisualMedia src={item.afterImage} alt={item.afterAlt ?? `${item.title} after`} label={`${item.title} after`} className="h-full" sizes="(min-width: 1024px) 17vw, 50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-[#0B342C]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">After</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="brand-label text-xs text-[#B08A3C]">{item.category} · {item.location}</p>
        <h3 className="mt-3 text-xl font-semibold text-[#0B342C]">{item.title}</h3>
        <p className="mt-2 text-sm font-semibold text-[#7A6B58]">{item.propertyType} · {item.serviceType}</p>
        <div className="mt-4 grid gap-2 text-sm leading-6 text-[#7A6B58]">
          <p><span className="font-semibold text-[#0B342C]">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold text-[#0B342C]">Result:</span> {item.result}</p>
        </div>
        <Link href={visualCtaHref(item.ctaPreset)} className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-[#0B342C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#17352F]">
          {item.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
