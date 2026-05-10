import { findCta, findSection } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";
import { ParallaxLayer } from "@/ui/ParallaxLayer";
import { VisualMedia } from "@/ui/VisualMedia";

export function HeroSection() {
  const section = findSection("hero");
  const primaryCta = findCta(section.primaryCtaId);
  const secondaryCta = findCta(section.secondaryCtaId);
  const visualSteps = section.visualSteps ?? [];
  const heroImage = section.heroImage;
  const visualProofs = section.visualProofs ?? [];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <ParallaxLayer depth={-8} className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,181,109,0.24),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7b56d]">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{section.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(section.trustBadges ?? []).map((badge) => (
              <div key={badge} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-slate-200">{badge}</div>
            ))}
          </div>
        </div>

        <ParallaxLayer depth={14} scaleDepth={0.006} perspective className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-3 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f8f5ef] text-slate-950">
            <ParallaxLayer depth={-6} className="overflow-hidden">
              <VisualMedia src={heroImage} alt="Viewing-ready living room after a Care & Flair property reset" label="Property reset hero visual" priority className="h-64 sm:h-80" sizes="(min-width: 1024px) 48vw, 100vw" />
            </ParallaxLayer>

            <div className="grid gap-3 p-4 sm:grid-cols-4">
              {visualSteps.map((step, index) => (
                <ParallaxLayer key={step} depth={4 + index * 2} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-xs font-bold text-[#9b7b35]">0{index + 1}</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">{step}</p>
                </ParallaxLayer>
              ))}
            </div>

            {visualProofs.length > 0 ? (
              <div className="grid gap-3 border-t border-slate-200 p-4 sm:grid-cols-3">
                {visualProofs.map((proof) => (
                  <ParallaxLayer key={proof.title} depth={6} scaleDepth={0.003} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <VisualMedia src={proof.image} alt={proof.title} label={proof.label ?? proof.title} className="h-28" sizes="(min-width: 1024px) 15vw, 33vw" />
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b7b35]">{proof.label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-950">{proof.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{proof.description}</p>
                    </div>
                  </ParallaxLayer>
                ))}
              </div>
            ) : null}
          </div>
        </ParallaxLayer>
      </div>
    </section>
  );
}
