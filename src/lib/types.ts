export type Visibility = {
  visible: boolean;
  order?: number;
};

export type CtaMapping = {
  id: string;
  label: string;
  href: string;
};

export type PropertyCategory = Visibility & {
  id: string;
  name: string;
};

export type PropertyType = Visibility & {
  id: string;
  categoryId: string;
  name: string;
};

export type ServicePackage = Visibility & {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  startingPrice?: number;
  featured?: boolean;
  ctaMappingId?: string;
};

export type OptionalUpgrade = Visibility & {
  id: string;
  title: string;
  description?: string;
  basePrice?: number;
  visibleForPackages?: string[];
  visibleForCategories?: string[];
};

export type PricingMatrixRow = {
  packageId: string;
  propertyCategoryId: string;
  propertyTypeId: string;
  fromPrice: number;
};

export type QuoteBuilderConfig = {
  steps: string[];
  estimateLabel: string;
};
