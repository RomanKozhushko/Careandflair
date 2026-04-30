import { faqs, findSection, visibleSorted } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function FAQSection() {
  const section = findSection("faq");
  const items = visibleSorted(faqs);

  return (
    <section id="faq" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={section.title} subtitle={section.subtitle} align="center" />
        <div className="mt-10 grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-950">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
