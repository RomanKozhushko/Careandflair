import type { PropertyCategory, QuoteBuilderConfig } from "@/lib/types";

type PropertyCategoryStepProps = {
  config: QuoteBuilderConfig;
  categories: PropertyCategory[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function PropertyCategoryStep({ config, categories, selectedId, onSelect }: PropertyCategoryStepProps) {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{config.stepLabels.propertyCategory}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-[1.5rem] border p-6 text-left text-lg font-semibold transition ${selectedId === item.id ? "border-[#d7b56d] bg-[#fff8e7] text-slate-950" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"}`}>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
