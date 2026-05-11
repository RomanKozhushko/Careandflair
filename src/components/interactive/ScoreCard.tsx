import type { ScoreResult } from "@/lib/scoreEngine";

type ScoreCardProps = {
  title: string;
  caption: string;
  result: ScoreResult;
};

const toneStyles = {
  good: "from-emerald-400 to-lime-300 text-emerald-950",
  watch: "from-[#d7b56d] to-amber-200 text-slate-950",
  urgent: "from-orange-400 to-amber-200 text-slate-950",
  critical: "from-rose-500 to-orange-300 text-white",
};

export function ScoreCard({ title, caption, result }: ScoreCardProps) {
  return (
    <div className="h-full rounded-[2rem] border border-white/10 bg-slate-950 p-5 text-white shadow-2xl shadow-black/20">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d7b56d]">{title}</p>
      <div className={`mt-5 rounded-[1.5rem] bg-gradient-to-br ${toneStyles[result.band.tone]} p-5`}>
        <div className="flex items-end justify-between gap-4">
          <span className="text-6xl font-semibold tracking-[-0.08em]">{result.score}</span>
          <span className="pb-2 text-sm font-bold uppercase tracking-[0.2em]">/ 100</span>
        </div>
        <p className="mt-4 text-xl font-semibold tracking-[-0.03em]">{result.band.label}</p>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{result.band.summary}</p>
      <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">{caption}</p>
    </div>
  );
}
