import { findCta, findSection, siteSettings } from "@/lib/content";
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
    <section className="relative overflow-hidden bg-[#f5ecdc] text-[#0a2a24]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_4%,rgba(185,147,69,0.18),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(11,52,44,0.08),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
        <div className="self-center">
          <p className="brand-label text-xs text-[#b07e33]">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <div className="brand-line my-6 max-w-sm" />
          <p className="max-w-2xl text-base leading-7 text-[#14241F] sm:text-lg sm:leading-8">{section.subheadline}</p>
          <p className="mt-4 text-lg font-semibold text-[#b07e33]">{siteSettings.brandLine}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(section.trustBadges ?? []).map((badge) => (
              <div key={badge} className="rounded-2xl border border-[#b07e33]/25 bg-white/65 px-4 py-3 text-sm font-semibold text-[#14241F] shadow-sm shadow-[#0a2a24]/5">{badge}</div>
            ))}
          </div>
        </div>

        <div className="premium-hero-visual relative rounded-[2rem] border border-[#b07e33]/30 bg-white/55 p-2 shadow-2xl shadow-[#0a2a24]/10 sm:p-3 lg:rounded-[2.5rem]">
          <div className="pointer-events-none absolute -left-4 top-10 z-20 hidden rounded-2xl border border-[#b07e33]/35 bg-[#f5ecdc]/95 px-4 py-3 text-[#0a2a24] shadow-lg shadow-[#0a2a24]/10 lg:block">
            <p className="brand-label text-[10px] text-[#b07e33]">Before</p>
            <p className="mt-1 text-sm font-semibold">Unfinished property</p>
          </div>
          <div className="pointer-events-none absolute -right-4 top-28 z-20 hidden rounded-2xl border border-[#b07e33]/40 bg-[#0a2a24] px-4 py-3 text-[#f5ecdc] shadow-lg shadow-[#0a2a24]/15 lg:block">
            <p className="brand-label text-[10px] text-[#b07e33]">48-hour readiness</p>
            <p className="mt-1 text-sm font-black">Move-in ready</p>
          </div>
          <div className="pointer-events-none absolute -bottom-5 left-10 z-20 hidden rounded-full border border-[#b07e33]/35 bg-white/95 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0a2a24] shadow-md lg:block">
            Less stress handover
          </div>
          <div className="overflow-hidden rounded-[1.75rem] bg-[#f5ecdc] text-[#0a2a24] lg:arch-mask">
            <VisualMedia
              src={heroImage}
              alt="Viewing-ready living room after a Care & Flair property reset"
              label="Property reset hero visual"
              priority
              quality={66}
              className="aspect-[4/3] sm:aspect-[3/2]"
              imageClassName="object-cover"
              sizes="(min-width: 1024px) 48vw, (min-width: 640px) 92vw, 92vw"
            />

            <div className="hidden gap-3 border-t border-[#b07e33]/20 bg-[#f5ecdc] p-4 sm:grid sm:grid-cols-4">
              {visualSteps.map((step, index) => (
                <div key={step} className="premium-depth-card rounded-2xl border border-[#E6D6BD] bg-white p-3 shadow-sm">
                  <p className="text-xs font-bold text-[#b07e33]">0{index + 1}</p>
                  <p className="mt-1 text-sm font-bold text-[#0a2a24]">{step}</p>
                </div>
              ))}
            </div>

            {visualProofs.length > 0 ? (
              <div className="hidden gap-3 border-t border-[#E6D6BD] bg-[#f5ecdc] p-4 md:grid md:grid-cols-3">
                {visualProofs.map((proof) => (
                  <div key={proof.title} className="premium-depth-card overflow-hidden rounded-2xl border border-[#E6D6BD] bg-white shadow-sm">
                    <VisualMedia src={proof.image} alt={proof.title} label={proof.label ?? proof.title} className="h-28" sizes="(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 0px" />
                    <div className="p-3">
                      <p className="brand-label text-[10px] text-[#b07e33]">{proof.label}</p>
                      <p className="mt-1 text-sm font-bold text-[#0a2a24]">{proof.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#746754]">{proof.description}</p>
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
