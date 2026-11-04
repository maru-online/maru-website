"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * A product screenshot in a slim browser frame, with a "View full size"
 * control that opens the complete capture in a native <dialog> (focus, Esc
 * and the backdrop are handled by the browser). Built for the GrowthIQ case
 * study on About (4 Nov 2026): the framed image is a legible crop, the full
 * size is the original capture.
 */
export default function ProductShot({
  frameLabel,
  src,
  width,
  height,
  alt,
  fullSrc,
  fullWidth,
  fullHeight,
  caption,
  sizes,
}: {
  frameLabel: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  fullSrc: string;
  fullWidth: number;
  fullHeight: number;
  caption: string;
  sizes: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Keep the page still behind the full-size view.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => { document.documentElement.style.overflow = ""; };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const open = () => {
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <figure className="shot">
      <div className="shot-frame">
        <div className="shot-bar" aria-hidden="true">
          <span className="shot-bar-label">{frameLabel}</span>
        </div>
        <button type="button" className="shot-open" onClick={open} aria-label={`View full size: ${alt}`}>
          <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="shot-img" />
        </button>
      </div>
      <figcaption className="shot-caption">
        <span>{caption}</span>
        <button type="button" className="shot-zoom" onClick={open}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          View full size
        </button>
      </figcaption>

      <dialog
        ref={dialogRef}
        className="shot-dialog"
        aria-label={`${frameLabel}, full size`}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div className="shot-dialog-inner">
          <button type="button" className="reader-close shot-dialog-close" onClick={close} aria-label="Close full size view">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {/* Eager: lazy images inside a closed <dialog> never count as in view, so
              they would still be blank when it opens. The capture is small. */}
          <Image src={fullSrc} alt={alt} width={fullWidth} height={fullHeight} sizes="(min-width: 1840px) 1800px, 96vw" loading="eager" className="shot-dialog-img" />
          <p className="shot-dialog-caption">{caption}</p>
        </div>
      </dialog>
    </figure>
  );
}
