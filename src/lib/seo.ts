import type { Metadata } from "next";

export const siteUrl = "https://careandflair.life";
export const businessName = "Care & Flair";
export const phone = "+44 7445 897204";
export const email = "hello@careandflair.life";
export const coreAreas = ["Bromley", "South East London", "Kent", "Medway", "Rochester"];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: businessName,
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: absoluteUrl("/images/generated/anti-mould-before-after.jpg"),
          width: 768,
          height: 1024,
          alt: "Care & Flair before and after property reset result",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/images/generated/anti-mould-before-after.jpg")],
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: businessName,
    url: siteUrl,
    telephone: phone,
    email,
    image: absoluteUrl("/images/generated/anti-mould-before-after.jpg"),
    description:
      "Property reset, cleaning and minor maintenance support for landlords, agents, homeowners and hosts across Bromley, South East London, Kent, Medway and Rochester.",
    areaServed: coreAreas.map((name) => ({ "@type": "Place", name })),
    priceRange: "££",
    sameAs: [siteUrl],
    makesOffer: [
      "24h Express Property Reset",
      "48h Pro Flair Reset",
      "72h Ultimate Reset",
      "End of tenancy recovery",
      "Move-in cleaning and minor repairs",
      "Airbnb launch and recovery reset",
    ].map((name) => ({ "@type": "Offer", name })),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
