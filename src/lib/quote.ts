import type { OptionalUpgrade, PropertyCategory, PropertyType, QuoteContactDetails, QuoteSelection, ServicePackage } from "@/lib/types";

export const emptyContactDetails: QuoteContactDetails = {
  name: "",
  phone: "",
  email: "",
  postcode: "",
  message: "",
};

export function createInitialQuoteSelection(preset?: string | null, upgrade?: string | null): QuoteSelection {
  return {
    packageId: preset ?? undefined,
    propertyCategoryId: undefined,
    propertyTypeId: undefined,
    upgradeIds: upgrade ? upgrade.split(",").map((item) => item.trim()).filter(Boolean) : [],
    contact: emptyContactDetails,
  };
}

export function findSelectedPackage(selection: QuoteSelection, packages: ServicePackage[]) {
  return packages.find((item) => item.id === selection.packageId || item.slug === selection.packageId);
}

export function findSelectedCategory(selection: QuoteSelection, categories: PropertyCategory[]) {
  return categories.find((item) => item.id === selection.propertyCategoryId);
}

export function findSelectedPropertyType(selection: QuoteSelection, propertyTypes: PropertyType[]) {
  return propertyTypes.find((item) => item.id === selection.propertyTypeId);
}

export function findSelectedUpgrades(selection: QuoteSelection, upgrades: OptionalUpgrade[]) {
  return selection.upgradeIds.map((id) => upgrades.find((item) => item.id === id)).filter((item): item is OptionalUpgrade => Boolean(item));
}

export function isContactComplete(contact: QuoteContactDetails) {
  return Boolean(contact.name.trim() && contact.phone.trim() && contact.email.trim() && contact.postcode.trim());
}
