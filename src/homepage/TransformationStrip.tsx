import Link from "next/link";

const problems = ["Smells", "Marked walls", "Tired bathroom", "Greasy kitchen", "Stained carpets", "Small fittings"];
const results = ["Viewing ready", "Move-in ready", "Photo ready"];

export function TransformationStrip() {
  return (
    <section className="relative overflow-hidden bg-[var(--cf-deep-green)] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(184,242,74,0.28),transparent_28%),radial-gradient(circle_at_88%_24%,rgba(255,176,103,0.16),transparent_22%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_auto_0.92fr] lg:items-center">
        <div className="flex flex-wrap gap-2">
          {problems.map((problem) => (
            <span key={problem} className="rounded-full border border-white/12 bg-white/10 px-3 py-2 text-xs font-semibold text-[var(--cf-mint)]">{problem}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--cf-lime)]">
          <span className="hidden h-px w-14 bg-[var(--cf-lime)] sm:block" />
          Care & Flair Reset
          <span className="hidden h-px w-14 bg-[var(--cf-lime)] sm:block" />
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {results.map((result) => (
            <span key={result} className="rounded-full bg-[var(--cf-lime)] px-3 py-2 text-xs font-black text-[var(--cf-deep-green)]">{result}</span>
          ))}
          <Link href="/quote" className="rounded-full border border-white/20 bg-white px-4 py-2 text-xs font-bold text-[var(--cf-deep-green)] transition hover:bg-[var(--cf-mint)]">Get quote</Link>
        </div>
      </div>
    </section>
  );
}
