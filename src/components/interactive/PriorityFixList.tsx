import type { ProblemCategory } from "@/lib/scoreEngine";

type PriorityFixListProps = {
  label: string;
  fixes: ProblemCategory[];
};

export function PriorityFixList({ label, fixes }: PriorityFixListProps) {
  return (
    <div className="rounded-[1.75rem] border border-[#E6D6BD] bg-white p-5">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#746754]">{label}</p>
      <div className="mt-4 grid gap-3">
        {fixes.length ? fixes.map((fix, index) => (
          <div key={fix.id} className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-[#f5ecdc] p-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0a2a24] text-sm font-bold text-[#b07e33]">{index + 1}</span>
            <div>
              <p className="font-semibold text-[#0a2a24]">{fix.label}</p>
              <p className="mt-1 text-sm leading-6 text-[#746754]">{fix.recommendedAction}</p>
            </div>
          </div>
        )) : (
          <p className="rounded-2xl bg-[#f5ecdc] p-4 text-sm leading-6 text-[#746754]">Select blockers to generate the top three fixes.</p>
        )}
      </div>
    </div>
  );
}
