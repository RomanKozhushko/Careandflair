const problems = [
  ["Old silicone", "noticed"],
  ["Marked walls", "off-putting"],
  ["Greasy kitchen", "stale"],
  ["Tired bathroom", "tired"],
  ["Stained carpet", "cheapens photos"],
  ["Smells", "stale"],
  ["Loose fittings", "unfinished"],
  ["Dusty corners", "noticed"],
  ["Stained grout", "off-putting"],
  ["Flat, unloved rooms", "tired"],
];

export function ProblemShockWall() {
  return (
    <section className="bg-[var(--vf-deep)] px-4 py-20 text-[var(--vf-text-light)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">What stops a property feeling ready?</h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--vf-mint)]">These are the small visible details people notice before they trust the property.</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map(([label, tag]) => (
            <div key={label} className="vf-depth-card group rounded-[1.35rem] border border-white/10 bg-white/10 p-5">
              <div className="h-16 rounded-2xl bg-[linear-gradient(135deg,rgba(255,143,90,0.28),rgba(184,255,61,0.12))]" />
              <p className="mt-4 text-lg font-black">{label}</p>
              <span className="mt-3 inline-flex rounded-full bg-[var(--vf-coral)] px-3 py-1 text-xs font-black text-[var(--vf-ink)] group-hover:bg-[var(--vf-lime)]">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
