import { formatPounds } from "@/lib/pricing";
import type { QuoteBuilderConfig, QuoteEstimate } from "@/lib/types";

type PriceEstimatorProps = {
  config: QuoteBuilderConfig;
  estimate: QuoteEstimate;
};

export function PriceEstimator({ config, estimate }: PriceEstimatorProps) {
  return (
    <aside className="sticky top-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b7b35]">{config.estimateLabel}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{formatPounds(estimate.totalFromPrice)}</p>
      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex justify-between gap-4"><span>{config.priceBreakdownLabels.packageBase}</span><span className="font-semibold text-slate-950">{formatPounds(estimate.packageFromPrice)}</span></div>
        <div className="flex justify-between gap-4"><span>{config.priceBreakdownLabels.upgrades}</span><span className="font-semibold text-slate-950">{formatPounds(estimate.upgradesTotal)}</span></div>
      </div>
      <p className="mt-5 rounded-2xl bg-[#f8f5ef] p-4 text-xs leading-6 text-slate-600">{config.disclaimer}</p>
    </aside>
  );
}
