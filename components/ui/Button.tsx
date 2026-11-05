import Link from 'next/link'

// 'outline' is a legacy alias for 'secondary' — kept for backwards compatibility
// with pre-rebuild pages that have not yet been migrated.
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline'

interface ButtonProps {
  variant?: ButtonVariant
  /** Native button type — used by forms that need submit/reset */
  type?: 'button' | 'submit' | 'reset'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
  /** Accessible label when the visible text isn't descriptive enough */
  ariaLabel?: string
  /** Link target — when set on an external href, renders a plain <a> */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /** rel for external links — defaults to "noopener noreferrer" for _blank */
  rel?: string
  /** "sm" for the navigation bar */
  size?: 'md' | 'sm'
}

// ─── Variant classes ──────────────────────────────────────────────────────────
// Colour, shape and states live in globals.css (.btn, .btn-primary,
// .btn-secondary, "CTA system", 5 Nov 2026) so a button takes its colour from
// the ground it sits on: green on navy, teal on stone, white and the nav.
// Sentence case, 16px at weight 500, 48px tall, card radius. Gold retired.

const base = 'btn'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  // Legacy alias — renders identically to secondary.
  outline: 'btn-secondary',
  // Inline text link — no border, no background.
  tertiary: 'btn-tertiary',
}

// ─── Component ────────────────────────────────────────────────────────────────

function Button({
  variant = 'primary',
  type = 'button',
  href,
  onClick,
  children,
  className = '',
  disabled = false,
  ariaLabel,
  target,
  rel,
  size = 'md',
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${size === 'sm' ? 'btn-sm' : ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim()

  // Primary and tertiary carry an arrow that moves on hover: the button
  // shows it leads somewhere. Hidden from screen readers.
  const label =
    variant === 'primary' || variant === 'tertiary' ? (
      <>
        {children}
        <span className="btn-arrow" aria-hidden="true">→</span>
      </>
    ) : (
      children
    )

  if (href) {
    // External links (http/https) or an explicit target render a plain <a>
    const isExternal = /^https?:\/\//.test(href)
    if (isExternal || target) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          target={target ?? (isExternal ? '_blank' : undefined)}
          rel={rel ?? (target === '_blank' || isExternal ? 'noopener noreferrer' : undefined)}
        >
          {label}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} aria-disabled={disabled}>
        {label}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  )
}

// Named export for legacy imports: import { Button } from '@/components/ui/Button'
export { Button }
export default Button
