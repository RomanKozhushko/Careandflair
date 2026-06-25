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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(185,147,69,0.08),transparent_30%),linear-gradient(180deg,#f5ecdc_0%,#fbf6ee_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
        <div className="self-center">
          <p className="text-sm font-semibold text-[#746754]">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <p className="max-w-2xl text-base leading-7 text-[#14241F] sm:text-lg sm:leading-8">{section.subheadline}</p>
          {section.explanation ? <p className="mt-4 max-w-2xl rounded-2xl border border-[#E6D6BD] bg-white/75 px-4 py-3 text-sm leading-6 text-[#14241F] shadow-sm">{section.explanation}</p> : null}
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#0a2a24] sm:text-base">{siteSettings.brandLine}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(section.trustBadges ?? []).map((badge) => (
              <div key={badge} className="rounded-xl border border-[#E6D6BD] bg-white/75 px-4 py-3 text-sm font-medium text-[#14241F] shadow-sm shadow-[#0a2a24]/5">{badge}</div>
            ))}
          </div>
        </div>

        <div className="premium-hero-visual relative rounded-[1.5rem] border border-[#E6D6BD] bg-white/70 p-2 shadow-xl shadow-[#0a2a24]/10 sm:p-3 lg:rounded-[2rem]">
          <div className="pointer-events-none absolute -left-4 top-10 z-20 hidden rounded-xl border border-[#E6D6BD] bg-white/95 px-4 py-3 text-[#0a2a24] shadow-md shadow-[#0a2a24]/10 lg:block">
            <p className="text-[11px] font-semibold text-[#746754]">Problem</p>
            <p className="mt-1 text-sm font-semibold">Tired property</p>
          </div>
          <div className="pointer-events-none absolute -right-4 top-28 z-20 hidden rounded-xl border border-[#E6D6BD] bg-white/95 px-4 py-3 text-[#0a2a24] shadow-md shadow-[#0a2a24]/10 lg:block">
            <p className="text-[11px] font-semibold text-[#746754]">24-72h help</p>
            <p className="mt-1 text-sm font-semibold">Ready faster</p>
          </div>
          <div className="pointer-events-none absolute -bottom-5 left-10 z-20 hidden rounded-full border border-[#E6D6BD] bg-white/95 px-5 py-2 text-xs font-semibold text-[#0a2a24] shadow-md lg:block">
            Quote first, clear scope
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
                <div key={step} className="premium-depth-card rounded-xl border border-[#E6D6BD] bg-white p-3 shadow-sm">
                  <p className="text-xs font-semibold text-[#746754]">0{index + 1}</p>
                  <p className="mt-1 text-sm font-semibold text-[#0a2a24]">{step}</p>
                </div>
              ))}
            </div>

            {visualProofs.length > 0 ? (
              <div className="hidden gap-3 border-t border-[#E6D6BD] bg-[#f5ecdc] p-4 md:grid md:grid-cols-3">
                {visualProofs.map((proof) => (
                  <div key={proof.title} className="premium-depth-card overflow-hidden rounded-xl border border-[#E6D6BD] bg-white shadow-sm">
                    <VisualMedia src={proof.image} alt={proof.title} label={proof.label ?? proof.title} className="h-28" sizes="(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 0px" />
                    <div className="p-3">
                      <p className="text-[11px] font-semibold text-[#746754]">{proof.label}</p>
                      <p className="mt-1 text-sm font-semibold text-[#0a2a24]">{proof.title}</p>
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
