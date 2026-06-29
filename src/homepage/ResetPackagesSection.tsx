import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { PackageCard } from "@/homepage/PackageCard";
import { SectionHeader } from "@/ui/SectionHeader";

export function ResetPackagesSection({ content }: { content?: ContentBundle }) {
  const { findSection, servicePackages, visibleSorted } = createContentHelpers(content);
  const section = findSection("reset-packages");
  const packages = visibleSorted(servicePackages);

  return (
    <section id="packages" className="bg-[var(--cf-bg-soft)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="From prices for real deadlines" title={section.title} subtitle={section.subtitle} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <PackageCard key={item.id} item={item} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}
