export type MarketingPageContent = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  primaryCta?: string;
  secondaryCta?: string;
  bullets: string[];
  sections: Array<{
    title: string;
    text: string;
    bullets?: string[];
  }>;
};

export const marketingPages: Record<string, MarketingPageContent> = {
  services: {
    slug: "services",
    title: "Property reset services for landlords, agents, homeowners and hosts",
    description:
      "Cleaning, small repairs, touch-ups, carpets, bathrooms, kitchens, anti-mould and presentation work across Bromley, South East London, Kent, Medway and Rochester.",
    eyebrow: "Services",
    intro:
      "Care & Flair is built for properties that need to feel ready fast. We combine practical cleaning, minor maintenance and visible presentation fixes in one coordinated reset.",
    primaryCta: "Build your quote",
    secondaryCta: "View reset packages",
    bullets: [
      "End-of-tenancy recovery and rental resets",
      "Move-in cleaning, touch-ups and small fixes",
      "Sale-ready presentation before photos or viewings",
      "Airbnb launch and recovery resets",
      "Bathroom, kitchen, carpet, mould, window and exterior detail",
    ],
    sections: [
      {
        title: "Cleaning + small repairs in one visit",
        text: "Most homes do not need a full refurbishment before people walk in. They need the visible issues handled: old silicone, limescale, wall marks, greasy kitchens, stained carpets, loose fittings and dull entrances.",
      },
      {
        title: "Built around deadlines",
        text: "Choose a 24h, 48h or 72h starting point, then send photos so we can confirm scope, access, materials and the realistic turnaround.",
      },
      {
        title: "Proof after the work",
        text: "Before/after photos and WhatsApp updates help landlords, agents and remote owners see exactly what has changed.",
      },
    ],
  },
  "reset-packages": {
    slug: "reset-packages",
    title: "24h, 48h and 72h property reset packages",
    description:
      "Compare Care & Flair reset packages for urgent, stronger and complete selected-area property resets across Bromley, South East London, Kent, Medway and Rochester.",
    eyebrow: "Reset packages",
    intro:
      "The packages are starting points, not fake fixed promises. Final pricing depends on photos, property size, condition, access, urgency and selected upgrades.",
    primaryCta: "Get a reset quote",
    secondaryCta: "See services",
    bullets: [
      "24h Express Reset for almost-ready properties",
      "48h Pro Flair Reset for stronger visual uplift",
      "72h Ultimate Reset for selected-area transformation",
      "Clear quote before work starts",
      "Photo proof after the job",
    ],
    sections: [
      {
        title: "24h Express Reset",
        text: "For urgent first-look fixes when a property is close to ready but tired details still stand out.",
      },
      {
        title: "48h Pro Flair Reset",
        text: "The most useful option for many landlords, sellers and move-in homes that need a stronger visual reset without refurbishment.",
      },
      {
        title: "72h Ultimate Reset",
        text: "For selected areas that need cleaning, fixing, refreshing and presentation work before sale photos, new tenants, guests or move-in.",
      },
    ],
  },
  "guardian-plans": {
    slug: "guardian-plans",
    title: "Guardian property oversight plans",
    description:
      "Ongoing property checks, photo reports and small-fix support for landlords and managed homes around Bromley, South East London, Kent, Medway and Rochester.",
    eyebrow: "Guardian plans",
    intro:
      "Guardian is for owners who need someone local to check a property, spot visible issues early and coordinate small practical fixes before they become bigger problems.",
    primaryCta: "Ask about Guardian",
    secondaryCta: "Get a quote",
    bullets: [
      "Visual inspection and issue report",
      "Photo updates for remote landlords",
      "Priority booking for reset work",
      "Seasonal maintenance reminders",
      "Small-fix coordination where suitable",
    ],
    sections: [
      {
        title: "For remote owners and landlords",
        text: "Use Guardian when you cannot easily check a property yourself but still need eyes on cleaning, presentation, small defects and obvious maintenance issues.",
      },
      {
        title: "Not a substitute for specialist surveys",
        text: "Guardian is practical oversight and visible issue reporting. Specialist gas, electrical, structural or compliance work is quoted or referred separately.",
      },
    ],
  },
  about: {
    slug: "about",
    title: "About Care & Flair",
    description:
      "Care & Flair is a property reset, cleaning and minor maintenance service for landlords, agents, homeowners and hosts across Bromley, South East London, Kent, Medway and Rochester.",
    eyebrow: "About",
    intro:
      "Care & Flair exists for the awkward gap between a cleaner and a renovation team: the property is nearly there, but the visible details still stop it feeling ready.",
    primaryCta: "Get a quote",
    secondaryCta: "View services",
    bullets: [
      "Property reset, not generic handyman work",
      "Cleaning and small maintenance coordinated together",
      "Focused on visible proof and deadlines",
      "Built for landlords, agents, sellers, homeowners and hosts",
    ],
    sections: [
      {
        title: "What we believe",
        text: "A property does not always need more work. It needs the right visible work: clean bathrooms, presentable kitchens, refreshed surfaces, small fixes and proof that the job was handled.",
      },
      {
        title: "How we work",
        text: "You send photos and the deadline. We review the visible issues, confirm the scope and give a clear quote before work starts.",
      },
    ],
  },
  contact: {
    slug: "contact",
    title: "Contact Care & Flair",
    description:
      "Contact Care & Flair for property reset, cleaning and minor maintenance quotes across Bromley, South East London, Kent, Medway and Rochester.",
    eyebrow: "Contact",
    intro:
      "For the fastest quote, send photos of the property, postcode, access notes and the date it needs to be ready.",
    primaryCta: "Send photos on WhatsApp",
    secondaryCta: "Use quote builder",
    bullets: [
      "Phone and WhatsApp: +44 7445 897204",
      "Email: hello@careandflair.life",
      "Core areas: Bromley, South East London, Kent, Medway, Rochester",
      "Quotes are confirmed before work starts",
    ],
    sections: [
      {
        title: "What to send",
        text: "Photos of the rooms or problem areas, postcode, deadline, property type, access details and any special notes about parking, keys or materials.",
      },
      {
        title: "What happens next",
        text: "We review the photos, suggest the right reset option and confirm the quote, timing and scope before work starts.",
      },
    ],
  },
};

export const areaPages: Record<string, MarketingPageContent> = {
  bromley: {
    slug: "bromley",
    title: "Property reset services in Bromley",
    description:
      "24-72h property resets, end-of-tenancy recovery, cleaning and minor maintenance for landlords, agents, homeowners and hosts in Bromley.",
    eyebrow: "Bromley",
    intro:
      "Local property reset support for Bromley homes that need to be ready for viewings, move-in, handover, sale photos or Airbnb launch/recovery.",
    primaryCta: "Get a Bromley quote",
    secondaryCta: "View services",
    bullets: [
      "End-of-tenancy reset in Bromley",
      "Move-in cleaning and small repairs",
      "Sale-ready presentation before photos",
      "Airbnb launch and recovery resets",
      "Before/after photo proof",
    ],
    sections: [
      {
        title: "Built for Bromley landlords and agents",
        text: "We handle visible cleaning, wall marks, tired bathrooms, greasy kitchens, carpet issues, small fittings and presentation details that can delay a viewing or handover.",
      },
      {
        title: "Fast quote from photos",
        text: "Send photos, postcode and deadline so we can confirm whether a 24h, 48h, 72h or custom reset fits the property.",
      },
    ],
  },
  "south-east-london": {
    slug: "south-east-london",
    title: "Property reset services in South East London",
    description:
      "Cleaning, small repairs and 24-72h property reset support for landlords, agents, sellers, homeowners and hosts across South East London.",
    eyebrow: "South East London",
    intro:
      "Care & Flair helps South East London properties feel ready again with cleaning, small maintenance and visible presentation work.",
    primaryCta: "Get a quote",
    secondaryCta: "View reset packages",
    bullets: [
      "Rental and move-out recovery",
      "Move-in property refresh",
      "Viewing and sale-photo preparation",
      "Bathroom, kitchen, carpet and window detail",
      "Photo updates after work",
    ],
    sections: [
      {
        title: "For deadline-led property work",
        text: "Useful when a cleaner alone is not enough, but a full renovation is not needed.",
      },
      {
        title: "Clear scope before arrival",
        text: "The quote is based on property condition, photos, access, parking, materials and urgency.",
      },
    ],
  },
  kent: {
    slug: "kent",
    title: "Property reset and maintenance support in Kent",
    description:
      "Property reset, cleaning, presentation and minor maintenance support for landlords, sellers, homeowners and hosts across Kent.",
    eyebrow: "Kent",
    intro:
      "Selected Kent properties can be reset for handover, listing, move-in, viewing or launch with practical cleaning, small repairs and presentation detail.",
    primaryCta: "Get a Kent quote",
    secondaryCta: "View packages",
    bullets: [
      "48h and 72h reset options",
      "Exterior entrance and patio detail where suitable",
      "Carpet and floor refresh",
      "Bathroom and kitchen reset",
      "Remote-owner photo proof",
    ],
    sections: [
      {
        title: "For properties that need visual uplift",
        text: "We focus on the details people notice first: entrances, kitchens, bathrooms, carpets, frames, fittings and presentation.",
      },
    ],
  },
  medway: {
    slug: "medway",
    title: "Property reset services in Medway",
    description:
      "24-72h property reset, cleaning and small maintenance support for landlords, agents, homeowners and hosts in Medway.",
    eyebrow: "Medway",
    intro:
      "Care & Flair supports Medway properties that need practical readiness work before tenants, buyers, guests or owners walk in.",
    primaryCta: "Get a Medway quote",
    secondaryCta: "See services",
    bullets: [
      "Rental reset and end-of-tenancy recovery",
      "Move-in and sale-ready refresh",
      "Cleaning plus visible small fixes",
      "WhatsApp quote workflow",
      "Photo proof after completion",
    ],
    sections: [
      {
        title: "Practical, visible work",
        text: "Not generic cleaning. Not full renovation. The reset is built around the visible problems that affect confidence, photos and handover.",
      },
    ],
  },
  rochester: {
    slug: "rochester",
    title: "Property reset services in Rochester",
    description:
      "Cleaning, small repairs and property reset support for landlords, agents, homeowners and hosts in Rochester.",
    eyebrow: "Rochester",
    intro:
      "Rochester property reset support for homes that need to feel cleaner, repaired and ready before the next person walks in.",
    primaryCta: "Get a Rochester quote",
    secondaryCta: "View before/after",
    bullets: [
      "End-of-tenancy recovery",
      "Move-in cleaning and touch-ups",
      "Airbnb launch and recovery reset",
      "Bathroom, kitchen and carpet focus",
      "Clear quote before work",
    ],
    sections: [
      {
        title: "Good for landlords and remote owners",
        text: "Send photos and deadline details so the visible scope can be priced before arrival.",
      },
    ],
  },
};
