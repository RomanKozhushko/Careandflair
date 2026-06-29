import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";
import { VisualMedia } from "@/ui/VisualMedia";

export function HeroSection({ content }: { content?: ContentBundle }) {
  const { findCta, findSection, siteSettings } = createContentHelpers(content);
  const section = findSection("hero");
  const primaryCta = findCta(section.primaryCtaId);
  const secondaryCta = findCta(section.secondaryCtaId);
  const visualSteps = section.visualSteps ?? [];
  const heroImage = section.heroImage;
  const visualProofs = section.visualProofs ?? [];

  return (
    <section className="relative overflow-hidden bg-[var(--cf-bg)] text-[var(--cf-deep-green)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(183,232,106,0.22),transparent_28%),radial-gradient(circle_at_86%_14%,rgba(184,138,59,0.12),transparent_24%),linear-gradient(180deg,var(--cf-bg-soft)_0%,var(--cf-bg)_100%)]" />
      <div className="absolute left-0 top-28 hidden h-px w-full bg-gradient-to-r from-transparent via-[rgba(183,232,106,0.7)] to-transparent lg:block" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <div className="self-center">
          <p className="inline-flex rounded-full border border-[rgba(8,47,40,0.12)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--cf-muted)] shadow-sm">{section.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">{section.headline}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--cf-text)] sm:text-lg sm:leading-8">{section.subheadline}</p>
          {section.explanation ? <p className="light-glass-panel mt-5 max-w-2xl rounded-2xl px-4 py-3 text-sm leading-6 text-[var(--cf-text)]">{section.explanation}</p> : null}
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[var(--cf-green-2)] sm:text-base">{siteSettings.brandLine}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CtaButton cta={primaryCta} /><CtaButton cta={secondaryCta} variant="secondary" /></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(section.trustBadges ?? []).slice(0, 4).map((badge, index) => (
              <div key={badge} className="interactive-border rounded-xl border border-[var(--cf-line)] bg-white/70 px-4 py-3 text-sm font-medium text-[var(--cf-text)] shadow-sm shadow-[#0a2a24]/5">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--cf-lime)] align-middle" aria-hidden="true" />
                {index === 0 ? "24-72h help" : badge}
              </div>
            ))}
          </div>
        </div>

        <div className="premium-hero-visual glass-card relative rounded-[1.5rem] p-2 sm:p-3 lg:rounded-[2rem]">
          <div className="floating-badge parallax-layer pointer-events-none absolute -left-4 top-10 z-20 hidden rounded-xl px-4 py-3 text-[var(--cf-deep-green)] lg:block lg:translate-y-2">
            <p className="text-[11px] font-semibold text-[var(--cf-muted)]">24-72h help</p>
            <p className="mt-1 text-sm font-semibold">Deadline pressure handled</p>
          </div>
          <div className="floating-badge parallax-layer pointer-events-none absolute -right-4 top-28 z-20 hidden rounded-xl px-4 py-3 text-[var(--cf-deep-green)] lg:block lg:-translate-y-1">
            <p className="text-[11px] font-semibold text-[var(--cf-muted)]">Move-In Reset</p>
            <p className="mt-1 text-sm font-semibold">Ready before boxes arrive</p>
          </div>
          <div className="floating-badge pointer-events-none absolute -right-2 bottom-20 z-20 hidden rounded-full px-5 py-2 text-xs font-semibold text-[var(--cf-deep-green)] lg:block">
            Ready for photos
          </div>
          <div className="floating-badge pointer-events-none absolute -bottom-5 left-10 z-20 hidden rounded-full px-5 py-2 text-xs font-semibold text-[var(--cf-deep-green)] lg:block">
            Quote before work starts
          </div>
          <div className="overflow-hidden rounded-[1.75rem] bg-[var(--cf-bg-soft)] text-[var(--cf-deep-green)] lg:arch-mask">
            <VisualMedia
              src={heroImage}
              alt="Viewing-ready living room after a Care & Flair property reset"
              label="Property reset hero visual"
              priority
              quality={66}
              className="aspect-[4/3] sm:aspect-[3/2]"
              imageClassName="object-cover transition duration-700 sm:hover:scale-[1.025]"
              sizes="(min-width: 1024px) 48vw, (min-width: 640px) 92vw, 92vw"
            />

            <div className="hidden gap-3 border-t border-[var(--cf-line)] bg-[var(--cf-bg-soft)] p-4 sm:grid sm:grid-cols-4">
              {visualSteps.map((step, index) => (
                <div key={step} className="premium-depth-card rounded-xl border border-[var(--cf-line)] bg-white p-3 shadow-sm">
                  <p className="text-xs font-semibold text-[var(--cf-muted)]">0{index + 1}</p>
                  <div className="mt-2 h-1 rounded-full bg-[var(--cf-mint)]"><span className="block h-full rounded-full bg-[var(--cf-lime)]" style={{ width: `${(index + 1) * 25}%` }} /></div>
                  <p className="mt-2 text-sm font-semibold text-[var(--cf-deep-green)]">{step}</p>
                </div>
              ))}
            </div>

            {visualProofs.length > 0 ? (
              <div className="hidden gap-3 border-t border-[var(--cf-line)] bg-[var(--cf-bg)] p-4 md:grid md:grid-cols-3">
                {visualProofs.map((proof) => (
                  <div key={proof.title} className="premium-depth-card overflow-hidden rounded-xl border border-[var(--cf-line)] bg-white shadow-sm">
                    <VisualMedia src={proof.image} alt={proof.title} label={proof.label ?? proof.title} className="h-28" sizes="(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 0px" />
                    <div className="p-3">
                      <p className="text-[11px] font-semibold text-[var(--cf-muted)]">{proof.label}</p>
                      <p className="mt-1 text-sm font-semibold text-[var(--cf-deep-green)]">{proof.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--cf-muted)]">{proof.description}</p>
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
