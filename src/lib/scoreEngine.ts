import audienceModesData from "@/data/audience-modes.json";
import problemCategoriesData from "@/data/problem-categories.json";
import readinessScoresData from "@/data/readiness-scores.json";
import type { AudienceMode, ProblemCategory, ReadinessBand, ReadinessScoresConfig, RiskCategory } from "@/lib/types";

export type { AudienceMode, ProblemCategory, ReadinessBand, RiskCategory };

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

const readinessConfig = readinessScoresData as ReadinessScoresConfig;

export const audienceModes = (audienceModesData as AudienceMode[]).filter((item) => item.visible).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
export const problemCategories = (problemCategoriesData as ProblemCategory[]).filter((item) => item.visible).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
export const readinessBands = readinessConfig.bands;

export function createScoreEngine({
  modes,
  problems,
  config,
}: {
  modes: AudienceMode[];
  problems: ProblemCategory[];
  config: ReadinessScoresConfig;
}) {
  const visibleModes = modes.filter((item) => item.visible).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const visibleProblems = problems.filter((item) => item.visible).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const bands = config.bands;

  function getAudienceMode(id: string) {
    return visibleModes.find((item) => item.id === id) ?? visibleModes[0];
  }

  function getProblems(ids: string[]) {
    const uniqueIds = Array.from(new Set(ids));
    return uniqueIds.map((id) => visibleProblems.find((item) => item.id === id)).filter((item): item is ProblemCategory => Boolean(item));
  }

  function findBand(score: number) {
    return bands.find((band) => score >= band.min && score <= band.max) ?? bands[bands.length - 1];
  }

  function choosePreset(score: number, selectedProblems: ProblemCategory[]) {
    const dataPreset = [...selectedProblems].sort((a, b) => b.weight - a.weight)[0]?.quotePreset;
    const heavyCount = selectedProblems.filter((problem) => problem.severity === "heavy").length;
    if (score < 40 || heavyCount >= config.rules.heavyProblemCountForUltimate || selectedProblems.length >= config.rules.totalProblemsForUltimate) return "72h-ultimate-reset";
    if (score < 80 || selectedProblems.length >= config.rules.totalProblemsForPro) return "48h-pro-flair-reset";
    return dataPreset ?? "24h-express-reset";
  }

  function buildViewingKiller(mode: AudienceMode, selectedProblems: ProblemCategory[]): ViewingKiller {
    const sourceProblem = [...selectedProblems].sort((a, b) => {
      const aBoost = mode.priorityProblems.includes(a.id) ? config.audiencePenaltyBoost : 0;
      const bBoost = mode.priorityProblems.includes(b.id) ? config.audiencePenaltyBoost : 0;
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

  function calculateMarketReadyScore(modeId: string, problemIds: string[]): ScoreResult {
    const mode = getAudienceMode(modeId);
    const selectedProblems = getProblems(problemIds);
    const penalty = selectedProblems.reduce((total, problem) => {
      const priorityBoost = mode.priorityProblems.includes(problem.id) ? config.audiencePenaltyBoost : 0;
      return total + problem.weight + priorityBoost;
    }, 0);
    const score = Math.max(0, Math.min(100, config.baseScore - penalty));
    const preset = choosePreset(score, selectedProblems);
    const band = findBand(score);
    const presetBand = bands.find((item) => item.preset === preset) ?? band;
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

  return {
    audienceModes: visibleModes,
    problemCategories: visibleProblems,
    readinessBands: bands,
    getAudienceMode,
    getProblems,
    calculateMarketReadyScore,
  };
}

const fallbackEngine = createScoreEngine({
  modes: audienceModesData as AudienceMode[],
  problems: problemCategoriesData as ProblemCategory[],
  config: readinessConfig,
});

export const getAudienceMode = fallbackEngine.getAudienceMode;
export const getProblems = fallbackEngine.getProblems;
export const calculateMarketReadyScore = fallbackEngine.calculateMarketReadyScore;
