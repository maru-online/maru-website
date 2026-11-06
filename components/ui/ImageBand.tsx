import Image from 'next/image'
import { ReactNode } from 'react'

type ImageBandProps = {
  src: string
  alt: string
  overlayText?: ReactNode
  height?: number
}

export default function ImageBand({
  src,
  alt,
  overlayText,
  height = 420,
}: ImageBandProps) {
  return (
    <div
      style={{
        position:   'relative',
        width:      '100%',
        height:     `${height}px`,
        overflow:   'hidden',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        sizes="100vw"
      />
      {/* Dark scrim (evened out on phones in globals.css, .image-band-scrim) */}
      <div
        className="image-band-scrim"
        style={{
          position:   'absolute',
          inset:      0,
          // Slightly deeper on the left (5 Nov 2026) so the headline reads
          // clearly against the photo's lighter areas.
          background: 'linear-gradient(to right, rgba(13,27,42,0.80) 0%, rgba(13,27,42,0.45) 55%, rgba(13,27,42,0.12) 100%)',
        }}
      />
      {overlayText && (
        <div
          style={{
            position:  'absolute',
            inset:     0,
            display:   'flex',
            alignItems: 'center',
            paddingInline: 'var(--sec-gutter)',
          }}
        >
          {/* On the page column, in the site's split-headline style: pass a
              light line and a strong line (maru-headline-split-*). */}
          <div className="sec-inner" style={{ width: '100%' }}>
            <p className="image-band-headline">{overlayText}</p>
          </div>
        </div>
      )}
    </div>
  )
}
