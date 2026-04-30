import { findSection } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function HowItWorksSection() {
  const section = findSection("how-it-works");
  const steps = section.steps ?? [];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={section.title} subtitle={section.subtitle} align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-[#d7b56d]">{index + 1}</div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
