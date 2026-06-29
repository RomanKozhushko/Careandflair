import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { LiveProgressPanel } from "@/homepage/LiveProgressPanel";
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
              {index === 0 ? <div className="mt-4 rounded-full bg-[var(--cf-mint)] px-3 py-2 text-xs font-bold text-[var(--cf-green)]">Photos start the quote</div> : null}
              {index === 2 ? <div className="mt-4 rounded-full bg-[var(--cf-lime)] px-3 py-2 text-xs font-black text-[var(--cf-deep-green)]">Clear scope</div> : null}
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="light-glass-panel rounded-[1.5rem] p-6">
            <p className="brand-label text-[10px] text-[var(--cf-green)]">Organised updates</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--cf-deep-green)]">A reset should not feel like guesswork.</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--cf-muted)]">This is a static preview of the update style clients can expect: photos, progress and a final check. It is not a live tracker yet.</p>
          </div>
          <LiveProgressPanel />
        </div>
      </div>
    </section>
  );
}
