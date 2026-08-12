import type { MetadataRoute } from "next";
import { servicePages, SITE_LAST_MODIFIED, SITE_URL } from "./seo-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls: MetadataRoute.Sitemap = servicePages.map((service) => ({
    url: `${SITE_URL}/servicos/${service.slug}/`,
    lastModified: new Date(SITE_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(SITE_LAST_MODIFIED),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceUrls,
  ];
}
