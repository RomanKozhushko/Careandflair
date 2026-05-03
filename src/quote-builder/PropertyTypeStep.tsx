import type { PropertyType, QuoteBuilderConfig } from "@/lib/types";

type PropertyTypeStepProps = {
  config: QuoteBuilderConfig;
  propertyTypes: PropertyType[];
  categoryId?: string;
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function PropertyTypeStep({ config, propertyTypes, categoryId, selectedId, onSelect }: PropertyTypeStepProps) {
  const items = propertyTypes.filter((item) => item.categoryId === categoryId);

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{config.stepLabels.propertyType}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-2xl border px-5 py-4 text-left font-semibold transition ${selectedId === item.id ? "border-[#d7b56d] bg-[#fff8e7] text-slate-950" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"}`}>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
