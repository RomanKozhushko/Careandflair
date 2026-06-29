import { createContentHelpers, type ContentBundle } from "@/lib/content";
import type { Solution } from "@/lib/types";
import { CtaButton } from "@/ui/CtaButton";
import { VisualMedia } from "@/ui/VisualMedia";

type SolutionCardProps = {
  item: Solution;
  content?: ContentBundle;
};

export function SolutionCard({ item, content }: SolutionCardProps) {
  const { findCta } = createContentHelpers(content);
  const cta = findCta(item.ctaMappingId);
  const beforeImage = item.beforeImage ?? item.imageBefore;
  const afterImage = item.afterImage ?? item.imageAfter;

  return (
    <article className="soft-3d-card interactive-border group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--cf-line)] bg-white/82 shadow-sm transition">
      <div className="relative">
        <VisualMedia src={item.image} alt={item.imageAlt ?? `${item.title} property reset visual`} label={item.title} className="h-56" imageClassName="object-cover transition duration-500 sm:group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,47,40,0.78)] via-[rgba(8,47,40,0.08)] to-transparent" />
        <div className="lime-accent absolute inset-x-0 bottom-0 h-1 scale-x-0 transition duration-300 group-hover:scale-x-100" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[var(--cf-deep-green)]">{item.category}</span>
          {item.featured ? <span className="rounded-full bg-[var(--cf-mint)] px-3 py-1 text-xs font-semibold text-[var(--cf-deep-green)]">Common</span> : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-semibold text-[var(--cf-lime)]">{item.serviceType}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-[var(--cf-line)]">
        <div className="relative border-r border-[var(--cf-line)]">
          <VisualMedia src={beforeImage} alt={item.beforeAlt ?? `${item.title} before`} label={`${item.title} before`} className="h-24" sizes="240px" />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase text-[var(--cf-text)]">Before</span>
        </div>
        <div className="relative">
          <VisualMedia src={afterImage} alt={item.afterAlt ?? `${item.title} after`} label={`${item.title} after`} className="h-24" sizes="240px" />
          <span className="absolute bottom-2 left-2 rounded-full bg-[var(--cf-deep-green)]/90 px-2 py-1 text-[10px] font-bold uppercase text-white">After</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-[var(--cf-muted)]">{item.location}</p>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--cf-muted)]">
          <p><span className="font-semibold text-[var(--cf-deep-green)]">Client situation:</span> {item.problem}</p>
          <p><span className="font-semibold text-[var(--cf-deep-green)]">Reset:</span> {item.solution}</p>
          <p><span className="font-semibold text-[var(--cf-deep-green)]">Result:</span> {item.result}</p>
        </div>
        <div className="mt-auto pt-5"><CtaButton cta={cta} variant="secondary" className="w-full py-2.5" /></div>
      </div>
    </article>
  );
}
