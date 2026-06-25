import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function CTASection({ content }: { content?: ContentBundle }) {
  const { findCta, findSection, siteSettings } = createContentHelpers(content);
  const section = findSection("final-cta");
  const cta = findCta(section.primaryCtaId);

  return (
    <section className="bg-[#f5ecdc] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#b07e33]/25 bg-[#0a2a24] p-8 text-[#f5ecdc] shadow-lg shadow-[#0a2a24]/10 sm:p-12 lg:shadow-2xl">
        <div className="relative">
          <div className="pointer-events-none absolute -right-24 -top-24 hidden h-56 w-56 rounded-full bg-[#b07e33]/10 blur-3xl sm:block" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 hidden h-48 w-48 rounded-full bg-white/10 blur-3xl sm:block" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="brand-label text-xs brass-text">{siteSettings.brandLine}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#E6D6BD]">{section.subtitle}</p>
            </div>
            <CtaButton cta={cta} variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
