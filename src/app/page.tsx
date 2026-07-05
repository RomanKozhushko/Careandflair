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
          <a href={whatsappHref} className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-white/35 bg-white px-4 py-3 text-sm font-bold text-[var(--cf-navy)] shadow-sm">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[var(--cf-whatsapp)]">
              <path fill="currentColor" d="M12.04 2C6.58 2 2.14 6.42 2.14 11.86c0 1.74.46 3.44 1.33 4.94L2 22l5.34-1.4a9.9 9.9 0 0 0 4.7 1.19h.01c5.46 0 9.9-4.42 9.9-9.86C21.95 6.43 17.51 2 12.04 2Zm0 18.11a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.17.83.85-3.08-.2-.32a8.16 8.16 0 1 1 7 3.89Zm4.5-6.12c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.57.12-.16.24-.65.8-.8.96-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.45-1.37-1.7-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
            </svg>
            WhatsApp
          </a>
          <Link href="/quote" className="inline-flex items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-4 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)]">Get quote</Link>
        </div>
      </div>
      <Footer content={content} />
    </div>
  );
}
