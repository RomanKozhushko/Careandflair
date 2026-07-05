import { ApprovedHomePage } from "@/homepage/ApprovedHomePage";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { createContentHelpers } from "@/lib/content";
import { getPublicContentBundle } from "@/lib/siteContent";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getPublicContentBundle();
  const { siteSettings } = createContentHelpers(content);
  const whatsappMessage = "Hi Care & Flair, I'd like a quote. I can send photos of the property and tell you the deadline.";
  const whatsappHref = `https://wa.me/${siteSettings.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--cf-ivory)] pb-16 text-[var(--cf-text)] sm:pb-0">
      <Header content={content} />
      <main>
        <ApprovedHomePage content={content} />
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/30 bg-[var(--cf-navy)]/96 p-3 shadow-[0_-16px_38px_rgba(6,29,51,0.22)] backdrop-blur sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a href={whatsappHref} className="inline-flex items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)]">WhatsApp</a>
          <Link href="/quote" className="inline-flex items-center justify-center rounded-[14px] border border-white/35 bg-white px-4 py-3 text-sm font-black text-[var(--cf-navy)]">Get quote</Link>
        </div>
      </div>
      <Footer content={content} />
    </div>
  );
}
