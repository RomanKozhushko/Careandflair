import Link from "next/link";
import type { CtaMapping } from "@/lib/types";

type CtaButtonProps = {
  cta?: CtaMapping;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
};

export function CtaButton({ cta, variant = "primary", className = "" }: CtaButtonProps) {
  if (!cta) return null;

  const variants = {
    primary: "bg-[#d7b56d] text-slate-950 shadow-[0_20px_60px_rgba(215,181,109,0.28)] hover:bg-[#e4c77f]",
    secondary: "border border-white/20 bg-white/10 text-white hover:bg-white/15",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
  };

  return (
    <Link href={cta.href} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}>
      {cta.label}
    </Link>
  );
}
