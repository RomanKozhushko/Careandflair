import type { QuoteBuilderConfig, QuoteContactDetails } from "@/lib/types";

type ContactDetailsStepProps = {
  config: QuoteBuilderConfig;
  contact: QuoteContactDetails;
  onChange: (contact: QuoteContactDetails) => void;
};

export function ContactDetailsStep({ config, contact, onChange }: ContactDetailsStepProps) {
  const labels = config.contactFields;

  function update(field: keyof QuoteContactDetails, value: string) {
    onChange({ ...contact, [field]: value });
  }

  const inputClass = "w-full rounded-[18px] border border-[var(--cf-border)] bg-white px-4 py-3 font-normal text-[var(--cf-navy)] outline-none transition focus:border-[var(--cf-cherry)] focus:ring-4 focus:ring-[rgba(138,15,46,0.10)]";
  const labelClass = "space-y-2 text-sm font-bold text-[var(--cf-navy)]";

  return (
    <section className="space-y-5">
      <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{config.stepLabels.contactSummary}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>{labels.name}<input value={contact.name} onChange={(event) => update("name", event.target.value)} className={inputClass} /></label>
        <label className={labelClass}>{labels.phone}<input value={contact.phone} onChange={(event) => update("phone", event.target.value)} className={inputClass} /></label>
        <label className={labelClass}>{labels.email}<input value={contact.email} onChange={(event) => update("email", event.target.value)} className={inputClass} /></label>
        <label className={labelClass}>{labels.postcode}<input value={contact.postcode} onChange={(event) => update("postcode", event.target.value)} className={`${inputClass} uppercase`} /></label>
        <label className={`${labelClass} sm:col-span-2`}>{labels.message}<textarea value={contact.message} onChange={(event) => update("message", event.target.value)} rows={5} className={inputClass} /></label>
      </div>
    </section>
  );
}
