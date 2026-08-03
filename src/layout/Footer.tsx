import Link from "next/link";
import { createContentHelpers, type ContentBundle } from "@/lib/content";
import type { VisualEditorAdapter } from "@/lib/visualEditor";

export function Footer({ content, editor }: { content?: ContentBundle; editor?: VisualEditorAdapter }) {
  const { siteSettings } = createContentHelpers(content);
  const telHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="border-t border-[var(--cf-border-dark)] bg-[var(--cf-navy)] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold-soft)]">
            {editor ? editor.text("site-settings", [0, "positioning"], siteSettings.positioning) : "Property reset"}
          </p>
          <p className="mt-3 text-2xl font-black tracking-[0.18em]">
            {editor ? editor.text("site-settings", [0, "siteName"], siteSettings.siteName) : <>Care <span className="text-[var(--cf-gold-soft)]">&</span> Flair</>}
          </p>
          <div className="my-4 h-px max-w-xs bg-gradient-to-r from-[var(--cf-gold)] to-transparent" />
          <p className="max-w-md text-sm leading-6 text-white/78">
            {editor ? editor.text("site-settings", [0, "coreMessage"], siteSettings.coreMessage ?? siteSettings.positioning) : (siteSettings.coreMessage ?? siteSettings.positioning)}
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--cf-gold-soft)]">
            {editor ? editor.text("site-settings", [0, "brandLine"], siteSettings.brandLine ?? "") : siteSettings.brandLine}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            {editor ? editor.text("site-settings", [0, "footerExploreLabel"], typeof siteSettings.footerExploreLabel === "string" ? siteSettings.footerExploreLabel : "Explore") : "Explore"}
          </p>
          <div className="mt-3 grid gap-2">
            {siteSettings.footerLinks.map((link, index) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/78 hover:text-[var(--cf-gold-soft)]">
                {editor ? editor.text("site-settings", [0, "footerLinks", index, "label"], link.label) : link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            {editor ? editor.text("site-settings", [0, "footerContactLabel"], typeof siteSettings.footerContactLabel === "string" ? siteSettings.footerContactLabel : "Contact") : "Contact"}
          </p>
          <div className="mt-3 grid gap-2 text-sm text-white/78">
            <a href={telHref} className="hover:text-[var(--cf-gold-soft)]">{editor ? editor.text("site-settings", [0, "phone"], siteSettings.phone) : siteSettings.phone}</a>
            {siteSettings.website ? <a href={`https://${siteSettings.website}`} className="hover:text-[var(--cf-gold-soft)]">{editor ? editor.text("site-settings", [0, "website"], siteSettings.website) : siteSettings.website}</a> : null}
            <a href={`mailto:${siteSettings.email}`} className="hover:text-[var(--cf-gold-soft)]">{editor ? editor.text("site-settings", [0, "email"], siteSettings.email) : siteSettings.email}</a>
            <span>{editor ? editor.text("site-settings", [0, "serviceAreaSummary"], siteSettings.serviceAreaSummary) : siteSettings.serviceAreaSummary}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
