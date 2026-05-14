import Link from "next/link";
import { findCta, siteSettings } from "@/lib/content";
import { CtaButton } from "@/ui/CtaButton";

export function Header() {
  const primaryCta = findCta("build-your-quote");

  return (
    <header className="mobile-no-backdrop sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 sm:bg-slate-950/90 sm:backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d7b56d]/40 bg-white/5 text-sm font-black tracking-tight text-[#d7b56d] shadow-inner shadow-white/10">C&F</span>
          <span>
            <span className="block text-sm font-bold tracking-wide text-white">{siteSettings.siteName}</span>
            <span className="hidden text-xs text-slate-400 sm:block">{siteSettings.positioning}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {siteSettings.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">{item.label}</Link>
          ))}
        </nav>
        <div className="hidden sm:block"><CtaButton cta={primaryCta} variant="primary" className="px-4 py-2.5" /></div>
      </div>
    </header>
  );
}
