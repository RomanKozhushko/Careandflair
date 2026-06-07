import type { ViewingKiller } from "@/lib/scoreEngine";

type ViewingKillerDetectorProps = {
  label: string;
  killer: ViewingKiller;
};

export function ViewingKillerDetector({ label, killer }: ViewingKillerDetectorProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#b07e33]/28 bg-[#0a2a24] p-5 text-white shadow-xl shadow-[#0a2a24]/12">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#b07e33]/10 blur-2xl" />
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] brass-text">{label}</p>
      <h4 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{killer.riskLabel}</h4>
      <p className="mt-3 text-sm leading-6 text-[#E6D6BD]">{killer.riskExplanation}</p>
      <div className="mt-4 rounded-2xl border border-[#b07e33]/20 bg-white/[0.045] p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] brass-text">Recommended action</p>
        <p className="mt-2 text-sm leading-6 text-white">{killer.recommendedAction}</p>
      </div>
    </div>
  );
}
