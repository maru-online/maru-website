import 'server-only'
import nodemailer from 'nodemailer'

export interface PublishedItem {
  title: string
  status: 'published' | 'draft'
  viewUrl: string
  unpublishUrl?: string
}

/**
 * Email the owner whenever the insights bot publishes (or drafts) articles, with a
 * one-click unpublish link per published item. Best-effort — never throws, so a
 * mail failure can't break the cron run.
 */
export async function notifyInsights(items: PublishedItem[]): Promise<void> {
  const to = process.env.INSIGHTS_NOTIFY_EMAIL
  if (!to || !process.env.SMTP_USER) return

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const rows = items
      .map((it) => {
        const badge = it.status === 'published' ? 'PUBLISHED' : 'HELD AS DRAFT'
        const links = [
          `<a href="${it.viewUrl}">View</a>`,
          it.unpublishUrl ? `<a href="${it.unpublishUrl}">Unpublish</a>` : '',
          it.status === 'draft' ? `<a href="https://www.sanity.io/manage">Review in Studio</a>` : '',
        ]
          .filter(Boolean)
          .join(' &nbsp;·&nbsp; ')
        return `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #E2E8F0;">
            <strong>${it.title}</strong><br/>
            <span style="color:#718096;font-size:12px;">${badge}</span><br/>
            <span style="font-size:13px;">${links}</span>
          </td>
        </tr>`
      })
      .join('')

    const published = items.filter((i) => i.status === 'published').length
    const drafted = items.length - published

    await transporter.sendMail({
      from: `"Maru Insights" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject: `Insights bot: ${published} published, ${drafted} held as draft`,
      html: `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;">
        <h2 style="color:#1A3A5C;">Bi-weekly insights run</h2>
        <p style="color:#4A5568;font-size:14px;">${published} article(s) published, ${drafted} held as draft (below the quality bar — review before publishing).</p>
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        <p style="color:#718096;font-size:12px;margin-top:16px;">Unpublish links revert a post to draft instantly. Drafts never appear on the live site.</p>
      </div>`,
    })
  } catch (err) {
    console.error('insights notify failed:', err)
  }
}
