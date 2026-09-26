/**
 * Maru Online — Assessment Submission API Route
 * File: app/api/assessment/submit/route.ts
 *
 * Orchestration flow:
 * 1. Validate submission
 * 2. Calculate score + select rich template
 * 3. Claude synthesis (assessment answers → personalised observations JSON)
 * 4. Store report in DB → generate token → build report URL
 * 5. Brevo: contact upsert
 * 6. Brevo: Email A to prospect (report link)
 * 7. Brevo: Email B to hello@maruonline.com (Jimmy's brief)
 * 8. Return report URL to client
 *
 * Error handling: each step degrades gracefully.
 * If synthesis fails → report uses template only (no personalised observations).
 * If DB store fails → report URL falls back to static assessment page.
 * If Brevo fails → log error, do not block response.
 */

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { waitUntil } from "@vercel/functions";
import { eq } from "drizzle-orm";
import { calculateScore } from "@/lib/assessment/scoring";
import { buildSynthesisPrompt, SynthesisOutput } from "@/lib/assessment/synthesisPrompt";
import { getFullTemplate } from "@/lib/assessment/reportTemplates";
import { dbLeadEngine } from "@/lib/db";
import { operationsReports } from "@/lib/db/schema/lead-engine";
import { verifyRecaptcha } from "@/lib/recaptcha";

// ── Types ──────────────────────────────────────────────────────────────────

interface SubmissionBody {
  answers: {
    q1: string;  q2: string;  q3: string;  q4: string;  q5: string;
    q6: string;  q7: string;  q8: string;  q9: string;  q10: string;
  };
  name: string;
  email: string;
  website?: string;
  recaptchaToken?: string;
}

// ── Main handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Time-to-response matters here: the client waits on this request, and a
  // mobile connection that gives up mid-wait leaves the visitor staring at a
  // spinner while the server quietly finishes. Log the split so we know whether
  // the synthesis needs to move off the response path.
  const t0 = Date.now();
  let tSynthesis = 0;

  try {
    // ── 1. Parse and validate ──────────────────────────────────────────────
    const body: SubmissionBody = await req.json();

    if (!body.answers || !body.name || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const captcha = await verifyRecaptcha(body.recaptchaToken ?? "");
    if (!captcha.ok) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // ── 2. Score + template selection ─────────────────────────────────────
    const scoreResult = calculateScore(body.answers);
    const painTag = scoreResult.painTag;
    const template = getFullTemplate(scoreResult.level, painTag, scoreResult.segmentB);

    let synthesis: SynthesisOutput | null = null;

    // ── 3. Store report + generate URL ────────────────────────────────────
    // The row is written WITHOUT observations so the token — and therefore the
    // report link — exists before we answer. Observations are added in the
    // background pass below.
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://maruonline.com");

    let reportUrl = `${baseUrl}/operations-assessment`;
    let reportId: string | null = null;
    try {
      const rows = await dbLeadEngine
        .insert(operationsReports)
        .values({
          name: body.name,
          email: body.email,
          website: body.website ?? null,
          level: scoreResult.level,
          levelLabel: scoreResult.label,
          painTag,
          segmentB: scoreResult.segmentB,
          answers: body.answers,
          areas: scoreResult.areas as unknown as Record<string, unknown>[],
          template: template as unknown as Record<string, unknown>,
          synthesis: null,
        })
        .returning({ id: operationsReports.id, token: operationsReports.token });

      if (rows[0]?.token) {
        reportUrl = `${baseUrl}/report/${rows[0].token}`;
        reportId = rows[0].id;
      }
    } catch (err) {
      console.error("DB report store failed:", err);
      // Falls back to static URL — emails still go out
    }

    // ── 4. Everything slow, after the response ────────────────────────────
    // Synthesis measured ~24s of a ~25s request. The visitor does not need it:
    // the page promises the report by email, and nothing on screen depends on
    // the observations. waitUntil keeps the function alive past the response so
    // the order is unchanged — synthesis, then the row update, then the emails
    // (Jimmy's brief is built from the synthesis, so it must not run before).
    waitUntil(
      (async () => {
        const tSynthStart = Date.now();
        try {
          synthesis = await runSynthesis(body.answers, scoreResult.level);
        } catch (err) {
          console.error("Claude synthesis failed:", err);
          // Report stays template-only — no observations block
        }
        tSynthesis = Date.now() - tSynthStart;

        if (reportId && synthesis?.objectA) {
          try {
            await dbLeadEngine
              .update(operationsReports)
              .set({ synthesis: synthesis.objectA as Record<string, unknown> })
              .where(eq(operationsReports.id, reportId));
          } catch (err) {
            console.error("Report synthesis update failed:", err);
          }
        }

        await upsertBrevoContact({
          name: body.name,
          email: body.email,
          level: scoreResult.level,
          levelLabel: scoreResult.label,
          painTag,
          reportUrl,
        }).catch((err) => console.error("Brevo contact upsert failed:", err));

        await fireBrevoEmails({
          name: body.name,
          email: body.email,
          website: body.website,
          level: scoreResult.level,
          levelLabel: scoreResult.label,
          reportUrl,
          painTag,
          segmentB: scoreResult.segmentB,
          jimmyBrief: synthesis?.objectB ?? null,
          answers: body.answers,
        }).catch((err) => console.error("Brevo send failed:", err));

        console.log("assessment background finished", {
          synthesisMs: tSynthesis,
          synthesisOk: synthesis !== null,
          synthesisStored: Boolean(reportId && synthesis?.objectA),
        });
      })(),
    );

    // ── 5. Return to client ────────────────────────────────────────────────
    console.log("assessment submit timing", {
      responseMs: Date.now() - t0,
      reportStored: reportUrl.includes("/report/"),
      deferred: true,
    });

    return NextResponse.json({
      success: true,
      level: scoreResult.level,
      label: scoreResult.label,
      reportUrl,
    });

  } catch (err) {
    console.error("Assessment submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// ── Claude synthesis ───────────────────────────────────────────────────────

/**
 * JSON Schema mirroring SynthesisOutput. Passed as output_config.format so the
 * model is constrained to this shape — which is what lets the old
 * strip-the-markdown-fences-and-hope parsing go away.
 */
const SYNTHESIS_SCHEMA = {
  type: "object",
  properties: {
    objectA: {
      type: "object",
      properties: {
        observation1:    { type: "string" },
        observation2:    { type: "string" },
        observation3:    { type: "string" },
        // anyOf rather than a ["string","null"] type array — anyOf is the
        // documented way to express nullable in structured outputs.
        siteObservation: { anyOf: [{ type: "string" }, { type: "null" }] },
      },
      required: ["observation1", "observation2", "observation3", "siteObservation"],
      additionalProperties: false,
    },
    objectB: {
      type: "object",
      properties: {
        business_summary:    { type: "string" },
        segment:             { type: "string" },
        primary_pain:        { type: "string" },
        integration_gap:     { type: "string" },
        tech_signals:        { type: "string" },
        conversation_opener: { type: "string" },
        // No minItems/maxItems — structured outputs rejects array-length
        // constraints. The "exactly two" requirement is carried by the prompt;
        // the TS type is a 2-tuple, so the length is asserted below.
        probes: { type: "array", items: { type: "string" } },
        flag: { type: "string" },
      },
      required: [
        "business_summary", "segment", "primary_pain", "integration_gap",
        "tech_signals", "conversation_opener", "probes", "flag",
      ],
      additionalProperties: false,
    },
  },
  required: ["objectA", "objectB"],
  additionalProperties: false,
} as const;

async function runSynthesis(
  answers: SubmissionBody["answers"],
  level: 1 | 2 | 3
): Promise<SynthesisOutput> {
  const prompt = buildSynthesisPrompt(answers, level, "");

  // Constructed per-request rather than at module scope so a missing key
  // surfaces inside the caller's try/catch and degrades to a template-only
  // report, instead of throwing at cold start and taking the route down.
  const anthropic = new Anthropic();

  const response = await anthropic.beta.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    // Safety classifiers can decline; "default" routes by refusal category so
    // we never maintain a fallback model list of our own.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: {
      format: { type: "json_schema", schema: SYNTHESIS_SCHEMA },
    },
    messages: [{ role: "user", content: prompt }],
  });

  if (response.stop_reason === "refusal") {
    throw new Error(
      `Claude declined the synthesis (${response.stop_details?.category ?? "uncategorised"})`
    );
  }

  const text = response.content.find((b) => b.type === "text")?.text;
  if (!text) {
    throw new Error(`Claude returned no text. stop_reason: ${response.stop_reason}`);
  }

  const parsed = JSON.parse(text) as SynthesisOutput;

  // SynthesisOutput types probes as a 2-tuple but the schema can't enforce
  // length, so check it here rather than letting a short array reach the
  // brief email as an undefined second probe.
  if (parsed.objectB?.probes?.length !== 2) {
    throw new Error(
      `Expected exactly 2 probes, got ${parsed.objectB?.probes?.length ?? 0}`
    );
  }

  return parsed;
}

// ── Brevo contact upsert ───────────────────────────────────────────────────

const BREVO_ASSESSMENT_LIST_ID = 21;

async function upsertBrevoContact(params: {
  name: string;
  email: string;
  level: number;
  levelLabel: string;
  painTag: string;
  reportUrl: string;
}) {
  const { name, email, level, levelLabel, painTag, reportUrl } = params;
  const firstName = name.trim().split(" ")[0];
  const lastName = name.trim().split(" ").slice(1).join(" ") || "";

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": (process.env.BREVO_API_KEY ?? "").trim(),
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      listIds: [BREVO_ASSESSMENT_LIST_ID],
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        ASSESSMENT_LEVEL: level,
        ASSESSMENT_LABEL: levelLabel,
        PAIN_TAG: painTag,
        REPORT_URL: reportUrl,
        ASSESSMENT_DATE: new Date().toISOString().split("T")[0],
      },
    }),
  });
  const body = await res.json();
  // A non-2xx from Brevo used to be console.log'd and otherwise ignored, so a
  // rejected request looked identical to a delivered one. Throwing puts it in
  // the caller's .catch, which logs at error level and shows up in an error
  // query instead of being buried in an info line.
  if (!res.ok) {
    throw new Error(`Brevo contact upsert ${res.status}: ${JSON.stringify(body)}`);
  }
  console.log("Brevo contact upsert response:", res.status, JSON.stringify(body));
}

// ── Brevo emails ───────────────────────────────────────────────────────────

interface BrevoEmailParams {
  name: string;
  email: string;
  website?: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  reportUrl: string;
  painTag: string;
  segmentB: boolean;
  jimmyBrief: SynthesisOutput["objectB"] | null;
  answers: SubmissionBody["answers"];
}

async function fireBrevoEmails(params: BrevoEmailParams) {
  await Promise.allSettled([
    sendProspectEmail(params),
    sendJimmyBriefEmail(params),
  ]);
}

async function sendProspectEmail(params: BrevoEmailParams) {
  const { name, email, level, levelLabel, reportUrl, painTag, segmentB } = params;

  const templateId1 = parseInt(process.env.BREVO_TEMPLATE_LEVEL_1 ?? "0");
  const templateId2 = parseInt(process.env.BREVO_TEMPLATE_LEVEL_2 ?? "0");
  const templateId3 = parseInt(process.env.BREVO_TEMPLATE_LEVEL_3 ?? "0");

  if (!templateId1 || !templateId2 || !templateId3) {
    throw new Error("Brevo template IDs not configured — check BREVO_TEMPLATE_LEVEL_1/2/3 env vars");
  }

  const templateIds: Record<number, number> = {
    1: templateId1,
    2: templateId2,
    3: templateId3,
  };

  const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": (process.env.BREVO_API_KEY ?? "").trim(),
    },
    body: JSON.stringify({
      sender: { name: "Maru Online", email: "hello@maruonline.com" },
      to: [{ email, name }],
      templateId: templateIds[level],
      params: {
        FIRSTNAME: name,
        LEVEL_LABEL: levelLabel,
        REPORT_URL: reportUrl,
        PAIN_TAG: painTag,
      },
      tags: [`level-${level}`, painTag, segmentB ? "segment-b" : "segment-standard"],
    }),
  });
  const brevoBody = await brevoRes.json();
  if (!brevoRes.ok) {
    throw new Error(`Brevo prospect email ${brevoRes.status}: ${JSON.stringify(brevoBody)}`);
  }
  console.log("Brevo prospect email response:", brevoRes.status, JSON.stringify(brevoBody));
}

async function sendJimmyBriefEmail(params: BrevoEmailParams) {
  const { name, email, website, level, levelLabel, reportUrl, segmentB, jimmyBrief, answers } = params;

  const briefHtml = buildJimmyBriefHtml({
    name, email, website, level, levelLabel, reportUrl, segmentB, jimmyBrief, answers,
  });

  const jimmyRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": (process.env.BREVO_API_KEY ?? "").trim(),
    },
    body: JSON.stringify({
      sender: { name: "Maru Online", email: "hello@maruonline.com" },
      to: [{ email: "hello@maruonline.com", name: "Maru Online" }],
      subject: `New diagnostic: ${name} — ${levelLabel}${segmentB ? " ⚠️ Segment B" : ""}`,
      htmlContent: briefHtml,
      replyTo: { email, name },
    }),
  });
  const jimmyBody = await jimmyRes.json();
  if (!jimmyRes.ok) {
    throw new Error(`Brevo Jimmy brief email ${jimmyRes.status}: ${JSON.stringify(jimmyBody)}`);
  }
  console.log("Brevo Jimmy brief email response:", jimmyRes.status, JSON.stringify(jimmyBody));
}

function buildJimmyBriefHtml(params: {
  name: string;
  email: string;
  website?: string;
  level: number;
  levelLabel: string;
  reportUrl: string;
  segmentB: boolean;
  jimmyBrief: SynthesisOutput["objectB"] | null;
  answers: SubmissionBody["answers"];
}): string {
  const { name, email, website, levelLabel, reportUrl, segmentB, jimmyBrief, answers } = params;

  const flagBanner = segmentB
    ? `<div style="background:#fff3cd;border:1px solid #ffc107;padding:12px 16px;border-radius:4px;margin-bottom:16px;">
        <strong>⚠️ Segment B flag:</strong> Prospect has prior external implementation attempt. Probe budget expectations and change-readiness before progressing.
       </div>`
    : "";

  const briefSection = jimmyBrief
    ? `
      <h2 style="font-size:16px;margin:24px 0 8px;">AI-Generated Brief</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;width:30%;background:#f9f9f9;">Business</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.business_summary}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Segment</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.segment}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Primary pain</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.primary_pain}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Integration gap</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.integration_gap}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Tech signals</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.tech_signals}</td></tr>
        <tr style="background:#e8f4fd;"><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;">Open with</td><td style="padding:8px 12px;border:1px solid #e0e0e0;font-style:italic;">"${jimmyBrief.conversation_opener}"</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Probe 1</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.probes[0]}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Probe 2</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.probes[1]}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Flag</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${jimmyBrief.flag}</td></tr>
      </table>
    `
    : `<p style="color:#666;font-size:14px;">AI brief unavailable for this submission — review assessment answers below.</p>`;

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:680px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <h1 style="font-size:20px;margin:0 0 4px;">New Diagnostic: ${name}</h1>
      <p style="color:#666;font-size:14px;margin:0 0 24px;">${levelLabel} · ${new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

      ${flagBanner}

      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;width:30%;background:#f9f9f9;">Name</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${name}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Email</td><td style="padding:8px 12px;border:1px solid #e0e0e0;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Website</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${website ? `<a href="${website}">${website}</a>` : "Not provided"}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Level</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${levelLabel}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Report</td><td style="padding:8px 12px;border:1px solid #e0e0e0;"><a href="${reportUrl}">View report →</a></td></tr>
      </table>

      ${briefSection}

      <h2 style="font-size:16px;margin:24px 0 8px;">Assessment Answers</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td colspan="2" style="padding:6px 12px;background:#f0f0f0;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border:1px solid #e0e0e0;">Process & Workflow</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;width:30%;background:#f9f9f9;">Q1 — Day-to-day work</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q1}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q2 — Key person unavailable</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q2}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;background:#f0f0f0;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border:1px solid #e0e0e0;">Data & Information Flow</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q3 — Where data lives</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q3}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q4 — Data errors frequency</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q4}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;background:#f0f0f0;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border:1px solid #e0e0e0;">Client & Lead Management</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q5 — New enquiry process</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q5}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q6 — Lead follow-up confidence</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q6}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;background:#f0f0f0;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border:1px solid #e0e0e0;">Visibility & Reporting</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q7 — Performance view</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q7}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q8 — Detecting problems</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q8}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;background:#f0f0f0;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border:1px solid #e0e0e0;">People & Dependency</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q9 — Individual reliance</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q9}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:600;background:#f9f9f9;">Q10 — Prior improvement attempts</td><td style="padding:8px 12px;border:1px solid #e0e0e0;">${answers.q10}</td></tr>
      </table>

      <p style="margin-top:32px;font-size:12px;color:#999;">This email was generated automatically by the Maru Online assessment tool. Reply to this email to contact ${name} directly.</p>
    </div>
  `;
}

// ── Utilities ──────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
