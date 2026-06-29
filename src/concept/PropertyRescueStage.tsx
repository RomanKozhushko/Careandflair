import { ConceptCTA } from "@/concept/ConceptCTA";

const tasks = ["Deep clean", "Silicone refresh", "Wall touch-ups", "Carpet extraction", "Fittings"];

export function PropertyRescueStage({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section id="concept-b" className="relative overflow-hidden bg-[#fff9ee] px-4 py-20 text-[#081613] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(184,255,61,0.24),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(95,230,173,0.2),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="concept-stage min-h-[36rem]">
          <div className="relative mx-auto h-[34rem] max-w-3xl">
            <div className="absolute left-[8%] top-[10%] h-72 w-[54%] -skew-y-6 rounded-[2rem] border border-[#062b24]/12 bg-[#efe3d1] shadow-[0_35px_100px_rgba(4,31,26,0.2)]" />
            <div className="absolute right-[6%] top-[8%] h-72 w-[54%] skew-y-6 rounded-[2rem] border border-[#062b24]/12 bg-white shadow-[0_35px_100px_rgba(4,31,26,0.18)]" />
            <div className="absolute left-[10%] top-[18%] h-52 w-[38%] -skew-y-6 rounded-2xl bg-[linear-gradient(135deg,#cbbda9,#efe3d1)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5f6f68]">Tired side</p>
              <div className="mt-8 h-4 rounded-full bg-[#9b846f]/35" />
              <div className="mt-4 h-4 w-2/3 rounded-full bg-[#9b846f]/30" />
              <span className="absolute bottom-5 left-5 rounded-full bg-[#ff9f5a] px-3 py-2 text-xs font-black text-[#031b16]">marked wall</span>
            </div>
            <div className="absolute right-[9%] top-[18%] h-52 w-[38%] skew-y-6 rounded-2xl bg-[linear-gradient(135deg,#ffffff,#bdfbe0)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b3f34]">Ready side</p>
              <div className="mt-8 h-4 rounded-full bg-[#62e6ad]/45" />
              <div className="mt-4 h-4 w-2/3 rounded-full bg-[#b8ff3d]/60" />
              <span className="absolute bottom-5 right-5 rounded-full bg-[#b8ff3d] px-3 py-2 text-xs font-black text-[#031b16]">ready</span>
            </div>
            <div className="concept-progress-flow absolute left-[18%] right-[18%] top-[54%] h-3 rotate-[-2deg] rounded-full bg-[#062b24]">
              <div className="h-full w-[76%] rounded-full bg-[#b8ff3d]" />
            </div>
            {tasks.map((task, index) => (
              <div
                key={task}
                className="concept-float absolute rounded-2xl border border-white/70 bg-white/82 px-4 py-3 text-sm font-black text-[#073b32] shadow-[0_20px_60px_rgba(4,31,26,0.14)] backdrop-blur"
                style={{ left: `${12 + index * 15}%`, bottom: `${8 + (index % 2) * 10}%`, animationDelay: `${index * 180}ms` }}
              >
                {task}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0b5a48]">Concept B / 3D Property Rescue Stage</p>
          <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">From tired property to ready home, without a full renovation.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f6f68]">We handle the visible problems that make a property feel unfinished, neglected or not ready for photos.</p>
          <div className="mt-8">
            <ConceptCTA whatsappHref={whatsappHref} primary="Get my reset quote" secondary="What do you fix?" dark={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
