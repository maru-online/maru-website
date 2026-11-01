import { ImageResponse } from 'next/og'

// Site-wide social card. There was no OG image anywhere in the repo while
// twitter.card was set to summary_large_image — a large-image card with no
// image, which renders blank. Buyers here forward links in WhatsApp groups,
// where a preview-less link reads as spam. (T2)
//
// Next wires this file automatically for every route that does not override it.

export const alt = 'Maru Online — Building POPIA-aware AI systems into your existing workflows'
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
          // Navy from the LinkedIn and Facebook banners (14 Oct 2026), flattened for the card
          background: 'linear-gradient(135deg, #001C2A 0%, #0A2E40 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#F2A100',
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
              flexDirection: 'column',
              fontSize: 64,
              lineHeight: 1.1,
              color: '#FDFCF9',
              maxWidth: 960,
            }}
          >
            <div style={{ display: 'flex' }}>
              <span style={{ color: '#FDFCF9', fontWeight: 300, marginRight: 18 }}>Building</span>
              <span style={{ color: '#5FA9B4', fontWeight: 600 }}>POPIA-aware</span>
            </div>
            <div style={{ display: 'flex', color: '#FDFCF9', fontWeight: 300 }}>AI systems into</div>
            <div style={{ display: 'flex', color: '#5FA9B4', fontWeight: 600 }}>your existing workflows.</div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: 'rgba(253, 252, 249, 0.72)',
              fontWeight: 400,
            }}
          >
            AI implementation consultancy · Gauteng, South Africa
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
