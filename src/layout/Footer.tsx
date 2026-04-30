import Link from "next/link";
import { siteSettings } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-bold text-slate-950">{siteSettings.siteName}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{siteSettings.positioning} across {siteSettings.serviceAreaSummary}.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Explore</p>
          <div className="mt-3 grid gap-2">
            {siteSettings.footerLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-slate-950">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <a href={`tel:${siteSettings.phone.replace(/\s/g, "")}`} className="hover:text-slate-950">{siteSettings.phone}</a>
            <a href={`mailto:${siteSettings.email}`} className="hover:text-slate-950">{siteSettings.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
