import optionalUpgradesData from "@/data/optional-upgrades.json";
import { MatchingTransformationPreview } from "@/components/interactive/MatchingTransformationPreview";
import { PriorityFixList } from "@/components/interactive/PriorityFixList";
import { ViewingKillerDetector } from "@/components/interactive/ViewingKillerDetector";
import type { AudienceMode, ScoreResult } from "@/lib/scoreEngine";
import type { OptionalUpgrade } from "@/lib/types";

type ResetDiagnosisReportProps = {
  title: string;
  subtitle: string;
  emptyState: string;
  modeLabel: string;
  problemLabel: string;
  pathLabel: string;
  viewingKillerLabel: string;
  priorityLabel: string;
  upgradesLabel: string;
  whyLabel: string;
  previewLabel: string;
  fallbackTitle: string;
  fallbackText: string;
  mode: AudienceMode;
  result: ScoreResult;
};

const upgrades = optionalUpgradesData as OptionalUpgrade[];

export function ResetDiagnosisReport({ title, subtitle, emptyState, modeLabel, problemLabel, pathLabel, viewingKillerLabel, priorityLabel, upgradesLabel, whyLabel, previewLabel, fallbackTitle, fallbackText, mode, result }: ResetDiagnosisReportProps) {
  const hasProblems = result.selectedProblems.length > 0;
  const suggestedUpgrades = result.suggestedUpgradeIds.map((id) => upgrades.find((upgrade) => upgrade.id === id)).filter((item): item is OptionalUpgrade => Boolean(item));

  return (
    <div className="rounded-[2rem] border border-[#E6D6BD] bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="brand-label text-xs text-[#b07e33]">{title}</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0a2a24] sm:text-4xl">{hasProblems ? result.viewingKiller.riskLabel : "Quote-ready property diagnosis"}</h3>
          <p className="mt-3 text-sm leading-6 text-[#746754]">{hasProblems ? subtitle : emptyState}</p>
        </div>
        <div className="grid gap-3 rounded-[1.75rem] bg-[#f5ecdc] p-4 sm:grid-cols-3">
          <div>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#746754]">Market-ready score</span>
            <p className="mt-1 text-3xl font-semibold text-[#0a2a24]">{result.score}<span className="text-base text-[#746754]">/100</span></p>
          </div>
          <div>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#746754]">{modeLabel}</span>
            <p className="mt-1 text-sm font-semibold text-[#0a2a24]">{mode.label}</p>
          </div>
          <div>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#746754]">{pathLabel}</span>
            <p className="mt-1 text-sm font-semibold text-[#0a2a24]">{result.recommendedPackage}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <ViewingKillerDetector label={viewingKillerLabel} killer={result.viewingKiller} />
        <PriorityFixList label={priorityLabel} fixes={result.priorityFixes} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[1.75rem] border border-[#E6D6BD] bg-[#f5ecdc] p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#746754]">{problemLabel}</p>
          <p className="mt-3 break-words text-sm leading-6 text-[#14241F]">{hasProblems ? result.selectedProblems.map((item) => item.label).join(", ") : "Choose blockers to shape the reset path."}</p>
        </div>
        <div className="rounded-[1.75rem] border border-[#E6D6BD] bg-[#f5ecdc] p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#746754]">{upgradesLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedUpgrades.length ? suggestedUpgrades.map((upgrade) => (
              <span key={upgrade.id} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#14241F] shadow-sm">{upgrade.title}</span>
            )) : <span className="text-sm leading-6 text-[#746754]">Suggested upgrades appear after selecting blockers.</span>}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[1.75rem] border border-[#b07e33]/40 bg-[#f5ecdc] p-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#b07e33]">{whyLabel}</p>
        <p className="mt-3 text-sm leading-6 text-[#14241F]">{result.whyThisMatters}</p>
      </div>

      <div className="mt-5">
        <MatchingTransformationPreview label={previewLabel} result={result} fallbackTitle={fallbackTitle} fallbackText={fallbackText} />
      </div>
    </div>
  );
}
