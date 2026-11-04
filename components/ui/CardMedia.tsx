import Image from "next/image";
import Glyph, { type GlyphName } from "@/components/ui/Glyph";

/**
 * Card and section imagery (reading system, 3 Nov 2026). Moved here from the
 * Guides & Resources cards so every page uses the same two treatments.
 *
 *  - TreatedImage: every photograph passes through here. A navy multiply layer
 *    puts very different photos in one family, plus a soft fade from the
 *    bottom edge. Product screenshots pass `untinted` so they stay accurate.
 *  - DrawnVisual: the stand-in when there is no photograph. Layered gradients,
 *    the hero grid motif and one Glyph.
 */
export function TreatedImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  untinted = false,
  tone = "deep",
  position,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  untinted?: boolean;
  /**
   * "deep" (default, 4 Nov 2026): for daylight photos. Partly desaturated,
   * then a navy colour blend (keeps each pixel's brightness), a light navy
   * multiply and a faint cyan light from the top right, so every photo lands
   * in one blue family with its highlights intact.
   * "standard": the older light navy multiply, for photos made dark and blue
   * at source (the AI integration guide image).
   */
  tone?: "standard" | "deep";
  /** CSS object-position, to keep the subject in a wide crop (e.g. "50% 40%"). */
  position?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: "var(--color-bg-navy-deep)" }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={untinted ? "object-cover object-top" : "object-cover"}
        style={{
          ...(position ? { objectPosition: position } : {}),
          ...(!untinted && tone === "deep" ? { filter: "saturate(0.45) contrast(1.12) brightness(0.95)" } : {}),
        }}
      />
      {!untinted && tone === "deep" && (
        <>
          {/* Colour blend: navy takes over the hue but keeps each pixel's
              brightness, so faces, paper and screens keep their highlights. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-color"
            style={{ background: "linear-gradient(135deg, rgba(27,68,104,0.9), rgba(18,48,79,0.9))" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: "linear-gradient(135deg, rgba(26,58,92,0.38), rgba(14,34,58,0.52))" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-screen"
            style={{ background: "radial-gradient(80% 90% at 85% 0%, rgba(61,184,198,0.18), transparent 60%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,27,42,0.5), rgba(13,27,42,0) 55%)" }}
          />
        </>
      )}
      {!untinted && tone === "standard" && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply"
            style={{ background: "linear-gradient(135deg, rgba(26,58,92,0.55), rgba(22,50,79,0.25))" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,27,42,0.45), rgba(13,27,42,0) 55%)" }}
          />
        </>
      )}
    </div>
  );
}

export function DrawnVisual({
  glyph,
  glyphSize = 44,
  className = "",
}: {
  glyph: GlyphName;
  glyphSize?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden grid place-items-center ${className}`}
      style={{
        background:
          "radial-gradient(70% 90% at 85% 0%, rgba(61,184,198,0.30), transparent 60%), radial-gradient(60% 70% at 0% 100%, rgba(61,184,198,0.12), transparent 70%), var(--gradient-hero)",
      }}
    >
      {/* Faint grid, same motif as the heroes */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,184,198,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(61,184,198,0.10) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />
      <span style={{ color: "var(--color-cyan)" }} className="relative">
        <Glyph name={glyph} size={glyphSize} />
      </span>
    </div>
  );
}
