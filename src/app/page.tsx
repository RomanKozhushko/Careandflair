import dynamicImport from "next/dynamic";
import { AreasServedSection } from "@/homepage/AreasServedSection";
import { CTASection } from "@/homepage/CTASection";
import { FAQSection } from "@/homepage/FAQSection";
import { FlairSolutionsGrid } from "@/homepage/FlairSolutionsGrid";
import { GuardianPlansSection } from "@/homepage/GuardianPlansSection";
import { HeroSection } from "@/homepage/HeroSection";
import { HowItWorksSection } from "@/homepage/HowItWorksSection";
import { LazyInteractiveConversionCore } from "@/homepage/LazyInteractiveConversionCore";
import { ResetPackagesSection } from "@/homepage/ResetPackagesSection";
import { ResetScanner } from "@/homepage/ResetScanner";
import { TrustBadges } from "@/homepage/TrustBadges";
import { TransformationStrip } from "@/homepage/TransformationStrip";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { createContentHelpers } from "@/lib/content";
import { getPublicContentBundle } from "@/lib/siteContent";
import Link from "next/link";

const BeforeAfterPreview = dynamicImport(() => import("@/homepage/BeforeAfterPreview").then((mod) => mod.BeforeAfterPreview), {
  loading: () => <section className="bg-[var(--cf-bg)] px-4 py-12 sm:px-6 lg:px-8" aria-label="Before and after preview loading" />,
});

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getPublicContentBundle();
  const { siteSettings } = createContentHelpers(content);
  const whatsappHref = `https://wa.me/${siteSettings.phone.replace(/\D/g, "")}`;

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--cf-bg)] pb-16 text-[var(--cf-text)] sm:pb-0">
      <Header content={content} />
      <main>
        <HeroSection content={content} />
        <TransformationStrip />
        <ResetScanner image="/images/generated/hero-living-room-reset.jpg" />
        <FlairSolutionsGrid content={content} />
        <BeforeAfterPreview content={content} />
        <HowItWorksSection content={content} />
        <LazyInteractiveConversionCore />
        <ResetPackagesSection content={content} />
        <TrustBadges content={content} />
        <GuardianPlansSection content={content} />
        <AreasServedSection content={content} />
        <FAQSection content={content} />
        <CTASection content={content} />
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/30 bg-[var(--cf-deep-green)]/94 p-3 shadow-[0_-16px_38px_rgba(6,43,36,0.22)] backdrop-blur sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a href={whatsappHref} className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-4 py-3 text-sm font-bold text-white">WhatsApp</a>
          <Link href="/quote" className="cta-glow inline-flex items-center justify-center rounded-full bg-[var(--cf-lime)] px-4 py-3 text-sm font-black text-[var(--cf-deep-green)]">Get quote</Link>
        </div>
      </div>
      <Footer content={content} />
    </div>
  );
}
