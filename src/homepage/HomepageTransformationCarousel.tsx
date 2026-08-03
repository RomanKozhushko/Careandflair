"use client";

import Image from "next/image";
import Link from "next/link";
import { PointerEvent, useMemo, useRef, useState } from "react";
import type { HomepageTransformationsContent, HomepageTransformationSlide } from "@/lib/types";
import type { VisualEditorAdapter } from "@/lib/visualEditor";

function safeSlides(slides: HomepageTransformationSlide[]) {
  return [...slides]
    .filter((slide) => slide.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function fallbackImage(src?: string) {
  return src && src.trim().length > 0 ? src : "/images/generated/hero-living-room-reset.jpg";
}

function SlideImage({ src, alt, className = "" }: { src?: string; alt?: string; className?: string }) {
  return (
    <Image
      src={fallbackImage(src)}
      alt={alt ?? "Care & Flair property transformation"}
      fill
      quality={74}
      sizes="(min-width: 1024px) 46vw, 100vw"
      className={`object-cover ${className}`}
    />
  );
}

function HomepageBeforeAfterSlider({
  editor,
  position,
  slide,
  slideIndex,
  onChange,
}: {
  editor?: VisualEditorAdapter;
  position: number;
  slide: HomepageTransformationSlide;
  slideIndex: number;
  onChange: (position: number) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  function updateFromPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    onChange(Math.min(96, Math.max(4, next)));
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  }

  return (
    <div
      ref={frameRef}
      className="group relative h-full min-h-[320px] touch-none select-none overflow-hidden rounded-[24px] border border-white/70 bg-[var(--cf-warm-card)] shadow-[var(--cf-shadow-card)] lg:min-h-[360px]"
      aria-label={`${slide.title} before and after comparison`}
    >
      <div className="absolute inset-0">
        {editor ? editor.image({ resource: "homepage-transformations", path: [0, "slides", slideIndex, "beforeImage"], value: slide.beforeImage, label: `${slide.title} before image`, children: <SlideImage src={slide.beforeImage} alt={slide.beforeAlt} className="object-left" /> }) : <SlideImage src={slide.beforeImage} alt={slide.beforeAlt} className="object-left" />}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        {editor ? editor.image({ resource: "homepage-transformations", path: [0, "slides", slideIndex, "afterImage"], value: slide.afterImage, label: `${slide.title} after image`, children: <SlideImage src={slide.afterImage} alt={slide.afterAlt} className="object-right" /> }) : <SlideImage src={slide.afterImage} alt={slide.afterAlt} className="object-right" />}
      </div>

      <div className={`${editor ? "" : "pointer-events-none"} absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-navy)] shadow-sm`}>
        {editor ? editor.text("homepage-transformations", [0, "slides", slideIndex, "beforeLabel"], slide.beforeLabel || "Before") : (slide.beforeLabel || "Before")}
      </div>
      <div className={`${editor ? "" : "pointer-events-none"} absolute right-4 top-4 rounded-full bg-[var(--cf-navy)]/94 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white shadow-sm`}>
        {editor ? editor.text("homepage-transformations", [0, "slides", slideIndex, "afterLabel"], slide.afterLabel || "After") : (slide.afterLabel || "After")}
      </div>

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

function TextPanel({ editor, label, heading, text, slideIndex, type }: { editor?: VisualEditorAdapter; label: string; heading: string; text: string; slideIndex: number; type: "before" | "after" }) {
  const labelField = type === "before" ? "beforeLabel" : "afterLabel";
  const headingField = type === "before" ? "beforeHeading" : "afterHeading";
  const textField = type === "before" ? "beforeText" : "afterText";
  return (
    <article className="rounded-[24px] border border-white/12 bg-white/[0.05] p-6 text-white lg:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold-soft)]">{editor ? editor.text("homepage-transformations", [0, "slides", slideIndex, labelField], label) : label}</p>
      <h3 className="mt-4 font-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.02em] lg:text-[38px]">{editor ? editor.text("homepage-transformations", [0, "slides", slideIndex, headingField], heading) : heading}</h3>
      <p className="mt-4 text-[16px] leading-7 text-[var(--cf-text-light-soft)] lg:text-[17px]">{editor ? editor.text("homepage-transformations", [0, "slides", slideIndex, textField], text) : text}</p>
    </article>
  );
}

export function HomepageTransformationCarousel({ content, editor }: { content: HomepageTransformationsContent; editor?: VisualEditorAdapter }) {
  const slides = useMemo(() => safeSlides(content.slides ?? []), [content.slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState<Record<string, number>>({});
  const activeSlide = slides[activeIndex] ?? slides[0];
  const activePosition = activeSlide ? positions[activeSlide.id] ?? 52 : 52;
  const activeSourceIndex = activeSlide ? content.slides.findIndex((slide) => slide.id === activeSlide.id) : activeIndex;

  if (!activeSlide) return null;

  function setSlide(index: number) {
    if (slides.length === 0) return;
    setActiveIndex((index + slides.length) % slides.length);
  }

  function updatePosition(position: number) {
    setPositions((current) => ({ ...current, [activeSlide.id]: position }));
  }

  return (
    <section id="before-after" className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[28px] border border-[var(--cf-border-dark)] bg-[linear-gradient(135deg,var(--cf-navy),var(--cf-navy-2))] p-5 text-white shadow-[var(--cf-shadow-navy)] md:p-7 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold-soft)]">{editor ? editor.text("homepage-transformations", [0, "sectionLabel"], content.sectionLabel) : content.sectionLabel}</p>
            <h2 className="mt-3 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-white lg:text-[46px]">{editor ? editor.text("homepage-transformations", [0, "heading"], content.heading) : content.heading}</h2>
            <p className="mt-4 max-w-[720px] text-[17px] leading-8 text-[var(--cf-text-light-soft)]">{editor ? editor.text("homepage-transformations", [0, "subheading"], content.subheading) : content.subheading}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSlide(activeIndex - 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/28 text-xl font-black text-white transition hover:bg-white/10"
              aria-label="Previous transformation"
            >
              {"<"}
            </button>
            <span className="min-w-16 text-center text-sm font-extrabold text-white/82" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => setSlide(activeIndex + 1)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-black text-[var(--cf-navy)] transition hover:bg-[var(--cf-gold-soft)]"
              aria-label="Next transformation"
            >
              {">"}
            </button>
          </div>
        </div>

        <div className="mt-7" aria-live="polite">
          <p className="mb-4 text-[20px] font-extrabold text-white">{editor ? editor.text("homepage-transformations", [0, "slides", activeSourceIndex, "title"], activeSlide.title) : activeSlide.title}</p>
          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.2fr_0.72fr] lg:items-stretch">
            <div className="order-2 lg:order-1">
              <TextPanel editor={editor} label={activeSlide.beforeLabel || "Before"} heading={activeSlide.beforeHeading} text={activeSlide.beforeText} slideIndex={activeSourceIndex} type="before" />
            </div>
            <div className="order-1 min-h-[320px] lg:order-2">
              <HomepageBeforeAfterSlider editor={editor} slide={activeSlide} slideIndex={activeSourceIndex} position={activePosition} onChange={updatePosition} />
            </div>
            <div className="order-3">
              <TextPanel editor={editor} label={activeSlide.afterLabel || "After"} heading={activeSlide.afterHeading} text={activeSlide.afterText} slideIndex={activeSourceIndex} type="after" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {(activeSlide.badges ?? []).map((badge, badgeIndex) => (
              <span key={badge} className="rounded-full bg-white/92 px-4 py-2 text-sm font-extrabold text-[var(--cf-navy)] shadow-sm">
                {editor ? editor.text("homepage-transformations", [0, "slides", activeSourceIndex, "badges", badgeIndex], badge) : badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2" aria-label="Transformation slides">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setSlide(index)}
                  className={`h-2.5 rounded-full transition ${index === activeIndex ? "w-8 bg-[var(--cf-cherry)]" : "w-2.5 bg-white/38 hover:bg-white/70"}`}
                  aria-label={`Show ${slide.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
            {editor ? editor.button({ id: "homepage-transformations-cta", resource: "homepage-transformations", label: content.ctaLabel || "See more transformations", href: content.ctaHref || "/#before-after", labelPath: [0, "ctaLabel"], hrefPath: [0, "ctaHref"], className: "h-11", variant: "ghost" }) : (
              <Link href={content.ctaHref || "/#before-after"} className="inline-flex h-11 items-center justify-center rounded-[14px] border border-white/30 px-5 text-sm font-extrabold text-white transition hover:bg-white/10">
                {content.ctaLabel || "See more transformations"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
