import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { VisualMedia } from "@/ui/VisualMedia";
import { visualCtaHref } from "@/before-after/cta";

type BeforeAfterCardProps = {
  item: BeforeAfterItem;
};

export function BeforeAfterCard({ item }: BeforeAfterCardProps) {
  return (
    <article className="soft-3d-card interactive-border flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--cf-line)] bg-white/84 shadow-sm">
      <div className="grid h-56 grid-cols-2 overflow-hidden">
        <div className="relative border-r border-[var(--cf-bg)]">
          <VisualMedia src={item.beforeImage} alt={item.beforeAlt ?? `${item.title} before`} label={`${item.title} before`} className="h-full" sizes="(min-width: 1024px) 17vw, 50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--cf-text)]">Before</span>
        </div>
        <div className="relative">
          <VisualMedia src={item.afterImage} alt={item.afterAlt ?? `${item.title} after`} label={`${item.title} after`} className="h-full" sizes="(min-width: 1024px) 17vw, 50vw" />
          <span className="absolute left-3 top-3 rounded-full bg-[var(--cf-deep-green)]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">After</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="brand-label text-xs brass-text">{item.category} · {item.location}</p>
        <h3 className="mt-3 text-xl font-semibold text-[var(--cf-deep-green)]">{item.title}</h3>
        <p className="mt-2 text-sm font-semibold text-[var(--cf-muted)]">{item.propertyType} · {item.serviceType}</p>
        <div className="mt-4 grid gap-2 text-sm leading-6 text-[var(--cf-muted)]">
          <p><span className="font-semibold text-[var(--cf-deep-green)]">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold text-[var(--cf-deep-green)]">Result:</span> {item.result}</p>
        </div>
        <Link href={visualCtaHref(item.ctaPreset)} className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-[rgba(8,47,40,0.18)] bg-white/72 px-5 py-3 text-sm font-semibold text-[var(--cf-deep-green)] transition hover:border-[var(--cf-lime)] hover:bg-white">
          {item.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
