import { findSection } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function HowItWorksSection() {
  const section = findSection("how-it-works");
  const steps = section.steps ?? [];

  return (
    <section className="bg-[#F7F1E6] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="A calmer handover" title={section.title} subtitle={section.subtitle} align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[1.5rem] border border-[#E8D9C3] bg-white p-5 shadow-sm shadow-[#0B342C]/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B342C] text-sm font-bold text-[#B99345]">{index + 1}</div>
              <h3 className="mt-5 text-lg font-semibold text-[#0B342C]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#7A6B58]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
