import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { VisualMedia } from "@/ui/VisualMedia";
import { visualCtaHref } from "@/before-after/cta";

type BeforeAfterCardProps = {
  item: BeforeAfterItem;
};

export function BeforeAfterCard({ item }: BeforeAfterCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10">
      <div className="grid h-56 grid-cols-2 overflow-hidden">
        <div className="relative border-r border-white/70">
          <VisualMedia src={item.beforeImage} alt={item.beforeAlt ?? `${item.title} before`} label={`${item.title} before`} className="h-full" sizes="(min-width: 1024px) 17vw, 50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-800">Before</span>
        </div>
        <div className="relative">
          <VisualMedia src={item.afterImage} alt={item.afterAlt ?? `${item.title} after`} label={`${item.title} after`} className="h-full" sizes="(min-width: 1024px) 17vw, 50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">After</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7b35]">{item.category} · {item.location}</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
        <p className="mt-2 text-sm font-semibold text-slate-500">{item.propertyType} · {item.serviceType}</p>
        <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <p><span className="font-semibold text-slate-950">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold text-slate-950">Result:</span> {item.result}</p>
        </div>
        <Link href={visualCtaHref(item.ctaPreset)} className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          {item.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
