import { VisionCTA } from "@/vision/VisionCTA";

const paths = [
  ["Move-In Reset", "You have the keys, but it still feels like someone else's home.", "smells, old fittings, tired bathroom, wall marks", "move-in ready feeling", "Make it move-in ready"],
  ["Rental Reset", "Tenant moved out and the property needs to be shown again.", "marks, carpets, kitchen grease, bathroom details", "viewing-ready", "Get it viewing ready"],
  ["Sale-Ready Reset", "Before photos and viewings, fix what buyers notice first.", "walls, grout, silicone, tired rooms", "photo-ready", "Prepare for sale photos"],
  ["Airbnb Launch & Recovery", "More than a standard clean.", "guest wear, smells, bathroom/kitchen details", "guest-ready confidence", "Make it guest-ready"],
];

export function ResetPathCards({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section className="bg-[var(--vf-cream)] px-4 py-20 text-[var(--vf-text-dark)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Four reset paths. One clear result.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {paths.map(([title, headline, problems, result, cta], index) => (
            <article key={title} className="vf-depth-card rounded-[1.6rem] border border-white bg-white/78 p-5 shadow-[var(--vf-shadow-soft)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--vf-green-bright)]">Path 0{index + 1}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-4 text-base font-semibold leading-7">{headline}</p>
              <p className="mt-4 text-sm leading-6 text-[var(--vf-text-soft)]"><strong>Problems:</strong> {problems}</p>
              <span className="mt-5 inline-flex rounded-full bg-[var(--vf-mint)] px-3 py-2 text-xs font-black">{result}</span>
              <div className="mt-6"><VisionCTA whatsappHref={whatsappHref} primary={cta} secondary="Quote builder" light /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
