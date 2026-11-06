"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Reading panel for Insights & Resources (4 Nov 2026).
 *
 * Opened by an intercepted route: clicking an article or guide on the
 * Insights & Resources pages slides it in over the listing, with the article's
 * own URL in the address bar. Close, Esc, the scrim or the browser's Back
 * button all return to the listing at the same scroll position. Loading the
 * URL directly (shared link, refresh, search) renders the full article page
 * instead; "Open full page" does the same on purpose.
 *
 * Behaviour only: the article itself is server-rendered and passed in.
 */
export default function ReaderPanel({
  titleId,
  sectionLabel,
  fullPageHref,
  children,
}: {
  titleId: string;
  sectionLabel: string;
  fullPageHref: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const close = useCallback(() => router.back(), [router]);

  // Lock the page behind, remember what had focus, move focus into the panel.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = prevOverflow;
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  // A new article opened from inside the panel starts at the top.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setProgress(0);
  }, [titleId]);

  // Esc closes; Tab stays inside the panel while it is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 1);
  };

  return (
    <div className="reader-root" role="presentation">
      <div className="reader-scrim" onClick={close} aria-hidden="true" />
      <div
        ref={panelRef}
        className="reader-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="reader-bar">
          <span className="reader-bar-label">{sectionLabel}</span>
          <div className="reader-bar-actions">
            {/* A plain link on purpose: a full load renders the full article page. */}
            <a href={fullPageHref} className="reader-action">
              Open full page
            </a>
            <button type="button" onClick={close} className="reader-close" aria-label="Close article">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <span className="reader-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
        </div>
        <div ref={scrollRef} className="reader-scroll" onScroll={onScroll}>
          {children}
        </div>
      </div>
    </div>
  );
}
