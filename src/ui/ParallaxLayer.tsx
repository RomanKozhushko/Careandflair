"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import siteSettings from "@/data/site-settings.json";

type ParallaxIntensity = "subtle" | "medium" | "off";

type ParallaxSettings = {
  parallaxEnabled?: boolean;
  parallaxIntensity?: ParallaxIntensity;
  disableOnMobile?: boolean;
};

type ParallaxLayerProps = {
  children?: ReactNode;
  className?: string;
  depth?: number;
  scaleDepth?: number;
  perspective?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
};

const settings = siteSettings as typeof siteSettings & { parallax?: ParallaxSettings };
const parallaxSettings = settings.parallax ?? {};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function intensityMultiplier(intensity?: ParallaxIntensity) {
  if (intensity === "off") return 0;
  if (intensity === "medium") return 1;
  return 0.58;
}

export function useParallaxScroll<T extends HTMLElement>({
  depth = 10,
  scaleDepth = 0,
  perspective = false,
  disabled = false,
}: Omit<ParallaxLayerProps, "children" | "className" | "style"> = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const configured = parallaxSettings.parallaxEnabled !== false && intensityMultiplier(parallaxSettings.parallaxIntensity) > 0;

    const reset = () => {
      element.style.transform = "";
      element.style.willChange = "";
    };

    const update = () => {
      frame = 0;

      if (disabled || !configured || reduceMotion.matches || (mobile.matches && parallaxSettings.disableOnMobile !== false)) {
        reset();
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.bottom < -120 || rect.top > viewportHeight + 120) {
        element.style.willChange = "";
        return;
      }

      const mobileMultiplier = mobile.matches ? 0.28 : 1;
      const multiplier = intensityMultiplier(parallaxSettings.parallaxIntensity) * mobileMultiplier;
      const progress = clamp((viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight, -1, 1);
      const translateY = progress * depth * multiplier;
      const scale = scaleDepth ? 1 + Math.abs(progress) * scaleDepth * multiplier : 1;
      const transform = `${perspective ? "perspective(1100px) " : ""}translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;

      element.style.transform = transform;
      element.style.willChange = "transform";
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduceMotion.addEventListener("change", schedule);
    mobile.addEventListener("change", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduceMotion.removeEventListener("change", schedule);
      mobile.removeEventListener("change", schedule);
      reset();
    };
  }, [depth, disabled, perspective, scaleDepth]);

  return ref;
}

export function ParallaxLayer({ children, className, depth = 10, scaleDepth = 0, perspective = false, disabled = false, style }: ParallaxLayerProps) {
  const ref = useParallaxScroll<HTMLDivElement>({ depth, scaleDepth, perspective, disabled });

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
