import Link from "next/link";
import { createContentHelpers, type ContentBundle } from "@/lib/content";

export function Footer({ content }: { content?: ContentBundle }) {
  const { siteSettings } = createContentHelpers(content);
  const telHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="border-t border-[#b07e33]/25 bg-[#061A17] text-[#f5ecdc]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="brand-label text-xs brass-text">{siteSettings.positioning}</p>
          <p className="mt-3 text-2xl font-black tracking-[0.18em]">{siteSettings.siteName}</p>
          <div className="my-4 h-px max-w-xs bg-gradient-to-r from-[#b07e33] to-transparent" />
          <p className="max-w-md text-sm leading-6 text-[#E6D6BD]">{siteSettings.coreMessage ?? siteSettings.positioning}</p>
          <p className="mt-2 text-sm font-semibold brass-text">{siteSettings.brandLine}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <div className="mt-3 grid gap-2">
            {siteSettings.footerLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm text-[#E6D6BD] hover:text-[#b07e33]">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-[#E6D6BD]">
            <a href={telHref} className="hover:text-[#b07e33]">{siteSettings.phone}</a>
            {siteSettings.website ? <a href={`https://${siteSettings.website}`} className="hover:text-[#b07e33]">{siteSettings.website}</a> : null}
            <a href={`mailto:${siteSettings.email}`} className="hover:text-[#b07e33]">{siteSettings.email}</a>
            <span>{siteSettings.serviceAreaSummary}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
