import { createContentHelpers, type ContentBundle } from "@/lib/content";
import type { ServicePackage } from "@/lib/types";
import { CtaButton } from "@/ui/CtaButton";
import { VisualMedia } from "@/ui/VisualMedia";

type PackageCardProps = {
  item: ServicePackage;
  content?: ContentBundle;
};

export function PackageCard({ item, content }: PackageCardProps) {
  const { findCta } = createContentHelpers(content);
  const cta = findCta(item.ctaMappingId);

  return (
    <article className={`premium-depth-card group flex h-full flex-col overflow-hidden rounded-xl border bg-white text-[#0a2a24] shadow-sm ${item.featured ? "border-[#b07e33]/55 ring-1 ring-[#b07e33]/20" : "border-[#E6D6BD]"}`}>
      <div className="relative">
        <VisualMedia src={item.image} alt={`${item.name} property reset package visual`} label={item.visualLabel ?? item.name} className="h-44" imageClassName="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a24]/70 via-[#0a2a24]/5 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="brand-label text-xs text-[#F7DFA6]">{item.slogan}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.name}</h3>
          </div>
          {item.featured ? <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0a2a24]">Popular</span> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-6 text-[#746754]">{item.description}</p>
        <p className="mt-5 text-3xl font-bold">from £{item.startingPrice.toLocaleString("en-GB")}</p>
        <div className="mt-5 h-px bg-[#E6D6BD]" />
        <div className="mt-5 grid gap-3 text-sm text-[#14241F]">
          <p><span className="font-semibold">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold">Solution:</span> {item.solution}</p>
          <p><span className="font-semibold">Result:</span> {item.result}</p>
        </div>

        {item.proofDetails?.length ? (
          <div className="mt-5 rounded-xl border border-[#E6D6BD] bg-[#fbf6ee] p-4">
            <p className="text-xs font-semibold text-[#746754]">Useful to know</p>
            <ul className="mt-3 grid gap-2 text-sm text-[#746754]">
              {item.proofDetails.map((detail) => <li key={detail} className="flex gap-2"><span className="text-[#b07e33]">-</span>{detail}</li>)}
            </ul>
          </div>
        ) : null}

        <ul className="mt-6 grid gap-2 text-sm text-[#746754]">
          {item.includedServices.map((service) => <li key={service} className="flex gap-2"><span className="text-[#b07e33]">-</span>{service}</li>)}
        </ul>
        <div className="mt-auto pt-6"><CtaButton cta={cta} variant={item.featured ? "primary" : "secondary"} className="w-full" /></div>
      </div>
    </article>
  );
}
