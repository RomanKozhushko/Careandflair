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
    primary: "bg-[#B99345] text-white shadow-[0_18px_44px_rgba(185,147,69,0.24)] hover:bg-[#B08A3C]",
    secondary: "border border-[#B99345]/45 bg-[#F7F1E6]/80 text-[#0B342C] hover:bg-white",
    dark: "bg-[#0B342C] text-white hover:bg-[#17352F]",
  };

  return (
    <Link href={cta.href} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}>
      {cta.label}
    </Link>
  );
}
