import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { BeforeAfterItem, CtaMapping } from "@/lib/types";
import { createContentHelpers, type ContentBundle } from "@/lib/content";
import { FAQSection } from "@/homepage/FAQSection";
import { GuardianPlansSection } from "@/homepage/GuardianPlansSection";
import { HeroBeforeAfterSlider } from "@/homepage/HeroBeforeAfterSlider";
import { HomepageTransformationCarousel } from "@/homepage/HomepageTransformationCarousel";
import type { VisualEditorAdapter } from "@/lib/visualEditor";

const whatsappMessage = "Hi Care & Flair, I'd like a quote. I can send photos of the property and tell you the deadline.";

const heroProofItem: BeforeAfterItem = {
  id: "hero-anti-mould-proof",
  title: "Bathroom Mould Reset",
  slug: "bathroom-mould-reset",
  category: "Bathroom",
  serviceType: "Anti-mould treatment, silicone detail and bathroom reset",
  propertyType: "Rental bathroom",
  location: "Bromley, South East London & Kent",
  beforeImage: "/images/generated/anti-mould-before.jpg",
  afterImage: "/images/generated/anti-mould-after.jpg",
  beforeAlt: "Bathroom wet area before Care & Flair anti-mould reset",
  afterAlt: "Bathroom wet area after Care & Flair anti-mould reset",
  problem: "Visible mould and tired wet areas make a property feel neglected.",
  solution: "Targeted clean-up, treatment where suitable and presentation reset.",
  result: "A cleaner bathroom that feels easier to show, hand over or move into.",
  featured: true,
  visible: true,
  showOnHomepage: true,
  order: 0,
  ctaLabel: "Get a quote for this",
  ctaPreset: "anti-mould-shield",
};

function editableSectionProps(content: ContentBundle, id: string) {
  const index = content.homepageSections.findIndex((section) => section.id === id);
  return index >= 0 ? { resource: "homepage-sections" as const, index } : undefined;
}

function findSectionIndex(content: ContentBundle, id: string) {
  return content.homepageSections.findIndex((section) => section.id === id);
}

function ctaButtonConfig(content: ContentBundle, cta: CtaMapping, className: string, variant: "primary" | "secondary" | "whatsapp" | "ghost" | "link") {
  const index = content.ctaMappings.findIndex((item) => item.id === cta.id);
  return {
    id: cta.id,
    resource: "cta-mappings" as const,
    label: cta.label,
    href: cta.href,
    labelPath: [index, "label"],
    hrefPath: [index, "href"],
    className,
    variant,
  };
}

function editableCta(content: ContentBundle, editor: VisualEditorAdapter | undefined, cta: CtaMapping, className: string, variant: "primary" | "secondary" | "whatsapp" | "ghost" | "link", fallback: ReactNode) {
  const index = content.ctaMappings.findIndex((item) => item.id === cta.id);
  return editor && index >= 0 ? editor.button(ctaButtonConfig(content, cta, className, variant)) : fallback;
}

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

function TrustFeatureRow({ content, editor }: { content: ContentBundle; editor?: VisualEditorAdapter }) {
  const heroIndex = findSectionIndex(content, "hero");
  const hero = content.homepageSections[heroIndex];
  const items = (hero?.trustBadges ?? [
    "24-72h reset options | Fast turnaround available",
    "Clear quote before work | No surprises",
    "Photo proof after | See what was done",
    "Local & reliable | Bromley, South East London & Kent",
  ]).slice(0, 4);

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-[22px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] shadow-[var(--cf-shadow-soft)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const [title, text = ""] = item.split("|").map((part) => part.trim());
          return (
          <article key={`${title}-${index}`} className={`flex gap-4 p-6 ${index > 0 ? "border-t border-[var(--cf-border)] sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--cf-warm-card)] text-xs font-black uppercase text-[var(--cf-gold)]">{editor ? editor.text("homepage-sections", [heroIndex, "visualSteps", index], hero?.visualSteps?.[index] ?? ["clock", "doc", "photo", "pin"][index]) : ["clock", "doc", "photo", "pin"][index]}</span>
            <div>
              <h2 className="text-[18px] font-extrabold text-[var(--cf-navy)]">{editor ? editor.text("homepage-sections", [heroIndex, "trustBadges", index], item) : title}</h2>
              <p className="mt-1 text-[15px] leading-6 text-[var(--cf-text-soft)]">{text}</p>
            </div>
          </article>
        )})}
      </div>
    </section>
  );
}

function HeroApproved({ content, editor, strongestItem, strongestItemIndex }: { content: ContentBundle; editor?: VisualEditorAdapter; strongestItem?: BeforeAfterItem; strongestItemIndex: number }) {
  const { ctaMappings, findSection, siteSettings } = createContentHelpers(content);
  const hero = findSection("hero");
  const heroIndex = content.homepageSections.findIndex((section) => section.id === "hero");
  const primaryCta = ctaMappings.find((cta) => cta.id === hero.primaryCtaId) ?? { id: "build-your-quote", label: "Send photos on WhatsApp", href: "/quote" };
  const secondaryCta = ctaMappings.find((cta) => cta.id === hero.secondaryCtaId) ?? { id: "view-reset-packages", label: "Get a quote", href: "/quote" };
  const headline = hero.headline ?? "Property resets in 24-72h for homes that need to feel ready.";
  const subheadline =
    hero.subheadline ??
    "Cleaning, small repairs, touch-ups and presentation work for landlords, agents, sellers, new homeowners and hosts across Bromley, South East London, Kent, Medway and Rochester.";
  const wa = whatsappHref(siteSettings.phone);

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-5 pt-6 sm:px-6 lg:px-8">
      <div className="grid min-h-[520px] gap-8 rounded-[28px] border border-[var(--cf-border)] bg-[linear-gradient(135deg,var(--cf-ivory-2),var(--cf-cream-card))] p-5 shadow-[var(--cf-shadow-soft)] md:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="px-1 py-5 md:px-3 lg:py-10">
          <SectionLabel>{editor ? editor.text("homepage-sections", [heroIndex, "eyebrow"], hero.eyebrow ?? "Property reset services") : "Property reset services"}</SectionLabel>
          <h1 className="mt-5 max-w-[620px] font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--cf-navy)]">
            {editor ? editor.text("homepage-sections", [heroIndex, "headline"], headline) : <>Property resets in 24-72h for homes that need to feel <em className="font-serif italic text-[var(--cf-gold)]">ready</em>.</>}
          </h1>
          <p className="mt-6 max-w-[540px] text-[17px] leading-[1.6] text-[var(--cf-text-soft)] sm:text-[18px]">
            {editor ? editor.text("homepage-sections", [heroIndex, "subheadline"], subheadline) : subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {editableCta(content, editor, primaryCta, "w-full sm:w-auto", "whatsapp", <WhatsAppButton href={wa} className="w-full sm:w-auto">{primaryCta.label}</WhatsAppButton>)}
            {editableCta(content, editor, secondaryCta, "w-full sm:w-auto", "primary", <QuoteButton href={secondaryCta.href} className="w-full sm:w-auto">{secondaryCta.label}</QuoteButton>)}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-bold text-[var(--cf-navy)]">
            <span className="text-[var(--cf-gold)]" aria-label="5.0 stars">★★★★★</span>
            <span>5.0 stars</span>
            <span className="h-1 w-1 rounded-full bg-[var(--cf-gold)]" aria-hidden="true" />
            <span>50+ happy clients</span>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:h-[480px]">
          <HeroBeforeAfterSlider item={strongestItem} heroImage={hero.heroImage} priority editor={editor} itemIndex={strongestItemIndex} heroIndex={heroIndex} />
          <div className="absolute left-5 top-5 rounded-full border border-[var(--cf-border)] bg-white/92 px-4 py-2 text-sm font-extrabold text-[var(--cf-navy)] shadow-sm">
            {editor ? editor.text("homepage-sections", [heroIndex, "heroImageAlt"], hero.heroImageAlt ?? "Bromley, South East London & Kent") : "Bromley, South East London & Kent"}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeReset({ content, editor }: { content: ContentBundle; editor?: VisualEditorAdapter }) {
  const { findSection, visibleSorted } = createContentHelpers(content);
  const section = findSection("flair-solutions");
  const sectionIndex = findSectionIndex(content, "flair-solutions");
  const items = visibleSorted(content.solutions).slice(0, 6);

  return (
    <section id="solutions" className="mx-auto grid max-w-[1280px] gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <div>
        <SectionLabel>{editor ? editor.text("homepage-sections", [sectionIndex, "eyebrow"], section.eyebrow ?? "What we reset") : "What we reset"}</SectionLabel>
        <h2 className="mt-4 max-w-[520px] font-serif text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--cf-navy)] lg:text-[44px]">
          {editor ? editor.text("homepage-sections", [sectionIndex, "title"], section.title ?? "The visible details that make the biggest difference.") : "The visible details that make the biggest difference."}
        </h2>
      </div>
      <div className="grid rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] shadow-[var(--cf-shadow-soft)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const sourceIndex = content.solutions.findIndex((solution) => solution.id === item.id);
          return (
          <article key={item.id} className={`p-5 ${index > 0 ? "border-t border-[var(--cf-border)] sm:border-l sm:border-t-0" : ""} ${index === 2 || index === 4 ? "sm:border-l-0 lg:border-l" : ""} ${index > 2 ? "lg:border-t" : ""}`}>
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-[var(--cf-gold-soft)] bg-[var(--cf-ivory)] text-[var(--cf-gold)]">+</span>
            <h3 className="text-[18px] font-extrabold text-[var(--cf-navy)]">{editor ? editor.text("solutions", [sourceIndex, "title"], item.title) : item.title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-[var(--cf-text-soft)]">{editor ? editor.text("solutions", [sourceIndex, "problem"], item.problem) : item.problem}</p>
          </article>
        )})}
      </div>
    </section>
  );
}


function ResetPackagesSection({ content, editor }: { content: ContentBundle; editor?: VisualEditorAdapter }) {
  const { findCta, findSection, visibleSorted } = createContentHelpers(content);
  const section = findSection("reset-packages");
  const sectionIndex = content.homepageSections.findIndex((item) => item.id === "reset-packages");
  const packages = visibleSorted(content.servicePackages);
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
            {editor ? editor.text("homepage-sections", [sectionIndex, "title"], section.title ?? "Choose the right reset for your property.") : "Choose the right reset for your property."}
          </h2>
        </div>
        <p className="max-w-[620px] text-[17px] leading-8 text-[var(--cf-text-soft)] lg:justify-self-end">
          {editor ? editor.text("homepage-sections", [sectionIndex, "subtitle"], section.subtitle ?? "Flexible reset options depending on size, condition and how quickly the property needs to feel ready.") : "Flexible reset options depending on size, condition and how quickly the property needs to feel ready."}
        </p>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {packages.map((item) => {
          const itemIndex = content.servicePackages.findIndex((pack) => pack.id === item.id);
          const cta = findCta(item.ctaMappingId) ?? { id: item.ctaMappingId, label: "Get quote", href: `/quote?preset=${item.slug}` };
          return (
          <article
            key={item.id}
            className={`relative flex flex-col rounded-[26px] border bg-[var(--cf-cream-card)] p-5 shadow-[var(--cf-shadow-soft)] transition hover:-translate-y-1 sm:p-6 ${
              item.featured ? "border-[var(--cf-cherry)] lg:-mt-3 lg:mb-3 lg:shadow-[var(--cf-shadow-card)]" : "border-[var(--cf-border)]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] ${item.featured ? "bg-[var(--cf-cherry)] text-white" : "bg-[var(--cf-warm-card)] text-[var(--cf-gold)]"}`}>
                  {editor ? editor.text("packages", [itemIndex, "slogan"], item.slogan) : item.slogan}
                </span>
                <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-[var(--cf-navy)]">{editor ? editor.text("packages", [itemIndex, "name"], item.name) : item.name}</h3>
              </div>
              {item.featured ? <span className="mt-1 h-3 w-3 rounded-full bg-[var(--cf-gold)] shadow-[0_0_0_6px_rgba(197,145,59,0.14)]" aria-hidden="true" /> : null}
            </div>

            <p className="mt-5 font-serif text-[34px] font-semibold tracking-[-0.02em] text-[var(--cf-navy)]">From £{editor ? editor.text("packages", [itemIndex, "startingPrice"], String(item.startingPrice)) : item.startingPrice}</p>
            <p className="mt-2 rounded-[14px] border border-[var(--cf-border)] bg-[var(--cf-ivory)] px-3 py-2 text-sm font-bold text-[var(--cf-navy)]">{editor ? editor.text("packages", [itemIndex, "microGuarantees", 0], item.microGuarantees[0] ?? "Timing confirmed after photos") : (item.microGuarantees[0] ?? "Timing confirmed after photos")}</p>
            <p className="mt-4 text-[15px] leading-6 text-[var(--cf-text-soft)]"><span className="font-extrabold text-[var(--cf-navy)]">Best for:</span> {editor ? editor.text("packages", [itemIndex, "problem"], item.problem) : item.problem}</p>
            <p className="mt-3 text-[15px] leading-6 text-[var(--cf-text-soft)]">{editor ? editor.text("packages", [itemIndex, "description"], item.description) : item.description}</p>

            <ul className="mt-5 grid gap-2 text-sm leading-6 text-[var(--cf-navy)]">
              {item.includedServices.map((included, serviceIndex) => (
                <li key={included} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cf-gold)]" aria-hidden="true" />
                  <span>{editor ? editor.text("packages", [itemIndex, "includedServices", serviceIndex], included) : included}</span>
                </li>
              ))}
            </ul>
            {editor ? editor.button(ctaButtonConfig(content, cta, "mt-6 w-full", "primary")) : (
              <Link href={cta.href} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[14px] bg-[var(--cf-cherry)] px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(138,15,46,0.22)] transition hover:-translate-y-px hover:bg-[var(--cf-cherry-2)]">
                {cta.label}
              </Link>
            )}
          </article>
        )})}
      </div>

      <div className="mt-5 grid gap-3 rounded-[22px] border border-[var(--cf-border)] bg-[var(--cf-ivory-2)] p-5 text-sm leading-6 text-[var(--cf-text-soft)] shadow-[var(--cf-shadow-soft)] md:grid-cols-3">
        <p><span className="font-extrabold text-[var(--cf-navy)]">Paint work:</span> Paint work is scoped from photos or visit. Colour, rooms/areas and number of coats are agreed before work starts. Exact colour matching or full room repaint can be quoted separately.</p>
        <p><span className="font-extrabold text-[var(--cf-navy)]">Final price:</span> Final price depends on property size, condition, access, materials and selected upgrades. Send photos for a clear quote before work starts.</p>
        <p><span className="font-extrabold text-[var(--cf-navy)]">Bigger jobs:</span> If the property is larger, heavily used or needs multiple rooms painted, we may recommend the 72h reset or a custom quote.</p>
      </div>

      <div className="mt-5 rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-5 shadow-[var(--cf-shadow-soft)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[var(--cf-navy)]">Add extra impact where needed</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--cf-text-soft)]">
              Choose only the target areas that add real value for the deadline. Some 72h selected scope can include patio / driveway wash or accessible exterior detail, but larger exterior cleaning, specialist odour work and professional photography are quoted separately.
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

function HowItWorksApproved({ content, editor, phone }: { content: ContentBundle; editor?: VisualEditorAdapter; phone: string }) {
  const { ctaMappings, findSection } = createContentHelpers(content);
  const section = findSection("how-it-works");
  const sectionIndex = content.homepageSections.findIndex((item) => item.id === "how-it-works");
  const wa = whatsappHref(phone);
  const quoteCta = ctaMappings.find((cta) => cta.id === "build-your-quote") ?? { id: "build-your-quote", label: "Get a quote", href: "/quote" };
  const whatsappButton = {
    id: "how-whatsapp",
    resource: "homepage-sections" as const,
    label: typeof section.whatsappLabel === "string" ? section.whatsappLabel : "Send photos on WhatsApp",
    href: typeof section.whatsappHref === "string" ? section.whatsappHref : wa,
    labelPath: [sectionIndex, "whatsappLabel"],
    hrefPath: [sectionIndex, "whatsappHref"],
    className: "w-full sm:w-auto",
    variant: "whatsapp" as const,
  };
  const steps = section.steps ?? [
    { title: "Send photos", description: "WhatsApp us pictures of the property." },
    { title: "We review", description: "We identify the visible issues that matter." },
    { title: "You get a quote", description: "Clear scope, timeframe and price." },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-[28px] border border-[var(--cf-border-dark)] bg-[linear-gradient(135deg,var(--cf-navy),var(--cf-navy-2))] p-6 text-white shadow-[var(--cf-shadow-navy)] lg:grid-cols-[0.82fr_1.18fr] lg:p-9">
        <div className="self-center">
          <SectionLabel light>How it works</SectionLabel>
          <h2 className="mt-4 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[46px]">
            {editor ? editor.text("homepage-sections", [sectionIndex, "title"], section.title ?? "Send photos. Get your reset plan.") : <>Send photos.<br />Get your reset plan.</>}
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-8 text-[var(--cf-text-light-soft)] lg:text-[18px]">
            {editor ? editor.text("homepage-sections", [sectionIndex, "subtitle"], section.subtitle ?? "Tell us what you need and when. We'll review the photos, identify the visible issues and send a clear quote for the practical reset work.") : <>Tell us what you need and when. We&apos;ll review the photos, identify the visible issues and send a clear quote for the practical reset work.</>}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {editor ? editor.button(whatsappButton) : <WhatsAppButton href={wa} className="w-full sm:w-auto">Send photos on WhatsApp</WhatsAppButton>}
            {editableCta(content, editor, quoteCta, "w-full sm:w-auto", "primary", <QuoteButton href={quoteCta.href} className="w-full sm:w-auto">{quoteCta.label}</QuoteButton>)}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.slice(0, 3).map((step, index) => (
            <article key={`${step.title}-${index}`} className="rounded-[22px] border border-white/20 bg-white/[0.06] p-5 shadow-sm">
              <p className="text-sm font-black text-[var(--cf-gold-soft)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-[20px] font-extrabold text-white">{editor ? editor.text("homepage-sections", [sectionIndex, "steps", index, "title"], step.title) : step.title}</h3>
              <p className="mt-3 text-[16px] leading-7 text-[var(--cf-text-light-soft)]">{editor ? editor.text("homepage-sections", [sectionIndex, "steps", index, "description"], step.description) : step.description}</p>
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

function TrustAreasRow({ content, editor }: { content: ContentBundle; editor?: VisualEditorAdapter }) {
  const { findSection, visibleSorted } = createContentHelpers(content);
  const section = findSection("areas-served");
  const sectionIndex = findSectionIndex(content, "areas-served");
  const areas = visibleSorted(content.areas);
  const testimonialQuote = typeof section.testimonialQuote === "string" ? section.testimonialQuote : "The difference was unreal. The little details we didn't have time for - they handled everything. Place looked perfect for photos.";
  const testimonialAuthor = typeof section.testimonialAuthor === "string" ? section.testimonialAuthor : "Sarah, Landlord in Bromley";
  const testimonialStars = typeof section.testimonialStars === "string" ? section.testimonialStars : "★★★★★";

  return (
    <section id="areas" className="mx-auto grid max-w-[1280px] gap-5 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
      <article className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
        <SectionLabel>{editor ? editor.text("homepage-sections", [sectionIndex, "eyebrow"], section.eyebrow ?? "Trusted by homeowners, landlords & agents") : "Trusted by homeowners, landlords & agents"}</SectionLabel>
        <ul className="mt-5 space-y-3 text-[16px] font-semibold leading-7 text-[var(--cf-navy)]">
          {(section.trustBadges ?? ["Clear quote before work starts", "Practical reset, not renovation", "Respect for your home", "WhatsApp updates", "Insured & reliable"]).map((item, index) => (
            <li key={`${item}-${index}`}>✓ {editor ? editor.text("homepage-sections", [sectionIndex, "trustBadges", index], item) : item}</li>
          ))}
        </ul>
      </article>
      <article className="rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
        <p className="text-[var(--cf-gold)]" aria-label="5 stars">{editor ? editor.text("homepage-sections", [sectionIndex, "testimonialStars"], testimonialStars) : testimonialStars}</p>
        <blockquote className="mt-5 text-[20px] font-semibold leading-8 text-[var(--cf-navy)]">
          &quot;{editor ? editor.text("homepage-sections", [sectionIndex, "testimonialQuote"], testimonialQuote) : testimonialQuote}&quot;
        </blockquote>
        <p className="mt-5 text-sm font-extrabold text-[var(--cf-text-soft)]">{editor ? editor.text("homepage-sections", [sectionIndex, "testimonialAuthor"], testimonialAuthor) : testimonialAuthor}</p>
      </article>
      <article className="relative overflow-hidden rounded-[24px] border border-[var(--cf-border)] bg-[var(--cf-cream-card)] p-6 shadow-[var(--cf-shadow-soft)]">
        <SectionLabel>{editor ? editor.text("homepage-sections", [sectionIndex, "subtitle"], section.subtitle ?? "Areas we cover") : "Areas we cover"}</SectionLabel>
        <h2 className="mt-4 font-serif text-[32px] font-semibold leading-tight text-[var(--cf-navy)]">{editor ? editor.text("homepage-sections", [sectionIndex, "title"], section.title ?? "Bromley, South East London & Kent") : "Bromley, South East London & Kent"}</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {areas.map((area) => {
            const areaIndex = content.areas.findIndex((item) => item.id === area.id);
            return (
              <span key={area.id} className="rounded-full border border-[var(--cf-border)] bg-white px-3 py-2 text-sm font-bold text-[var(--cf-navy)]">
                {editor ? editor.text("areas", [areaIndex, "name"], area.name) : area.name}
              </span>
            );
          })}
        </div>
      </article>
    </section>
  );
}

function FinalCta({ content, editor, phone, image }: { content: ContentBundle; editor?: VisualEditorAdapter; phone: string; image?: string }) {
  const { ctaMappings, findSection } = createContentHelpers(content);
  const section = findSection("final-cta");
  const heroIndex = content.homepageSections.findIndex((item) => item.id === "hero");
  const sectionIndex = content.homepageSections.findIndex((item) => item.id === "final-cta");
  const primaryCta = ctaMappings.find((cta) => cta.id === section.primaryCtaId) ?? { id: "build-my-property-reset-quote", label: "Send photos on WhatsApp", href: "/quote" };
  const secondaryCta = ctaMappings.find((cta) => cta.id === "view-reset-packages") ?? { id: "view-reset-packages", label: "Get a quote", href: "/quote" };
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-[28px] border border-[var(--cf-border)] bg-[linear-gradient(135deg,var(--cf-warm-card),var(--cf-ivory-2))] shadow-[var(--cf-shadow-card)] lg:grid-cols-[1fr_0.55fr]">
        <div className="p-7 md:p-10">
          <h2 className="font-serif text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--cf-navy)] lg:text-[44px]">
            {editor ? editor.text("homepage-sections", [sectionIndex, "title"], section.title ?? "Ready to get your property reset?") : "Ready to get your property reset?"}
          </h2>
          <p className="mt-4 max-w-[620px] text-[17px] leading-8 text-[var(--cf-text-soft)]">
            {editor ? editor.text("homepage-sections", [sectionIndex, "subtitle"], section.subtitle ?? "Send photos on WhatsApp and we'll take care of the visible details.") : <>Send photos on WhatsApp and we&apos;ll take care of the visible details.</>}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {editableCta(content, editor, primaryCta, "w-full sm:w-auto", "whatsapp", <WhatsAppButton href={whatsappHref(phone)} className="w-full sm:w-auto">{primaryCta.label}</WhatsAppButton>)}
            {editableCta(content, editor, secondaryCta, "w-full sm:w-auto", "primary", <QuoteButton href={secondaryCta.href} className="w-full sm:w-auto">{secondaryCta.label}</QuoteButton>)}
          </div>
        </div>
        <div className="relative hidden min-h-[280px] lg:block">
          {editor ? editor.image({ resource: "homepage-sections", path: [heroIndex, "heroImage"], value: image, label: "Final CTA image", children: <PickImage src={image} alt="Warm finished room after property reset" /> }) : <PickImage src={image} alt="Warm finished room after property reset" />}
        </div>
      </div>
    </section>
  );
}

export function ApprovedHomePage({ content, editor }: { content: ContentBundle; editor?: VisualEditorAdapter }) {
  const { findSection, homepageTransformations, siteSettings, visibleSorted } = createContentHelpers(content);
  const hero = findSection("hero");
  const wrap = editor?.section ?? ((_id: string, _label: string, children: ReactNode) => children);
  const heroProof = visibleSorted(content.beforeAfterItems).find((item) => item.showOnHomepage) ?? heroProofItem;
  const heroProofIndex = content.beforeAfterItems.findIndex((item) => item.id === heroProof.id);
  const sectionNodes = [
    { id: "hero", label: "Hero", node: <HeroApproved content={content} editor={editor} strongestItem={heroProof} strongestItemIndex={heroProofIndex} />, actions: editableSectionProps(content, "hero") },
    { id: "trust", label: "Trust row", node: <TrustFeatureRow content={content} editor={editor} />, actions: editableSectionProps(content, "hero"), order: (findSection("hero").order ?? 1) + 0.1 },
    { id: "before-after", label: "Before & After", node: <HomepageTransformationCarousel content={homepageTransformations} editor={editor} />, actions: editableSectionProps(content, "before-after") },
    { id: "packages", label: "Packages", node: <ResetPackagesSection content={content} editor={editor} />, actions: editableSectionProps(content, "reset-packages") },
    { id: "solutions", label: "Services", node: <WhatWeReset content={content} editor={editor} />, actions: editableSectionProps(content, "flair-solutions") },
    { id: "how-it-works", label: "How it works", node: <HowItWorksApproved content={content} editor={editor} phone={siteSettings.phone} />, actions: editableSectionProps(content, "how-it-works") },
    { id: "guardian", label: "Guardian plans", node: <GuardianPlansSection content={content} editor={editor} />, actions: editableSectionProps(content, "guardian-plans") },
    { id: "areas", label: "Areas", node: <TrustAreasRow content={content} editor={editor} />, actions: editableSectionProps(content, "areas-served") },
    { id: "faq", label: "FAQ", node: <FAQSection content={content} editor={editor} />, actions: editableSectionProps(content, "faq") },
    { id: "final-cta", label: "Final CTA", node: <FinalCta content={content} editor={editor} phone={siteSettings.phone} image={hero.heroImage} />, actions: editableSectionProps(content, "final-cta") },
  ].filter((item) => {
    const section = item.actions ? content.homepageSections[item.actions.index] : undefined;
    return section?.visible !== false;
  }).sort((a, b) => {
    const aSection = a.actions ? content.homepageSections[a.actions.index] : undefined;
    const bSection = b.actions ? content.homepageSections[b.actions.index] : undefined;
    return (a.order ?? aSection?.order ?? 0) - (b.order ?? bSection?.order ?? 0);
  });

  return (
    <>
      {sectionNodes.map((item) => <Fragment key={item.id}>{wrap(item.id, item.label, item.node, item.actions)}</Fragment>)}
    </>
  );
}
