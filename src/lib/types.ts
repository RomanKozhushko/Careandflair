export type Visibility = {
  visible: boolean;
  order?: number;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SiteSettings = {
  siteName: string;
  positioning: string;
  primaryObjective: string;
  defaultLocale: string;
  phone: string;
  website?: string;
  email: string;
  brandLine?: string;
  coreMessage?: string;
  serviceAreaSummary: string;
  parallax?: {
    parallaxEnabled: boolean;
    parallaxIntensity: "subtle" | "medium" | "off";
    disableOnMobile: boolean;
  };
  navigation: NavLink[];
  footerLinks: NavLink[];
};

export type CtaMapping = {
  id: string;
  label: string;
  href: string;
};

export type HeroProof = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  label?: string;
};

export type HomepageSection = Visibility & {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  explanation?: string;
  primaryCtaId?: string;
  secondaryCtaId?: string;
  trustBadges?: string[];
  heroImage?: string;
  heroImageAlt?: string;
  image?: string;
  imageAlt?: string;
  visualSteps?: string[];
  visualProofs?: HeroProof[];
  steps?: Array<{
    title: string;
    description: string;
  }>;
};

export type ServicePackage = Visibility & {
  id: string;
  name: string;
  slug: string;
  slogan: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  startingPrice: number;
  includedServices: string[];
  microGuarantees: string[];
  image?: string;
  imageAlt?: string;
  title?: string;
  visualLabel?: string;
  proofDetails?: string[];
  featured: boolean;
  ctaMappingId: string;
};

export type Solution = Visibility & {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  serviceType: string;
  image?: string;
  imageAlt?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  imageBefore?: string;
  imageAfter?: string;
  problem: string;
  solution: string;
  result: string;
  startingPrice: number | null;
  featured: boolean;
  ctaMappingId: string;
};

export type GuardianPlan = Visibility & {
  id: string;
  name: string;
  description: string;
  billingPeriod: string;
  includedChecks: string[];
  recommended: boolean;
};

export type BeforeAfterItem = Visibility & {
  id: string;
  title: string;
  slug: string;
  category: string;
  serviceType: string;
  propertyType: string;
  location: string;
  image?: string;
  imageAlt?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  problem: string;
  solution: string;
  result: string;
  featured: boolean;
  showOnHomepage: boolean;
  ctaLabel: string;
  ctaPreset: string;
};

export type Area = Visibility & {
  id: string;
  name: string;
  description: string;
};

export type FaqItem = Visibility & {
  id: string;
  question: string;
  answer: string;
};

export type PropertyCategory = Visibility & { id: string; name: string };
export type PropertyType = Visibility & { id: string; categoryId: string; name: string };
export type OptionalUpgrade = Visibility & { id: string; title: string; description?: string; basePrice: number };
export type PricingMatrixRow = { packageId: string; propertyCategoryId: string; propertyTypeId: string; fromPrice: number };

export type QuoteBuilderConfig = {
  steps: string[];
  estimateLabel: string;
  currency: string;
  disclaimer: string;
  page: {
    eyebrow: string;
    title: string;
    intro: string;
    mockNotice: string;
  };
  stepLabels: Record<string, string>;
  actions: {
    next: string;
    back: string;
    submit: string;
    startAgain: string;
  };
  contactFields: {
    name: string;
    phone: string;
    email: string;
    postcode: string;
    message: string;
  };
  priceBreakdownLabels: {
    packageBase: string;
    upgrades: string;
    notSelected: string;
  };
  summaryTitle: string;
  successTitle: string;
  successMessage: string;
};

export type QuoteContactDetails = {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  message: string;
};

export type QuoteSelection = {
  packageId?: string;
  propertyCategoryId?: string;
  propertyTypeId?: string;
  upgradeIds: string[];
  contact: QuoteContactDetails;
};

export type QuoteEstimate = {
  packageFromPrice: number;
  upgradesTotal: number;
  totalFromPrice: number;
};
