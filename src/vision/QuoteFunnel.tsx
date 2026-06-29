import { VisionCTA } from "@/vision/VisionCTA";

export function QuoteFunnel({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section className="bg-[var(--vf-deep)] px-4 py-20 text-[var(--vf-text-light)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--vf-lime)]">Quote funnel</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Get the reset path.</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--vf-mint)]">Send photos on WhatsApp or open the quote builder. We use photos, deadline and visible issues to quote practical reset work.</p>
          <div className="mt-8"><VisionCTA whatsappHref={whatsappHref} primary="Start quote builder" secondary="WhatsApp photos first" /></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Property type", "Deadline", "Visible problems", "Rooms affected", "Contact details", "Reset quote"].map((field, index) => (
            <div key={field} className={`rounded-[1.4rem] border p-5 ${index === 5 ? "border-[var(--vf-lime)] bg-[var(--vf-lime)] text-[var(--vf-ink)]" : "border-white/10 bg-white/10 text-[var(--vf-mint)]"}`}>
              <p className="text-xs font-black">0{index + 1}</p>
              <p className="mt-2 text-xl font-semibold">{field}</p>
              <div className="vf-progress mt-4 h-2 rounded-full bg-white/15"><div className="h-full w-2/3 rounded-full bg-[var(--vf-lime)]" /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
