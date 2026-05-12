import audienceModesData from "@/data/audience-modes.json";
import problemCategoriesData from "@/data/problem-categories.json";
import readinessScoresData from "@/data/readiness-scores.json";

export type AudienceMode = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  priorityProblems: string[];
  ctaLabel: string;
  visible: boolean;
  order: number;
};

export type RiskCategory =
  | "bathroom-trust"
  | "odour-smell"
  | "photo-readiness"
  | "curb-appeal"
  | "hygiene-confidence"
  | "tenant-damage-impression"
  | "guest-readiness-risk";

export type ProblemCategory = {
  id: string;
  label: string;
  description: string;
  weight: number;
  severity: "light" | "moderate" | "heavy";
  tags: string[];
  riskCategory: RiskCategory;
  riskLabel: string;
  riskExplanation: string;
  recommendedAction: string;
  recommendedPackage: string;
  recommendedUpgrades: string[];
  quotePreset: string;
  matchingBeforeAfterCategory: string;
  visible: boolean;
  order: number;
};

export type ReadinessBand = {
  id: string;
  min: number;
  max: number;
  label: string;
  tone: "good" | "watch" | "urgent" | "critical";
  summary: string;
  preset: string;
  recommendation: string;
};

export type ViewingKiller = {
  riskCategory: RiskCategory | "none";
  riskLabel: string;
  riskExplanation: string;
  recommendedAction: string;
  sourceProblem?: ProblemCategory;
};

export type ScoreResult = {
  score: number;
  band: ReadinessBand;
  recommendedPreset: string;
  recommendedPackage: string;
  selectedProblems: ProblemCategory[];
  viewingKiller: ViewingKiller;
  priorityFixes: ProblemCategory[];
  suggestedUpgradeIds: string[];
  matchingBeforeAfterCategory?: string;
  whyThisMatters: string;
  diagnosisSlug: string;
};

const readinessConfig = readinessScoresData as {
  baseScore: number;
  audiencePenaltyBoost: number;
  bands: ReadinessBand[];
  rules: {
    heavyProblemCountForUltimate: number;
    totalProblemsForUltimate: number;
    totalProblemsForPro: number;
  };
};

export const audienceModes = (audienceModesData as AudienceMode[]).filter((item) => item.visible).sort((a, b) => a.order - b.order);
export const problemCategories = (problemCategoriesData as ProblemCategory[]).filter((item) => item.visible).sort((a, b) => a.order - b.order);
export const readinessBands = readinessConfig.bands;

export function getAudienceMode(id: string) {
  return audienceModes.find((item) => item.id === id) ?? audienceModes[0];
}

export function getProblems(ids: string[]) {
  const uniqueIds = Array.from(new Set(ids));
  return uniqueIds.map((id) => problemCategories.find((item) => item.id === id)).filter((item): item is ProblemCategory => Boolean(item));
}

function findBand(score: number) {
  return readinessBands.find((band) => score >= band.min && score <= band.max) ?? readinessBands[readinessBands.length - 1];
}

function choosePreset(score: number, selectedProblems: ProblemCategory[]) {
  const dataPreset = [...selectedProblems].sort((a, b) => b.weight - a.weight)[0]?.quotePreset;
  const heavyCount = selectedProblems.filter((problem) => problem.severity === "heavy").length;
  if (score < 40 || heavyCount >= readinessConfig.rules.heavyProblemCountForUltimate || selectedProblems.length >= readinessConfig.rules.totalProblemsForUltimate) return "72h-ultimate-reset";
  if (score < 80 || selectedProblems.length >= readinessConfig.rules.totalProblemsForPro) return "48h-pro-flair-reset";
  return dataPreset ?? "24h-express-reset";
}

function buildViewingKiller(mode: AudienceMode, selectedProblems: ProblemCategory[]): ViewingKiller {
  const sourceProblem = [...selectedProblems].sort((a, b) => {
    const aBoost = mode.priorityProblems.includes(a.id) ? readinessConfig.audiencePenaltyBoost : 0;
    const bBoost = mode.priorityProblems.includes(b.id) ? readinessConfig.audiencePenaltyBoost : 0;
    return b.weight + bBoost - (a.weight + aBoost);
  })[0];

  if (!sourceProblem) {
    return {
      riskCategory: "none",
      riskLabel: "No blocker selected",
      riskExplanation: "Choose the visible problems and we’ll identify the main viewing killer.",
      recommendedAction: "Select at least one blocker to build a quote-ready diagnosis.",
    };
  }

  return {
    riskCategory: sourceProblem.riskCategory,
    riskLabel: sourceProblem.riskLabel,
    riskExplanation: sourceProblem.riskExplanation,
    recommendedAction: sourceProblem.recommendedAction,
    sourceProblem,
  };
}

function buildWhyThisMatters(mode: AudienceMode, viewingKiller: ViewingKiller, selectedProblems: ProblemCategory[]) {
  if (!selectedProblems.length) return "A sharper reset plan starts with the blockers people notice first: smell, hygiene, photos, kerb appeal and evidence of previous use.";
  return `${mode.shortLabel || mode.label} prospects judge the property quickly. ${viewingKiller.riskExplanation} Fixing this first helps protect viewing confidence, photo quality and quote clarity.`;
}

export function calculateMarketReadyScore(modeId: string, problemIds: string[]): ScoreResult {
  const mode = getAudienceMode(modeId);
  const selectedProblems = getProblems(problemIds);
  const penalty = selectedProblems.reduce((total, problem) => {
    const priorityBoost = mode.priorityProblems.includes(problem.id) ? readinessConfig.audiencePenaltyBoost : 0;
    return total + problem.weight + priorityBoost;
  }, 0);
  const score = Math.max(0, Math.min(100, readinessConfig.baseScore - penalty));
  const preset = choosePreset(score, selectedProblems);
  const band = findBand(score);
  const presetBand = readinessBands.find((item) => item.preset === preset) ?? band;
  const viewingKiller = buildViewingKiller(mode, selectedProblems);
  const priorityFixes = [...selectedProblems].sort((a, b) => b.weight - a.weight).slice(0, 3);
  const suggestedUpgradeIds = Array.from(new Set(priorityFixes.flatMap((problem) => problem.recommendedUpgrades))).slice(0, 4);

  return {
    score,
    band,
    recommendedPreset: preset,
    recommendedPackage: presetBand.recommendation,
    selectedProblems,
    viewingKiller,
    priorityFixes,
    suggestedUpgradeIds,
    matchingBeforeAfterCategory: viewingKiller.sourceProblem?.matchingBeforeAfterCategory,
    whyThisMatters: buildWhyThisMatters(mode, viewingKiller, selectedProblems),
    diagnosisSlug: viewingKiller.riskCategory,
  };
}
