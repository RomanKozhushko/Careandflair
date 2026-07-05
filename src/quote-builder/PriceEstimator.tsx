import { formatPounds } from "@/lib/pricing";
import type { QuoteBuilderConfig, QuoteEstimate } from "@/lib/types";

type PriceEstimatorProps = {
  config: QuoteBuilderConfig;
  estimate: QuoteEstimate;
};

export function PriceEstimator({ config, estimate }: PriceEstimatorProps) {
  return (
    <aside className="sticky top-6 rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
      <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold)]">{config.estimateLabel}</p>
      <p className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{formatPounds(estimate.totalFromPrice)}</p>
      <div className="mt-5 space-y-2 text-sm text-[var(--cf-text-soft)]">
        <div className="flex justify-between gap-4"><span>{config.priceBreakdownLabels.packageBase}</span><span className="font-semibold text-[var(--cf-navy)]">{formatPounds(estimate.packageFromPrice)}</span></div>
        <div className="flex justify-between gap-4"><span>{config.priceBreakdownLabels.upgrades}</span><span className="font-semibold text-[var(--cf-navy)]">{formatPounds(estimate.upgradesTotal)}</span></div>
      </div>
      <p className="mt-5 rounded-[18px] border border-[var(--cf-border)] bg-[var(--cf-ivory)] p-4 text-xs leading-6 text-[var(--cf-text-soft)]">{config.disclaimer}</p>
    </aside>
  );
}
