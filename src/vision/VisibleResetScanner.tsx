import { VisionCTA } from "@/vision/VisionCTA";

export function VisibleResetScanner({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section className="relative overflow-hidden bg-[var(--vf-ink)] px-4 py-20 text-[var(--vf-text-light)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/10 p-4 shadow-[var(--vf-shadow-3d)]">
          <div className="relative h-[34rem] overflow-hidden rounded-[1.7rem] bg-[url('/images/generated/bathroom-before.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,17,14,0.88)] via-transparent to-transparent" />
            <div className="vf-scan-line" />
            {["Photo review", "Visible reset scan", "Reset scope", "Ready path"].map((tag, index) => (
              <span key={tag} className="vf-float absolute rounded-full border border-[var(--vf-lime)]/35 bg-[var(--vf-glass-dark)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--vf-lime)]" style={{ left: `${10 + index * 18}%`, top: `${16 + (index % 2) * 48}%`, animationDelay: `${index * 180}ms` }}>{tag}</span>
            ))}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-5 text-[var(--vf-text-dark)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--vf-green)]">Photos - Visible issues - Scope - Quote</p>
              <div className="vf-progress mt-4 h-2 rounded-full bg-[var(--vf-cream)]"><div className="h-full w-[78%] rounded-full bg-[var(--vf-lime)]" /></div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--vf-lime)]">Visible Reset Scanner</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Send photos and we identify the reset work that matters first.</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--vf-mint)]">No fake AI. No renovation pressure. Just a practical photo review of the visible problems stopping the property feeling ready.</p>
          <div className="mt-8"><VisionCTA whatsappHref={whatsappHref} /></div>
        </div>
      </div>
    </section>
  );
}
