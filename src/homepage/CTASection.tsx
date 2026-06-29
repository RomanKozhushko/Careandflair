import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function CTASection({ content }: { content?: ContentBundle }) {
  const { findCta, findSection, siteSettings } = createContentHelpers(content);
  const section = findSection("final-cta");
  const cta = findCta(section.primaryCtaId);

  return (
    <section className="bg-[var(--cf-bg)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="light-glass-panel mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-8 text-[var(--cf-deep-green)] sm:p-12">
        <div className="relative">
          <div className="pointer-events-none absolute -right-24 -top-24 hidden h-56 w-56 rounded-full bg-[var(--cf-mint)]/70 blur-3xl sm:block" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 hidden h-48 w-48 rounded-full bg-[var(--cf-brass-soft)]/28 blur-3xl sm:block" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="brand-label text-xs brass-text">{siteSettings.brandLine}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--cf-muted)]">{section.subtitle}</p>
              <div className="mt-5 inline-flex rounded-full bg-[var(--cf-mint)] px-4 py-2 text-sm font-semibold text-[var(--cf-deep-green)]">WhatsApp photos or use the quote form</div>
            </div>
            <CtaButton cta={cta} variant="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
