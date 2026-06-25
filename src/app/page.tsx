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
import { TrustBadges } from "@/homepage/TrustBadges";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { getPublicContentBundle } from "@/lib/siteContent";

const BeforeAfterPreview = dynamicImport(() => import("@/homepage/BeforeAfterPreview").then((mod) => mod.BeforeAfterPreview), {
  loading: () => <section className="bg-[#f5ecdc] px-4 py-12 sm:px-6 lg:px-8" aria-label="Before and after preview loading" />,
});

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getPublicContentBundle();

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5ecdc] text-[#14241F]">
      <Header content={content} />
      <main>
        <HeroSection content={content} />
        <LazyInteractiveConversionCore />
        <FlairSolutionsGrid content={content} />
        <ResetPackagesSection content={content} />
        <TrustBadges content={content} />
        <BeforeAfterPreview content={content} />
        <HowItWorksSection content={content} />
        <GuardianPlansSection content={content} />
        <AreasServedSection content={content} />
        <FAQSection content={content} />
        <CTASection content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}
