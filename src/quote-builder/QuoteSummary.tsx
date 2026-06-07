import { formatPounds } from "@/lib/pricing";
import type { OptionalUpgrade, PropertyCategory, PropertyType, QuoteBuilderConfig, QuoteContactDetails, QuoteEstimate, ServicePackage } from "@/lib/types";

type QuoteSummaryProps = {
  config: QuoteBuilderConfig;
  selectedPackage?: ServicePackage;
  selectedCategory?: PropertyCategory;
  selectedPropertyType?: PropertyType;
  selectedUpgrades: OptionalUpgrade[];
  estimate: QuoteEstimate;
  contact?: QuoteContactDetails;
  success?: boolean;
};

export function QuoteSummary({ config, selectedPackage, selectedCategory, selectedPropertyType, selectedUpgrades, estimate, contact, success = false }: QuoteSummaryProps) {
  return (
    <section className="rounded-[1.75rem] border border-[#E6D6BD] bg-white/82 p-6 shadow-sm">
      {success ? (
        <div className="mb-5 rounded-2xl border border-[#b07e33]/25 bg-[#E6D6BD]/55 p-4 text-sm text-[#14241F]">
          <p className="font-bold text-[#0a2a24]">{config.successTitle}</p>
          <p className="mt-1 leading-6">{config.successMessage}</p>
        </div>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-[#0a2a24]">{config.summaryTitle}</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-[#E6D6BD] pb-3"><dt className="text-[#746754]">{config.stepLabels.servicePackage}</dt><dd className="text-right font-semibold text-[#14241F]">{selectedPackage?.name ?? config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 border-b border-[#E6D6BD] pb-3"><dt className="text-[#746754]">{config.stepLabels.propertyCategory}</dt><dd className="text-right font-semibold text-[#14241F]">{selectedCategory?.name ?? config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 border-b border-[#E6D6BD] pb-3"><dt className="text-[#746754]">{config.stepLabels.propertyType}</dt><dd className="text-right font-semibold text-[#14241F]">{selectedPropertyType?.name ?? config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 border-b border-[#E6D6BD] pb-3"><dt className="text-[#746754]">{config.stepLabels.optionalUpgrades}</dt><dd className="text-right font-semibold text-[#14241F]">{selectedUpgrades.length ? selectedUpgrades.map((item) => item.title).join(", ") : config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 pt-2 text-base"><dt className="font-semibold text-[#0a2a24]">{config.estimateLabel}</dt><dd className="font-bold text-[#0a2a24]">{formatPounds(estimate.totalFromPrice)}</dd></div>
      </dl>
      {contact ? (
        <div className="mt-6 rounded-2xl border border-[#E6D6BD] bg-[#f5ecdc] p-4 text-sm leading-6 text-[#14241F]">
          <p className="font-semibold text-[#0a2a24]">{contact.name}</p>
          <p>{contact.phone} · {contact.email}</p>
          <p>{contact.postcode}</p>
          {contact.message ? <p className="mt-2">{contact.message}</p> : null}
        </div>
      ) : null}
      <p className="mt-5 text-xs leading-6 text-[#746754]">{config.disclaimer}</p>
    </section>
  );
}
