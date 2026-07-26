import Link from "next/link";
import type { ContentBundle } from "@/lib/content";
import type { ScoreResult } from "@/lib/scoreEngine";
import type { BeforeAfterItem, BeforeAfterMatch } from "@/lib/types";
import { VisualMedia } from "@/ui/VisualMedia";

type MatchingTransformationPreviewProps = {
  label: string;
  result: ScoreResult;
  fallbackTitle: string;
  fallbackText: string;
  content: ContentBundle;
};

function getFeaturedDefaultCase(cases: BeforeAfterItem[]) {
  return cases.find((item) => item.visible && item.featured) ?? cases.find((item) => item.visible);
}

function getPrimaryProblemId(result: ScoreResult) {
  return result.viewingKiller.sourceProblem?.id ?? result.priorityFixes[0]?.id ?? result.selectedProblems[0]?.id;
}

function getMatch(result: ScoreResult, matches: BeforeAfterMatch[]) {
  const primaryProblemId = getPrimaryProblemId(result);
  return matches.find((item) => item.problemId === primaryProblemId);
}

function getCase(cases: BeforeAfterItem[], match?: BeforeAfterMatch) {
  const matchedCase = match?.fallbackCaseSlug ? cases.find((item) => item.visible && item.slug === match.fallbackCaseSlug) : undefined;
  return matchedCase ?? getFeaturedDefaultCase(cases);
}

function getQuoteHref(match: BeforeAfterMatch | undefined, item: BeforeAfterItem | undefined) {
  if (match?.quoteParamValue) return `/quote?${match.quoteParamType}=${encodeURIComponent(match.quoteParamValue)}`;
  if (item?.ctaPreset) return `/quote?preset=${encodeURIComponent(item.ctaPreset)}`;
  return "/quote";
}

export function MatchingTransformationPreview({ label, result, fallbackTitle, fallbackText, content }: MatchingTransformationPreviewProps) {
  const match = getMatch(result, content.beforeAfterMatches);
  const item = getCase(content.beforeAfterItems, match);
  if (!item) return null;

  const title = match?.fallbackTitle ?? item.title ?? fallbackTitle;
  const serviceType = match?.matchingServiceType ?? item.serviceType;
  const category = match?.matchingBeforeAfterCategory ?? item.category;
  const problem = match?.fallbackProblem ?? item.problem;
  const solution = match?.fallbackSolution ?? item.solution;
  const transformationResult = match?.fallbackResult ?? item.result;
  const shouldUseCaseImages = !match || Boolean(match.fallbackCaseSlug);
  const beforeImage = shouldUseCaseImages ? item.beforeImage : undefined;
  const afterImage = shouldUseCaseImages ? item.afterImage : undefined;
  const quoteHref = getQuoteHref(match, item);

  return (
    <div className="min-w-0 rounded-[1.75rem] border border-[#E6D6BD] bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#746754]">{label}</p>
          <p className="mt-2 text-sm font-semibold brass-text">{category}</p>
        </div>
        <Link href={quoteHref} className="inline-flex shrink-0 items-center justify-center rounded-full brass-fill px-4 py-2 text-xs font-semibold text-[#061A17] transition hover:brightness-105">
          Quote this fix
        </Link>
      </div>

      <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <VisualMedia className="h-44 rounded-[1.5rem]" src={beforeImage} alt={item.beforeAlt || `${title} before`} label={`${title} before`} sizes="(min-width: 1280px) 16rem, (min-width: 640px) 50vw, 100vw" />
          <VisualMedia className="h-44 rounded-[1.5rem]" src={afterImage} alt={item.afterAlt || `${title} after`} label={`${title} after`} sizes="(min-width: 1280px) 16rem, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="min-w-0">
          <h4 className="break-words text-2xl font-semibold tracking-[-0.04em] text-[#0a2a24]">{title}</h4>
          <p className="mt-2 text-sm font-semibold brass-text">{serviceType}</p>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-[#746754]">
            <p><span className="font-semibold text-[#0a2a24]">Problem:</span> {problem}</p>
            <p><span className="font-semibold text-[#0a2a24]">Solution:</span> {solution}</p>
            <p><span className="font-semibold text-[#0a2a24]">Result:</span> {transformationResult}</p>
            {(!beforeImage || !afterImage) ? <p className="rounded-2xl bg-[#E6D6BD] p-3 text-[#14241F]">{fallbackText}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
