interface Props {
  params: Promise<{ partnerId: string }>
}

export default async function PartnerLandingPage(props: Props) {
  const params = await props.params;
  const partnerId = params.partnerId;

  // Capitalize for display
  const partnerName = partnerId.charAt(0).toUpperCase() + partnerId.slice(1).replace(/-/g, ' ');

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--gradient-surface)' }}
    >
      <section className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div
          className="mb-8 px-5 py-2 rounded-full inline-block"
          style={{
            backgroundColor: 'var(--color-cyan-light)',
            border: '1px solid var(--color-cyan)',
          }}
        >
          <span className="text-cyan-ink font-semibold uppercase tracking-wider text-sm">
            Partner offer
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl text-ink-primary">
          Welcome, clients of{' '}
          <span style={{ color: 'var(--color-gold-antique)' }}>{partnerName}</span>
        </h1>

        <p className="text-xl mb-12 max-w-2xl leading-relaxed text-ink-secondary">
          As a client of {partnerName}, you are eligible for a complimentary
          digital performance audit — a short review that shows where your
          marketing funnel is leaking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <a
            href="https://leads.maruonline.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-body font-bold text-[13px] tracking-[0.15em] uppercase rounded-[8px] min-h-[44px] px-8 py-4 [background:var(--gradient-gold)] text-[var(--color-ink-on-gold)] shadow-[var(--shadow-btn)] transition-[transform,box-shadow,filter] duration-200 ease-out hover:scale-[1.02] hover:brightness-105 hover:shadow-[var(--shadow-btn-hover)] active:scale-[0.98]"
          >
            Claim your free digital audit
          </a>
        </div>

        <p className="mt-8 text-sm text-ink-tertiary">
          Available to the {partnerName} network.
        </p>
      </section>
    </div>
  )
}
