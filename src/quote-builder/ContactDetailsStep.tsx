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

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{config.stepLabels.contactSummary}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">{labels.name}<input value={contact.name} onChange={(event) => update("name", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#d7b56d]" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">{labels.phone}<input value={contact.phone} onChange={(event) => update("phone", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#d7b56d]" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">{labels.email}<input value={contact.email} onChange={(event) => update("email", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#d7b56d]" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700">{labels.postcode}<input value={contact.postcode} onChange={(event) => update("postcode", event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal uppercase outline-none transition focus:border-[#d7b56d]" /></label>
        <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">{labels.message}<textarea value={contact.message} onChange={(event) => update("message", event.target.value)} rows={5} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#d7b56d]" /></label>
      </div>
    </section>
  );
}
