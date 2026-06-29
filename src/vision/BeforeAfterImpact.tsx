export function BeforeAfterImpact() {
  return (
    <section className="bg-[var(--vf-paper)] px-4 py-20 text-[var(--vf-text-dark)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">Proof you can see.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--vf-text-soft)]">Most homes do not need a full renovation. They need the visible problems fixed first.</p>
        <div className="relative mt-10 overflow-hidden rounded-[2.4rem] border border-white bg-white shadow-[var(--vf-shadow-3d)]">
          <div className="relative h-[38rem]">
            <div className="absolute inset-0 bg-[url('/images/generated/bathroom-before.jpg')] bg-cover bg-center" />
            <div className="vf-reveal-after absolute inset-0 bg-[url('/images/generated/bathroom-after.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,17,14,0.78)] via-transparent to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">Tired / not photo-ready / visible issues</span>
            <span className="absolute right-5 top-5 rounded-full bg-[var(--vf-lime)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">Ready / fresh / viewing-ready</span>
            <div className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 bg-white shadow-[0_0_42px_rgba(184,255,61,0.78)]">
              <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--vf-lime)] text-2xl font-black shadow-[var(--vf-glow-lime)]">↔</div>
            </div>
            <div className="absolute bottom-6 right-6 flex flex-wrap justify-end gap-2">
              {["Move-in ready", "Photo-ready", "Guest-ready", "Viewing-ready"].map((badge) => <span key={badge} className="rounded-full bg-[var(--vf-lime)] px-4 py-2 text-xs font-black">{badge}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
