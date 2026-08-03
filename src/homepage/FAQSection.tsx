import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";
import type { VisualEditorAdapter } from "@/lib/visualEditor";

export function FAQSection({ content, editor }: { content?: ContentBundle; editor?: VisualEditorAdapter }) {
  const { faqs, findSection, visibleSorted } = createContentHelpers(content);
  const section = findSection("faq");
  const sectionIndex = content?.homepageSections.findIndex((item) => item.id === "faq") ?? -1;
  const items = visibleSorted(faqs);

  return (
    <section id="faq" className="bg-[#f5ecdc] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          title={editor ? editor.text("homepage-sections", [sectionIndex, "title"], section.title ?? "Common Questions") : section.title}
          subtitle={editor ? editor.text("homepage-sections", [sectionIndex, "subtitle"], section.subtitle ?? "Clear answers before you request a quote.") : section.subtitle}
          align="center"
        />
        <div className="mt-10 grid gap-4">
          {items.map((item) => {
            const itemIndex = faqs.findIndex((faq) => faq.id === item.id);
            return (
            <article key={item.id} className="rounded-3xl border border-[#E6D6BD] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#0a2a24]">{editor ? editor.text("faqs", [itemIndex, "question"], item.question) : item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[#746754]">{editor ? editor.text("faqs", [itemIndex, "answer"], item.answer) : item.answer}</p>
            </article>
          )})}
        </div>
      </div>
    </section>
  );
}
