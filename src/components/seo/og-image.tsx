// Shared visual template for all opengraph-image.tsx handlers.
// Uses Next's ImageResponse (built on Satori), which supports a subset of
// CSS — flex layouts only, no `display: block`, no Tailwind. Style inline.

import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#F4F0E8";
const PAPER_WARM = "#EAE3D3";
const INK = "#1B1714";
const INK_MUTED = "#5A5651";
const ACCENT = "#7A2E1F";
const RULE = "#D8D2C5";

/**
 * Render the canonical OG image: cream paper background, a single black
 * redaction bar (the brand mark), title + small meta, and a stamp top-right.
 *
 * Title is the page-specific text (e.g. "NASA-UAP-D2, Apollo 17 Transcript").
 * Eyebrow + stamp give context (e.g. "REGISTRO · NASA" + "RELEASE 01").
 */
export function renderOgImage({
  eyebrow,
  title,
  stamp,
  hint,
}: {
  eyebrow?: string;
  title: string;
  stamp?: string;
  hint?: string;
}): Promise<Response> {
  return Promise.resolve(
    new ImageResponse(
      (
        <div
          style={{
            width: OG_SIZE.width,
            height: OG_SIZE.height,
            background: PAPER,
            display: "flex",
            flexDirection: "column",
            padding: "64px 80px",
            position: "relative",
            fontFamily: "serif",
          }}
        >
          {/* Top bar: brand + stamp */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: INK_MUTED,
                }}
              >
                Arquivo OVNI/UAP · BR
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#8A857D",
                  marginTop: 6,
                }}
              >
                arquivos-ufo.cloud
              </span>
            </div>
            {stamp ? (
              <span
                style={{
                  border: `2px solid ${ACCENT}`,
                  color: ACCENT,
                  padding: "10px 18px",
                  fontFamily: "monospace",
                  fontSize: 18,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                {stamp}
              </span>
            ) : null}
          </div>

          {/* Redaction bar — the brand mark, anchored to the eyebrow */}
          <div
            style={{
              marginTop: 72,
              marginBottom: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {eyebrow ? (
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 22,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: INK_MUTED,
                  marginBottom: 18,
                }}
              >
                {eyebrow}
              </span>
            ) : null}
            <div
              style={{
                width: 220,
                height: 32,
                background: INK,
                marginBottom: 28,
              }}
            />
          </div>

          {/* Title — clamps to ~110 chars to avoid overflow at 1200×630 */}
          <div
            style={{
              fontSize: title.length > 80 ? 56 : 72,
              fontWeight: 600,
              letterSpacing: -1,
              lineHeight: 1.08,
              color: INK,
              display: "flex",
              maxWidth: 1040,
            }}
          >
            {clamp(title, 110)}
          </div>

          {/* Bottom area: divider + hint + corner detail */}
          <div
            style={{
              position: "absolute",
              bottom: 64,
              left: 80,
              right: 80,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: 80,
                  height: 2,
                  background: RULE,
                  marginBottom: 16,
                }}
              />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 17,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: INK_MUTED,
                }}
              >
                {hint || "Documentos do Pentágono em PT-BR"}
              </span>
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 15,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#8A857D",
              }}
            >
              FF Media
            </span>
          </div>

          {/* Decorative paper-warm strip on the right edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 8,
              height: OG_SIZE.height,
              background: PAPER_WARM,
            }}
          />
        </div>
      ),
      OG_SIZE,
    ),
  );
}

function clamp(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}
