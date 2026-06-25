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
    primary: "bg-[#0a2a24] text-white shadow-[0_16px_38px_rgba(10,42,36,0.14)] hover:bg-[#061A17]",
    secondary: "border border-[#b07e33]/35 bg-white/45 text-[#0a2a24] hover:bg-white hover:border-[#b07e33]/55",
    dark: "bg-[#0a2a24] text-white hover:bg-[#061A17]",
    light: "border border-white/75 bg-white text-[#061A17] shadow-[0_16px_38px_rgba(0,0,0,0.18)] hover:bg-[#f5ecdc]",
  };

  return (
    <Link href={cta.href} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}>
      {cta.label}
    </Link>
  );
}
