'use client';

/**
 * global-error replaces the root layout when the app crashes, so globals.css
 * and the Tailwind bundle are NOT loaded here. Every style must be inline and
 * every colour a literal — utility classes and var() tokens would resolve to
 * nothing on the one page that has to work when everything else has failed.
 * This file is exempt from the drift guard's hex rule for that reason.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, #F4F2EC 0%, #EDEAE2 100%)',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            padding: '24px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 420 }}>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#1A3A5C',
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}
            >
              This page could not be loaded
            </h1>
            <p style={{ color: '#4A5568', margin: '0 0 28px', lineHeight: 1.6 }}>
              Please try again. If the problem continues, email{' '}
              <a href="mailto:hello@maruonline.com" style={{ color: '#1A3A5C' }}>
                hello@maruonline.com
              </a>
              .
            </p>
            <button
              onClick={() => reset()}
              style={{
                background: 'linear-gradient(135deg, #D6B76A 0%, #A8862F 100%)',
                color: '#0D1B2A',
                border: 0,
                borderRadius: 8,
                padding: '12px 28px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
