import type { QuoteBuilderConfig, ServicePackage } from "@/lib/types";
import { formatPounds } from "@/lib/pricing";

type PackageStepProps = {
  config: QuoteBuilderConfig;
  packages: ServicePackage[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function PackageStep({ config, packages, selectedId, onSelect }: PackageStepProps) {
  return (
    <section className="space-y-5">
      <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{config.stepLabels.servicePackage}</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((item) => {
          const selected = selectedId === item.id || selectedId === item.slug;
          return (
            <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-[22px] border p-5 text-left transition hover:-translate-y-px ${selected ? "border-[var(--cf-cherry)] bg-[var(--cf-ivory)] shadow-[var(--cf-shadow-soft)]" : "border-[var(--cf-border)] bg-white hover:border-[var(--cf-gold-soft)]"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-extrabold text-[var(--cf-navy)]">{item.name}</p>
                  <p className="mt-1 text-sm font-bold text-[var(--cf-gold)]">{item.slogan}</p>
                </div>
                <span className="rounded-full bg-[var(--cf-navy)] px-3 py-1 text-xs font-bold text-white">{formatPounds(item.startingPrice)}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--cf-text-soft)]">{item.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
