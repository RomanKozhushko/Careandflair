import { Fragment } from "react";
import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";
import { SectionHeader } from "@/ui/SectionHeader";
import type { VisualEditorAdapter } from "@/lib/visualEditor";

export function GuardianPlansSection({ content, editor }: { content?: ContentBundle; editor?: VisualEditorAdapter }) {
  const { findCta, findSection, guardianPlans, visibleSorted } = createContentHelpers(content);
  const section = findSection("guardian-plans");
  const sectionIndex = content?.homepageSections.findIndex((item) => item.id === "guardian-plans") ?? -1;
  const plans = visibleSorted(guardianPlans);
  const cta = findCta("build-your-quote");

  return (
    <section id="guardian" className="bg-[#0a2a24] px-4 py-20 text-[#f5ecdc] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow={editor ? editor.text("homepage-sections", [sectionIndex, "eyebrow"], section.eyebrow ?? "Ongoing care") : "Ongoing care"}
              title={editor ? editor.text("homepage-sections", [sectionIndex, "title"], section.title ?? "Ongoing checks") : section.title}
              subtitle={editor ? editor.text("homepage-sections", [sectionIndex, "subtitle"], section.subtitle ?? "") : section.subtitle}
              light
            />
            <div className="mt-8">
              {editor && cta ? editor.button({ id: cta.id, resource: "cta-mappings", label: cta.label, href: cta.href, labelPath: [content?.ctaMappings.findIndex((item) => item.id === cta.id) ?? -1, "label"], hrefPath: [content?.ctaMappings.findIndex((item) => item.id === cta.id) ?? -1, "href"], className: "", variant: "secondary" }) : <CtaButton cta={cta} />}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
              const planIndex = guardianPlans.findIndex((item) => item.id === plan.id);
              const article = (
              <article className={`rounded-[1.5rem] border p-5 ${plan.recommended ? "border-[#b07e33] bg-[#f5ecdc] text-[#0a2a24]" : "border-[#b07e33]/25 bg-white/[0.05] text-[#f5ecdc]"}`}>
                {plan.recommended ? <p className="mb-3 brand-label text-xs brass-text">{editor ? editor.text("guardian-plans", [planIndex, "recommendedLabel"], typeof plan.recommendedLabel === "string" ? plan.recommendedLabel : "Recommended") : "Recommended"}</p> : null}
                <h3 className="text-xl font-semibold">{editor ? editor.text("guardian-plans", [planIndex, "name"], plan.name) : plan.name}</h3>
                <p className={`mt-3 text-sm leading-6 ${plan.recommended ? "text-[#746754]" : "text-[#E6D6BD]"}`}>{editor ? editor.text("guardian-plans", [planIndex, "description"], plan.description) : plan.description}</p>
                <ul className={`mt-5 grid gap-2 text-sm ${plan.recommended ? "text-[#14241F]" : "text-[#E6D6BD]"}`}>
                  {plan.includedChecks.map((check, checkIndex) => <li key={check}>— {editor ? editor.text("guardian-plans", [planIndex, "includedChecks", checkIndex], check) : check}</li>)}
                </ul>
              </article>
              );
              return editor ? <div key={plan.id}>{editor.block("Plan", article, { resource: "guardian-plans", arrayPath: [], index: planIndex })}</div> : <Fragment key={plan.id}>{article}</Fragment>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
