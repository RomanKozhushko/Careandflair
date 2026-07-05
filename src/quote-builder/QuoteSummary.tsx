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
    <section className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
      {success ? (
        <div className="mb-5 rounded-[18px] border border-[var(--cf-gold-soft)] bg-[var(--cf-ivory)] p-4 text-sm text-[var(--cf-navy)]">
          <p className="font-bold text-[var(--cf-navy)]">{config.successTitle}</p>
          <p className="mt-1 leading-6">{config.successMessage}</p>
        </div>
      ) : null}
      <h2 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{config.summaryTitle}</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-[var(--cf-border)] pb-3"><dt className="text-[var(--cf-text-soft)]">{config.stepLabels.servicePackage}</dt><dd className="text-right font-semibold text-[var(--cf-navy)]">{selectedPackage?.name ?? config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 border-b border-[var(--cf-border)] pb-3"><dt className="text-[var(--cf-text-soft)]">{config.stepLabels.propertyCategory}</dt><dd className="text-right font-semibold text-[var(--cf-navy)]">{selectedCategory?.name ?? config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 border-b border-[var(--cf-border)] pb-3"><dt className="text-[var(--cf-text-soft)]">{config.stepLabels.propertyType}</dt><dd className="text-right font-semibold text-[var(--cf-navy)]">{selectedPropertyType?.name ?? config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 border-b border-[var(--cf-border)] pb-3"><dt className="text-[var(--cf-text-soft)]">{config.stepLabels.optionalUpgrades}</dt><dd className="text-right font-semibold text-[var(--cf-navy)]">{selectedUpgrades.length ? selectedUpgrades.map((item) => item.title).join(", ") : config.priceBreakdownLabels.notSelected}</dd></div>
        <div className="flex justify-between gap-4 pt-2 text-base"><dt className="font-semibold text-[var(--cf-navy)]">{config.estimateLabel}</dt><dd className="font-bold text-[var(--cf-navy)]">{formatPounds(estimate.totalFromPrice)}</dd></div>
      </dl>
      {contact ? (
        <div className="mt-6 rounded-[18px] border border-[var(--cf-border)] bg-[var(--cf-ivory)] p-4 text-sm leading-6 text-[var(--cf-navy)]">
          <p className="font-semibold text-[var(--cf-navy)]">{contact.name}</p>
          <p>{contact.phone} · {contact.email}</p>
          <p>{contact.postcode}</p>
          {contact.message ? <p className="mt-2">{contact.message}</p> : null}
        </div>
      ) : null}
      <p className="mt-5 text-xs leading-6 text-[var(--cf-text-soft)]">{config.disclaimer}</p>
    </section>
  );
}
