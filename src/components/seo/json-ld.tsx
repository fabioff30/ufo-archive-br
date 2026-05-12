// Emits a <script type="application/ld+json"> tag with the given Schema.org
// object (or array of objects). Used by individual pages to inject the
// appropriate schema (Article, CollectionPage, AboutPage, etc.) into the
// prerendered HTML, where crawlers and AI engines can pick it up.

// JSON-LD payloads follow the Schema.org vocabulary, which is arbitrary by
// design. We don't read these back in TS, so accepting `unknown` here is the
// right tradeoff — strict typing would balloon the surface without buying us
// any safety.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built statically from server-controlled data — no user
      // input flows into it — so JSON.stringify is sufficient to escape.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
