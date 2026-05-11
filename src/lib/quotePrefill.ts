import type { ScoreResult } from "@/lib/scoreEngine";

export type QuotePrefillInput = {
  modeId: string;
  problemIds: string[];
  scoreResult: ScoreResult;
};

export function buildQuotePrefillUrl({ modeId, problemIds, scoreResult }: QuotePrefillInput) {
  const params = new URLSearchParams();
  params.set("mode", modeId);
  if (problemIds.length) params.set("problems", problemIds.join(","));
  params.set("score", String(scoreResult.score));
  params.set("preset", scoreResult.recommendedPreset);
  return `/quote?${params.toString()}`;
}

export function parseProblemParams(value: string | null) {
  if (!value) return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}
