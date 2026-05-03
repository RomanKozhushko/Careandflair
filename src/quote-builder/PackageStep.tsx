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
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{config.stepLabels.servicePackage}</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((item) => {
          const selected = selectedId === item.id || selectedId === item.slug;
          return (
            <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-[1.5rem] border p-5 text-left transition ${selected ? "border-[#d7b56d] bg-[#fff8e7] shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                  <p className="mt-1 text-sm font-medium text-[#9b7b35]">{item.slogan}</p>
                </div>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">{formatPounds(item.startingPrice)}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
