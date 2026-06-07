import type { AudienceMode } from "@/lib/scoreEngine";

type ModeSwitchProps = {
  title: string;
  modes: AudienceMode[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ModeSwitch({ title, modes, selectedId, onSelect }: ModeSwitchProps) {
  return (
    <div className="rounded-[2rem] border border-[#B99345]/25 bg-[#F7F1E6]/[0.06] p-4 shadow-2xl shadow-black/20 sm:p-5">
      <p className="brand-label text-xs text-[#B99345]">{title}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {modes.map((mode) => {
          const selected = mode.id === selectedId;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode.id)}
              className={`min-w-0 rounded-3xl border p-4 text-left transition ${selected ? "border-[#B99345] bg-[#B99345] text-white shadow-lg shadow-[#B99345]/20" : "border-[#B99345]/20 bg-[#17352F]/60 text-[#F7F1E6] hover:border-[#B99345]/45 hover:bg-white/[0.08]"}`}
            >
              <span className="block text-base font-semibold">{mode.label}</span>
              <span className={`mt-2 block text-sm leading-6 ${selected ? "text-white/90" : "text-[#E8D9C3]"}`}>{mode.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
