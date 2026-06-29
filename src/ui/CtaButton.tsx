import Link from "next/link";
import type { CtaMapping } from "@/lib/types";

type CtaButtonProps = {
  cta?: CtaMapping;
  variant?: "primary" | "secondary" | "dark" | "light";
  className?: string;
};

export function CtaButton({ cta, variant = "primary", className = "" }: CtaButtonProps) {
  if (!cta) return null;

  const variants = {
    primary: "bg-[var(--cf-deep-green)] text-white shadow-[0_18px_42px_rgba(8,47,40,0.2)] ring-1 ring-[rgba(183,232,106,0.22)] hover:bg-[var(--cf-green-2)] hover:shadow-[0_20px_54px_rgba(8,47,40,0.26)]",
    secondary: "border border-[rgba(8,47,40,0.18)] bg-white/72 text-[var(--cf-deep-green)] shadow-sm hover:border-[rgba(183,232,106,0.9)] hover:bg-white",
    dark: "bg-[var(--cf-deep-green)] text-white hover:bg-[var(--cf-green-2)]",
    light: "border border-white/80 bg-white text-[var(--cf-deep-green)] shadow-[0_16px_38px_rgba(0,0,0,0.16)] hover:bg-[var(--cf-mint)]",
  };

  return (
    <Link href={cta.href} className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}>
      <span>{cta.label}</span>
      <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--cf-lime)] text-[11px] font-black text-[var(--cf-deep-green)] transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
    </Link>
  );
}
