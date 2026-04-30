import Image from "next/image";
import { findCta } from "@/lib/content";
import type { Solution } from "@/lib/types";
import { CtaButton } from "@/ui/CtaButton";

type SolutionCardProps = {
  item: Solution;
};

export function SolutionCard({ item }: SolutionCardProps) {
  const cta = findCta(item.ctaMappingId);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <Image src={item.image} alt={`${item.title} visual placeholder`} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-950">{item.category}</span>
          {item.featured ? <span className="rounded-full bg-[#d7b56d] px-3 py-1 text-xs font-bold text-slate-950">Featured</span> : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f8e7b0]">{item.serviceType}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-slate-200">
        <div className="relative h-24 overflow-hidden border-r border-slate-200">
          <Image src={item.imageBefore} alt={`${item.title} before placeholder`} fill className="object-cover" sizes="240px" />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-2 py-1 text-[10px] font-bold uppercase text-slate-700">Before</span>
        </div>
        <div className="relative h-24 overflow-hidden">
          <Image src={item.imageAfter} alt={`${item.title} after placeholder`} fill className="object-cover" sizes="240px" />
          <span className="absolute bottom-2 left-2 rounded-full bg-slate-950/85 px-2 py-1 text-[10px] font-bold uppercase text-white">After</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.location}</p>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
          <p><span className="font-semibold text-slate-950">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold text-slate-950">Solution:</span> {item.solution}</p>
          <p><span className="font-semibold text-slate-950">Result:</span> {item.result}</p>
        </div>
        <div className="mt-5"><CtaButton cta={cta} variant="dark" className="w-full py-2.5" /></div>
      </div>
    </article>
  );
}
