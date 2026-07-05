"use client";

import Image from "next/image";
import { PointerEvent, useRef, useState } from "react";
import type { BeforeAfterItem } from "@/lib/types";

function imageOrFallback(src?: string, fallback = "/images/generated/hero-living-room-reset.jpg") {
  return src && src.trim().length > 0 ? src : fallback;
}

function SliderImage({ src, alt, className = "", priority = false }: { src?: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={imageOrFallback(src)}
      alt={alt}
      fill
      priority={priority}
      quality={74}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={`object-cover ${className}`}
    />
  );
}

export function HeroBeforeAfterSlider({ item, heroImage, priority = false }: { item?: BeforeAfterItem; heroImage?: string; priority?: boolean }) {
  const [position, setPosition] = useState(52);
  const frameRef = useRef<HTMLDivElement>(null);
  const before = imageOrFallback(item?.beforeImage, heroImage);
  const after = imageOrFallback(item?.afterImage, heroImage);

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
      className="group relative h-full min-h-[320px] touch-none select-none overflow-hidden rounded-[24px] bg-[var(--cf-warm-card)] shadow-[var(--cf-shadow-card)]"
      aria-label="Hero before and after comparison"
    >
      <div className="absolute inset-0">
        <SliderImage src={before} alt={item?.beforeAlt ?? "Property before reset"} priority={priority} className="saturate-[0.82]" />
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <SliderImage src={after} alt={item?.afterAlt ?? "Property after reset"} priority={priority} className="transition duration-500 group-hover:scale-[1.015]" />
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-navy)] shadow-sm">Before</div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-[var(--cf-navy)]/94 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white shadow-sm">After</div>

      <div
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(8,27,45,0.14)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-[var(--cf-cream-card)] text-lg font-black text-[var(--cf-cherry)] shadow-[var(--cf-shadow-soft)] transition group-hover:scale-105">
          <span aria-hidden="true">||</span>
        </div>
      </div>

      <div
        className="absolute inset-y-0 z-30 -translate-x-1/2 cursor-ew-resize"
        style={{ left: `${position}%`, width: "20%" }}
        onPointerDown={startDrag}
        onPointerMove={(event) => event.buttons === 1 && updateFromPointer(event)}
        aria-hidden="true"
      />
    </div>
  );
}
