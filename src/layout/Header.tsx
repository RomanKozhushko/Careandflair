import Link from "next/link";
import { findCta, siteSettings } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function Header() {
  const primaryCta = findCta("build-your-quote");
  const telHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <header className="mobile-no-backdrop sticky top-0 z-50 border-b border-[#B99345]/25 bg-[#F7F1E6]/95 text-[#0B342C] shadow-sm shadow-[#0B342C]/5 sm:backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B99345]/55 bg-[#0B342C] text-xs font-black tracking-tight text-[#F7F1E6] shadow-inner shadow-white/10">C&F</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black tracking-[0.2em] text-[#0B342C]">{siteSettings.siteName}</span>
            <span className="hidden text-xs text-[#7A6B58] sm:block">{siteSettings.positioning}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {siteSettings.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-[#17352F] transition hover:text-[#B08A3C]">{item.label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a href={telHref} className="hidden text-sm font-semibold text-[#0B342C] hover:text-[#B08A3C] lg:inline-flex">{siteSettings.phone}</a>
          <div className="hidden sm:block"><CtaButton cta={primaryCta} variant="primary" className="px-4 py-2.5" /></div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[#B99345]/70 to-transparent" />
    </header>
  );
}
