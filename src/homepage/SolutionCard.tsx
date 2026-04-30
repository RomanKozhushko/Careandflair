import { findCta } from "@/lib/content";
import type { Solution } from "@/lib/types";
import { CtaButton } from "@/ui/CtaButton";

type SolutionCardProps = {
  item: Solution;
};

export function SolutionCard({ item }: SolutionCardProps) {
  const cta = findCta(item.ctaMappingId);

  return (
    <article className={`rounded-[1.5rem] border p-5 ${item.featured ? "border-[#d7b56d]/40 bg-[#fff8e7]" : "border-slate-200 bg-white"}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b7b35]">{item.category}</p>
        {item.featured ? <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">Featured</span> : null}
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
      <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
        <p><span className="font-semibold text-slate-950">Problem:</span> {item.problem}</p>
        <p><span className="font-semibold text-slate-950">Solution:</span> {item.solution}</p>
        <p><span className="font-semibold text-slate-950">Result:</span> {item.result}</p>
      </div>
      <div className="mt-5"><CtaButton cta={cta} variant="dark" className="w-full py-2.5" /></div>
    </article>
  );
}
