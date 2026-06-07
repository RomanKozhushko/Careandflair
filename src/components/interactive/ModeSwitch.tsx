import type { AudienceMode } from "@/lib/scoreEngine";

type ModeSwitchProps = {
  title: string;
  modes: AudienceMode[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ModeSwitch({ title, modes, selectedId, onSelect }: ModeSwitchProps) {
  return (
    <div className="rounded-[2rem] border border-[#b07e33]/25 bg-[#f5ecdc]/[0.06] p-4 shadow-2xl shadow-black/20 sm:p-5">
      <p className="brand-label text-xs brass-text">{title}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {modes.map((mode) => {
          const selected = mode.id === selectedId;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode.id)}
              className={`min-w-0 rounded-3xl border p-4 text-left transition ${selected ? "border-[#b07e33]/45 bg-[#0a2a24] text-white shadow-lg shadow-[#0a2a24]/20" : "border-[#b07e33]/20 bg-[#14241F]/60 text-[#f5ecdc] hover:border-[#b07e33]/45 hover:bg-white/[0.08]"}`}
            >
              <span className="block text-base font-semibold">{mode.label}</span>
              <span className={`mt-2 block text-sm leading-6 ${selected ? "text-white/90" : "text-[#E6D6BD]"}`}>{mode.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
