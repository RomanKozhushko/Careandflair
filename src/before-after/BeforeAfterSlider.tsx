"use client";

import Image from "next/image";
import { PointerEvent, useRef, useState } from "react";
import type { BeforeAfterItem } from "@/lib/types";
import { BrandedPlaceholder } from "@/ui/VisualMedia";

type BeforeAfterSliderProps = {
  item: BeforeAfterItem;
  className?: string;
};

type SliderLayerProps = {
  src?: string;
  alt: string;
  label: string;
};

function SliderLayer({ src, alt, label }: SliderLayerProps) {
  if (!src) return <BrandedPlaceholder label={label} />;

  return <Image src={src} alt={alt} fill quality={72} className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />;
}

export function BeforeAfterSlider({ item, className = "" }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);
  const frameRef = useRef<HTMLDivElement>(null);

  function updateFromPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  }

  return (
    <div
      ref={frameRef}
      className={`relative aspect-[4/3] min-h-72 select-none overflow-hidden rounded-[1.75rem] border border-[rgba(255,255,255,0.72)] bg-[var(--cf-line)] shadow-[0_24px_64px_rgba(16,32,28,0.16)] touch-none ${className}`}
      onPointerDown={startDrag}
      onPointerMove={(event) => event.buttons === 1 && updateFromPointer(event)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <SliderLayer
          src={item.beforeImage}
          alt={item.beforeAlt ?? `${item.title} before`}
          label={`${item.title} before`}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <SliderLayer
          src={item.afterImage}
          alt={item.afterAlt ?? `${item.title} after`}
          label={`${item.title} after`}
        />
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--cf-text)] shadow-sm">Before</div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-[var(--cf-deep-green)]/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm">After</div>
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-[var(--cf-mint)] px-3 py-1 text-xs font-semibold text-[var(--cf-deep-green)] shadow-sm">Drag to compare</div>

      <div
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(8,47,40,0.12),0_0_20px_rgba(183,232,106,0.42)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--cf-line)] bg-white text-[var(--cf-deep-green)] shadow-md sm:shadow-xl">
          <span className="text-lg font-bold leading-none">↔</span>
        </div>
      </div>
    </div>
  );
}
