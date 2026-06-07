import { findCta, findSection, guardianPlans, visibleSorted } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";
import { SectionHeader } from "@/ui/SectionHeader";

export function GuardianPlansSection() {
  const section = findSection("guardian-plans");
  const plans = visibleSorted(guardianPlans);
  const cta = findCta("build-your-quote");

  return (
    <section id="guardian" className="bg-[#0B342C] px-4 py-20 text-[#F7F1E6] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeader eyebrow="Ongoing care" title={section.title} subtitle={section.subtitle} light />
            <div className="mt-8"><CtaButton cta={cta} /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.id} className={`rounded-[1.5rem] border p-5 ${plan.recommended ? "border-[#B99345] bg-[#F7F1E6] text-[#0B342C]" : "border-[#B99345]/25 bg-white/[0.05] text-[#F7F1E6]"}`}>
                {plan.recommended ? <p className="mb-3 brand-label text-xs text-[#B08A3C]">Recommended</p> : null}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className={`mt-3 text-sm leading-6 ${plan.recommended ? "text-[#7A6B58]" : "text-[#E8D9C3]"}`}>{plan.description}</p>
                <ul className={`mt-5 grid gap-2 text-sm ${plan.recommended ? "text-[#17352F]" : "text-[#E8D9C3]"}`}>
                  {plan.includedChecks.map((check) => <li key={check}>— {check}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
