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

export type HomepageTransformationSlide = {
  id: string;
  isActive?: boolean;
  order?: number;
  title: string;
  beforeLabel: string;
  beforeHeading: string;
  beforeText: string;
  afterLabel: string;
  afterHeading: string;
  afterText: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  badges?: string[];
};

export type HomepageTransformationsContent = {
  sectionLabel: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  slides: HomepageTransformationSlide[];
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

export type AudienceMode = Visibility & {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  priorityProblems: string[];
  ctaLabel: string;
};

export type RiskCategory =
  | "bathroom-trust"
  | "odour-smell"
  | "photo-readiness"
  | "curb-appeal"
  | "hygiene-confidence"
  | "tenant-damage-impression"
  | "guest-readiness-risk";

export type ProblemCategory = Visibility & {
  id: string;
  label: string;
  description: string;
  weight: number;
  severity: "light" | "moderate" | "heavy";
  tags: string[];
  riskCategory: RiskCategory;
  riskLabel: string;
  riskExplanation: string;
  recommendedAction: string;
  recommendedPackage: string;
  recommendedUpgrades: string[];
  quotePreset: string;
  matchingBeforeAfterCategory: string;
};

export type ReadinessBand = {
  id: string;
  min: number;
  max: number;
  label: string;
  tone: "good" | "watch" | "urgent" | "critical";
  summary: string;
  preset: string;
  recommendation: string;
};

export type ReadinessScoresConfig = {
  baseScore: number;
  audiencePenaltyBoost: number;
  bands: ReadinessBand[];
  rules: {
    heavyProblemCountForUltimate: number;
    totalProblemsForUltimate: number;
    totalProblemsForPro: number;
  };
};

export type BeforeAfterMatch = {
  problemId: string;
  matchingBeforeAfterCategory: string;
  matchingServiceType: string;
  fallbackCaseSlug: string;
  fallbackTitle: string;
  fallbackProblem: string;
  fallbackSolution: string;
  fallbackResult: string;
  quoteParamType: "preset" | "upgrade";
  quoteParamValue: string;
};

export type InteractiveToolsConfig = {
  conversionCore: {
    visible: boolean;
    commonReasons?: string[];
    steps: Record<string, string>;
    problemPicker: Record<string, string>;
    score: Record<string, string>;
    report: Record<string, string>;
    cta: Record<string, string>;
  };
};

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
