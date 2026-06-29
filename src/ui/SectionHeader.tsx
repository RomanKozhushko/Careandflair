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
      {eyebrow ? <p className={`mb-3 text-sm font-semibold ${light ? "text-[var(--cf-mint)]" : "text-[var(--cf-muted)]"}`}>{eyebrow}</p> : null}
      {title ? <h2 className={`text-3xl font-semibold tracking-[-0.02em] sm:text-4xl ${light ? "text-[var(--cf-bg-soft)]" : "text-[var(--cf-deep-green)]"}`}>{title}</h2> : null}
      {subtitle ? <p className={`mt-4 text-base leading-7 ${light ? "text-[var(--cf-mint)]" : "text-[var(--cf-muted)]"}`}>{subtitle}</p> : null}
    </div>
  );
}
