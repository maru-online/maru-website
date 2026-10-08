import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  description: string;
  lastUpdated?: string;
  effectiveDate?: string;
  children: React.ReactNode;
}

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

export function LegalLayout({
  title,
  description,
  lastUpdated,
  effectiveDate,
  children,
}: LegalLayoutProps) {
  return (
    <>
      {/* ── Hero — the one dark surface on these pages ─────────────────────── */}
      <div
        className="pt-32 pb-16"
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex gap-2 text-sm mb-8"
            style={{ color: "rgba(250,250,248,0.55)" }}
          >
            <Link
              href="/"
              className="transition-colors hover:text-cyan"
              style={{ color: "inherit" }}
            >
              Homepage
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: "var(--color-ink-inverted)" }}>{title}</span>
          </nav>
          <h1
            className="text-h1 font-medium mb-8 leading-[1.2]"
            style={{ color: "var(--color-ink-inverted)" }}
          >
            {title}
          </h1>
          <p
            className="max-w-2xl"
            style={{ color: "rgba(250,250,248,0.75)" }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* ── Content — Warm Stone ground ────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {(lastUpdated || effectiveDate) && (
                <div className="mb-12 text-ink-secondary">
                  {lastUpdated && (
                    <p>
                      <strong>Last updated:</strong> {lastUpdated}
                    </p>
                  )}
                  {effectiveDate && (
                    <p>
                      <strong>Effective date:</strong> {effectiveDate}
                    </p>
                  )}
                </div>
              )}
              <div className="legal-prose max-w-none">{children}</div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="card-lift rounded-lg p-6">
                  <h4 className="font-medium mb-4 text-ink-primary">
                    Legal documents
                  </h4>
                  <ul className="space-y-3">
                    {legalLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-ink-secondary transition-colors hover:text-cyan-ink"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-lift rounded-lg p-6">
                  <h4 className="font-medium mb-4 text-ink-primary">
                    Need help?
                  </h4>
                  <p className="text-ink-secondary text-sm mb-4">
                    If you have questions about our policies, please contact us.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-cyan-ink transition-colors hover:text-cyan"
                  >
                    Contact us
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
