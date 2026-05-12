import Link from "next/link";
import beforeAfterData from "@/data/before-after.json";
import beforeAfterMatchesData from "@/data/before-after-matches.json";
import type { ScoreResult } from "@/lib/scoreEngine";
import type { BeforeAfterItem } from "@/lib/types";
import { VisualMedia } from "@/ui/VisualMedia";

type BeforeAfterMatch = {
  problemId: string;
  matchingBeforeAfterCategory: string;
  matchingServiceType: string;
  fallbackCaseSlug: string;
  fallbackTitle: string;
  fallbackProblem: string;
  fallbackSolution: string;
  fallbackResult: string;
  quoteParamType: "preset" | "upgrade";
  quoteParamValue: string;
};

type MatchingTransformationPreviewProps = {
  label: string;
  result: ScoreResult;
  fallbackTitle: string;
  fallbackText: string;
};

const matches = beforeAfterMatchesData as BeforeAfterMatch[];
const cases = beforeAfterData as BeforeAfterItem[];

function getFeaturedDefaultCase() {
  return cases.find((item) => item.visible && item.featured) ?? cases.find((item) => item.visible);
}

function getPrimaryProblemId(result: ScoreResult) {
  return result.viewingKiller.sourceProblem?.id ?? result.priorityFixes[0]?.id ?? result.selectedProblems[0]?.id;
}

function getMatch(result: ScoreResult) {
  const primaryProblemId = getPrimaryProblemId(result);
  return matches.find((item) => item.problemId === primaryProblemId);
}

function getCase(match?: BeforeAfterMatch) {
  const matchedCase = match?.fallbackCaseSlug ? cases.find((item) => item.visible && item.slug === match.fallbackCaseSlug) : undefined;
  return matchedCase ?? getFeaturedDefaultCase();
}

function getQuoteHref(match: BeforeAfterMatch | undefined, item: BeforeAfterItem | undefined) {
  if (match?.quoteParamValue) return `/quote?${match.quoteParamType}=${encodeURIComponent(match.quoteParamValue)}`;
  if (item?.ctaPreset) return `/quote?preset=${encodeURIComponent(item.ctaPreset)}`;
  return "/quote";
}

export function MatchingTransformationPreview({ label, result, fallbackTitle, fallbackText }: MatchingTransformationPreviewProps) {
  const match = getMatch(result);
  const item = getCase(match);
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
    <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slate-500">{label}</p>
          <p className="mt-2 text-sm font-semibold text-[#9b7b35]">{category}</p>
        </div>
        <Link href={quoteHref} className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
          Quote this fix
        </Link>
      </div>

      <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <VisualMedia className="h-44 rounded-[1.5rem]" src={beforeImage} alt={item.beforeAlt || `${title} before`} label={`${title} before`} sizes="(min-width: 1280px) 16rem, (min-width: 640px) 50vw, 100vw" />
          <VisualMedia className="h-44 rounded-[1.5rem]" src={afterImage} alt={item.afterAlt || `${title} after`} label={`${title} after`} sizes="(min-width: 1280px) 16rem, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="min-w-0">
          <h4 className="break-words text-2xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h4>
          <p className="mt-2 text-sm font-semibold text-[#9b7b35]">{serviceType}</p>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
            <p><span className="font-semibold text-slate-950">Problem:</span> {problem}</p>
            <p><span className="font-semibold text-slate-950">Solution:</span> {solution}</p>
            <p><span className="font-semibold text-slate-950">Result:</span> {transformationResult}</p>
            {(!beforeImage || !afterImage) ? <p className="rounded-2xl bg-[#fff7df] p-3 text-slate-700">{fallbackText}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
