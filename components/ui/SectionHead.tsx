import type { ReactNode } from "react";
import { FadeUp } from "@/components/ui/Animate";

/**
 * The one section head used site-wide (reading system, 3 Nov 2026).
 *
 * Eyebrow, one heading at one weight, one short intro line. A two-part title
 * (`light` + `strong`) keeps one weight: the second part changes colour only
 * (Jimmy's rule, 1 Nov 2026). Inside a `.section-dark` section the colours
 * switch automatically; `dark` is only needed on other navy grounds.
 */
export default function SectionHead({
  id,
  eyebrow,
  title,
  light,
  strong,
  intro,
  dark = false,
  animate = true,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  /** Whole title; use `<span className="hl">` for a highlighted phrase. */
  title?: ReactNode;
  /** Or a two-part title: plain lead, then a highlighted phrase. */
  light?: string;
  strong?: string;
  intro?: ReactNode;
  dark?: boolean;
  animate?: boolean;
  className?: string;
}) {
  const heading = title ?? (
    <>
      {light}
      {light && strong ? " " : null}
      {strong && <span className="hl">{strong}</span>}
    </>
  );

  const body = (
    <div className={className}>
      {eyebrow && (
        <span
          className={dark ? "label-eyebrow" : "label-eyebrow label-eyebrow-ink"}
          style={{ marginBottom: "1.5rem" }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className="section-title"
        style={dark ? { color: "var(--color-ink-inverted)" } : undefined}
      >
        {dark ? <span className="section-title-dark">{heading}</span> : heading}
      </h2>
      {intro && (
        <p className={`section-intro ${dark ? "body-on-navy" : "body-muted"}`}>{intro}</p>
      )}
    </div>
  );

  return animate ? <FadeUp>{body}</FadeUp> : body;
}
