import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { visualCtaHref } from "@/before-after/cta";

type FeaturedTransformationProps = {
  item: BeforeAfterItem;
};

export function FeaturedTransformation({ item }: FeaturedTransformationProps) {
  return (
    <section className="rounded-xl border border-[#E6D6BD] bg-white p-4 text-[#0a2a24] shadow-sm shadow-[#0a2a24]/5 sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <BeforeAfterSlider item={item} />
        <div>
          <p className="text-sm font-semibold text-[#746754]">Common reset example</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h2>
          <p className="mt-3 text-sm font-semibold text-[#746754]">{item.category} · {item.location}</p>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-[#746754]">
            <p><span className="font-semibold text-[#0a2a24]">Problem:</span> {item.problem}</p>
            <p><span className="font-semibold text-[#0a2a24]">Solution:</span> {item.solution}</p>
            <p><span className="font-semibold text-[#0a2a24]">Result:</span> {item.result}</p>
          </div>
          <Link href={visualCtaHref(item.ctaPreset)} className="mt-8 inline-flex rounded-full bg-[#0a2a24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#061A17]">
            {item.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
