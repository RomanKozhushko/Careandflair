import { AreasServedSection } from "@/homepage/AreasServedSection";
import { BeforeAfterPreview } from "@/homepage/BeforeAfterPreview";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <ResetPackagesSection />
        <FlairSolutionsGrid />
        <HowItWorksSection />
        <GuardianPlansSection />
        <BeforeAfterPreview />
        <AreasServedSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
