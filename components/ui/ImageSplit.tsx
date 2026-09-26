import Image from 'next/image'
import React from 'react'

type ImageSplitProps = {
  src: string
  alt: string
  eyebrow?: string
  heading: React.ReactNode
  body: React.ReactNode
  imagePosition?: 'left' | 'right'
  bg?: string
  /** CSS object-position for the photo's crop. Default: 'center top'. */
  objectPosition?: string
}

export default function ImageSplit({
  src,
  alt,
  eyebrow,
  heading,
  body,
  imagePosition = 'left',
  bg = 'var(--color-bg-canvas)',
  objectPosition = 'center top',
}: ImageSplitProps) {
  const imageCol = (
    <div
      style={{
        position:     'relative',
        width:        '100%',
        aspectRatio:  '4/3',
        borderRadius: '8px',
        overflow:     'hidden',
        flexShrink:   0,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover', objectPosition }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )

  const textCol = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {eyebrow && (
        <span
          className="label-eyebrow"
          style={{ marginBottom: '1.25rem' }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        style={{
          marginBottom: '1.25rem',
          color: bg === 'var(--color-bg-navy)' || bg === 'var(--color-bg-navy-deep)'
            ? 'var(--color-ink-inverted)'
            : 'var(--color-ink-primary)',
        }}
      >
        {heading}
      </h2>
      <div
        className={
          bg === 'var(--color-bg-navy)' || bg === 'var(--color-bg-navy-deep)'
            ? 'body-on-navy'
            : 'body-muted'
        }
        style={{ maxWidth: '520px' }}
      >
        {body}
      </div>
    </div>
  )

  return (
    <section style={{ backgroundColor: bg, padding: '0' }}>
      <div
        className="px-6 md:px-[60px] py-24"
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {imagePosition === 'left' ? (
            <>{imageCol}{textCol}</>
          ) : (
            <>{textCol}{imageCol}</>
          )}
        </div>
      </div>
    </section>
  )
}
