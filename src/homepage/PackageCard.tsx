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
    <article className={`soft-3d-card interactive-border group flex h-full flex-col overflow-hidden rounded-xl border bg-white/86 text-[var(--cf-deep-green)] shadow-sm ${item.featured ? "border-[rgba(183,232,106,0.9)] ring-2 ring-[rgba(183,232,106,0.28)]" : "border-[var(--cf-line)]"}`}>
      <div className="relative">
        <VisualMedia src={item.image} alt={`${item.name} property reset package visual`} label={item.visualLabel ?? item.name} className="h-44" imageClassName="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,47,40,0.78)] via-[rgba(8,47,40,0.08)] to-transparent" />
        <div className={`absolute inset-x-0 top-0 h-1 ${item.featured ? "lime-accent" : "bg-[var(--cf-brass-soft)]"}`} />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="brand-label text-xs text-[var(--cf-lime)]">{item.slogan}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.name}</h3>
          </div>
          {item.featured ? <span className="shrink-0 rounded-full bg-[var(--cf-lime)] px-3 py-1 text-xs font-semibold text-[var(--cf-deep-green)]">Recommended</span> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-6 text-[var(--cf-muted)]">{item.description}</p>
        <p className="mt-5 text-4xl font-bold tracking-tight">from £{item.startingPrice.toLocaleString("en-GB")}</p>
        <div className="mt-5 h-px bg-[var(--cf-line)]" />
        <div className="mt-5 grid gap-3 text-sm text-[var(--cf-text)]">
          <p><span className="font-semibold">Problem:</span> {item.problem}</p>
          <p><span className="font-semibold">Solution:</span> {item.solution}</p>
          <p><span className="font-semibold">Result:</span> {item.result}</p>
        </div>

        {item.proofDetails?.length ? (
          <div className="mt-5 rounded-xl border border-[var(--cf-line)] bg-[var(--cf-bg-soft)] p-4">
            <p className="text-xs font-semibold text-[var(--cf-muted)]">Useful to know</p>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--cf-muted)]">
              {item.proofDetails.map((detail) => <li key={detail} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cf-lime)]" />{detail}</li>)}
            </ul>
          </div>
        ) : null}

        <ul className="mt-6 grid gap-2 text-sm text-[var(--cf-muted)]">
          {item.includedServices.map((service) => <li key={service} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cf-brass-soft)]" />{service}</li>)}
        </ul>
        <div className="mt-auto pt-6"><CtaButton cta={cta} variant={item.featured ? "primary" : "secondary"} className="w-full" /></div>
      </div>
    </article>
  );
}
