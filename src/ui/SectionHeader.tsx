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
      {eyebrow ? <p className={`mb-3 brand-label text-xs ${light ? "text-[#b07e33]" : "text-[#b07e33]"}`}>{eyebrow}</p> : null}
      {title ? <h2 className={`text-3xl font-semibold tracking-[-0.02em] sm:text-4xl ${light ? "text-[#f5ecdc]" : "text-[#0a2a24]"}`}>{title}</h2> : null}
      {subtitle ? <p className={`mt-4 text-base leading-7 ${light ? "text-[#E6D6BD]" : "text-[#746754]"}`}>{subtitle}</p> : null}
    </div>
  );
}
