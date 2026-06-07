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
    <div className="rounded-[2rem] border border-[#E6D6BD] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#0a2a24]">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#746754]">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-[#0a2a24] px-4 py-3 text-sm font-semibold text-white sm:max-w-64">
          <span className="block text-[0.65rem] uppercase tracking-[0.22em] brass-text">{summaryLabel}</span>
          <span className="mt-1 block break-words text-xs leading-5 text-[#E6D6BD]">{selectedProblems.length ? selectedProblems.map((item) => item.label).join(", ") : emptySummary}</span>
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
              className={`min-w-0 rounded-3xl border p-4 text-left transition ${selected ? "border-[#0a2a24] bg-[#0a2a24] text-white shadow-lg shadow-[#0a2a24]/15" : "border-[#E6D6BD] bg-[#f5ecdc] text-[#0a2a24] hover:border-[#b07e33] hover:bg-white"}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-semibold">{problem.label}</span>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${selected ? "border-[#b07e33] brass-fill text-white" : "border-[#E6D6BD] text-[#746754]"}`}>{selected ? "✓" : "+"}</span>
              </span>
              <span className={`mt-2 block text-sm leading-6 ${selected ? "text-[#E6D6BD]" : "text-[#746754]"}`}>{problem.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
