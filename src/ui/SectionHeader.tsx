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
      {eyebrow ? <p className={`mb-3 text-xs font-bold uppercase tracking-[0.28em] ${light ? "text-[#d7b56d]" : "text-[#9b7b35]"}`}>{eyebrow}</p> : null}
      {title ? <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${light ? "text-white" : "text-slate-950"}`}>{title}</h2> : null}
      {subtitle ? <p className={`mt-4 text-base leading-7 ${light ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p> : null}
    </div>
  );
}
