import { VisionCTA } from "@/vision/VisionCTA";

export function FinalVisionCTA({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section className="bg-[var(--vf-ink)] px-4 py-20 text-center text-[var(--vf-text-light)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">Show us the tired details. We will quote the reset.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--vf-mint)]">Send photos on WhatsApp and tell us your deadline. We will review the visible problems and suggest the practical reset path.</p>
        <div className="mt-9 flex justify-center"><VisionCTA whatsappHref={whatsappHref} /></div>
      </div>
    </section>
  );
}
