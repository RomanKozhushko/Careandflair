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
      <h2 className="text-2xl font-semibold tracking-tight text-[#0a2a24]">{config.stepLabels.servicePackage}</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((item) => {
          const selected = selectedId === item.id || selectedId === item.slug;
          return (
            <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-[1.5rem] border p-5 text-left transition ${selected ? "border-[#b07e33]/55 bg-[#E6D6BD]/55 shadow-sm" : "border-[#E6D6BD] bg-white hover:border-[#b07e33]/35"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-[#0a2a24]">{item.name}</p>
                  <p className="mt-1 text-sm font-medium brass-text">{item.slogan}</p>
                </div>
                <span className="rounded-full bg-[#0a2a24] px-3 py-1 text-xs font-bold text-white">{formatPounds(item.startingPrice)}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#746754]">{item.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
