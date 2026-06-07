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
      <h2 className="text-2xl font-semibold tracking-tight text-[#0a2a24]">{config.stepLabels.propertyCategory}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-[1.5rem] border p-6 text-left text-lg font-semibold transition ${selectedId === item.id ? "border-[#b07e33]/55 bg-[#E6D6BD]/55 text-[#0a2a24]" : "border-[#E6D6BD] bg-white text-[#14241F] hover:border-[#b07e33]/35"}`}>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
