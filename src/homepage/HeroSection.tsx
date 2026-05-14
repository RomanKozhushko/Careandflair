import { findCta, findSection } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";
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
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top_left,rgba(215,181,109,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_24%)] lg:block" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7b56d]">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{section.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(section.trustBadges ?? []).map((badge) => (
              <div key={badge} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-slate-200">{badge}</div>
            ))}
          </div>
        </div>

        <div className="premium-hero-visual relative rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-2 sm:rounded-[2rem] sm:p-3 lg:bg-white/[0.08] lg:shadow-2xl lg:shadow-black/35">
          <div className="pointer-events-none absolute -left-6 top-8 z-20 hidden rounded-2xl border border-white/15 bg-slate-950/85 px-4 py-3 text-white shadow-lg shadow-black/20 lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d7b56d]">Before</p>
            <p className="mt-1 text-sm font-semibold">Problem property</p>
          </div>
          <div className="pointer-events-none absolute -right-7 top-28 z-20 hidden rounded-2xl border border-[#d7b56d]/30 bg-[#d7b56d]/95 px-4 py-3 text-slate-950 shadow-lg shadow-black/20 lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em]">48-hour reset</p>
            <p className="mt-1 text-sm font-black">Viewing-ready</p>
          </div>
          <div className="pointer-events-none absolute -bottom-5 left-10 z-20 hidden rounded-full border border-white/15 bg-white/90 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-950 shadow-md lg:block">
            Scroll depth preview
          </div>
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f8f5ef] text-slate-950">
            <VisualMedia
              src={heroImage}
              alt="Viewing-ready living room after a Care & Flair property reset"
              label="Property reset hero visual"
              priority
              quality={66}
              className="aspect-[4/3] sm:aspect-[3/2]"
              sizes="(min-width: 1024px) 48vw, (min-width: 640px) 92vw, 92vw"
            />

            <div className="hidden gap-3 p-4 sm:grid sm:grid-cols-4">
              {visualSteps.map((step, index) => (
                <div key={step} className="premium-depth-card rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-xs font-bold text-[#9b7b35]">0{index + 1}</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">{step}</p>
                </div>
              ))}
            </div>

            {visualProofs.length > 0 ? (
              <div className="hidden gap-3 border-t border-slate-200 p-4 md:grid md:grid-cols-3">
                {visualProofs.map((proof) => (
                  <div key={proof.title} className="premium-depth-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <VisualMedia src={proof.image} alt={proof.title} label={proof.label ?? proof.title} className="h-28" sizes="(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 0px" />
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b7b35]">{proof.label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-950">{proof.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{proof.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
