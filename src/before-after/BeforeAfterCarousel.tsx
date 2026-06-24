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
  const activeIndexRef = useRef(0);
  const scrollFrameRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  if (!sortedItems.length) return null;

  function setActive(index: number) {
    if (index === activeIndexRef.current) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }

  function scrollToIndex(index: number) {
    const nextIndex = Math.max(0, Math.min(sortedItems.length - 1, index));
    setActive(nextIndex);
    const track = trackRef.current;
    const card = track?.children[nextIndex] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  function syncActiveFromScroll() {
    if (scrollFrameRef.current) return;
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
      const track = trackRef.current;
      if (!track) return;
      const children = Array.from(track.children) as HTMLElement[];
      const nearest = children.reduce(
        (best, child, index) => {
          const distance = Math.abs(child.offsetLeft - track.scrollLeft);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: activeIndexRef.current, distance: Number.POSITIVE_INFINITY },
      );
      setActive(nearest.index);
    });
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="brand-label text-xs brass-text">Common examples</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0a2a24]">Problems that stop a property feeling ready</h2>
        </div>
        <div className="hidden gap-2 lg:flex">
          <button type="button" onClick={() => scrollToIndex(activeIndex - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-[#E6D6BD] bg-white text-xl font-semibold text-[#0a2a24] shadow-sm transition hover:border-[#b07e33]/35" aria-label="Previous example">‹</button>
          <button type="button" onClick={() => scrollToIndex(activeIndex + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-[#E6D6BD] bg-white text-xl font-semibold text-[#0a2a24] shadow-sm transition hover:border-[#b07e33]/35" aria-label="Next example">›</button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={syncActiveFromScroll}
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
            className={`h-2.5 rounded-full transition ${activeIndex === index ? "w-8 bg-[#0a2a24]" : "w-2.5 bg-[#E6D6BD] hover:bg-[#b07e33]/45"}`}
            aria-label={`Go to ${item.title}`}
          />
        ))}
      </div>
    </section>
  );
}
