"use client";

import { MouseEvent, useState } from "react";
import type { CSSProperties } from "react";
import { VisionCTA } from "@/vision/VisionCTA";

const tags = ["old silicone", "marked walls", "greasy kitchen", "stained carpets"];

export function VisionHero({ whatsappHref }: { whatsappHref: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  }

  return (
    <section className="relative overflow-hidden bg-[var(--vf-ink)] px-4 py-20 text-[var(--vf-text-light)] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(184,255,61,0.22),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(95,230,173,0.18),transparent_24%),linear-gradient(180deg,#05110e,#06241e)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:min-h-[46rem] lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--vf-lime)]">VISIBLE RESET ENGINE</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">Your property is almost ready. We fix what people notice first.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--vf-mint)]">Send photos on WhatsApp, tell us the deadline, and we will quote the visible reset work that makes a home ready for move-in, viewings, sale photos or guests.</p>
          <p className="mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[var(--vf-lime)]">Not renovation. Visible reset.</p>
          <div className="mt-8"><VisionCTA whatsappHref={whatsappHref} /></div>
          <div className="mt-8 grid gap-2 text-sm font-semibold sm:grid-cols-2">
            {["24-72h reset options", "Clear quote before work", "Photo proof after", "South East London & Kent"].map((chip) => (
              <span key={chip} className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-[var(--vf-mint)]">{chip}</span>
            ))}
          </div>
        </div>

        <div className="vf-stage" onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
          <div className="vf-hero-visual relative min-h-[42rem] transition duration-200" style={{ "--rx": `${tilt.x}deg`, "--ry": `${tilt.y}deg` } as CSSProperties}>
            <div className="absolute left-[12%] top-[8%] h-[31rem] w-[70%] rotate-[-6deg] rounded-[2.4rem] border border-white/12 bg-white/10 shadow-[var(--vf-shadow-3d)]" />
            <div className="absolute left-[18%] top-[4%] h-[34rem] w-[68%] overflow-hidden rounded-[2.4rem] border border-white/20 bg-[var(--vf-paper)] shadow-[var(--vf-shadow-3d)]">
              <div className="absolute inset-0 bg-[url('/images/generated/hero-living-room-reset.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,17,14,0.82)] via-transparent to-transparent" />
              <div className="vf-scan-line" />
              {tags.map((tag, index) => (
                <span key={tag} className="vf-float absolute rounded-full border border-[var(--vf-lime)]/35 bg-[var(--vf-glass-dark)] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--vf-lime)] backdrop-blur" style={{ left: `${8 + index * 19}%`, top: `${18 + (index % 2) * 42}%`, animationDelay: `${index * 180}ms` }}>
                  {tag}
                </span>
              ))}
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/24 bg-white/90 p-5 text-[var(--vf-text-dark)] shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--vf-green)]">Scan - Identify - Reset - Ready</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight">Reset path locked</p>
                  </div>
                  <span className="rounded-full bg-[var(--vf-lime)] px-4 py-2 text-sm font-black">Ready</span>
                </div>
                <div className="vf-progress mt-4 h-2 rounded-full bg-[var(--vf-cream)]"><div className="h-full w-[88%] rounded-full bg-[var(--vf-lime)]" /></div>
              </div>
            </div>
            <div className="vf-orbit absolute left-[9%] top-[10%] h-[35rem] w-[82%] rounded-full border border-[var(--vf-lime)]/18" />
            {["Deep clean", "Photo proof", "Clear quote"].map((task, index) => (
              <div key={task} className="vf-float absolute rounded-2xl border border-white/18 bg-white/84 px-4 py-3 text-sm font-black text-[var(--vf-deep)] shadow-[var(--vf-shadow-soft)]" style={{ right: `${index * 8}%`, bottom: `${12 + index * 13}%`, animationDelay: `${index * 220}ms` }}>{task}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
