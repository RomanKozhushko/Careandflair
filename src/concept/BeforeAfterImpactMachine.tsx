import { ConceptCTA } from "@/concept/ConceptCTA";

export function BeforeAfterImpactMachine({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section id="concept-c" className="relative overflow-hidden bg-[#f4ebdd] px-4 py-20 text-[#081613] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0b5a48]">Concept C / Before-After Impact Machine</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">People notice the small things first.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-[#5f6f68]">We reset them before they cost you viewings, tenants or guests. Bathrooms, kitchens, walls, carpets, smells and tired details.</p>
            <div className="mt-6"><ConceptCTA whatsappHref={whatsappHref} secondary="Show proof" dark={false} /></div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-white shadow-[0_35px_100px_rgba(4,31,26,0.18)]">
          <div className="relative h-[36rem]">
            <div className="absolute inset-0 bg-[url('/images/generated/bathroom-before.jpg')] bg-cover bg-center" />
            <div className="concept-reveal-after absolute inset-0 bg-[url('/images/generated/bathroom-after.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031b16]/78 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#031b16]">Before: tired, marked, not ready</div>
            <div className="absolute right-5 top-5 rounded-full bg-[#b8ff3d] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#031b16]">After: clean, fresh, photo-ready</div>
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-white shadow-[0_0_34px_rgba(184,255,61,0.7)]">
              <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#b8ff3d] text-2xl font-black text-[#031b16] shadow-[0_20px_70px_rgba(184,255,61,0.35)]">↔</div>
            </div>
            <div className="absolute bottom-6 left-6 grid max-w-sm gap-2">
              {["old silicone", "stained grout", "tired bathroom"].map((item) => (
                <span key={item} className="rounded-full bg-[#ff9f5a] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#031b16]">{item}</span>
              ))}
            </div>
            <div className="absolute bottom-6 right-6 grid max-w-sm gap-2 text-right">
              {["move-in ready", "photo-ready", "guest-ready"].map((item) => (
                <span key={item} className="rounded-full bg-[#b8ff3d] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#031b16]">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {["Bathroom reset", "Carpet extraction", "Kitchen degrease"].map((proof) => (
            <div key={proof} className="rounded-2xl border border-white bg-white/72 p-5 shadow-[0_20px_60px_rgba(4,31,26,0.1)]">
              <p className="text-sm font-black text-[#073b32]">{proof}</p>
              <p className="mt-2 text-sm text-[#5f6f68]">Visible proof before someone walks in.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
