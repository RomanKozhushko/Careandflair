import { createContentHelpers, type ContentBundle } from "@/lib/content";

export function TrustBadges({ content }: { content?: ContentBundle }) {
  const { findSection } = createContentHelpers(content);
  const badges = findSection("hero").trustBadges ?? [];

  return (
    <section className="border-y border-[#E6D6BD] bg-[#fbf6ee]">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {badges.map((badge, index) => (
          <div key={badge} className="rounded-xl border border-[#E6D6BD] bg-white p-4 shadow-sm shadow-[#0a2a24]/5">
            <p className="text-xs font-semibold text-[#746754]">Trust point 0{index + 1}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#0a2a24]">{badge}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
