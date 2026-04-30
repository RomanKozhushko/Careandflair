import { beforeAfterItems, findSection, visibleSorted } from "@/lib/content";
import { SectionHeader } from "@/ui/SectionHeader";

export function BeforeAfterPreview() {
  const section = findSection("before-after");
  const items = visibleSorted(beforeAfterItems);

  return (
    <section id="before-after" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={section.title} subtitle={section.subtitle} />
        <div className="mt-6 inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900">
          Real project images can be added from admin later.
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
              <div className="grid h-64 grid-cols-2">
                <div className="relative flex items-end overflow-hidden bg-slate-200 p-4 text-sm font-bold text-slate-700">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#cbd5e1_0%,#94a3b8_45%,#64748b_100%)]" />
                  <div className="absolute inset-x-5 top-8 h-20 rounded-3xl border border-white/30 bg-white/20" />
                  <span className="relative rounded-full bg-white/80 px-3 py-1">Preview Before</span>
                </div>
                <div className="relative flex items-end overflow-hidden bg-slate-900 p-4 text-sm font-bold text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(215,181,109,0.45),transparent_28%),linear-gradient(135deg,#0f172a,#334155)]" />
                  <div className="absolute inset-x-5 top-8 h-20 rounded-3xl border border-[#d7b56d]/40 bg-[#d7b56d]/20" />
                  <span className="relative rounded-full bg-slate-950/80 px-3 py-1">Preview After</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b7b35]">{item.category} · {item.location}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Visual placeholder, not a real project photo</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
