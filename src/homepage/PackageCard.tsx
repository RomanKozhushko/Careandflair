import { findCta } from "@/lib/content";
import type { ServicePackage } from "@/lib/types";
import { CtaButton } from "@/ui/CtaButton";

type PackageCardProps = {
  item: ServicePackage;
};

export function PackageCard({ item }: PackageCardProps) {
  const cta = findCta(item.ctaMappingId);

  return (
    <article className={`flex h-full flex-col rounded-[1.75rem] border p-6 shadow-sm ${item.featured ? "border-[#d7b56d]/60 bg-slate-950 text-white shadow-2xl shadow-slate-950/20" : "border-slate-200 bg-white text-slate-950"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-bold uppercase tracking-[0.22em] ${item.featured ? "text-[#d7b56d]" : "text-[#9b7b35]"}`}>{item.slogan}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.name}</h3>
        </div>
        {item.featured ? <span className="rounded-full bg-[#d7b56d] px-3 py-1 text-xs font-bold text-slate-950">Recommended</span> : null}
      </div>
      <p className={`mt-4 text-sm leading-6 ${item.featured ? "text-slate-300" : "text-slate-600"}`}>{item.description}</p>
      <p className="mt-5 text-3xl font-bold">from £{item.startingPrice.toLocaleString("en-GB")}</p>
      <div className="mt-6 grid gap-3 text-sm">
        <p><span className="font-semibold">Problem:</span> {item.problem}</p>
        <p><span className="font-semibold">Solution:</span> {item.solution}</p>
        <p><span className="font-semibold">Result:</span> {item.result}</p>
      </div>
      <ul className={`mt-6 grid gap-2 text-sm ${item.featured ? "text-slate-200" : "text-slate-700"}`}>
        {item.includedServices.map((service) => <li key={service} className="flex gap-2"><span className="text-[#d7b56d]">•</span>{service}</li>)}
      </ul>
      <div className="mt-auto pt-6"><CtaButton cta={cta} variant={item.featured ? "primary" : "dark"} className="w-full" /></div>
    </article>
  );
}
