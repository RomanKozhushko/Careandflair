const resetPackageSlugs = new Set(["24h-express-reset", "48h-pro-flair-reset", "72h-ultimate-reset"]);

export function visualCtaHref(slug: string) {
  const param = resetPackageSlugs.has(slug) ? "preset" : "upgrade";
  return `/quote?${param}=${slug}`;
}
