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
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  untinted?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: "var(--color-bg-navy-deep)" }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={untinted ? "object-cover object-top" : "object-cover"} />
      {!untinted && (
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
