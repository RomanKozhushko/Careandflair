import Image from "next/image";
import { beforeAfterItems, findSection, visibleSorted } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function BeforeAfterPreview() {
  const section = findSection("before-after");
  const items = visibleSorted(beforeAfterItems);

  return (
    <section id="before-after" className="bg-[#f8f5ef] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader title={section.title} subtitle={section.subtitle} />
          <div className="rounded-3xl border border-amber-200 bg-white/80 px-5 py-4 text-sm font-semibold leading-6 text-amber-950 shadow-sm">
            Real project images can be added from admin later. Current visuals are local placeholders, not fake project photos.
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className={`overflow-hidden rounded-[1.75rem] border bg-white shadow-sm ${item.featured ? "border-[#d7b56d] lg:col-span-1" : "border-slate-200"}`}>
              <div className="relative grid h-72 grid-cols-2 overflow-hidden">
                <div className="relative border-r border-white/70">
                  <Image src={item.imageBefore} alt={`${item.title} before placeholder`} fill className="object-cover" sizes="(min-width: 1024px) 17vw, 50vw" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-800">Before</span>
                </div>
                <div className="relative">
                  <Image src={item.imageAfter} alt={`${item.title} after placeholder`} fill className="object-cover" sizes="(min-width: 1024px) 17vw, 50vw" />
                  <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">After</span>
                </div>
                <div className="absolute inset-x-1/2 top-0 h-full w-px bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.5)]" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b7b35]">{item.category} · {item.location}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">{item.serviceType}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Local placeholder visual</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
