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
      <h2 className="text-2xl font-semibold tracking-tight text-[#0a2a24]">{config.stepLabels.optionalUpgrades}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {upgrades.map((item) => {
          const selected = selectedIds.includes(item.id);
          return (
            <button key={item.id} type="button" onClick={() => onToggle(item.id)} className={`rounded-[1.5rem] border p-5 text-left transition ${selected ? "border-[#b07e33]/55 bg-[#E6D6BD]/55" : "border-[#E6D6BD] bg-white hover:border-[#b07e33]/35"}`}>
              <div className="flex items-start justify-between gap-4">
                <p className="font-semibold text-[#0a2a24]">{item.title}</p>
                <span className="rounded-full bg-[#E6D6BD]/70 px-3 py-1 text-xs font-bold text-[#14241F]">+{formatPounds(item.basePrice)}</span>
              </div>
              {item.description ? <p className="mt-3 text-sm leading-6 text-[#746754]">{item.description}</p> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
