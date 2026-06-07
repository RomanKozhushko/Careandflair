type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({ eyebrow, title, subtitle, align = "left", light = false }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className={`mb-3 brand-label text-xs ${light ? "text-[#B99345]" : "text-[#B08A3C]"}`}>{eyebrow}</p> : null}
      {title ? <h2 className={`text-3xl font-semibold tracking-[-0.02em] sm:text-4xl ${light ? "text-[#F7F1E6]" : "text-[#0B342C]"}`}>{title}</h2> : null}
      {subtitle ? <p className={`mt-4 text-base leading-7 ${light ? "text-[#E8D9C3]" : "text-[#7A6B58]"}`}>{subtitle}</p> : null}
    </div>
  );
}
