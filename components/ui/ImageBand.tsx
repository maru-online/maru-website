import Image from 'next/image'
import { ReactNode } from 'react'

type ImageBandProps = {
  src: string
  alt: string
  overlayText?: ReactNode
  height?: number
  /** CSS object-position for the photo's crop. Default: 'center 30%'. */
  objectPosition?: string
}

export default function ImageBand({
  src,
  alt,
  overlayText,
  height = 420,
  objectPosition = 'center 30%',
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
        style={{ objectFit: 'cover', objectPosition }}
        sizes="100vw"
      />
      {/* Dark scrim */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to right, rgba(13,27,42,0.72) 0%, rgba(13,27,42,0.35) 60%, rgba(13,27,42,0.1) 100%)',
        }}
      />
      {overlayText && (
        <div
          style={{
            position:  'absolute',
            inset:     0,
            display:   'flex',
            alignItems: 'center',
            padding:   'clamp(1.5rem, 6vw, 5rem)',
          }}
        >
          <p
            style={{
              fontFamily:   'var(--font-display)',
              fontSize:     'clamp(1.375rem, 3vw, 2.25rem)',
              fontWeight:   600,
              color:        'var(--color-ink-inverted)',
              lineHeight:   'var(--leading-subheading)',
              letterSpacing: 'var(--tracking-tight)',
              maxWidth:     '640px',
              margin:       0,
            }}
          >
            {overlayText}
          </p>
        </div>
      )}
    </div>
  )
}
