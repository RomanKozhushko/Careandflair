import Image from "next/image";
import { findCta, findSection } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function HeroSection() {
  const section = findSection("hero");
  const primaryCta = findCta(section.primaryCtaId);
  const secondaryCta = findCta(section.secondaryCtaId);
  const visualSteps = section.visualSteps ?? [];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,181,109,0.24),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7b56d]">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{section.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-3 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f8f5ef] text-slate-950">
            <div className="relative h-64 sm:h-72">
              <Image src="/images/property-reset-after.svg" alt="Premium property reset visual placeholder" fill priority className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f8e7b0]">Landlord / Airbnb / Agent ready</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-white">A cleaner, sharper property presentation system.</p>
              </div>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-4">
              {visualSteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-xs font-bold text-[#9b7b35]">0{index + 1}</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">{step}</p>
                </div>
              ))}
            </div>

            <div className="grid border-t border-slate-200 sm:grid-cols-2">
              <div className="border-b border-slate-200 p-5 sm:border-b-0 sm:border-r">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Before</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Tired finish, marks, odour, mould, exterior dirt or handover pressure.</p>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b7b35]">After</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Cleaned, repaired, presented and ready for viewing, tenant or guest.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
