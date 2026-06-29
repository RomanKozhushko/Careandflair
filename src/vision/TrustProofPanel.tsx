export function TrustProofPanel() {
  return (
    <section className="bg-[var(--vf-paper)] px-4 py-20 text-[var(--vf-text-dark)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <h2 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">You see what was done.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["clear quote before work starts", "photo proof after completion", "practical reset scope", "local South East London & Kent", "WhatsApp-friendly", "no renovation pressure"].map((point) => (
              <div key={point} className="rounded-2xl border border-white bg-white/80 p-4 font-semibold shadow-[var(--vf-shadow-soft)]">{point}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-[var(--vf-deep)] p-5 text-[var(--vf-text-light)] shadow-[var(--vf-shadow-3d)]">
          {["Arrived", "Reset in progress", "Final photos", "Ready"].map((status, index) => (
            <div key={status} className="mb-3 flex items-center justify-between rounded-2xl bg-white/10 p-4">
              <span className="font-semibold">{status}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${index < 3 ? "bg-[var(--vf-lime)] text-[var(--vf-ink)]" : "bg-[var(--vf-mint)] text-[var(--vf-ink)]"}`}>{index < 3 ? "done" : "ready"}</span>
            </div>
          ))}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Before", "During", "After"].map((item) => <div key={item} className="h-24 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(184,255,61,0.18))] p-2 text-xs font-bold">{item}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
