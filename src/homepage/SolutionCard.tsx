import { findCta } from "@/lib/content";
import type { Solution } from "@/lib/types";
import { CtaButton } from "@/ui/CtaButton";
import { VisualMedia } from "@/ui/VisualMedia";

type SolutionCardProps = {
  item: Solution;
};

export function SolutionCard({ item }: SolutionCardProps) {
  const cta = findCta(item.ctaMappingId);
  const beforeImage = item.beforeImage ?? item.imageBefore;
  const afterImage = item.afterImage ?? item.imageAfter;

  return (
    <article className="premium-depth-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#E8D9C3] bg-white shadow-sm transition sm:hover:-translate-y-1 sm:hover:shadow-2xl sm:hover:shadow-[#0B342C]/10">
      <div className="relative">
        <VisualMedia src={item.image} alt={item.imageAlt ?? `${item.title} property reset visual`} label={item.title} className="h-56" imageClassName="object-cover transition duration-500 sm:group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B342C]/78 via-[#0B342C]/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#F7F1E6]/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#0B342C]">{item.category}</span>
          {item.featured ? <span className="rounded-full bg-[#B99345] px-3 py-1 text-xs font-bold text-white">Featured</span> : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="brand-label text-xs text-[#F7DFA6]">{item.serviceType}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-[#E8D9C3]">
        <div className="relative border-r border-[#E8D9C3]">
          <VisualMedia src={beforeImage} alt={item.beforeAlt ?? `${item.title} before`} label={`${item.title} before`} className="h-24" sizes="240px" />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase text-[#17352F]">Before</span>
        </div>
        <div className="relative">
          <VisualMedia src={afterImage} alt={item.afterAlt ?? `${item.title} after`} label={`${item.title} after`} className="h-24" sizes="240px" />
          <span className="absolute bottom-2 left-2 rounded-full bg-[#0B342C]/90 px-2 py-1 text-[10px] font-bold uppercase text-white">After</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="brand-label text-xs text-[#B08A3C]">{item.location}</p>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[#7A6B58]">
          <p><span className="font-semibold text-[#0B342C]">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold text-[#0B342C]">Solution:</span> {item.solution}</p>
          <p><span className="font-semibold text-[#0B342C]">Result:</span> {item.result}</p>
        </div>
        <div className="mt-auto pt-5"><CtaButton cta={cta} variant="dark" className="w-full py-2.5" /></div>
      </div>
    </article>
  );
}
