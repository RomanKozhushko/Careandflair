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
    <article className={`premium-depth-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-sm ${item.featured ? "border-[#B99345]/70 bg-[#0B342C] text-[#F7F1E6] lg:shadow-2xl lg:shadow-[#0B342C]/20" : "border-[#E8D9C3] bg-white text-[#0B342C]"}`}>
      <div className="relative">
        <VisualMedia src={item.image} alt={`${item.name} property reset package visual`} label={item.visualLabel ?? item.name} className="h-44" imageClassName="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B342C]/80 via-[#0B342C]/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="brand-label text-xs text-[#F7DFA6]">{item.slogan}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.name}</h3>
          </div>
          {item.featured ? <span className="shrink-0 rounded-full bg-[#B99345] px-3 py-1 text-xs font-bold text-white">Recommended</span> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className={`text-sm leading-6 ${item.featured ? "text-[#E8D9C3]" : "text-[#7A6B58]"}`}>{item.description}</p>
        <p className="mt-5 text-3xl font-bold">from £{item.startingPrice.toLocaleString("en-GB")}</p>
        <div className={`mt-5 h-px ${item.featured ? "bg-[#B99345]/55" : "bg-[#E8D9C3]"}`} />
        <div className={`mt-5 grid gap-3 text-sm ${item.featured ? "text-[#F7F1E6]" : "text-[#17352F]"}`}>
          <p><span className="font-semibold">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold">Solution:</span> {item.solution}</p>
          <p><span className="font-semibold">Result:</span> {item.result}</p>
        </div>

        {item.proofDetails?.length ? (
          <div className={`mt-5 rounded-2xl border p-4 ${item.featured ? "border-[#B99345]/30 bg-white/[0.06]" : "border-[#E8D9C3] bg-[#F7F1E6]"}`}>
            <p className={`brand-label text-xs ${item.featured ? "text-[#B99345]" : "text-[#B08A3C]"}`}>Proof details</p>
            <ul className={`mt-3 grid gap-2 text-sm ${item.featured ? "text-[#E8D9C3]" : "text-[#7A6B58]"}`}>
              {item.proofDetails.map((detail) => <li key={detail} className="flex gap-2"><span className="text-[#B99345]">—</span>{detail}</li>)}
            </ul>
          </div>
        ) : null}

        <ul className={`mt-6 grid gap-2 text-sm ${item.featured ? "text-[#E8D9C3]" : "text-[#7A6B58]"}`}>
          {item.includedServices.map((service) => <li key={service} className="flex gap-2"><span className="text-[#B99345]">—</span>{service}</li>)}
        </ul>
        <div className="mt-auto pt-6"><CtaButton cta={cta} variant={item.featured ? "primary" : "dark"} className="w-full" /></div>
      </div>
    </article>
  );
}
