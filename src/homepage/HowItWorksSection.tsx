import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function HowItWorksSection({ content }: { content?: ContentBundle }) {
  const { findSection } = createContentHelpers(content);
  const section = findSection("how-it-works");
  const steps = section.steps ?? [];

  return (
    <section className="bg-[var(--cf-bg)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Simple process" title={section.title} subtitle={section.subtitle} align="center" />
        <div className="relative mt-10 grid gap-4 md:grid-cols-4">
          <div className="lime-accent absolute left-[12%] right-[12%] top-5 hidden h-1 rounded-full md:block" />
          {steps.map((step, index) => (
            <article key={step.title} className="reveal-on-scroll soft-3d-card relative rounded-xl border border-[var(--cf-line)] bg-white p-5 shadow-sm shadow-[#0a2a24]/5" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cf-line)] bg-[var(--cf-deep-green)] text-sm font-bold text-white shadow-[0_0_0_6px_var(--cf-bg)]">{index + 1}</div>
              <h3 className="mt-5 text-lg font-semibold text-[var(--cf-deep-green)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--cf-muted)]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
