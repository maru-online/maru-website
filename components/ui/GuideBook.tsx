import Image from "next/image";

/**
 * A downloadable guide shown as a book (5 Nov 2026): the real cover, a spine
 * highlight, page edges and a soft lift, turned slightly in 3D. On mouse
 * devices it turns towards the reader on hover; static under reduced motion.
 * Styles: .guide-book in globals.css.
 */
export default function GuideBook({
  src,
  alt,
  width = 300,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  /** Rendered cover width in px (A4 ratio is kept). */
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    // Scales down on narrow screens (70% of the viewport at most).
    <div className={`guide-book ${className}`.trim()} style={{ width: `min(${width}px, 70vw)` }}>
      <div className="guide-book-body">
        <Image
          src={src}
          alt={alt}
          width={1191}
          height={1685}
          sizes={`(max-width: 640px) 70vw, ${width}px`}
          priority={priority}
          className="guide-book-cover"
        />
      </div>
    </div>
  );
}
