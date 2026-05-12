import type { MetadataRoute } from "next";
import { loadSearchIndex } from "@/lib/data";
import { SITE } from "@/lib/site";
import { DOSSIERS } from "@/lib/dossiers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const records = await loadSearchIndex();
  const now = new Date();

  // Match the runtime URLs exactly: trailing slash on every route, encoded id
  // for records that contain special chars.
  return [
    {
      url: `${SITE.origin}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE.origin}/sobre/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE.origin}/faq/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...DOSSIERS.map((d) => ({
      url: `${SITE.origin}/dossie/${d.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...records.map((r) => ({
      url: `${SITE.origin}/registro/${encodeURIComponent(r.id)}/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
