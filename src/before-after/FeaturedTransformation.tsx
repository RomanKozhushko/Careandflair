import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { visualCtaHref } from "@/before-after/cta";

type FeaturedTransformationProps = {
  item: BeforeAfterItem;
};

export function FeaturedTransformation({ item }: FeaturedTransformationProps) {
  return (
    <section className="glass-card rounded-xl p-4 text-[var(--cf-deep-green)] sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <BeforeAfterSlider item={item} />
        <div>
          <p className="text-sm font-semibold text-[var(--cf-muted)]">Common reset example</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h2>
          <p className="mt-3 text-sm font-semibold text-[var(--cf-muted)]">{item.category} · {item.location}</p>
          <div className="mt-5 inline-flex rounded-full bg-[var(--cf-mint)] px-4 py-2 text-sm font-semibold text-[var(--cf-deep-green)]">Photo-visible reset</div>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-[var(--cf-muted)]">
            <p><span className="font-semibold text-[var(--cf-deep-green)]">Problem:</span> {item.problem}</p>
            <p><span className="font-semibold text-[var(--cf-deep-green)]">Solution:</span> {item.solution}</p>
            <p><span className="font-semibold text-[var(--cf-deep-green)]">Result:</span> {item.result}</p>
          </div>
          <Link href={visualCtaHref(item.ctaPreset)} className="mt-8 inline-flex rounded-full bg-[var(--cf-deep-green)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(8,47,40,0.18)] transition hover:bg-[var(--cf-green-2)]">
            {item.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
