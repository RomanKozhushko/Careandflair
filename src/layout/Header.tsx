import Link from "next/link";
import { findCta, siteSettings } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function Header() {
  const primaryCta = findCta("build-your-quote");
  const telHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <header className="mobile-no-backdrop sticky top-0 z-50 border-b border-[#b07e33]/18 bg-[#f5ecdc]/96 text-[#0a2a24] shadow-sm shadow-[#0a2a24]/5 sm:backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b07e33]/35 bg-[#0a2a24] text-xs font-black tracking-tight text-[#f5ecdc] shadow-inner shadow-white/10">C&F</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black tracking-[0.2em] text-[#0a2a24]">{siteSettings.siteName}</span>
            <span className="hidden text-xs text-[#746754] sm:block">{siteSettings.positioning}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {siteSettings.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-[#14241F] transition hover:text-[#b07e33]">{item.label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a href={telHref} className="hidden text-sm font-semibold text-[#0a2a24] hover:text-[#b07e33] lg:inline-flex">{siteSettings.phone}</a>
          <div className="hidden sm:block"><CtaButton cta={primaryCta} variant="primary" className="px-4 py-2.5" /></div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[#b07e33]/45 to-transparent" />
    </header>
  );
}
