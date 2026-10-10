interface ListItemProps {
  leader: string
  /** Optional: a leader-only row renders without the dash. */
  body?: string
  className?: string
}

export default function ListItem({ leader, body, className = '' }: ListItemProps) {
  return (
    <li className={`flex gap-6 py-5 border-b border-[var(--color-border-default)] last:border-b-0 ${className}`}>
      <span aria-hidden="true" className="bullet-cyan" />
      <p style={{ margin: 0, fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', letterSpacing: '0.01em' }}>
        <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{leader}</span>
        {body && (
          <span style={{ fontWeight: 300, color: 'var(--color-ink-secondary)' }}>{' — '}{body}</span>
        )}
      </p>
    </li>
  )
}
