import type { OptionalUpgrade, QuoteBuilderConfig } from "@/lib/types";
import { formatPounds } from "@/lib/pricing";

type UpgradesStepProps = {
  config: QuoteBuilderConfig;
  upgrades: OptionalUpgrade[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function UpgradesStep({ config, upgrades, selectedIds, onToggle }: UpgradesStepProps) {
  return (
    <section className="space-y-5">
      <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{config.stepLabels.optionalUpgrades}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {upgrades.map((item) => {
          const selected = selectedIds.includes(item.id);
          return (
            <button key={item.id} type="button" onClick={() => onToggle(item.id)} className={`rounded-[22px] border p-5 text-left transition hover:-translate-y-px ${selected ? "border-[var(--cf-cherry)] bg-[var(--cf-ivory)] shadow-[var(--cf-shadow-soft)]" : "border-[var(--cf-border)] bg-white hover:border-[var(--cf-gold-soft)]"}`}>
              <div className="flex items-start justify-between gap-4">
                <p className="font-extrabold text-[var(--cf-navy)]">{item.title}</p>
                <span className="rounded-full bg-[var(--cf-warm-card)] px-3 py-1 text-xs font-bold text-[var(--cf-navy)]">+{formatPounds(item.basePrice)}</span>
              </div>
              {item.description ? <p className="mt-3 text-sm leading-6 text-[var(--cf-text-soft)]">{item.description}</p> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
