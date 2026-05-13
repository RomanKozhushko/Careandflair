import { findCta, findSection } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function CTASection() {
  const section = findSection("final-cta");
  const cta = findCta(section.primaryCtaId);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-lg shadow-slate-950/10 sm:p-12 lg:shadow-2xl">
        <div className="relative">
          <div className="pointer-events-none absolute -right-24 -top-24 hidden h-56 w-56 rounded-full bg-[#d7b56d]/20 blur-3xl sm:block" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 hidden h-48 w-48 rounded-full bg-white/10 blur-3xl sm:block" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d7b56d]">Ready when the property is not</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{section.subtitle}</p>
            </div>
            <CtaButton cta={cta} />
          </div>
        </div>
      </div>
    </section>
  );
}
