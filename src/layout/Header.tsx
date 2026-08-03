import Link from "next/link";
import { createContentHelpers, type ContentBundle } from "@/lib/content";
import type { VisualEditorAdapter } from "@/lib/visualEditor";

export function Header({ content, editor }: { content?: ContentBundle; editor?: VisualEditorAdapter }) {
  const { siteSettings } = createContentHelpers(content);
  const whatsappMessage = "Hi Care & Flair, I'd like a quote. I can send photos of the property and tell you the deadline.";
  const whatsappHref = `https://wa.me/${siteSettings.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
  const navItems = siteSettings.navigation;
  const quoteButton = {
    id: "header-quote",
    resource: "site-settings" as const,
    label: typeof siteSettings.headerQuoteLabel === "string" ? siteSettings.headerQuoteLabel : "Get a quote",
    href: typeof siteSettings.headerQuoteHref === "string" ? siteSettings.headerQuoteHref : "/quote",
  };
  const whatsappButton = {
    id: "header-whatsapp",
    resource: "site-settings" as const,
    label: typeof siteSettings.headerWhatsappLabel === "string" ? siteSettings.headerWhatsappLabel : "WhatsApp",
    href: typeof siteSettings.headerWhatsappHref === "string" ? siteSettings.headerWhatsappHref : whatsappHref,
  };

  return (
    <header className="mobile-no-backdrop sticky top-0 z-50 border-b border-[var(--cf-border)] bg-[var(--cf-ivory-2)]/96 text-[var(--cf-navy)] shadow-sm shadow-[rgba(8,27,45,0.06)] sm:backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[var(--cf-gold-soft)] bg-[var(--cf-navy)] text-xs font-black tracking-tight text-white shadow-inner shadow-white/10">C&F</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black tracking-[0.18em] text-[var(--cf-navy)]">
              {editor ? editor.text("site-settings", [0, "siteName"], siteSettings.siteName) : <>Care <span className="text-[var(--cf-gold)]">&</span> Flair</>}
            </span>
            <span className="hidden text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--cf-text-soft)] sm:block">
              {editor ? editor.text("site-settings", [0, "positioning"], siteSettings.positioning) : "Property reset"}
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-[var(--cf-navy)]/82 transition hover:text-[var(--cf-cherry)]">
              {editor ? editor.text("site-settings", [0, "navigation", index, "label"], item.label) : item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          {editor ? (
            editor.button({
              ...quoteButton,
              labelPath: [0, "headerQuoteLabel"],
              hrefPath: [0, "headerQuoteHref"],
              className: "hidden sm:inline-flex",
              variant: "primary",
            })
          ) : (
            <Link href="/quote" className="hidden h-11 items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] transition hover:-translate-y-px hover:bg-[var(--cf-cherry-2)] sm:inline-flex">
              Get a quote
            </Link>
          )}
          {editor ? (
            editor.button({
              ...whatsappButton,
              labelPath: [0, "headerWhatsappLabel"],
              hrefPath: [0, "headerWhatsappHref"],
              className: "",
              variant: "whatsapp",
              icon: (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[var(--cf-whatsapp)]">
                  <path fill="currentColor" d="M12.04 2C6.58 2 2.14 6.42 2.14 11.86c0 1.74.46 3.44 1.33 4.94L2 22l5.34-1.4a9.9 9.9 0 0 0 4.7 1.19h.01c5.46 0 9.9-4.42 9.9-9.86C21.95 6.43 17.51 2 12.04 2Zm0 18.11a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.17.83.85-3.08-.2-.32a8.16 8.16 0 1 1 7 3.89Zm4.5-6.12c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.57.12-.16.24-.65.8-.8.96-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.45-1.37-1.7-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
                </svg>
              ),
            })
          ) : (
            <a href={whatsappHref} className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-[rgba(8,27,45,0.18)] bg-white px-4 text-sm font-extrabold text-[var(--cf-navy)] shadow-sm transition hover:-translate-y-px hover:border-[rgba(37,211,102,0.35)] hover:bg-[rgba(37,211,102,0.08)]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[var(--cf-whatsapp)]">
                <path fill="currentColor" d="M12.04 2C6.58 2 2.14 6.42 2.14 11.86c0 1.74.46 3.44 1.33 4.94L2 22l5.34-1.4a9.9 9.9 0 0 0 4.7 1.19h.01c5.46 0 9.9-4.42 9.9-9.86C21.95 6.43 17.51 2 12.04 2Zm0 18.11a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.17.83.85-3.08-.2-.32a8.16 8.16 0 1 1 7 3.89Zm4.5-6.12c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.57.12-.16.24-.65.8-.8.96-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.45-1.37-1.7-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
              </svg>
              WhatsApp
            </a>
          )}
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--cf-gold)]/35 to-transparent" />
    </header>
  );
}
