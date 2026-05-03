import type { OptionalUpgrade, PricingMatrixRow, QuoteEstimate, QuoteSelection } from "@/lib/types";

export function findBasePrice(selection: QuoteSelection, pricingMatrix: PricingMatrixRow[]): number {
  const row = pricingMatrix.find(
    (item) =>
      item.packageId === selection.packageId &&
      item.propertyCategoryId === selection.propertyCategoryId &&
      item.propertyTypeId === selection.propertyTypeId,
  );

  return row?.fromPrice ?? 0;
}

export function estimateQuote(selection: QuoteSelection, pricingMatrix: PricingMatrixRow[], upgrades: OptionalUpgrade[]): QuoteEstimate {
  const packageFromPrice = findBasePrice(selection, pricingMatrix);
  const upgradesTotal = selection.upgradeIds.reduce((total, upgradeId) => {
    const upgrade = upgrades.find((item) => item.id === upgradeId);
    return total + (upgrade?.basePrice ?? 0);
  }, 0);

  return {
    packageFromPrice,
    upgradesTotal,
    totalFromPrice: packageFromPrice + upgradesTotal,
  };
}

export function formatPounds(amount: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(amount);
}
