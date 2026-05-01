"use client";

import { useMemo, useRef, useState } from "react";
import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterCard } from "@/before-after/BeforeAfterCard";

function sortFeaturedFirst(items: BeforeAfterItem[]) {
  return [...items].sort((a, b) => Number(b.featured) - Number(a.featured) || (a.order ?? 0) - (b.order ?? 0));
}

type BeforeAfterCarouselProps = {
  items: BeforeAfterItem[];
};

export function BeforeAfterCarousel({ items }: BeforeAfterCarouselProps) {
  const sortedItems = useMemo(() => sortFeaturedFirst(items), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  if (!sortedItems.length) return null;

  function scrollToIndex(index: number) {
    const nextIndex = Math.max(0, Math.min(sortedItems.length - 1, index));
    setActiveIndex(nextIndex);
    const track = trackRef.current;
    const card = track?.children[nextIndex] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b7b35]">Visual proof carousel</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Featured transformations first</h2>
        </div>
        <div className="hidden gap-2 lg:flex">
          <button type="button" onClick={() => scrollToIndex(activeIndex - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-xl font-semibold text-slate-950 shadow-sm transition hover:border-slate-400" aria-label="Previous transformation">‹</button>
          <button type="button" onClick={() => scrollToIndex(activeIndex + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-xl font-semibold text-slate-950 shadow-sm transition hover:border-slate-400" aria-label="Next transformation">›</button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={() => {
          const track = trackRef.current;
          if (!track) return;
          const children = Array.from(track.children) as HTMLElement[];
          const nearest = children.reduce((best, child, index) => {
            const distance = Math.abs(child.offsetLeft - track.scrollLeft);
            return distance < best.distance ? { index, distance } : best;
          }, { index: activeIndex, distance: Number.POSITIVE_INFINITY });
          setActiveIndex(nearest.index);
        }}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sortedItems.map((item) => (
          <div key={item.id} className="w-[86vw] shrink-0 snap-start sm:w-[28rem] lg:w-[30rem]">
            <BeforeAfterCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {sortedItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition ${activeIndex === index ? "w-8 bg-slate-950" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
            aria-label={`Go to ${item.title}`}
          />
        ))}
      </div>
    </section>
  );
}
