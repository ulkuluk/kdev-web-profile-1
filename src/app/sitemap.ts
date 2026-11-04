import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getAllCaseStudySlugs } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllCaseStudySlugs();
  const caseStudyRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${env.siteUrl}/work/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: env.siteUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${env.siteUrl}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${env.siteUrl}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${env.siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${env.siteUrl}/contact`, changeFrequency: "weekly", priority: 0.8 },
  ];

  return [...coreRoutes, ...caseStudyRoutes];
}
