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
    <article className={`premium-depth-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-sm ${item.featured ? "border-[#b07e33]/70 bg-[#0a2a24] text-[#f5ecdc] lg:shadow-2xl lg:shadow-[#0a2a24]/20" : "border-[#E6D6BD] bg-white text-[#0a2a24]"}`}>
      <div className="relative">
        <VisualMedia src={item.image} alt={`${item.name} property reset package visual`} label={item.visualLabel ?? item.name} className="h-44" imageClassName="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a24]/80 via-[#0a2a24]/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="brand-label text-xs text-[#F7DFA6]">{item.slogan}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.name}</h3>
          </div>
          {item.featured ? <span className="shrink-0 rounded-full brass-fill px-3 py-1 text-xs font-bold text-white">Recommended</span> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className={`text-sm leading-6 ${item.featured ? "text-[#E6D6BD]" : "text-[#746754]"}`}>{item.description}</p>
        <p className="mt-5 text-3xl font-bold">from £{item.startingPrice.toLocaleString("en-GB")}</p>
        <div className={`mt-5 h-px ${item.featured ? "bg-[#b07e33]/55" : "bg-[#E6D6BD]"}`} />
        <div className={`mt-5 grid gap-3 text-sm ${item.featured ? "text-[#f5ecdc]" : "text-[#14241F]"}`}>
          <p><span className="font-semibold">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold">Solution:</span> {item.solution}</p>
          <p><span className="font-semibold">Result:</span> {item.result}</p>
        </div>

        {item.proofDetails?.length ? (
          <div className={`mt-5 rounded-2xl border p-4 ${item.featured ? "border-[#b07e33]/30 bg-white/[0.06]" : "border-[#E6D6BD] bg-[#f5ecdc]"}`}>
            <p className={`brand-label text-xs ${item.featured ? "brass-text" : "brass-text"}`}>Proof details</p>
            <ul className={`mt-3 grid gap-2 text-sm ${item.featured ? "text-[#E6D6BD]" : "text-[#746754]"}`}>
              {item.proofDetails.map((detail) => <li key={detail} className="flex gap-2"><span className="brass-text">—</span>{detail}</li>)}
            </ul>
          </div>
        ) : null}

        <ul className={`mt-6 grid gap-2 text-sm ${item.featured ? "text-[#E6D6BD]" : "text-[#746754]"}`}>
          {item.includedServices.map((service) => <li key={service} className="flex gap-2"><span className="brass-text">—</span>{service}</li>)}
        </ul>
        <div className="mt-auto pt-6"><CtaButton cta={cta} variant={item.featured ? "primary" : "dark"} className="w-full" /></div>
      </div>
    </article>
  );
}
