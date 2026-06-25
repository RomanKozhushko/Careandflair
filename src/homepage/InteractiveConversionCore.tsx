"use client";

import { useMemo, useState } from "react";
import interactiveToolsData from "@/data/interactive-tools.json";
import { InteractiveCTA } from "@/components/interactive/InteractiveCTA";
import { MarketReadyScore } from "@/components/interactive/MarketReadyScore";
import { ModeSwitch } from "@/components/interactive/ModeSwitch";
import { ProblemPicker } from "@/components/interactive/ProblemPicker";
import { ResetReportSummary } from "@/components/interactive/ResetReportSummary";
import { buildQuotePrefillUrl } from "@/lib/quotePrefill";
import { audienceModes, calculateMarketReadyScore, getAudienceMode, problemCategories } from "@/lib/scoreEngine";

const config = interactiveToolsData.conversionCore;

export function InteractiveConversionCore() {
  const [modeId, setModeId] = useState(audienceModes[0]?.id ?? "landlord");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);

  const mode = getAudienceMode(modeId);
  const scoreResult = useMemo(() => calculateMarketReadyScore(modeId, selectedProblems), [modeId, selectedProblems]);
  const quoteHref = buildQuotePrefillUrl({ modeId, problemIds: selectedProblems, scoreResult });

  function toggleProblem(id: string) {
    setSelectedProblems((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  if (!config.visible) return null;

  return (
    <section className="overflow-hidden border-y border-[#E6D6BD] bg-[#fbf6ee] px-4 py-16 text-[#0a2a24] sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-[#746754]">{config.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">{config.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#746754] sm:text-lg">{config.subtitle}</p>
            {config.commonReasons?.length ? (
              <ul className="mt-4 grid max-w-2xl gap-2 text-sm leading-6 text-[#14241F] sm:grid-cols-2">
                {config.commonReasons.map((reason: string) => (
                  <li key={reason} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b07e33]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="grid gap-3 rounded-[1.5rem] border border-[#E6D6BD] bg-white p-4 text-sm text-[#746754] shadow-sm sm:grid-cols-2">
            <span>{config.steps.mode}</span>
            <span>{config.steps.problems}</span>
            <span>{config.steps.score}</span>
            <span>{config.steps.recommendation}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-5">
          <ModeSwitch title={config.steps.mode} modes={audienceModes} selectedId={modeId} onSelect={setModeId} />
          <ProblemPicker
            title={config.problemPicker.title}
            subtitle={config.problemPicker.subtitle}
            summaryLabel={config.problemPicker.selectedSummary}
            emptySummary={config.problemPicker.emptySummary}
            problems={problemCategories}
            selectedIds={selectedProblems}
            onToggle={toggleProblem}
          />

          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
            <MarketReadyScore title={config.score.title} caption={config.score.caption} result={scoreResult} />
            <ResetReportSummary
              title={config.report.title}
              subtitle={config.report.subtitle}
              emptyState={config.report.emptyState}
              modeLabel={config.report.modeLabel}
              problemLabel={config.report.problemLabel}
              pathLabel={config.report.pathLabel}
              viewingKillerLabel={config.report.viewingKillerLabel}
              priorityLabel={config.report.priorityLabel}
              upgradesLabel={config.report.upgradesLabel}
              whyLabel={config.report.whyLabel}
              previewLabel={config.report.previewLabel}
              fallbackTitle={config.report.fallbackTitle}
              fallbackText={config.report.fallbackText}
              mode={mode}
              result={scoreResult}
            />
          </div>

          <InteractiveCTA href={quoteHref} label={config.cta.label} helper={config.cta.helper} disabledLabel={config.cta.disabledLabel} disabled={selectedProblems.length === 0} />
        </div>
      </div>
    </section>
  );
}
