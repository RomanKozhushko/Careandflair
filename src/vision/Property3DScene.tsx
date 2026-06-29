const tasks = ["Deep clean", "Silicone refresh", "Wall touch-ups", "Carpet extraction", "Fittings", "Photo proof"];

export function Property3DScene() {
  return (
    <section className="relative overflow-hidden bg-[var(--vf-paper)] px-4 py-20 text-[var(--vf-text-dark)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--vf-green-bright)]">3D property scene</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">A tired property moves through the reset path.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--vf-text-soft)]">Left side: tired details. Right side: ready feeling. Between them: the practical Care & Flair reset.</p>
        </div>
        <div className="vf-stage relative min-h-[34rem]">
          <div className="absolute left-[3%] top-[12%] h-72 w-[54%] -skew-y-6 rounded-[2rem] bg-[#d8c9b6] shadow-[var(--vf-shadow-soft)]" />
          <div className="absolute right-[3%] top-[10%] h-72 w-[54%] skew-y-6 rounded-[2rem] bg-white shadow-[var(--vf-shadow-soft)]" />
          <div className="absolute left-[8%] top-[18%] h-52 w-[40%] -skew-y-6 rounded-2xl bg-[linear-gradient(135deg,#bfae98,#efe3d1)] p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--vf-text-soft)]">Tired property</p>
            <span className="absolute bottom-5 left-5 rounded-full bg-[var(--vf-coral)] px-3 py-2 text-xs font-black">dusty corner</span>
            <span className="absolute right-5 top-16 rounded-full bg-white/70 px-3 py-2 text-xs font-black">dull carpet</span>
          </div>
          <div className="absolute right-[8%] top-[18%] h-52 w-[40%] skew-y-6 rounded-2xl bg-[linear-gradient(135deg,#ffffff,#bdfbe0)] p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--vf-green)]">Ready property</p>
            <span className="absolute bottom-5 right-5 rounded-full bg-[var(--vf-lime)] px-3 py-2 text-xs font-black">ready</span>
          </div>
          <div className="vf-progress absolute left-[18%] right-[18%] top-[56%] h-3 rotate-[-2deg] rounded-full bg-[var(--vf-deep)]">
            <div className="h-full w-[78%] rounded-full bg-[var(--vf-lime)]" />
          </div>
          {tasks.map((task, index) => (
            <div key={task} className="vf-float absolute rounded-2xl border border-white bg-white/82 px-4 py-3 text-sm font-black text-[var(--vf-green)] shadow-[var(--vf-shadow-soft)] backdrop-blur" style={{ left: `${8 + index * 14}%`, bottom: `${8 + (index % 3) * 8}%`, animationDelay: `${index * 150}ms` }}>{task}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
