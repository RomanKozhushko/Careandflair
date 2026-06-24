import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { visualCtaHref } from "@/before-after/cta";

type FeaturedTransformationProps = {
  item: BeforeAfterItem;
};

export function FeaturedTransformation({ item }: FeaturedTransformationProps) {
  return (
    <section className="rounded-[2rem] border border-[#b07e33]/18 bg-[#0a2a24] p-4 text-white shadow-lg shadow-[#0a2a24]/10 sm:p-6 lg:p-8 lg:shadow-2xl">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <BeforeAfterSlider item={item} />
        <div>
          <p className="brand-label text-xs brass-text">Common reset example</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#E6D6BD]">{item.category} · {item.location}</p>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-[#E6D6BD]">
            <p><span className="font-semibold text-white">Problem:</span> {item.problem}</p>
            <p><span className="font-semibold text-white">Solution:</span> {item.solution}</p>
            <p><span className="font-semibold text-white">Result:</span> {item.result}</p>
          </div>
          <Link href={visualCtaHref(item.ctaPreset)} className="mt-8 inline-flex rounded-full border border-white/75 bg-white px-6 py-3 text-sm font-semibold text-[#061A17] transition hover:bg-[#f5ecdc]">
            {item.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
