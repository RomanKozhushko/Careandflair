import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterSlider } from "@/before-after/BeforeAfterSlider";
import { visualCtaHref } from "@/before-after/cta";
import { ParallaxLayer } from "@/ui/ParallaxLayer";

type FeaturedTransformationProps = {
  item: BeforeAfterItem;
};

export function FeaturedTransformation({ item }: FeaturedTransformationProps) {
  return (
    <ParallaxLayer depth={18} scaleDepth={0.006} perspective className="rounded-[2rem] bg-slate-950 p-4 text-white shadow-2xl shadow-slate-950/20 sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <BeforeAfterSlider item={item} />
        <ParallaxLayer depth={-9}>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d7b56d]">Featured transformation</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{item.category} · {item.location}</p>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-300">
            <p><span className="font-semibold text-white">Problem:</span> {item.problem}</p>
            <p><span className="font-semibold text-white">Solution:</span> {item.solution}</p>
            <p><span className="font-semibold text-white">Result:</span> {item.result}</p>
          </div>
          <Link href={visualCtaHref(item.ctaPreset)} className="mt-8 inline-flex rounded-full bg-[#d7b56d] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e4c77f]">
            {item.ctaLabel}
          </Link>
        </ParallaxLayer>
      </div>
    </ParallaxLayer>
  );
}
