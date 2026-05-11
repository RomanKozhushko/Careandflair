import type { ProblemCategory } from "@/lib/scoreEngine";

type ProblemPickerProps = {
  title: string;
  subtitle: string;
  summaryLabel: string;
  emptySummary: string;
  problems: ProblemCategory[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function ProblemPicker({ title, subtitle, summaryLabel, emptySummary, problems, selectedIds, onToggle }: ProblemPickerProps) {
  const selectedProblems = problems.filter((problem) => selectedIds.includes(problem.id));

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white sm:max-w-64">
          <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-[#d7b56d]">{summaryLabel}</span>
          <span className="mt-1 block break-words text-xs leading-5 text-slate-200">{selectedProblems.length ? selectedProblems.map((item) => item.label).join(", ") : emptySummary}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => {
          const selected = selectedIds.includes(problem.id);
          return (
            <button
              key={problem.id}
              type="button"
              onClick={() => onToggle(problem.id)}
              className={`min-w-0 rounded-3xl border p-4 text-left transition ${selected ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15" : "border-slate-200 bg-[#f8f5ef] text-slate-950 hover:border-[#d7b56d] hover:bg-white"}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-semibold">{problem.label}</span>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${selected ? "border-[#d7b56d] bg-[#d7b56d] text-slate-950" : "border-slate-300 text-slate-400"}`}>{selected ? "✓" : "+"}</span>
              </span>
              <span className={`mt-2 block text-sm leading-6 ${selected ? "text-slate-300" : "text-slate-600"}`}>{problem.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
