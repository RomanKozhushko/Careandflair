"use client";

import { useMemo, useState } from "react";
import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterCard } from "@/before-after/BeforeAfterCard";

type BeforeAfterGridProps = {
  items: BeforeAfterItem[];
};

export function BeforeAfterGrid({ items }: BeforeAfterGridProps) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredItems = activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b7b35]">Gallery grid</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Browse before & after proof</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => <BeforeAfterCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}
