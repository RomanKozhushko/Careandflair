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
      <div className="rounded-[2rem] border border-dashed border-[#E8D9C3] bg-white/70 p-5 text-center text-sm text-[#7A6B58]">
        {disabledLabel}
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-[#B99345]/40 bg-[#F7F1E6] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <p className="font-semibold text-[#0B342C]">Ready to price the reset?</p>
        <p className="mt-1 text-sm leading-6 text-[#7A6B58]">{helper}</p>
      </div>
      <Link href={href} className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#0B342C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#17352F] sm:mt-0 sm:w-auto">
        {label}
      </Link>
    </div>
  );
}
