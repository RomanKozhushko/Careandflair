import Link from "next/link";
import { createContentHelpers, type ContentBundle } from "@/lib/content";

export function Header({ content }: { content?: ContentBundle }) {
  const { siteSettings } = createContentHelpers(content);
  const whatsappMessage = "Hi Care & Flair, I'd like a quote. I can send photos of the property and tell you the deadline.";
  const whatsappHref = `https://wa.me/${siteSettings.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
  const navItems = [
    { label: "Services", href: "/#solutions" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Before & after", href: "/before-after" },
    { label: "Areas", href: "/#areas" },
    { label: "About", href: "/#areas" },
  ];

  return (
    <header className="mobile-no-backdrop sticky top-0 z-50 border-b border-[var(--cf-border)] bg-[var(--cf-ivory-2)]/96 text-[var(--cf-navy)] shadow-sm shadow-[rgba(8,27,45,0.06)] sm:backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[var(--cf-gold-soft)] bg-[var(--cf-navy)] text-xs font-black tracking-tight text-white shadow-inner shadow-white/10">C&F</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black tracking-[0.18em] text-[var(--cf-navy)]">Care <span className="text-[var(--cf-gold)]">&</span> Flair</span>
            <span className="hidden text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--cf-text-soft)] sm:block">Property reset</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-[var(--cf-navy)]/82 transition hover:text-[var(--cf-cherry)]">{item.label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/quote" className="hidden h-11 items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] transition hover:-translate-y-px hover:bg-[var(--cf-cherry-2)] sm:inline-flex">
            Get a quote
          </Link>
          <a href={whatsappHref} className="inline-flex h-11 items-center justify-center rounded-[14px] border border-[rgba(8,27,45,0.22)] bg-white px-4 text-sm font-extrabold text-[var(--cf-navy)] transition hover:-translate-y-px hover:bg-[var(--cf-cream-card)]">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--cf-gold)]/35 to-transparent" />
    </header>
  );
}
