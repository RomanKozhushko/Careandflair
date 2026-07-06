import Image from "next/image";
import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/types";
import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { HeroBeforeAfterSlider } from "@/homepage/HeroBeforeAfterSlider";
import { HomepageTransformationCarousel } from "@/homepage/HomepageTransformationCarousel";

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

function WhatsAppButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-[rgba(8,27,45,0.15)] bg-white px-6 text-sm font-bold text-[var(--cf-navy)] shadow-sm transition hover:-translate-y-px hover:border-[rgba(37,211,102,0.35)] hover:bg-[rgba(37,211,102,0.08)] ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[var(--cf-whatsapp)]">
        <path fill="currentColor" d="M12.04 2C6.58 2 2.14 6.42 2.14 11.86c0 1.74.46 3.44 1.33 4.94L2 22l5.34-1.4a9.9 9.9 0 0 0 4.7 1.19h.01c5.46 0 9.9-4.42 9.9-9.86C21.95 6.43 17.51 2 12.04 2Zm0 18.11a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.17.83.85-3.08-.2-.32a8.16 8.16 0 1 1 7 3.89Zm4.5-6.12c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.57.12-.16.24-.65.8-.8.96-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.45-1.37-1.7-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
      </svg>
      {children}
    </Link>
  );
}

function QuoteButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] transition hover:-translate-y-px hover:bg-[var(--cf-cherry-2)] active:bg-[var(--cf-cherry-dark)] ${className}`}
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
            <WhatsAppButton href={wa} className="w-full sm:w-auto">Send photos on WhatsApp</WhatsAppButton>
            <QuoteButton href="/quote" className="w-full sm:w-auto">Get a quote</QuoteButton>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-bold text-[var(--cf-navy)]">
            <span className="text-[var(--cf-gold)]" aria-label="5.0 stars">★★★★★</span>
            <span>5.0 stars</span>
            <span className="h-1 w-1 rounded-full bg-[var(--cf-gold)]" aria-hidden="true" />
            <span>50+ happy clients</span>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:h-[480px]">
          <HeroBeforeAfterSlider item={strongestItem} heroImage={hero.heroImage} priority />
          <div className="absolute left-5 top-5 rounded-full border border-[var(--cf-border)] bg-white/92 px-4 py-2 text-sm font-extrabold text-[var(--cf-navy)] shadow-sm">
            South West London & Kent
          </div>
        </div>
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

const resetPackages = [
  {
    title: "24h Express Reset",
    badge: "Fastest",
    price: "From \u00a3595",
    priceNote: "Small flats. Standard homes usually \u00a3695-\u00a3895 after photos.",
    duration: "1 working day / usually 8-10 hours on site",
    bestFor: "Properties that are almost ready but need visible details fixed fast before viewings, move-in, handover or guests.",
    description: "A fast visible reset for the areas people notice first. Ideal when the property does not need a full renovation, but tired details are making it feel unfinished.",
    cta: "Get 24h quote",
    href: "/quote?preset=24h-express-reset",
    featured: false,
    includes: [
      "Kitchen visible reset",
      "Bathroom visible reset",
      "Descaling taps, sinks and shower areas",
      "Internal windows and sills where reachable",
      "Targeted carpet extraction in key areas",
      "Small wall touch-ups where suitable",
      "Limited silicone refresh where suitable",
      "Basic small fixes: handles, loose fittings and minor details",
      "Doors, switches and high-touch points",
      "Light tidy and final presentation check",
      "Before/after photo proof",
    ],
    notIncluded: [
      "Full repaint",
      "Full silicone reseal of multiple bathrooms",
      "Oven or fridge deep clean",
      "Inside all cupboards",
      "Heavy mould treatment",
      "Large rubbish clearance",
      "Full garden clearance",
      "Major repairs",
      "Full carpet extraction for large houses",
    ],
    timing: [
      "Arrival, before photos and scope check: 30 min",
      "Kitchen visible reset: 1.5h",
      "Bathroom visible reset: 1.5h",
      "Small fixes and wall touch-ups: 1.5h",
      "Targeted carpet/floor/windows: 1.5h",
      "Final details and presentation check: 1h",
      "After photos and client update: 30 min",
    ],
  },
  {
    title: "48h Pro Flair Reset",
    badge: "Most popular",
    price: "From \u00a31,195",
    duration: "2 working days / usually 2 days on site",
    bestFor: "Landlords, sellers and move-in homes that need a stronger visual uplift.",
    description: "For properties that need more than a quick reset but still do not need a full renovation.",
    cta: "Get 48h quote",
    href: "/quote?preset=48h-pro-flair-reset",
    featured: true,
    includes: [
      "Everything in 24h Express Reset",
      "Targeted wall touch-ups and one-coat neutral refresh where suitable",
      "Small scuff and mark coverage",
      "Anti-mould treatment and protection where suitable",
      "Window and frame detail",
      "Staging and flair touches",
      "TDS-style cleaning proof",
      "Stronger presentation finish",
      "Before/after photo proof",
    ],
  },
  {
    title: "72h Ultimate Reset",
    badge: "Maximum transformation",
    price: "From \u00a31,600",
    duration: "3 working days / usually 3 days on site",
    bestFor: "Properties that need the strongest reset before sale photos, new tenants, guests or move-in.",
    description: "The strongest reset option for selected areas that need cleaning, fixing, refreshing and presentation work.",
    cta: "Get 72h quote",
    href: "/quote?preset=72h-ultimate-reset",
    featured: false,
    includes: [
      "Everything in 48h Pro Flair Reset",
      "Selected room repaint or 2-coat finish where agreed",
      "Woodwork refresh: skirting, frames and doors",
      "Grout revival",
      "Patio / driveway wash where suitable",
      "External windows where accessible",
      "Stronger finishing details",
      "Presentation-ready final setup",
      "Full before/after photo proof",
    ],
  },
];

function ResetPackagesSection() {
  const upgrades = [
    "Deep Carpet Extraction",
    "Bathroom Face-Lift",
    "Kitchen Deep Reset",
    "Anti-Mould Shield",
    "Window & Frame Detail",
    "Driveway & Patio Revival",
    "Odour Elimination",
    "Professional Photography",
    "Fittings & Small Repairs",
    "Flat-Pack Assembly",
    "TV Wall Mounting",
  ];

  return (
    <section id="packages" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <SectionLabel>Reset packages</SectionLabel>
          <h2 className="mt-4 max-w-[620px] font-serif text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--cf-navy)] lg:text-[44px]">
            Choose the right reset for your property.
          </h2>
        </div>
        <p className="max-w-[620px] text-[17px] leading-8 text-[var(--cf-text-soft)] lg:justify-self-end">
          Flexible reset options depending on size, condition and how quickly the property needs to feel ready.
        </p>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {resetPackages.map((item) => (
          <article
            key={item.title}
            className={`relative flex flex-col rounded-[26px] border bg-[var(--cf-cream-card)] p-5 shadow-[var(--cf-shadow-soft)] transition hover:-translate-y-1 sm:p-6 ${
              item.featured ? "border-[var(--cf-cherry)] lg:-mt-3 lg:mb-3 lg:shadow-[var(--cf-shadow-card)]" : "border-[var(--cf-border)]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] ${item.featured ? "bg-[var(--cf-cherry)] text-white" : "bg-[var(--cf-warm-card)] text-[var(--cf-gold)]"}`}>
                  {item.badge}
                </span>
                <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-[var(--cf-navy)]">{item.title}</h3>
              </div>
              {item.featured ? <span className="mt-1 h-3 w-3 rounded-full bg-[var(--cf-gold)] shadow-[0_0_0_6px_rgba(197,145,59,0.14)]" aria-hidden="true" /> : null}
            </div>

            <p className="mt-5 font-serif text-[34px] font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">{item.price}</p>
            {"priceNote" in item && item.priceNote ? (
              <p className="mt-1 text-sm font-semibold leading-5 text-[var(--cf-text-soft)]">{item.priceNote}</p>
            ) : null}
            <p className="mt-2 rounded-[14px] border border-[var(--cf-border)] bg-[var(--cf-ivory)] px-3 py-2 text-sm font-bold text-[var(--cf-navy)]">{item.duration}</p>
            <p className="mt-4 text-[15px] leading-6 text-[var(--cf-text-soft)]"><span className="font-extrabold text-[var(--cf-navy)]">Best for:</span> {item.bestFor}</p>
            <p className="mt-3 text-[15px] leading-6 text-[var(--cf-text-soft)]">{item.description}</p>

            <ul className="mt-5 grid gap-2 text-sm leading-6 text-[var(--cf-navy)]">
              {item.includes.map((included) => (
                <li key={included} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cf-gold)]" aria-hidden="true" />
                  <span>{included}</span>
                </li>
              ))}
            </ul>

            {"notIncluded" in item && item.notIncluded?.length ? (
              <details className="mt-5 rounded-[16px] border border-[var(--cf-border)] bg-[var(--cf-ivory)] p-4 text-sm text-[var(--cf-text-soft)]">
                <summary className="cursor-pointer font-extrabold text-[var(--cf-navy)]">Not included unless quoted separately</summary>
                <p className="mt-2 leading-6">Some work needs more time. We&apos;ll tell you before quoting.</p>
                <ul className="mt-3 grid gap-1.5 leading-5 sm:grid-cols-2 lg:grid-cols-1">
                  {item.notIncluded.map((excluded) => (
                    <li key={excluded}>- {excluded}</li>
                  ))}
                </ul>
              </details>
            ) : null}

            {"timing" in item && item.timing?.length ? (
              <details className="mt-3 rounded-[16px] border border-[var(--cf-gold-soft)] bg-white p-4 text-sm text-[var(--cf-text-soft)]">
                <summary className="cursor-pointer font-extrabold text-[var(--cf-navy)]">Typical 24h timing</summary>
                <ul className="mt-3 grid gap-1.5 leading-5">
                  {item.timing.map((step) => (
                    <li key={step}>- {step}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs font-semibold text-[var(--cf-text-soft)]">Timing varies by size, condition and access.</p>
              </details>
            ) : null}

            <Link href={item.href} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] transition hover:-translate-y-px hover:bg-[var(--cf-cherry-2)]">
              {item.cta}
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 rounded-[22px] border border-[var(--cf-border)] bg-[var(--cf-ivory-2)] p-5 text-sm leading-6 text-[var(--cf-text-soft)] shadow-[var(--cf-shadow-soft)] md:grid-cols-3">
        <p><span className="font-extrabold text-[var(--cf-navy)]">Paint work:</span> Paint work is scoped from photos or visit. Colour, rooms/areas and number of coats are agreed before work starts. Exact colour matching or full room repaint can be quoted separately.</p>
        <p><span className="font-extrabold text-[var(--cf-navy)]">Final price:</span> Final price depends on property size, condition, access, materials and selected upgrades. Send photos for a clear quote before work starts.</p>
        <p><span className="font-extrabold text-[var(--cf-navy)]">Bigger jobs:</span> If the property is larger, heavily used or needs more than one working day, we may recommend the 48h reset or a custom quote.</p>
      </div>

      <div className="mt-5 rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-5 shadow-[var(--cf-shadow-soft)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[var(--cf-navy)]">Add extra impact where needed</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--cf-text-soft)]">
              Choose only the target areas that add real value for the deadline.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {upgrades.map((upgrade) => (
            <span key={upgrade} className="rounded-full border border-[var(--cf-border)] bg-white px-3 py-2 text-sm font-bold text-[var(--cf-navy)]">
              {upgrade}
            </span>
          ))}
        </div>
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
            <WhatsAppButton href={wa} className="w-full sm:w-auto">Send photos on WhatsApp</WhatsAppButton>
            <QuoteButton href="/quote" className="w-full sm:w-auto">Get a quote</QuoteButton>
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
            <WhatsAppButton href={whatsappHref(phone)} className="w-full sm:w-auto">Send photos on WhatsApp</WhatsAppButton>
            <QuoteButton href="/quote" className="w-full sm:w-auto">Get a quote</QuoteButton>
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
  const { beforeAfterItems, findSection, homepageTransformations, siteSettings, visibleSorted } = createContentHelpers(content);
  const items = visibleSorted(beforeAfterItems).filter((item) => item.showOnHomepage);
  const strongestItem = items.find((item) => item.featured && item.beforeImage && item.afterImage) ?? items.find((item) => item.beforeImage && item.afterImage) ?? items[0];
  const hero = findSection("hero");

  return (
    <>
      <HeroApproved content={content} strongestItem={strongestItem} />
      <TrustFeatureRow />
      <HomepageTransformationCarousel content={homepageTransformations} />
      <ResetPackagesSection />
      <WhatWeReset />
      <HowItWorksApproved phone={siteSettings.phone} />
      <TrustAreasRow />
      <FinalCta phone={siteSettings.phone} image={hero.heroImage} />
    </>
  );
}
