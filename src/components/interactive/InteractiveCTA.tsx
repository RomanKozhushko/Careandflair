import Link from "next/link";

type InteractiveCTAProps = {
  href: string;
  label: string;
  helper: string;
  disabledLabel: string;
  disabled?: boolean;
};

export function InteractiveCTA({ href, label, helper, disabledLabel, disabled = false }: InteractiveCTAProps) {
  if (disabled) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-5 text-center text-sm text-slate-500">
        {disabledLabel}
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-[#d7b56d]/40 bg-[#fff7df] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <p className="font-semibold text-slate-950">Ready to price the reset?</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{helper}</p>
      </div>
      <Link href={href} className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:mt-0 sm:w-auto">
        {label}
      </Link>
    </div>
  );
}
