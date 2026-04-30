import { areas, findSection, visibleSorted } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function AreasServedSection() {
  const section = findSection("areas-served");
  const items = visibleSorted(areas);

  return (
    <section id="areas" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={section.title} subtitle={section.subtitle} align="center" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((area) => (
            <article key={area.id} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 text-center">
              <h3 className="font-semibold text-slate-950">{area.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
