const progressItems = [
  { label: "Arrived on site", state: "done" },
  { label: "Initial photos taken", state: "done" },
  { label: "Kitchen reset", state: "active" },
  { label: "Bathroom freshened", state: "next" },
  { label: "Final check", state: "next" },
];

export function LiveProgressPanel() {
  return (
    <div className="dark-glass-panel relative overflow-hidden rounded-[1.5rem] p-5 text-white">
      <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[var(--cf-lime)]/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="brand-label text-[10px] text-[var(--cf-lime)]">Sample update panel</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">You know what is happening.</h3>
          </div>
          <span className="rounded-full bg-[var(--cf-coral)] px-3 py-1 text-xs font-black text-[var(--cf-deep-green)]">Live soon</span>
        </div>
        <div className="mt-5 grid gap-3">
          {progressItems.map((item, index) => {
            const done = item.state === "done";
            const active = item.state === "active";
            return (
              <div key={item.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-black ${done ? "bg-[var(--cf-lime)] text-[var(--cf-deep-green)]" : active ? "status-pulse-once bg-[var(--cf-coral)] text-[var(--cf-deep-green)]" : "bg-white/15 text-[var(--cf-mint)]"}`}>
                  {done ? "✓" : index + 1}
                </span>
                <span className="text-sm font-semibold text-[var(--cf-mint)]">{item.label}</span>
                <span className={`h-2 w-10 rounded-full ${done ? "bg-[var(--cf-lime)]" : active ? "bg-[var(--cf-coral)]" : "bg-white/20"}`} />
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["Before", "During", "Ready"].map((label) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/10 p-2">
              <div className="h-12 rounded-lg bg-gradient-to-br from-white/24 via-[var(--cf-mint)]/18 to-[var(--cf-lime)]/20" />
              <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cf-mint)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
