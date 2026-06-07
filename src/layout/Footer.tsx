import Link from "next/link";
import { siteSettings } from "@/lib/content";

export function Footer() {
  const telHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="border-t border-[#B99345]/30 bg-[#0B342C] text-[#F7F1E6]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="brand-label text-xs text-[#B99345]">{siteSettings.positioning}</p>
          <p className="mt-3 text-2xl font-black tracking-[0.18em]">{siteSettings.siteName}</p>
          <div className="my-4 h-px max-w-xs bg-gradient-to-r from-[#B99345] to-transparent" />
          <p className="max-w-md text-sm leading-6 text-[#E8D9C3]">{siteSettings.coreMessage ?? siteSettings.positioning}</p>
          <p className="mt-2 text-sm font-semibold text-[#B99345]">{siteSettings.brandLine}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <div className="mt-3 grid gap-2">
            {siteSettings.footerLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm text-[#E8D9C3] hover:text-[#B99345]">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-[#E8D9C3]">
            <a href={telHref} className="hover:text-[#B99345]">{siteSettings.phone}</a>
            {siteSettings.website ? <a href={`https://${siteSettings.website}`} className="hover:text-[#B99345]">{siteSettings.website}</a> : null}
            <a href={`mailto:${siteSettings.email}`} className="hover:text-[#B99345]">{siteSettings.email}</a>
            <span>{siteSettings.serviceAreaSummary}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
