import { findSection } from "@/lib/content";

export function TrustBadges() {
  const badges = findSection("hero").trustBadges ?? [];
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {badges.map((badge) => <div key={badge} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{badge}</div>)}
      </div>
    </section>
  );
}
