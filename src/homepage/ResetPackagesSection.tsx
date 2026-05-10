import { findSection, servicePackages, visibleSorted } from "@/lib/content";
import { PackageCard } from "@/homepage/PackageCard";
import { ParallaxLayer } from "@/ui/ParallaxLayer";
import { SectionHeader } from "@/ui/SectionHeader";

export function ResetPackagesSection() {
  const section = findSection("reset-packages");
  const packages = visibleSorted(servicePackages);

  return (
    <section id="packages" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={section.title} subtitle={section.subtitle} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((item, index) => (
            <ParallaxLayer key={item.id} depth={14 + index * 4} scaleDepth={item.featured ? 0.008 : 0.004} perspective>
              <PackageCard item={item} />
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
}
