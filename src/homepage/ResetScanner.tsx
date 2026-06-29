import Link from "next/link";
import { VisualMedia } from "@/ui/VisualMedia";

type ResetScannerProps = {
  image?: string;
};

const scanTags = [
  { label: "marked wall", className: "left-[10%] top-[18%]" },
  { label: "old silicone", className: "right-[12%] top-[28%]" },
  { label: "stained carpet", className: "left-[16%] bottom-[22%]" },
  { label: "greasy kitchen", className: "right-[10%] bottom-[18%]" },
];

export function ResetScanner({ image }: ResetScannerProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--cf-deep)] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,255,61,0.2),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(98,230,173,0.14),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div>
          <p className="brand-label text-xs text-[var(--cf-lime)]">Signature reset scanner</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Send photos and we will identify the visible reset work.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--cf-mint)]">
            Not a full renovation. Not guesswork. We look for the visible problems that stop a property feeling ready: old silicone, marked walls, greasy kitchens, stained carpets and tired details.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Photos in", "Visible issues marked", "Clear reset scope", "Ready path quoted"].map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs font-black text-[var(--cf-lime)]">0{index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
          <Link href="/quote" className="cta-glow mt-8 inline-flex rounded-full bg-[var(--cf-lime)] px-6 py-3 text-sm font-black text-[var(--cf-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--cf-lime-strong)]">
            Send photos for a quote
          </Link>
        </div>

        <div className="ad-depth-scene">
          <div className="reset-journey-card relative overflow-hidden rounded-[2rem] border border-white/18 bg-white/10 p-3 shadow-[var(--cf-shadow-deep)] transition duration-300">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16),transparent_42%,rgba(184,255,61,0.12))]" />
            <div className="relative overflow-hidden rounded-[1.55rem] border border-white/20 bg-[var(--cf-bg)]">
              <VisualMedia
                src={image}
                alt="Property reset scanner visual"
                label="Reset scanner property visual"
                className="h-[26rem]"
                imageClassName="object-cover saturate-[0.96]"
                sizes="(min-width: 1024px) 48vw, 92vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(4,31,26,0.8)] via-[rgba(4,31,26,0.12)] to-transparent" />
              <div className="scanner-line" aria-hidden="true" />
              {scanTags.map((tag, index) => (
                <span
                  key={tag.label}
                  className={`scan-reveal-tag absolute ${tag.className} rounded-full border border-[var(--cf-lime)]/40 bg-[var(--cf-deep)]/82 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--cf-lime)] shadow-[0_14px_34px_rgba(4,31,26,0.24)] backdrop-blur`}
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  {tag.label}
                </span>
              ))}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/18 bg-white/90 p-4 text-[var(--cf-deep)] shadow-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--cf-green)]">Reset path</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">Ready for photos / viewing</p>
                  </div>
                  <span className="rounded-full bg-[var(--cf-lime)] px-4 py-2 text-sm font-black">Ready</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--cf-cream-2)]">
                  <div className="progress-sheen h-full w-[82%] rounded-full bg-[var(--cf-lime)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
