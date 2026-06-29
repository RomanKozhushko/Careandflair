import { ConceptCTA } from "@/concept/ConceptCTA";

const tags = [
  { label: "old silicone", pos: "left-[12%] top-[18%]" },
  { label: "marked walls", pos: "right-[12%] top-[24%]" },
  { label: "greasy kitchen", pos: "left-[16%] bottom-[26%]" },
  { label: "stained carpet", pos: "right-[15%] bottom-[20%]" },
  { label: "tired bathroom", pos: "left-[42%] top-[44%]" },
];

export function CinematicResetScanner({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section id="concept-a" className="relative overflow-hidden bg-[#031b16] px-4 py-20 text-[#effffa] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(184,255,61,0.22),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(95,230,173,0.15),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b8ff3d]">Concept A / Cinematic Reset Scanner</p>
          <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">Your property is almost ready. We fix what people notice first.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#bdfbe0]">
            Send photos on WhatsApp, tell us the deadline, and we will quote the visible reset work that makes a home ready for move-in, viewings, sale photos or guests.
          </p>
          <div className="mt-8">
            <ConceptCTA whatsappHref={whatsappHref} />
          </div>
        </div>

        <div className="concept-stage">
          <div className="concept-tilt-card relative min-h-[36rem] overflow-hidden rounded-[2.4rem] border border-white/16 bg-white/10 p-4 shadow-[0_35px_100px_rgba(0,0,0,0.35)] transition duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.18),transparent_38%,rgba(184,255,61,0.12))]" />
            <div className="relative h-full min-h-[34rem] overflow-hidden rounded-[1.85rem] bg-[#f4ebdd]">
              <div className="absolute inset-0 bg-[url('/images/generated/hero-living-room-reset.jpg')] bg-cover bg-center opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031b16]/88 via-[#031b16]/12 to-transparent" />
              <div className="concept-scan-line" />
              {tags.map((tag, index) => (
                <span
                  key={tag.label}
                  className={`concept-float absolute ${tag.pos} rounded-full border border-[#b8ff3d]/40 bg-[#031b16]/82 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#b8ff3d] shadow-[0_18px_40px_rgba(3,27,22,0.32)] backdrop-blur`}
                  style={{ animationDelay: `${index * 220}ms` }}
                >
                  {tag.label}
                </span>
              ))}
              <div className="absolute left-5 top-5 rounded-full bg-[#ff9f5a] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#031b16]">Deadline close</div>
              <div className="absolute right-5 top-5 rounded-full bg-white/88 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#031b16]">Photo review</div>
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/22 bg-white/90 p-5 text-[#081613] shadow-2xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b3f34]">Visible reset scan</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight">Ready path found</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#b8ff3d] px-3 py-2 text-xs font-black">24-72h options</span>
                    <span className="rounded-full bg-[#bdfbe0] px-3 py-2 text-xs font-black">Photo proof after work</span>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 text-xs font-bold text-[#5f6f68] sm:grid-cols-4">
                  {["Photos", "Visible issues", "Reset scope", "Ready"].map((step, index) => (
                    <div key={step} className="rounded-xl bg-[#f4ebdd] p-3">
                      <span className="text-[#0b3f34]">0{index + 1}</span>
                      <p className="mt-1">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="concept-progress-flow mt-4 h-2 rounded-full bg-[#e8ddcd]">
                  <div className="h-full w-[86%] rounded-full bg-[#b8ff3d]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
