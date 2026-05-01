"use client";

import { PointerEvent, useRef, useState } from "react";
import type { BeforeAfterItem } from "@/lib/types";
import { VisualMedia } from "@/ui/VisualMedia";

type BeforeAfterSliderProps = {
  item: BeforeAfterItem;
  className?: string;
};

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
      className={`relative aspect-[4/3] min-h-72 select-none overflow-hidden rounded-[1.75rem] bg-slate-100 touch-none ${className}`}
      onPointerDown={startDrag}
      onPointerMove={(event) => event.buttons === 1 && updateFromPointer(event)}
    >
      <div className="absolute inset-0">
        <VisualMedia
          src={item.beforeImage}
          alt={item.beforeAlt ?? `${item.title} before`}
          label={`${item.title} before`}
          className="h-full w-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <VisualMedia
          src={item.afterImage}
          alt={item.afterAlt ?? `${item.title} after`}
          label={`${item.title} after`}
          className="h-full w-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-800 shadow-sm">Before</div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm">After</div>

      <div
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.12),0_0_24px_rgba(15,23,42,0.35)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white text-slate-950 shadow-xl">
          <span className="text-lg font-bold leading-none">↔</span>
        </div>
      </div>
    </div>
  );
}
