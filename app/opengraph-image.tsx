import { ImageResponse } from 'next/og'

// Site-wide social card. There was no OG image anywhere in the repo while
// twitter.card was set to summary_large_image — a large-image card with no
// image, which renders blank. Buyers here forward links in WhatsApp groups,
// where a preview-less link reads as spam. (T2)
//
// Next wires this file automatically for every route that does not override it.
//
// Copy handover entry 02: regenerated 7 Oct 2026 to carry the hero H1 and the
// approved strapline (entry 06) instead of the old cost-reduction message.

export const alt = 'Maru Online: POPIA-conscious AI implementation for South African SMEs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          // Warm Stone hero gradient, flattened for the card
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1A3A5C 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#3DB8C6',
            fontWeight: 600,
          }}
        >
          Maru Online
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              lineHeight: 1.1,
              color: '#FDFCF9',
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Your team already uses AI. Is it within POPIA?
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: 'rgba(253, 252, 249, 0.72)',
              fontWeight: 400,
            }}
          >
            POPIA-conscious AI implementation · South Africa
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 64,
              height: 6,
              background: 'linear-gradient(90deg, #C39F45 0%, #E0C476 100%)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 24, color: 'rgba(253,252,249,0.6)' }}>
            maruonline.com
          </div>
        </div>
      </div>
    ),
    size,
  )
}
