import type { ScoreResult } from "@/lib/scoreEngine";

type ScoreCardProps = {
  title: string;
  caption: string;
  result: ScoreResult;
};

const toneStyles = {
  good: "from-emerald-400 to-lime-300 text-emerald-950",
  watch: "from-[#b07e33] to-[#E6D6BD] text-[#0a2a24]",
  urgent: "from-[#E6D6BD] to-[#f5ecdc] text-[#14241F]",
  critical: "from-[#7f1d1d] to-[#b07e33] text-white",
};

export function ScoreCard({ title, caption, result }: ScoreCardProps) {
  return (
    <div className="h-full rounded-[2rem] border border-[#b07e33]/25 bg-[#14241F] p-5 text-white shadow-2xl shadow-black/20">
      <p className="brand-label text-xs brass-text">{title}</p>
      <div className={`mt-5 rounded-[1.5rem] bg-gradient-to-br ${toneStyles[result.band.tone]} p-5`}>
        <div className="flex items-end justify-between gap-4">
          <span className="text-6xl font-semibold tracking-[-0.08em]">{result.score}</span>
          <span className="pb-2 text-sm font-bold uppercase tracking-[0.2em]">/ 100</span>
        </div>
        <p className="mt-4 text-xl font-semibold tracking-[-0.03em]">{result.band.label}</p>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#E6D6BD]">{result.band.summary}</p>
      <p className="mt-4 border-t border-[#b07e33]/25 pt-4 text-xs leading-5 text-[#E6D6BD]">{caption}</p>
    </div>
  );
}
