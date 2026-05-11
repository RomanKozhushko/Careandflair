import type { AudienceMode } from "@/lib/scoreEngine";

type ModeSwitchProps = {
  title: string;
  modes: AudienceMode[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ModeSwitch({ title, modes, selectedId, onSelect }: ModeSwitchProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 sm:p-5">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d7b56d]">{title}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {modes.map((mode) => {
          const selected = mode.id === selectedId;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode.id)}
              className={`min-w-0 rounded-3xl border p-4 text-left transition ${selected ? "border-[#d7b56d] bg-[#d7b56d] text-slate-950 shadow-lg shadow-[#d7b56d]/20" : "border-white/10 bg-slate-950/40 text-white hover:border-white/25 hover:bg-white/[0.08]"}`}
            >
              <span className="block text-base font-semibold">{mode.label}</span>
              <span className={`mt-2 block text-sm leading-6 ${selected ? "text-slate-800" : "text-slate-300"}`}>{mode.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
