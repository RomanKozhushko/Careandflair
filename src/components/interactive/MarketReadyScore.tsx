import type { ScoreResult } from "@/lib/scoreEngine";
import { ScoreCard } from "@/components/interactive/ScoreCard";

type MarketReadyScoreProps = {
  title: string;
  caption: string;
  result: ScoreResult;
};

export function MarketReadyScore(props: MarketReadyScoreProps) {
  return <ScoreCard {...props} />;
}
