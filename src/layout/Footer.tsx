import Link from "next/link";
import { createContentHelpers, type ContentBundle } from "@/lib/content";

export function Footer({ content }: { content?: ContentBundle }) {
  const { siteSettings } = createContentHelpers(content);
  const telHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="border-t border-[var(--cf-border-dark)] bg-[var(--cf-navy)] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold-soft)]">Property reset</p>
          <p className="mt-3 text-2xl font-black tracking-[0.18em]">Care <span className="text-[var(--cf-gold-soft)]">&</span> Flair</p>
          <div className="my-4 h-px max-w-xs bg-gradient-to-r from-[var(--cf-gold)] to-transparent" />
          <p className="max-w-md text-sm leading-6 text-white/78">{siteSettings.coreMessage ?? siteSettings.positioning}</p>
          <p className="mt-2 text-sm font-semibold text-[var(--cf-gold-soft)]">{siteSettings.brandLine}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <div className="mt-3 grid gap-2">
            {siteSettings.footerLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm text-white/78 hover:text-[var(--cf-gold-soft)]">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-white/78">
            <a href={telHref} className="hover:text-[var(--cf-gold-soft)]">{siteSettings.phone}</a>
            {siteSettings.website ? <a href={`https://${siteSettings.website}`} className="hover:text-[var(--cf-gold-soft)]">{siteSettings.website}</a> : null}
            <a href={`mailto:${siteSettings.email}`} className="hover:text-[var(--cf-gold-soft)]">{siteSettings.email}</a>
            <span>{siteSettings.serviceAreaSummary}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
