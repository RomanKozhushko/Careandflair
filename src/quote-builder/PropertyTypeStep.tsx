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
      <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{config.stepLabels.propertyType}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-[18px] border px-5 py-4 text-left font-bold transition hover:-translate-y-px ${selectedId === item.id ? "border-[var(--cf-cherry)] bg-[var(--cf-ivory)] text-[var(--cf-navy)] shadow-[var(--cf-shadow-soft)]" : "border-[var(--cf-border)] bg-white text-[var(--cf-navy)] hover:border-[var(--cf-gold-soft)]"}`}>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
