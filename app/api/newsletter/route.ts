import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const BREVO_API    = 'https://api.brevo.com/v3'
const LIST_ID      = 22
// Brevo template 10 = welcome email in the Maru design system. Override with the env var if it is ever replaced.
const TEMPLATE_ID  = parseInt(process.env.BREVO_TEMPLATE_NEWSLETTER_WELCOME ?? '10', 10) || 10

const schema = z.object({
  email:     z.string().trim().email().max(255),
  firstName: z.string().trim().max(50).optional().or(z.literal('')),
})

export async function POST(request: NextRequest) {
  try {
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
    }

    const { email, firstName } = parsed.data
    const apiKey = process.env.BREVO_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    const headers = { 'api-key': apiKey, 'content-type': 'application/json' }

    // 1. Create or update contact — add to list #22
    const contactRes = await fetch(`${BREVO_API}/contacts`, {
      method:  'POST',
      headers,
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName || '',
          SOURCE:    'Business AI Journal',
        },
        listIds:       [LIST_ID],
        updateEnabled: true,
      }),
    })

    if (!contactRes.ok && contactRes.status !== 204) {
      const err = await contactRes.json().catch(() => ({}))
      // 400 with "Contact already exist" is fine — contact updated via updateEnabled
      if (contactRes.status !== 400 || !JSON.stringify(err).includes('already exist')) {
        return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 })
      }
    }

    // 2. Send welcome email via transactional welcome template
    const emailRes = await fetch(`${BREVO_API}/smtp/email`, {
      method:  'POST',
      headers,
      body: JSON.stringify({
        to:         [{ email }],
        templateId: TEMPLATE_ID,
        params: {
          FIRSTNAME: firstName || '',
          EMAIL:     email,
        },
      }),
    })

    if (!emailRes.ok) {
      // Welcome email failure is non-fatal — contact is already subscribed
      console.error('Newsletter welcome email failed:', await emailRes.text())
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter route error:', err)
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 })
  }
}
