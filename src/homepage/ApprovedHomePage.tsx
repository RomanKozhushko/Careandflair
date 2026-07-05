import Image from "next/image";
import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { createContentHelpers, type ContentBundle } from "@/lib/content";

const whatsappMessage = "Hi Care & Flair, I'd like a quote. I can send photos of the property and tell you the deadline.";

function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-extrabold uppercase tracking-[0.08em] ${light ? "text-[var(--cf-gold-soft)]" : "text-[var(--cf-gold)]"}`}>
      {children}
    </p>
  );
}

function CherryButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] transition hover:-translate-y-px hover:bg-[var(--cf-cherry-2)] active:bg-[var(--cf-cherry-dark)] ${className}`}
    >
      {children}
    </Link>
  );
}

function OutlineButton({ href, children, dark = false, className = "" }: { href: string; children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-[14px] border px-6 text-sm font-bold transition hover:-translate-y-px ${
        dark
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-[rgba(8,27,45,0.22)] bg-white text-[var(--cf-navy)] hover:bg-[var(--cf-cream-card)]"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

function imageOrFallback(src?: string, fallback = "/images/generated/hero-living-room-reset.jpg") {
  return src && src.trim().length > 0 ? src : fallback;
}

function PickImage({ src, alt, className = "", priority = false }: { src?: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={imageOrFallback(src)}
      alt={alt}
      fill
      priority={priority}
      quality={74}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={`object-cover ${className}`}
    />
  );
}

function StaticSplitVisual({ item, heroImage, priority = false }: { item?: BeforeAfterItem; heroImage?: string; priority?: boolean }) {
  const before = imageOrFallback(item?.beforeImage, heroImage);
  const after = imageOrFallback(item?.afterImage, heroImage);

  return (
    <div className="group relative h-full min-h-[320px] overflow-hidden rounded-[24px] bg-[var(--cf-warm-card)] shadow-[var(--cf-shadow-card)]">
      <div className="absolute inset-0">
        <PickImage src={before} alt={item?.beforeAlt ?? "Property before reset"} priority={priority} className="saturate-[0.82]" />
      </div>
      <div className="absolute inset-0 overflow-hidden [clip-path:inset(0_0_0_50%)]">
        <PickImage src={after} alt={item?.afterAlt ?? "Property after reset"} priority={priority} className="transition duration-500 group-hover:scale-[1.015]" />
      </div>
      <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-navy)] shadow-sm">Before</div>
      <div className="absolute right-4 top-4 rounded-full bg-[var(--cf-navy)]/94 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white shadow-sm">After</div>
      <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(8,27,45,0.14)]" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-[var(--cf-cream-card)] text-lg font-black text-[var(--cf-cherry)] shadow-[var(--cf-shadow-soft)] transition group-hover:scale-105">
          <span aria-hidden="true">||</span>
        </div>
      </div>
    </div>
  );
}

function TrustFeatureRow() {
  const items = [
    ["24-72h reset options", "Fast turnaround available", "clock"],
    ["Clear quote before work", "No surprises", "doc"],
    ["Photo proof after", "See what was done", "photo"],
    ["Local & reliable", "South West London & Kent", "pin"],
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-[22px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] shadow-[var(--cf-shadow-soft)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([title, text, icon], index) => (
          <article key={title} className={`flex gap-4 p-6 ${index > 0 ? "border-t border-[var(--cf-border)] sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--cf-warm-card)] text-xs font-black uppercase text-[var(--cf-gold)]">{icon}</span>
            <div>
              <h2 className="text-[18px] font-extrabold text-[var(--cf-navy)]">{title}</h2>
              <p className="mt-1 text-[15px] leading-6 text-[var(--cf-text-soft)]">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HeroApproved({ content, strongestItem }: { content: ContentBundle; strongestItem?: BeforeAfterItem }) {
  const { findSection, siteSettings } = createContentHelpers(content);
  const hero = findSection("hero");
  const wa = whatsappHref(siteSettings.phone);

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-5 pt-6 sm:px-6 lg:px-8">
      <div className="grid min-h-[520px] gap-8 rounded-[28px] border border-[var(--cf-border)] bg-[linear-gradient(135deg,var(--cf-ivory-2),var(--cf-cream-card))] p-5 shadow-[var(--cf-shadow-soft)] md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="px-1 py-5 md:px-3 lg:py-10">
          <SectionLabel>Property reset services</SectionLabel>
          <h1 className="mt-5 max-w-[620px] font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--cf-navy)]">
            We fix what people <em className="font-serif italic text-[var(--cf-gold)]">notice</em> first.
          </h1>
          <p className="mt-6 max-w-[540px] text-[17px] leading-[1.6] text-[var(--cf-text-soft)] sm:text-[18px]">
            We handle the visible problems that stop a property feeling ready. Not renovation. A practical reset that makes a home move-in, viewing or guest ready.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CherryButton href={wa} className="w-full sm:w-auto">Send photos on WhatsApp</CherryButton>
            <OutlineButton href="/quote" className="w-full sm:w-auto">Get a quote</OutlineButton>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-bold text-[var(--cf-navy)]">
            <span className="text-[var(--cf-gold)]" aria-label="5.0 stars">★★★★★</span>
            <span>5.0 stars</span>
            <span className="h-1 w-1 rounded-full bg-[var(--cf-gold)]" aria-hidden="true" />
            <span>50+ happy clients</span>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:h-[480px]">
          <StaticSplitVisual item={strongestItem} heroImage={hero.heroImage} priority />
          <div className="absolute left-5 top-5 rounded-full border border-[var(--cf-border)] bg-white/92 px-4 py-2 text-sm font-extrabold text-[var(--cf-navy)] shadow-sm">
            South West London & Kent
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofBlock({ strongestItem, heroImage }: { strongestItem?: BeforeAfterItem; heroImage?: string }) {
  return (
    <section id="before-after" className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[28px] border border-[var(--cf-border-dark)] bg-[linear-gradient(135deg,var(--cf-navy),var(--cf-navy-2))] p-4 shadow-[var(--cf-shadow-navy)] lg:grid lg:grid-cols-[0.72fr_1.2fr_0.72fr] lg:items-stretch lg:gap-4">
        <article className="rounded-[24px] bg-white/[0.04] p-6 text-white lg:p-8">
          <SectionLabel light>Before</SectionLabel>
          <h2 className="mt-4 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] lg:text-[44px]">Tired.<br />Not ready.</h2>
          <p className="mt-4 text-[17px] leading-7 text-[var(--cf-text-light-soft)]">Little things make a big impression.</p>
        </article>
        <div className="relative my-4 min-h-[280px] lg:my-0">
          <StaticSplitVisual item={strongestItem} heroImage={heroImage} />
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-2 rounded-full bg-white/94 px-3 py-2 text-xs font-extrabold text-[var(--cf-navy)] shadow-[var(--cf-shadow-soft)]">
            <span>Move-in ready</span>
            <span className="text-[var(--cf-gold)]">/</span>
            <span>Viewing ready</span>
            <span className="text-[var(--cf-gold)]">/</span>
            <span>Guest ready</span>
          </div>
        </div>
        <article className="rounded-[24px] bg-white/[0.04] p-6 text-white lg:p-8">
          <SectionLabel light>After</SectionLabel>
          <h2 className="mt-4 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] lg:text-[44px]">Reset.<br />Ready.</h2>
          <p className="mt-4 text-[17px] leading-7 text-[var(--cf-text-light-soft)]">Clean details. Better feeling.</p>
          <Link href="/before-after" className="mt-7 inline-flex text-sm font-extrabold text-[var(--cf-gold-soft)] underline decoration-white/30 underline-offset-4 hover:text-white">
            See more transformations
          </Link>
        </article>
      </div>
    </section>
  );
}

function WhatWeReset() {
  const items = [
    ["Deep cleaning", "Kitchens, bathrooms, rooms"],
    ["Silicone refresh", "Bathrooms, kitchens, wet areas"],
    ["Wall touch-ups", "Marks, scuffs, holes"],
    ["Carpet & floor", "Stains, smells, wear"],
    ["Fittings & fixtures", "Handles, taps, small fixes"],
    ["Finishing touches", "Debris, loose details guests notice"],
  ];

  return (
    <section id="solutions" className="mx-auto grid max-w-[1280px] gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <div>
        <SectionLabel>What we reset</SectionLabel>
        <h2 className="mt-4 max-w-[520px] font-serif text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--cf-navy)] lg:text-[44px]">
          The visible details that make the biggest difference.
        </h2>
      </div>
      <div className="grid rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] shadow-[var(--cf-shadow-soft)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([title, text], index) => (
          <article key={title} className={`p-5 ${index > 0 ? "border-t border-[var(--cf-border)] sm:border-l sm:border-t-0" : ""} ${index === 2 || index === 4 ? "sm:border-l-0 lg:border-l" : ""} ${index > 2 ? "lg:border-t" : ""}`}>
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-[var(--cf-gold-soft)] bg-[var(--cf-ivory)] text-[var(--cf-gold)]">+</span>
            <h3 className="text-[18px] font-extrabold text-[var(--cf-navy)]">{title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-[var(--cf-text-soft)]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorksApproved({ phone }: { phone: string }) {
  const wa = whatsappHref(phone);

  return (
    <section id="how-it-works" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-[28px] border border-[var(--cf-border-dark)] bg-[linear-gradient(135deg,var(--cf-navy),var(--cf-navy-2))] p-6 text-white shadow-[var(--cf-shadow-navy)] lg:grid-cols-[0.82fr_1.18fr] lg:p-9">
        <div className="self-center">
          <SectionLabel light>How it works</SectionLabel>
          <h2 className="mt-4 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[46px]">
            Send photos.<br />Get your reset plan.
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-8 text-[var(--cf-text-light-soft)] lg:text-[18px]">
            Tell us what you need and when. We&apos;ll review the photos, identify the visible issues and send a clear quote for the practical reset work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CherryButton href={wa} className="w-full sm:w-auto">Send photos on WhatsApp</CherryButton>
            <OutlineButton href="/quote" dark className="w-full sm:w-auto">Get a quote</OutlineButton>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["01", "Send photos", "WhatsApp us pictures of the property."],
            ["02", "We review", "We identify the visible issues that matter."],
            ["03", "You get a quote", "Clear scope, timeframe and price."],
          ].map(([number, title, text], index) => (
            <article key={title} className="rounded-[22px] border border-white/20 bg-white/[0.06] p-5 shadow-sm">
              <p className="text-sm font-black text-[var(--cf-gold-soft)]">{number}</p>
              <h3 className="mt-4 text-[20px] font-extrabold text-white">{title}</h3>
              <p className="mt-3 text-[16px] leading-7 text-[var(--cf-text-light-soft)]">{text}</p>
              {index === 0 ? (
                <div className="mt-6 rounded-[18px] border border-white/16 bg-white/10 p-3">
                  <div className="h-24 rounded-[14px] bg-[linear-gradient(135deg,var(--cf-warm-card),var(--cf-cream-card))]" />
                  <div className="mt-3 h-2 w-20 rounded-full bg-white/28" />
                </div>
              ) : null}
              {index === 1 ? (
                <ul className="mt-5 space-y-2 text-sm font-semibold text-white/86">
                  {["Old silicone", "Wall marks", "Greasy kitchen", "Stained carpet"].map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
              ) : null}
              {index === 2 ? (
                <div className="mt-6 rounded-[18px] bg-white p-4 text-[var(--cf-navy)]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--cf-gold)]">Quote preview</p>
                  <p className="mt-2 text-2xl font-black">Total {"\u00a3"}780</p>
                  <p className="mt-3 rounded-full bg-[var(--cf-cherry)] px-3 py-2 text-center text-xs font-black text-white">Approve & book</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustAreasRow() {
  const areas = ["Wimbledon", "Putney", "Clapham", "Battersea", "Balham", "Beckenham", "Orpington", "Dartford", "Maidstone", "Sevenoaks", "...and more"];

  return (
    <section id="areas" className="mx-auto grid max-w-[1280px] gap-5 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
      <article className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
        <SectionLabel>Trusted by homeowners, landlords & agents</SectionLabel>
        <ul className="mt-5 space-y-3 text-[16px] font-semibold leading-7 text-[var(--cf-navy)]">
          {["Clear quote before work starts", "Practical reset, not renovation", "Respect for your home", "WhatsApp updates", "Insured & reliable"].map((item) => <li key={item}>✓ {item}</li>)}
        </ul>
      </article>
      <article className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
        <p className="text-[var(--cf-gold)]" aria-label="5 stars">★★★★★</p>
        <blockquote className="mt-5 text-[20px] font-semibold leading-8 text-[var(--cf-navy)]">
          &quot;The difference was unreal. The little details we didn&apos;t have time for - they handled everything. Place looked perfect for photos.&quot;
        </blockquote>
        <p className="mt-5 text-sm font-extrabold text-[var(--cf-text-soft)]">Sarah, Landlord in Wimbledon</p>
      </article>
      <article className="relative overflow-hidden rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
        <SectionLabel>Areas we cover</SectionLabel>
        <h2 className="mt-4 font-serif text-[32px] font-semibold leading-tight text-[var(--cf-navy)]">South West London & Kent</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {areas.map((area) => (
            <span key={area} className="rounded-full border border-[var(--cf-border)] bg-white px-3 py-2 text-sm font-bold text-[var(--cf-navy)]">{area}</span>
          ))}
        </div>
      </article>
    </section>
  );
}

function FinalCta({ phone, image }: { phone: string; image?: string }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-[28px] border border-[var(--cf-border)] bg-[linear-gradient(135deg,var(--cf-warm-card),var(--cf-ivory-2))] shadow-[var(--cf-shadow-card)] lg:grid-cols-[1fr_0.55fr]">
        <div className="p-7 md:p-10">
          <h2 className="font-serif text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--cf-navy)] lg:text-[44px]">Ready to get your property reset?</h2>
          <p className="mt-4 max-w-[620px] text-[17px] leading-8 text-[var(--cf-text-soft)]">Send photos on WhatsApp and we&apos;ll take care of the visible details.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CherryButton href={whatsappHref(phone)} className="w-full sm:w-auto">Send photos on WhatsApp</CherryButton>
            <OutlineButton href="/quote" className="w-full sm:w-auto">Get a quote</OutlineButton>
          </div>
        </div>
        <div className="relative hidden min-h-[280px] lg:block">
          <PickImage src={image} alt="Warm finished room after property reset" />
        </div>
      </div>
    </section>
  );
}

export function ApprovedHomePage({ content }: { content: ContentBundle }) {
  const { beforeAfterItems, findSection, siteSettings, visibleSorted } = createContentHelpers(content);
  const items = visibleSorted(beforeAfterItems).filter((item) => item.showOnHomepage);
  const strongestItem = items.find((item) => item.featured && item.beforeImage && item.afterImage) ?? items.find((item) => item.beforeImage && item.afterImage) ?? items[0];
  const hero = findSection("hero");

  return (
    <>
      <HeroApproved content={content} strongestItem={strongestItem} />
      <TrustFeatureRow />
      <ProofBlock strongestItem={strongestItem} heroImage={hero.heroImage} />
      <WhatWeReset />
      <HowItWorksApproved phone={siteSettings.phone} />
      <TrustAreasRow />
      <FinalCta phone={siteSettings.phone} image={hero.heroImage} />
    </>
  );
}
