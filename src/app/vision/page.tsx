import siteSettings from "@/data/site-settings.json";
import { BeforeAfterImpact } from "@/vision/BeforeAfterImpact";
import { FinalVisionCTA } from "@/vision/FinalVisionCTA";
import { ProblemShockWall } from "@/vision/ProblemShockWall";
import { Property3DScene } from "@/vision/Property3DScene";
import { QuoteFunnel } from "@/vision/QuoteFunnel";
import { ResetPathCards } from "@/vision/ResetPathCards";
import { TrustProofPanel } from "@/vision/TrustProofPanel";
import { VisibleResetScanner } from "@/vision/VisibleResetScanner";
import { VisionHero } from "@/vision/VisionHero";

export const dynamic = "force-dynamic";

export default function VisionPage() {
  const whatsappHref = `https://wa.me/${siteSettings.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Care & Flair, I’d like a quote. I can send photos of the property and tell you the deadline.")}`;

  return (
    <main className="vision-page min-h-screen overflow-x-clip bg-[var(--vf-cream)]">
      <VisionHero whatsappHref={whatsappHref} />
      <Property3DScene />
      <ProblemShockWall />
      <VisibleResetScanner whatsappHref={whatsappHref} />
      <BeforeAfterImpact />
      <ResetPathCards whatsappHref={whatsappHref} />
      <QuoteFunnel whatsappHref={whatsappHref} />
      <TrustProofPanel />
      <FinalVisionCTA whatsappHref={whatsappHref} />
    </main>
  );
}
