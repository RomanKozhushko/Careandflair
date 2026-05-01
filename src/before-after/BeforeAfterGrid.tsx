"use client";

import { useState } from "react";
import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterCard } from "@/before-after/BeforeAfterCard";

const galleryCategories = [
  "All",
  "Bathroom",
  "Kitchen",
  "Mould",
  "Carpet",
  "Patio / Driveway",
  "Full Property Reset",
  "Windows / Frames",
  "Exterior",
];

type BeforeAfterGridProps = {
  items: BeforeAfterItem[];
};

export function BeforeAfterGrid({ items }: BeforeAfterGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredItems = activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <section>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b7b35]">Gallery grid</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Browse before & after proof</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Filter by reset type and jump from each visual proof card into a quote intent.</p>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:max-w-3xl lg:flex-wrap lg:justify-end lg:overflow-visible">
          {galleryCategories.map((category) => {
            const count = category === "All" ? items.length : items.filter((item) => item.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
              >
                {category}{count ? <span className="ml-2 opacity-60">{count}</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => <BeforeAfterCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}
