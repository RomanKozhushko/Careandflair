import { formatPounds } from "@/lib/pricing";
import type { QuoteBuilderConfig, QuoteEstimate } from "@/lib/types";

type PriceEstimatorProps = {
  config: QuoteBuilderConfig;
  estimate: QuoteEstimate;
};

export function PriceEstimator({ config, estimate }: PriceEstimatorProps) {
  return (
    <aside className="sticky top-6 rounded-[1.75rem] border border-[#E6D6BD] bg-white/82 p-6 shadow-sm">
      <p className="brand-label text-xs text-[#b07e33]">{config.estimateLabel}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0a2a24]">{formatPounds(estimate.totalFromPrice)}</p>
      <div className="mt-5 space-y-2 text-sm text-[#746754]">
        <div className="flex justify-between gap-4"><span>{config.priceBreakdownLabels.packageBase}</span><span className="font-semibold text-[#14241F]">{formatPounds(estimate.packageFromPrice)}</span></div>
        <div className="flex justify-between gap-4"><span>{config.priceBreakdownLabels.upgrades}</span><span className="font-semibold text-[#14241F]">{formatPounds(estimate.upgradesTotal)}</span></div>
      </div>
      <p className="mt-5 rounded-2xl border border-[#E6D6BD] bg-[#f5ecdc] p-4 text-xs leading-6 text-[#746754]">{config.disclaimer}</p>
    </aside>
  );
}
