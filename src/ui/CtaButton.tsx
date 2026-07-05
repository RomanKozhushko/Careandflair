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
    primary: "bg-[var(--cf-cherry)] text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] hover:-translate-y-0.5 hover:bg-[var(--cf-cherry-2)]",
    secondary: "border border-[rgba(8,27,45,0.22)] bg-white text-[var(--cf-navy)] shadow-sm hover:bg-[var(--cf-cream-card)]",
    dark: "bg-[var(--cf-cherry)] text-white hover:bg-[var(--cf-cherry-2)]",
    light: "border border-white/80 bg-white text-[var(--cf-navy)] shadow-[0_16px_38px_rgba(0,0,0,0.16)] hover:bg-[var(--cf-cream-card)]",
  };

  return (
    <Link href={cta.href} className={`group inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-sm font-bold transition duration-200 ${variants[variant]} ${className}`}>
      <span>{cta.label}</span>
      <span className="grid h-5 w-5 place-items-center rounded-full bg-white/18 text-[11px] font-black text-current transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
    </Link>
  );
}
