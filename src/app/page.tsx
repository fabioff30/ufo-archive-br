import { loadMeta, loadSearchIndex } from "@/lib/data";
import { ArchiveClient } from "@/components/archive/client";
import { Highlights } from "@/components/home/highlights";
import { Gallery } from "@/components/home/gallery";

export default async function HomePage() {
  const [records, meta] = await Promise.all([loadSearchIndex(), loadMeta()]);

  return (
    <ArchiveClient records={records} meta={meta}>
      <Highlights />
      <Gallery />
    </ArchiveClient>
  );
}
