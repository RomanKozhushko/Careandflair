import dynamic from "next/dynamic";
import { AreasServedSection } from "@/homepage/AreasServedSection";
import { CTASection } from "@/homepage/CTASection";
import { FAQSection } from "@/homepage/FAQSection";
import { FlairSolutionsGrid } from "@/homepage/FlairSolutionsGrid";
import { GuardianPlansSection } from "@/homepage/GuardianPlansSection";
import { HeroSection } from "@/homepage/HeroSection";
import { HowItWorksSection } from "@/homepage/HowItWorksSection";
import { ResetPackagesSection } from "@/homepage/ResetPackagesSection";
import { TrustBadges } from "@/homepage/TrustBadges";
import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";

const InteractiveConversionCore = dynamic(() => import("@/homepage/InteractiveConversionCore").then((mod) => mod.InteractiveConversionCore), {
  loading: () => <section className="bg-[#0f172a] px-4 py-12 text-white sm:px-6 lg:px-8" aria-label="Build the Reset loading" />,
});

const BeforeAfterPreview = dynamic(() => import("@/homepage/BeforeAfterPreview").then((mod) => mod.BeforeAfterPreview), {
  loading: () => <section className="bg-[#f8f5ef] px-4 py-12 sm:px-6 lg:px-8" aria-label="Before and after preview loading" />,
});

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-slate-950">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <ResetPackagesSection />
        <InteractiveConversionCore />
        <FlairSolutionsGrid />
        <BeforeAfterPreview />
        <HowItWorksSection />
        <GuardianPlansSection />
        <AreasServedSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
