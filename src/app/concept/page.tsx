import { BeforeAfterImpactMachine } from "@/concept/BeforeAfterImpactMachine";
import { CinematicResetScanner } from "@/concept/CinematicResetScanner";
import { PropertyRescueStage } from "@/concept/PropertyRescueStage";
import siteSettings from "@/data/site-settings.json";

export const dynamic = "force-dynamic";

export default function ConceptPage() {
  const whatsappHref = `https://wa.me/${siteSettings.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi Care & Flair, I want to send photos and get a clear reset quote.",
  )}`;

  return (
    <main id="concepts" className="min-h-screen overflow-x-clip bg-[#f4ebdd]">
      <section className="relative overflow-hidden bg-[#031b16] px-4 py-8 text-[#effffa] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b8ff3d]">Care & Flair concept sprint</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">THE RESET MOMENT</h1>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <a href="#concept-a" className="rounded-full bg-white/10 px-4 py-2 text-[#effffa]">A Scanner</a>
            <a href="#concept-b" className="rounded-full bg-white/10 px-4 py-2 text-[#effffa]">B Stage</a>
            <a href="#concept-c" className="rounded-full bg-white/10 px-4 py-2 text-[#effffa]">C Impact</a>
          </div>
        </div>
      </section>
      <CinematicResetScanner whatsappHref={whatsappHref} />
      <PropertyRescueStage whatsappHref={whatsappHref} />
      <BeforeAfterImpactMachine whatsappHref={whatsappHref} />
    </main>
  );
}
