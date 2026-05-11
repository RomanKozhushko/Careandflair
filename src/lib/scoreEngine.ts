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

export type ProblemCategory = {
  id: string;
  label: string;
  description: string;
  weight: number;
  severity: "light" | "moderate" | "heavy";
  tags: string[];
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

export type ScoreResult = {
  score: number;
  band: ReadinessBand;
  recommendedPreset: string;
  recommendedPackage: string;
  selectedProblems: ProblemCategory[];
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
  const heavyCount = selectedProblems.filter((problem) => problem.severity === "heavy").length;
  if (score < 40 || heavyCount >= readinessConfig.rules.heavyProblemCountForUltimate || selectedProblems.length >= readinessConfig.rules.totalProblemsForUltimate) return "72h-ultimate-reset";
  if (score < 80 || selectedProblems.length >= readinessConfig.rules.totalProblemsForPro) return "48h-pro-flair-reset";
  return "24h-express-reset";
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

  return {
    score,
    band,
    recommendedPreset: preset,
    recommendedPackage: presetBand.recommendation,
    selectedProblems,
  };
}
