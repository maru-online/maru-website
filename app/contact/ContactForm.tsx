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
  { value: 'LinkedIn',    label: 'LinkedIn' },
  { value: 'Google',      label: 'Google Search' },
  { value: 'Referral',    label: 'Referral / Word of mouth' },
  { value: 'Social',      label: 'Social media' },
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
          marginBottom: '0.5rem',
        }}>
          Message sent.
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-meta)',
          fontWeight: 300,
          color:      'var(--color-ink-secondary)',
          margin:     0,
        }}>
          We'll be in touch within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ── Row: First Name + Last Name ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <Field label="First Name" required error={errors.firstName?.message}>
          <Input
            {...register('firstName')}
            placeholder="Jane"
            autoComplete="given-name"
            className={inputClass}
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName?.message}>
          <Input
            {...register('lastName')}
            placeholder="Doe"
            autoComplete="family-name"
            className={inputClass}
          />
        </Field>
      </div>

      {/* ── Business Name (own row, below names) ── */}
      <Field label="Business Name" required error={errors.business?.message}>
        <Input
          {...register('business')}
          placeholder="Acme (Pty) Ltd"
          autoComplete="organization"
          className={inputClass}
        />
      </Field>

      {/* ── Row: Email + Mobile ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <Field label="Email Address" required error={errors.email?.message}>
          <Input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field label="Mobile Number (optional)" error={errors.mobile?.message}>
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
      <Field label="Briefly describe what you need" error={errors.message?.message}>
        <Textarea
          {...register('message')}
          placeholder="Tell us a bit about your business and what you're trying to solve…"
          className={textareaClass}
          style={{ minHeight: '140px' }}
        />
      </Field>

      {/* ── Referral ── */}
      <Field label="How did you hear about us?" error={errors.referral?.message}>
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
        {isSubmitting ? 'Sending…' : 'Send My Enquiry'}
      </Button>

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
