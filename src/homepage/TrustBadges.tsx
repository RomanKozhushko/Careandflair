import { findSection } from "@/lib/content";

export function TrustBadges() {
  const badges = findSection("hero").trustBadges ?? [];

  return (
    <section className="border-y border-[#d7b56d]/20 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {badges.map((badge, index) => (
          <div key={badge} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-lg shadow-black/10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d7b56d]">Trust 0{index + 1}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white">{badge}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
