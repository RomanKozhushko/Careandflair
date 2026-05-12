import type { ViewingKiller } from "@/lib/scoreEngine";

type ViewingKillerDetectorProps = {
  label: string;
  killer: ViewingKiller;
};

export function ViewingKillerDetector({ label, killer }: ViewingKillerDetectorProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d7b56d]/40 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/15">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#d7b56d]/20 blur-2xl" />
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">{label}</p>
      <h4 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{killer.riskLabel}</h4>
      <p className="mt-3 text-sm leading-6 text-slate-300">{killer.riskExplanation}</p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400">Recommended action</p>
        <p className="mt-2 text-sm leading-6 text-white">{killer.recommendedAction}</p>
      </div>
    </div>
  );
}
