import type { BeforeAfterItem } from "@/lib/types";
import { BeforeAfterCard } from "@/before-after/BeforeAfterCard";

type BeforeAfterCarouselProps = {
  items: BeforeAfterItem[];
};

export function BeforeAfterCarousel({ items }: BeforeAfterCarouselProps) {
  if (!items.length) return null;

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b7b35]">Visual proof carousel</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Strong transformation examples</h2>
        </div>
      </div>
      <div className="flex snap-x gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <div key={item.id} className="w-[86vw] shrink-0 snap-start sm:w-[28rem] lg:w-[30rem]">
            <BeforeAfterCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
