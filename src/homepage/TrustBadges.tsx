import { findSection } from "@/lib/content";

export function TrustBadges() {
  const badges = findSection("hero").trustBadges ?? [];

  return (
    <section className="border-y border-[#B99345]/25 bg-[#0B342C]">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {badges.map((badge, index) => (
          <div key={badge} className="rounded-3xl border border-[#B99345]/25 bg-white/[0.04] p-4 shadow-lg shadow-black/10">
            <p className="brand-label text-xs text-[#B99345]">Trust 0{index + 1}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#F7F1E6]">{badge}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
