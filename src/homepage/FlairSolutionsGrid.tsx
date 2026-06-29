import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { SolutionCard } from "@/homepage/SolutionCard";
import { SectionHeader } from "@/ui/SectionHeader";

export function FlairSolutionsGrid({ content }: { content?: ContentBundle }) {
  const { findSection, solutions, visibleSorted } = createContentHelpers(content);
  const section = findSection("flair-solutions");
  const items = visibleSorted(solutions);

  return (
    <section id="solutions" className="bg-[var(--cf-bg)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Cleaning • repairs • setup" title={section.title} subtitle={section.subtitle} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <SolutionCard key={item.id} item={item} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}
