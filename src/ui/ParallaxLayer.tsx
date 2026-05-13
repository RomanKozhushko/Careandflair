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
  if (intensity === "medium") return 0.72;
  return 0.48;
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
    const configured = parallaxSettings.parallaxEnabled !== false && intensityMultiplier(parallaxSettings.parallaxIntensity) > 0;

    let frame = 0;
    let scrollListenersActive = false;
    let visible = false;

    const reset = () => {
      element.style.transform = "";
      element.style.willChange = "";
    };

    const shouldDisable = () => disabled || !configured || reduceMotion.matches || (mobile.matches && parallaxSettings.disableOnMobile !== false);

    const update = () => {
      frame = 0;

      if (shouldDisable() || !visible) {
        reset();
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const multiplier = intensityMultiplier(parallaxSettings.parallaxIntensity);
      const progress = clamp((viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight, -1, 1);
      const translateY = progress * depth * multiplier;
      const scale = scaleDepth ? 1 + Math.abs(progress) * scaleDepth * multiplier : 1;
      const rotateX = perspective ? progress * -0.24 * multiplier : 0;
      const transform = `${perspective ? "perspective(1200px) " : ""}translate3d(0, ${translateY.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(3)}deg) scale(${scale.toFixed(4)})`;

      element.style.transform = transform;
      element.style.willChange = "transform";
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const addScrollListeners = () => {
      if (scrollListenersActive || shouldDisable()) return;
      scrollListenersActive = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      schedule();
    };

    const removeScrollListeners = () => {
      if (!scrollListenersActive) return;
      scrollListenersActive = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    const evaluate = () => {
      if (shouldDisable()) {
        removeScrollListeners();
        reset();
        return;
      }

      if (visible) addScrollListeners();
      else removeScrollListeners();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        evaluate();
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(element);
    reduceMotion.addEventListener("change", evaluate);
    mobile.addEventListener("change", evaluate);
    evaluate();

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      removeScrollListeners();
      reduceMotion.removeEventListener("change", evaluate);
      mobile.removeEventListener("change", evaluate);
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
