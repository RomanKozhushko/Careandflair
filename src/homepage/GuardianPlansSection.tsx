import { findCta, findSection, guardianPlans, visibleSorted } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";
import { SectionHeader } from "@/ui/SectionHeader";

export function GuardianPlansSection() {
  const section = findSection("guardian-plans");
  const plans = visibleSorted(guardianPlans);
  const cta = findCta("build-your-quote");

  return (
    <section id="guardian" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeader title={section.title} subtitle={section.subtitle} light />
            <div className="mt-8"><CtaButton cta={cta} /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.id} className={`rounded-[1.5rem] border p-5 ${plan.recommended ? "border-[#d7b56d] bg-white text-slate-950" : "border-white/10 bg-white/[0.06] text-white"}`}>
                {plan.recommended ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9b7b35]">Recommended</p> : null}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className={`mt-3 text-sm leading-6 ${plan.recommended ? "text-slate-600" : "text-slate-300"}`}>{plan.description}</p>
                <ul className={`mt-5 grid gap-2 text-sm ${plan.recommended ? "text-slate-700" : "text-slate-200"}`}>
                  {plan.includedChecks.map((check) => <li key={check}>• {check}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
