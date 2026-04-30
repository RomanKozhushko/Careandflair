import { findCta, findSection } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function HeroSection() {
  const section = findSection("hero");
  const primaryCta = findCta(section.primaryCtaId);
  const secondaryCta = findCta(section.secondaryCtaId);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,181,109,0.24),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.18),transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7b56d]">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{section.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6">
            <div className="flex h-72 flex-col justify-between rounded-[1.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] p-6">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-300"><span>Reset</span><span>24-72h</span></div>
              <div>
                <p className="text-4xl font-black tracking-tight text-[#d7b56d]">C&F</p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">Cleaning, cosmetic repairs and presentation upgrades coordinated as one property-ready system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
