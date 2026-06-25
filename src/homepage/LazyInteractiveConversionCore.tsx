"use client";

import { ComponentType, useEffect, useRef, useState } from "react";

const fallback = <section className="border-y border-[#E6D6BD] bg-[#fbf6ee] px-4 py-12 sm:px-6 lg:px-8" aria-label="Build the Reset loading" />;

type InteractiveModule = {
  InteractiveConversionCore: ComponentType;
};

export function LazyInteractiveConversionCore() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || Component) return;
    let cancelled = false;

    import("@/homepage/InteractiveConversionCore").then((mod: InteractiveModule) => {
      if (!cancelled) setComponent(() => mod.InteractiveConversionCore);
    });

    return () => {
      cancelled = true;
    };
  }, [Component, shouldLoad]);

  return <div ref={rootRef}>{Component ? <Component /> : fallback}</div>;
}
