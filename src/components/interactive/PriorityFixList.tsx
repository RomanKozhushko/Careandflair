import type { ProblemCategory } from "@/lib/scoreEngine";

type PriorityFixListProps = {
  label: string;
  fixes: ProblemCategory[];
};

export function PriorityFixList({ label, fixes }: PriorityFixListProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <div className="mt-4 grid gap-3">
        {fixes.length ? fixes.map((fix, index) => (
          <div key={fix.id} className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-[#f8f5ef] p-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-bold text-[#d7b56d]">{index + 1}</span>
            <div>
              <p className="font-semibold text-slate-950">{fix.label}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{fix.recommendedAction}</p>
            </div>
          </div>
        )) : (
          <p className="rounded-2xl bg-[#f8f5ef] p-4 text-sm leading-6 text-slate-600">Select blockers to generate the top three fixes.</p>
        )}
      </div>
    </div>
  );
}
