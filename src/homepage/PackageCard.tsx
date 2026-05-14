import { findCta } from "@/lib/content";
import type { ServicePackage } from "@/lib/types";
import { CtaButton } from "@/ui/CtaButton";
import { VisualMedia } from "@/ui/VisualMedia";

type PackageCardProps = {
  item: ServicePackage;
};

export function PackageCard({ item }: PackageCardProps) {
  const cta = findCta(item.ctaMappingId);

  return (
    <article className={`premium-depth-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-sm ${item.featured ? "border-[#d7b56d]/60 bg-slate-950 text-white lg:shadow-2xl lg:shadow-slate-950/20" : "border-slate-200 bg-white text-slate-950"}`}>
      <div className="relative">
        <VisualMedia src={item.image} alt={`${item.name} property reset package visual`} label={item.visualLabel ?? item.name} className="h-44" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f8e7b0]">{item.slogan}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.name}</h3>
          </div>
          {item.featured ? <span className="shrink-0 rounded-full bg-[#d7b56d] px-3 py-1 text-xs font-bold text-slate-950">Recommended</span> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className={`text-sm leading-6 ${item.featured ? "text-slate-300" : "text-slate-600"}`}>{item.description}</p>
        <p className="mt-5 text-3xl font-bold">from £{item.startingPrice.toLocaleString("en-GB")}</p>
        <div className="mt-6 grid gap-3 text-sm">
          <p><span className="font-semibold">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold">Solution:</span> {item.solution}</p>
          <p><span className="font-semibold">Result:</span> {item.result}</p>
        </div>

        {item.proofDetails?.length ? (
          <div className={`mt-5 rounded-2xl border p-4 ${item.featured ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"}`}>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${item.featured ? "text-[#d7b56d]" : "text-[#9b7b35]"}`}>Proof details</p>
            <ul className={`mt-3 grid gap-2 text-sm ${item.featured ? "text-slate-200" : "text-slate-700"}`}>
              {item.proofDetails.map((detail) => <li key={detail} className="flex gap-2"><span className="text-[#d7b56d]">•</span>{detail}</li>)}
            </ul>
          </div>
        ) : null}

        <ul className={`mt-6 grid gap-2 text-sm ${item.featured ? "text-slate-200" : "text-slate-700"}`}>
          {item.includedServices.map((service) => <li key={service} className="flex gap-2"><span className="text-[#d7b56d]">•</span>{service}</li>)}
        </ul>
        <div className="mt-auto pt-6"><CtaButton cta={cta} variant={item.featured ? "primary" : "dark"} className="w-full" /></div>
      </div>
    </article>
  );
}
