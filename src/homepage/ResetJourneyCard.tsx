import Link from "next/link";
import { VisualMedia } from "@/ui/VisualMedia";

type ResetJourneyCardProps = {
  image?: string;
};

const journeySteps = [
  { label: "Tired property", detail: "Marked walls, smells, tired bathroom", state: "Issue" },
  { label: "Visible problems found", detail: "Photos turn into a clear reset scope", state: "Diagnose" },
  { label: "Reset in progress", detail: "Cleaning, touch-ups and small fixes", state: "Active" },
  { label: "Ready for viewing", detail: "Move-in, photos or handover ready", state: "Ready" },
];

export function ResetJourneyCard({ image }: ResetJourneyCardProps) {
  return (
    <div className="ad-depth-scene">
      <div className="reset-journey-card interactive-border relative overflow-hidden rounded-[1.5rem] border border-white/70 p-4 transition duration-300 sm:p-5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--cf-lime)]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-6 h-44 w-44 rounded-full bg-[var(--cf-mint-strong)]/22 blur-3xl" />

        <div className="relative grid gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="overflow-hidden rounded-2xl border border-white/80 bg-[var(--cf-bg)] shadow-[0_18px_45px_rgba(16,32,28,0.14)]">
            <div className="relative">
              <VisualMedia
                src={image}
                alt="Care and Flair reset journey preview"
                label="Reset journey preview"
                className="h-44 sm:h-52"
                imageClassName="object-cover saturate-[1.05]"
                sizes="(min-width: 1024px) 22vw, 88vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,43,36,0.62)] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--cf-text)]">Before</span>
                <span className="rounded-full bg-[var(--cf-lime)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--cf-deep-green)]">Ready</span>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-[var(--cf-line)] bg-white/86 text-center text-[11px] font-bold text-[var(--cf-muted)]">
              <span className="px-2 py-3">Photos</span>
              <span className="border-x border-[var(--cf-line)] px-2 py-3">Scope</span>
              <span className="px-2 py-3">Reset</span>
            </div>
          </div>

          <div className="relative">
            <p className="brand-label text-[10px] text-[var(--cf-green)]">From tired to ready</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--cf-deep-green)]">A clear reset path before work starts.</h3>
            <div className="mt-5 space-y-3">
              {journeySteps.map((step, index) => (
                <div key={step.label} className="grid grid-cols-[auto_1fr] gap-3">
                  <div className="relative pt-1">
                    <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black ${index === 2 ? "status-pulse-once bg-[var(--cf-coral)] text-[var(--cf-deep-green)]" : "bg-[var(--cf-deep-green)] text-white"}`}>
                      {index + 1}
                    </div>
                    {index < journeySteps.length - 1 ? <div className="progress-sheen mx-auto mt-1 h-8 w-1 rounded-full bg-[var(--cf-lime)]" /> : null}
                  </div>
                  <div className="rounded-2xl border border-white/80 bg-white/72 p-3 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-[var(--cf-deep-green)]">{step.label}</p>
                      <span className="shrink-0 rounded-full bg-[var(--cf-mint)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cf-green)]">{step.state}</span>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-[var(--cf-muted)]">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/quote" className="cta-glow mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--cf-deep-green)] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--cf-green)] sm:w-auto">
              Send photos for a quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
