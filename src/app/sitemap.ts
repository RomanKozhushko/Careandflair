import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/quote",
  "/services",
  "/reset-packages",
  "/guardian-plans",
  "/before-after",
  "/areas",
  "/areas/bromley",
  "/areas/south-east-london",
  "/areas/kent",
  "/areas/medway",
  "/areas/rochester",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/quote" ? 0.9 : 0.75,
  }));
}
