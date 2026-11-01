'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Input }    from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select }   from '@/components/ui/Select'
import { Label }    from '@/components/ui/Label'
import Button       from '@/components/ui/Button'
import Link         from 'next/link'

const schema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName:  z.string().trim().min(1, 'Last name is required'),
  business:  z.string().trim().min(1, 'Business name is required'),
  email:     z.string().trim().email('Enter a valid email address'),
  mobile:    z.string().trim().min(10, 'Enter a valid mobile number').optional().or(z.literal('')),
  service:   z.string().optional(),
  message:   z.string().trim().max(3000).optional(),
  referral:  z.string().optional(),
})

type FormData = z.infer<typeof schema>

const REFERRALS = [
  { value: '',            label: 'Please select…' },
  { value: 'Referral',    label: 'Referral / word of mouth' },
  { value: 'Google',      label: 'Search engine' },
  { value: 'Social',      label: 'Social media' },
  { value: 'Existing',    label: 'Existing relationship' },
  { value: 'Other',       label: 'Other' },
]

// Wanoura-style: rounded-xl, light border, dark-ink focus border (no ring/glow), normal text
const shared      = 'rounded-xl border border-[#cbd5e1] dark:border-[#cbd5e1] bg-white dark:bg-white px-4 py-3 text-sm normal-case tracking-normal font-normal text-[#1A3A5C] dark:text-[#1A3A5C] placeholder:text-[#94a3b8] dark:placeholder:text-[#94a3b8] outline-none transition focus:border-[#1A3A5C] dark:focus:border-[#1A3A5C]'
const inputClass    = shared
const selectClass   = `${shared} h-auto`
const textareaClass = shared

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess,    setIsSuccess]    = useState(false)
  const [serverError,  setServerError]  = useState<string | null>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  // The visible service picker was removed (22 Oct 2026). Links can still tag
  // an enquiry, e.g. /contact?service=invara from the Invara page, so demo
  // requests arrive labelled. Read once on mount; only known values accepted.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('service')
    const preset: Record<string, string> = { invara: 'Invara demo' }
    if (wanted && preset[wanted]) setValue('service', preset[wanted])
  }, [setValue])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setServerError(null)
    try {
      // An empty token is a guaranteed 400 from /api/contact, so fail here
      // rather than posting one and surfacing it as a generic server error.
      if (!executeRecaptcha) throw new Error('reCAPTCHA not ready')
      const recaptchaToken = await executeRecaptcha('contact_form')
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, recaptchaToken }),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to send')
      }
      setIsSuccess(true)
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div
        style={{
          padding:      '2rem 2.5rem',
          background:   'var(--color-bg-secondary)',
          borderRadius: '4px',
          borderLeft:   '3px solid var(--color-cyan)',
        }}
      >
        <p style={{
          fontFamily:   'var(--font-body)',
          fontSize:     'var(--text-body-sm)',
          fontWeight:   600,
          color:        'var(--color-ink-primary)',
          margin:       0,
        }}>
          Thank you. We will review your enquiry and be in touch about the next step.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ── Form heading and introduction (30 Oct 2026). Inside the form so
          they leave with it once the thank-you message shows. ── */}
      <h2
        style={{
          fontFamily:    'var(--font-body)',
          fontWeight:    700,
          fontSize:      'var(--text-h3-sans)',
          color:         'var(--color-ink-primary)',
          lineHeight:    1.3,
          marginBottom:  '0.5rem',
          border:        'none',
          paddingBottom: 0,
        }}
      >
        Describe your challenge.
      </h2>
      <p className="body-muted" style={{ marginBottom: '2rem' }}>
        Share a few details about your business and what you are looking to improve. The more context you provide, the more useful the initial conversation can be.
      </p>

      {/* ── Row: First Name + Last Name ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <Field label="First name" required error={errors.firstName?.message}>
          <Input
            {...register('firstName')}
            placeholder="Jane"
            autoComplete="given-name"
            className={inputClass}
          />
        </Field>
        <Field label="Last name" required error={errors.lastName?.message}>
          <Input
            {...register('lastName')}
            placeholder="Doe"
            autoComplete="family-name"
            className={inputClass}
          />
        </Field>
      </div>

      {/* ── Business Name (own row, below names) ── */}
      <Field label="Business name" required error={errors.business?.message}>
        <Input
          {...register('business')}
          placeholder="Acme (Pty) Ltd"
          autoComplete="organization"
          className={inputClass}
        />
      </Field>

      {/* ── Row: Email + Mobile ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <Field label="Email address" required error={errors.email?.message}>
          <Input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field label="Mobile number (optional)" error={errors.mobile?.message}>
          <Input
            {...register('mobile')}
            type="tel"
            placeholder="+27 63 000 0000"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Hidden tag set from ?service= links (e.g. the Invara demo button) */}
      <input type="hidden" {...register('service')} />

      {/* ── Message ── */}
      <Field label="What process or operational challenge would you like to improve?" error={errors.message?.message}>
        <Textarea
          {...register('message')}
          placeholder="Briefly describe the problem, process or task you're looking to improve."
          className={textareaClass}
          style={{ minHeight: '140px' }}
        />
      </Field>

      {/* ── Referral ── */}
      <Field label="How did you hear about us? (optional)" error={errors.referral?.message}>
        <Select {...register('referral')} defaultValue="" className={selectClass}>
          {REFERRALS.map(r => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </Select>
      </Field>

      {serverError && (
        <p style={{
          fontFamily:   'var(--font-body)',
          fontSize:     'var(--text-meta)',
          color:        '#E53E3E',
          marginBottom: '1rem',
          marginTop:    '-0.5rem',
        }}>
          {serverError}
        </p>
      )}

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send my enquiry'}
      </Button>
      <p style={{
        fontFamily:   'var(--font-body)',
        fontSize:     'var(--text-meta)',
        fontWeight:   400,
        color:        'var(--color-ink-secondary)',
        lineHeight:   1.6,
        marginTop:    '0.75rem',
        marginBottom: 0,
      }}>
        We will review your enquiry and be in touch about the next step.
      </p>

      {/* Privacy note, revised 1 Nov 2026 ("Maru Online — Revised Website Copy"
          v1.0, section 8; replaces the 22 Oct option B wording). Keep it true:
          this Brevo list must never receive marketing without an opt-in, and it
          must match the Privacy Policy. */}
      <p style={{
        fontFamily:   'var(--font-body)',
        fontSize:     'var(--text-meta)',
        fontWeight:   300,
        color:        'var(--color-ink-tertiary)',
        lineHeight:   1.6,
        marginTop:    '1rem',
        marginBottom: 0,
        maxWidth:     '520px',
      }}>
        Your details will be used to respond to your enquiry. We will not add you to marketing communications without the relevant consent. Please do not include sensitive personal information or confidential business information in this form. See our{' '}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-2 hover:text-[var(--color-cyan-ink)] focus-visible:outline-none focus-visible:text-[var(--color-cyan-ink)]"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          Privacy Policy
        </Link>.
      </p>

    </form>
  )
}

// ── Helper ─────────────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label:     string
  required?: boolean
  error?:    string
  children:  React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <Label className="mb-2 text-sm font-medium normal-case tracking-normal text-[var(--color-ink-secondary)]">
        {label}
        {required && (
          <span style={{ color: 'var(--color-cyan)', marginLeft: '2px' }}>*</span>
        )}
      </Label>
      {children}
      {error && (
        <p style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '0.72rem',
          color:       '#E53E3E',
          marginTop:   '0.35rem',
          marginBottom: 0,
        }}>
          {error}
        </p>
      )}
    </div>
  )
}
