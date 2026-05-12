import type { MetadataRoute } from "next";
import { loadSearchIndex, loadDossiers } from "@/lib/data";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [records, dossiers] = await Promise.all([
    loadSearchIndex(),
    loadDossiers(),
  ]);

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
    ...Object.keys(dossiers).map((slug) => ({
      url: `${SITE.origin}/dossie/${slug}/`,
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
