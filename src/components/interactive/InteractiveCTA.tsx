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
      <div className="rounded-[2rem] border border-dashed border-[#E6D6BD] bg-white/70 p-5 text-center text-sm text-[#746754]">
        {disabledLabel}
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-[#b07e33]/40 bg-[#f5ecdc] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <p className="font-semibold text-[#0a2a24]">Ready to price the reset?</p>
        <p className="mt-1 text-sm leading-6 text-[#746754]">{helper}</p>
      </div>
      <Link href={href} className="mt-4 inline-flex w-full items-center justify-center rounded-full brass-fill px-6 py-3 text-sm font-semibold text-[#061A17] transition hover:brightness-105 sm:mt-0 sm:w-auto">
        {label}
      </Link>
    </div>
  );
}
