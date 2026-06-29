type ConceptCTAProps = {
  whatsappHref: string;
  primary?: string;
  secondary?: string;
  dark?: boolean;
};

export function ConceptCTA({ whatsappHref, primary = "Send photos on WhatsApp", secondary = "See the reset path", dark = true }: ConceptCTAProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={whatsappHref}
        className="inline-flex items-center justify-center rounded-full bg-[#b8ff3d] px-6 py-3 text-sm font-black text-[#031b16] shadow-[0_0_0_1px_rgba(184,255,61,0.45),0_20px_70px_rgba(184,255,61,0.25)] transition hover:-translate-y-0.5 hover:bg-[#95e800]"
      >
        {primary}
      </a>
      <a
        href="#concepts"
        className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
          dark ? "border-white/20 bg-white/10 text-[#effffa] hover:bg-white/16" : "border-[#062b24]/15 bg-white/70 text-[#031b16] hover:bg-white"
        }`}
      >
        {secondary}
      </a>
    </div>
  );
}
