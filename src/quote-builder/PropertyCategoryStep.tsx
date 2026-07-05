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
      <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{config.stepLabels.propertyCategory}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((item) => (
          <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`rounded-[22px] border p-6 text-left text-lg font-extrabold transition hover:-translate-y-px ${selectedId === item.id ? "border-[var(--cf-cherry)] bg-[var(--cf-ivory)] text-[var(--cf-navy)] shadow-[var(--cf-shadow-soft)]" : "border-[var(--cf-border)] bg-white text-[var(--cf-navy)] hover:border-[var(--cf-gold-soft)]"}`}>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
