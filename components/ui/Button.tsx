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
}

// ─── Variant class maps ───────────────────────────────────────────────────────

const base =
  'inline-flex items-center justify-center ' +
  'font-body font-bold text-[13px] tracking-[0.15em] uppercase ' +
  'rounded-[8px] min-h-[44px] px-6 ' +
  'transition-[transform,opacity,box-shadow,background-color,border-color] duration-200 ease-out ' +
  'focus:outline-none focus-visible:ring-0 ' +
  'disabled:opacity-40 disabled:pointer-events-none'

const variantClasses: Record<ButtonVariant, string> = {
  // Warm Stone: gold gradient fill — dark navy text, resting + hover shadows
  primary:
    'px-6 py-2.5 [background:var(--gradient-gold)] text-[var(--color-ink-on-gold)] border-0 ' +
    'shadow-[var(--shadow-btn)] ' +
    'hover:scale-[1.02] hover:shadow-[var(--shadow-btn-hover)] hover:brightness-105 ' +
    'active:scale-[0.98] active:brightness-95 active:shadow-[var(--shadow-btn)] ' +
    'focus-visible:shadow-[0_0_0_3px_rgba(205,170,83,0.45),var(--shadow-btn)]',

  // Transparent — cyan outline, cyan text
  secondary:
    'px-6 py-2.5 bg-transparent text-cyan border border-cyan ' +
    'hover:bg-cyan hover:text-navy hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(61,184,198,0.25)] ' +
    'active:scale-[0.98] active:bg-cyan-dark active:text-navy active:shadow-none ' +
    'focus-visible:shadow-[0_0_0_3px_rgba(61,184,198,0.45),0_4px_16px_rgba(61,184,198,0.15)]',

  // Legacy alias — renders identically to secondary.
  outline:
    'px-6 py-2.5 bg-transparent text-cyan border border-cyan ' +
    'hover:bg-cyan hover:text-navy hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(61,184,198,0.25)] ' +
    'active:scale-[0.98] active:bg-cyan-dark active:text-navy active:shadow-none ' +
    'focus-visible:shadow-[0_0_0_3px_rgba(61,184,198,0.45),0_4px_16px_rgba(61,184,198,0.15)]',

  // Inline text link — no border, no background.
  // The → character is appended inside the component so callers
  // only need to pass the label text.
  tertiary:
    'rounded-none text-cyan-ink no-underline ' +
    'hover:text-cyan ' +
    'active:opacity-70 ' +
    'focus-visible:shadow-[0_0_0_2px_rgba(61,184,198,0.4)]',
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
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`.trim()

  // Tertiary buttons append → for directional affordance
  const label =
    variant === 'tertiary' ? (
      <>
        {children}
        {' →'}
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
