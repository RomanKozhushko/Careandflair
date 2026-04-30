import { findCta, findSection } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function HeroSection() {
  const section = findSection("hero");
  const primaryCta = findCta(section.primaryCtaId);
  const secondaryCta = findCta(section.secondaryCtaId);
  const visualSteps = section.visualSteps ?? [];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,181,109,0.24),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.18),transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7b56d]">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{section.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-5 sm:p-6">
            <div className="rounded-[1.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] p-5">
              <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                <span>Property Reset Board</span>
                <span className="rounded-full bg-[#d7b56d] px-3 py-1 text-slate-950">24-72h</span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {visualSteps.map((step, index) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                    <p className="text-xs text-slate-400">0{index + 1}</p>
                    <p className="mt-2 text-sm font-bold text-white">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-800">
                  <div className="h-28 bg-[linear-gradient(135deg,#475569,#1e293b)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Before</p>
                  </div>
                  <p className="p-4 text-sm text-slate-300">Tired surfaces, marks, odour or presentation gaps.</p>
                </div>
                <div className="overflow-hidden rounded-3xl border border-[#d7b56d]/35 bg-[#fff8e7] text-slate-950">
                  <div className="h-28 bg-[linear-gradient(135deg,#f8e7b0,#d7b56d)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">After</p>
                  </div>
                  <p className="p-4 text-sm text-slate-700">Cleaned, repaired, presented and ready for the next step.</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-semibold text-white">Clean + Repair + Present + Ready</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">One coordinated property reset flow for listings, handovers, tenants and guests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
