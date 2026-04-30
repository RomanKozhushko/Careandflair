import { beforeAfterItems, findSection, visibleSorted } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function BeforeAfterPreview() {
  const section = findSection("before-after");
  const items = visibleSorted(beforeAfterItems);

  return (
    <section id="before-after" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={section.title} subtitle={section.subtitle} />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
              <div className="grid h-56 grid-cols-2">
                <div className="flex items-end bg-slate-300 p-4 text-sm font-bold text-slate-700">Before</div>
                <div className="flex items-end bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-sm font-bold text-white">After</div>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b7b35]">{item.category} · {item.location}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
