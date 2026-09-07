import type { MetadataRoute } from "next";
import { home } from "@/lib/data";

const BASE = "https://sunlifetraders.com";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/services/roof-top-solar-plant-installation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE}/services/ground-mount-solar-installation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE}/services/solar-plant-maintenance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE}/services/solar-power-plant-amc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/franchise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  { url: `${BASE}/calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages: MetadataRoute.Sitemap = home.products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...STATIC_PAGES, ...productPages];
}
