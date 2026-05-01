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
  email: string;
  serviceAreaSummary: string;
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
  primaryCtaId?: string;
  secondaryCtaId?: string;
  trustBadges?: string[];
  heroImage?: string;
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
  category?: string;
  serviceType: string;
  description: string;
  location: string;
  imageBefore?: string;
  imageAfter?: string;
  featured: boolean;
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
export type OptionalUpgrade = Visibility & { id: string; title: string; description?: string; basePrice?: number };
export type PricingMatrixRow = { packageId: string; propertyCategoryId: string; propertyTypeId: string; fromPrice: number };
export type QuoteBuilderConfig = { steps: string[]; estimateLabel: string };
