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
      <h2 className="text-2xl font-semibold tracking-tight text-[#0a2a24]">{config.stepLabels.propertyType}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-2xl border px-5 py-4 text-left font-semibold transition ${selectedId === item.id ? "border-[#b07e33]/55 bg-[#E6D6BD]/55 text-[#0a2a24]" : "border-[#E6D6BD] bg-white text-[#14241F] hover:border-[#b07e33]/35"}`}>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
