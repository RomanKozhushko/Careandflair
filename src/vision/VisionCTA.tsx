type VisionCTAProps = {
  whatsappHref: string;
  primary?: string;
  secondary?: string;
  light?: boolean;
};

export function VisionCTA({ whatsappHref, primary = "Send photos on WhatsApp", secondary = "Open quote builder", light = false }: VisionCTAProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={whatsappHref} className="inline-flex items-center justify-center rounded-full bg-[var(--vf-deep)] px-7 py-4 text-sm font-black text-[var(--vf-text-light)] shadow-[var(--vf-glow-lime)] outline-none transition hover:-translate-y-0.5 hover:bg-[var(--vf-green)] focus-visible:ring-4 focus-visible:ring-[var(--vf-lime)]/45">
        {primary}
      </a>
      <a href="/quote" className={`inline-flex items-center justify-center rounded-full border px-7 py-4 text-sm font-bold outline-none transition hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-[var(--vf-lime)]/35 ${light ? "border-[var(--vf-deep)]/12 bg-white/80 text-[var(--vf-deep)] hover:bg-white" : "border-white/18 bg-white/10 text-[var(--vf-text-light)] hover:bg-white/16"}`}>
        {secondary}
      </a>
    </div>
  );
}
