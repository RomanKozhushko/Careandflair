import type { AudienceMode, ScoreResult } from "@/lib/scoreEngine";

type ResetReportSummaryProps = {
  title: string;
  subtitle: string;
  emptyState: string;
  modeLabel: string;
  problemLabel: string;
  pathLabel: string;
  mode: AudienceMode;
  result: ScoreResult;
};

export function ResetReportSummary({ title, subtitle, emptyState, modeLabel, problemLabel, pathLabel, mode, result }: ResetReportSummaryProps) {
  const hasProblems = result.selectedProblems.length > 0;

  return (
    <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b7b35]">{title}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{result.recommendedPackage}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{hasProblems ? subtitle : emptyState}</p>

      <div className="mt-5 grid gap-3">
        <div className="rounded-3xl bg-[#f8f5ef] p-4">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-500">{modeLabel}</span>
          <p className="mt-1 font-semibold text-slate-950">{mode.label}</p>
        </div>
        <div className="rounded-3xl bg-[#f8f5ef] p-4">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-500">{problemLabel}</span>
          <p className="mt-1 break-words text-sm leading-6 text-slate-700">{hasProblems ? result.selectedProblems.map((item) => item.label).join(", ") : "Choose blockers to shape the reset path."}</p>
        </div>
        <div className="rounded-3xl bg-slate-950 p-4 text-white">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#d7b56d]">{pathLabel}</span>
          <p className="mt-1 font-semibold">{result.recommendedPackage}</p>
        </div>
      </div>
    </div>
  );
}
