"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function eventNameForHref(href: string) {
  if (href.includes("wa.me")) return "whatsapp_click";
  if (href.includes("/quote")) return "quote_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  return null;
}

export function AnalyticsEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const eventName = eventNameForHref(anchor.href);
      if (!eventName) return;

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({
        event: eventName,
        href: anchor.href,
        text: anchor.innerText.trim().slice(0, 120),
        path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
