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
import {
  ASSESSMENT_VERSION,
  calculateScore,
  isValidAnswerSet,
  type AssessmentAnswers,
} from "@/lib/assessment/scoring";
import { ASSESSMENT_AREAS } from "@/lib/assessment/questions";
import { buildSynthesisPrompt, SynthesisOutput } from "@/lib/assessment/synthesisPrompt";
import type { V3StoredTemplate } from "@/lib/assessment/reportTemplates";
import { dbLeadEngine } from "@/lib/db";
import { guideRequests, operationsReports } from "@/lib/db/schema/lead-engine";
import { GUIDE_PATH } from "@/lib/guides/config";
import { verifyRecaptcha } from "@/lib/recaptcha";

// ── Types ──────────────────────────────────────────────────────────────────

interface SubmissionBody {
  answers: AssessmentAnswers;
  name: string;
  email: string;
  website?: string;
  marketingConsent?: boolean;
  recaptchaToken?: string;
}

/**
 * Bump when the consent wording in app/popia-ai-check/page.tsx changes, so
 * every stored consent can be matched to the exact text the visitor saw.
 * 2026-09-v1 = COPY-DECK-ADDENDUM-01 item D, approved 26 Sep 2026.
 */
const CONSENT_TEXT_VERSION = "2026-09-v1";

// Upper bound on the Claude call. Typical is ~24s; past this we send Jimmy's
// brief without observations rather than wait on a hung request.
const SYNTHESIS_TIMEOUT_MS = 45_000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
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

    // Unknown answer keys (a stale tab still on the v2 questions, or a
    // hand-built request) would otherwise default to 1 and email a result the
    // visitor never earned.
    if (!isValidAnswerSet(body.answers)) {
      console.warn("assessment rejected: answers do not match", ASSESSMENT_VERSION);
      return NextResponse.json(
        { error: "Invalid answers" },
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
    // Only an explicit `true` counts as consent — never a truthy string.
    const marketingConsent = body.marketingConsent === true;
    const consentAt = new Date().toISOString();
    const template: V3StoredTemplate = {
      version: ASSESSMENT_VERSION,
      levelSummary: scoreResult.summary,
      consent: {
        marketing: marketingConsent,
        at: consentAt,
        textVersion: CONSENT_TEXT_VERSION,
      },
    };

    let synthesis: SynthesisOutput | null = null;

    // ── 3. Store report + generate URL ────────────────────────────────────
    // The row is written WITHOUT observations so the token — and therefore the
    // report link — exists before we answer. Observations are added in the
    // background pass below.
    // The report link goes into an email, so on production it must be the public
    // domain. VERCEL_URL is the per-deployment address (vercel.app), which may sit
    // behind deployment protection and changes with every deploy.
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_ENV === "production"
        ? "https://maruonline.com"
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://maruonline.com");

    let reportUrl = `${baseUrl}/popia-ai-check`;
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
    // The prospect's report does not depend on the AI synthesis: the report page
    // is built from the scores, and the synthesis only feeds Jimmy's internal
    // brief. So the prospect email goes first, and the synthesis runs after it
    // under a hard timeout. A slow or failed Claude call can delay or thin
    // Jimmy's brief; it can never stop the prospect's email.
    // waitUntil keeps the function alive past the response.
    waitUntil(
      (async () => {
        const emailParams: BrevoEmailParams = {
          name: body.name,
          email: body.email,
          website: body.website,
          level: scoreResult.level,
          levelLabel: scoreResult.label,
          reportUrl,
          painTag,
          segmentB: scoreResult.segmentB,
          jimmyBrief: null,
          answers: body.answers,
          marketingConsent,
        };

        // 1. Prospect email first. Independent of everything below.
        await sendProspectEmail(emailParams).catch((err) =>
          console.error("Brevo prospect email failed:", err),
        );

        // 2. Contact upsert (no dependency on the synthesis either).
        await upsertBrevoContact({
          name: body.name,
          email: body.email,
          level: scoreResult.level,
          levelLabel: scoreResult.label,
          painTag,
          reportUrl,
          marketingConsent,
          consentAt,
        }).catch((err) => console.error("Brevo contact upsert failed:", err));

        // 3. Synthesis, bounded. Typical run is ~24s; give up at 45s.
        const tSynthStart = Date.now();
        try {
          synthesis = await withTimeout(
            runSynthesis(body.answers, scoreResult.level),
            SYNTHESIS_TIMEOUT_MS,
            "Claude synthesis",
          );
        } catch (err) {
          console.error("Claude synthesis failed:", err);
          // Report stays template-only; Jimmy's brief goes out without observations.
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

        // 4. Jimmy's brief, with or without the synthesis.
        await sendJimmyBriefEmail({
          ...emailParams,
          jimmyBrief: synthesis?.objectB ?? null,
        }).catch((err) => console.error("Brevo Jimmy brief email failed:", err));

        console.log("assessment background finished", {
          synthesisMs: tSynthesis,
          synthesisOk: synthesis !== null,
          synthesisStored: Boolean(reportId && synthesis?.objectA),
          version: ASSESSMENT_VERSION,
          marketingConsent,
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

// The marketing list. Joining it is direct marketing under POPIA s69, so a
// contact is added ONLY when they ticked the opt-in. Everyone else is still
// upserted (the report email and follow-up need the contact) but on no list.
const BREVO_ASSESSMENT_LIST_ID = 21;

async function upsertBrevoContact(params: {
  name: string;
  email: string;
  level: number;
  levelLabel: string;
  painTag: string;
  reportUrl: string;
  marketingConsent: boolean;
  consentAt: string;
}) {
  const { name, email, level, levelLabel, painTag, reportUrl, marketingConsent, consentAt } = params;
  const firstName = name.trim().split(" ")[0];
  const lastName = name.trim().split(" ").slice(1).join(" ") || "";

  const baseAttributes = {
    FIRSTNAME: firstName,
    LASTNAME: lastName,
    ASSESSMENT_LEVEL: level,
    ASSESSMENT_LABEL: levelLabel,
    PAIN_TAG: painTag,
    REPORT_URL: reportUrl,
    ASSESSMENT_DATE: new Date().toISOString().split("T")[0],
  };
  // Proof of consent (or its absence) for this submission. These attributes
  // were introduced with assessment_v3 and must be created in Brevo.
  const consentAttributes = {
    MARKETING_CONSENT: marketingConsent,
    CONSENT_AT: consentAt,
    CONSENT_TEXT_VERSION,
  };

  const send = (attributes: Record<string, unknown>) =>
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": (process.env.BREVO_API_KEY ?? "").trim(),
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        ...(marketingConsent ? { listIds: [BREVO_ASSESSMENT_LIST_ID] } : {}),
        attributes,
      }),
    });

  let res = await send({ ...baseAttributes, ...consentAttributes });
  let body = await readBrevoBody(res);

  // If the consent attributes are missing in Brevo, a 400 would otherwise lose
  // the whole upsert — and with it an opted-in contact's list membership. The
  // consent record of truth is operations_reports.template.consent, so retry
  // without them and log loudly enough to get the attributes created.
  if (res.status === 400) {
    console.error(
      "Brevo rejected the consent attributes; retrying without them. Create MARKETING_CONSENT, CONSENT_AT and CONSENT_TEXT_VERSION in Brevo.",
      JSON.stringify(body),
    );
    res = await send(baseAttributes);
    body = await readBrevoBody(res);
  }

  // A non-2xx from Brevo used to be console.log'd and otherwise ignored, so a
  // rejected request looked identical to a delivered one. Throwing puts it in
  // the caller's .catch, which logs at error level and shows up in an error
  // query instead of being buried in an info line.
  if (!res.ok) {
    throw new Error(`Brevo contact upsert ${res.status}: ${JSON.stringify(body)}`);
  }
  console.log("Brevo contact upsert response:", res.status, JSON.stringify(body));
}

/**
 * Brevo answers an update to an existing contact with 204 and no body, so a
 * bare res.json() threw for every repeat submitter and reported a successful
 * upsert as a failure.
 */
async function readBrevoBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
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
  marketingConsent: boolean;
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

  // Copy handover entry 19 §11: the report email gets "Want the basics behind
  // these questions? Read the guide." unless this address already requested
  // the guide. The level templates live in Brevo and may not be edited without
  // Jimmy's approval (§12), so the line is not in them yet: these two params
  // are what the template will use once he approves the wording proposed in
  // docs/positioning/REBUILD-LOG.md #10.
  let showGuideLink = true;
  try {
    const g = await dbLeadEngine
      .select({ id: guideRequests.id })
      .from(guideRequests)
      .where(eq(guideRequests.email, email.trim().toLowerCase()))
      .limit(1);
    showGuideLink = g.length === 0;
  } catch (err) {
    console.error("Guide lookup for report email failed:", err);
  }

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
        // First name only: the template greets with it ("Your report is ready, Jimmy.")
        FIRSTNAME: name.trim().split(/\s+/)[0] || name,
        LEVEL_LABEL: levelLabel,
        REPORT_URL: reportUrl,
        PAIN_TAG: painTag,
        SHOW_GUIDE_LINK: showGuideLink,
        GUIDE_URL: `https://maruonline.com${GUIDE_PATH}`,
      },
      tags: [ASSESSMENT_VERSION, `level-${level}`, painTag, segmentB ? "segment-b" : "segment-standard"],
    }),
  });
  const brevoBody = await brevoRes.json();
  if (!brevoRes.ok) {
    throw new Error(`Brevo prospect email ${brevoRes.status}: ${JSON.stringify(brevoBody)}`);
  }
  console.log("Brevo prospect email response:", brevoRes.status, JSON.stringify(brevoBody));
}

async function sendJimmyBriefEmail(params: BrevoEmailParams) {
  const { name, email, website, level, levelLabel, reportUrl, segmentB, jimmyBrief, answers, marketingConsent } = params;

  const briefHtml = buildJimmyBriefHtml({
    name, email, website, level, levelLabel, reportUrl, segmentB, jimmyBrief, answers, marketingConsent,
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
      subject: `New POPIA check: ${name} — ${levelLabel}${segmentB ? " ⚠️ Segment B" : ""}`,
      htmlContent: briefHtml,
      replyTo: { email, name },
      tags: [ASSESSMENT_VERSION],
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
  marketingConsent: boolean;
}): string {
  const { levelLabel, reportUrl, segmentB, jimmyBrief, answers, marketingConsent } = params;
  // Visitor-typed fields go into HTML, so escape them.
  const name = escapeHtml(params.name);
  const email = escapeHtml(params.email);
  const website = params.website ? escapeHtml(params.website) : undefined;

  const cell = "padding:8px 12px;border:1px solid #e0e0e0;";
  const labelCell = `${cell}font-weight:600;background:#f9f9f9;`;
  const row = (label: string, value: string, width = "") =>
    `<tr><td style="${labelCell}${width}">${label}</td><td style="${cell}">${value}</td></tr>`;

  const flagBanner = segmentB
    ? `<div style="background:#fff3cd;border:1px solid #ffc107;padding:12px 16px;border-radius:4px;margin-bottom:16px;">
        <strong>⚠️ Segment B flag:</strong> Prospect has prior external implementation attempt. Probe budget expectations and change-readiness before progressing.
       </div>`
    : "";

  const briefSection = jimmyBrief
    ? `
      <h2 style="font-size:16px;margin:24px 0 8px;">AI-Generated Brief</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("Business", escapeHtml(jimmyBrief.business_summary), "width:30%;")}
        ${row("Segment", escapeHtml(jimmyBrief.segment))}
        ${row("Primary exposure", escapeHtml(jimmyBrief.primary_pain))}
        ${row("Data-flow gap", escapeHtml(jimmyBrief.integration_gap))}
        ${row("Tech signals", escapeHtml(jimmyBrief.tech_signals))}
        <tr style="background:#e8f4fd;"><td style="${cell}font-weight:600;">Open with</td><td style="${cell}font-style:italic;">"${escapeHtml(jimmyBrief.conversation_opener)}"</td></tr>
        ${row("Probe 1", escapeHtml(jimmyBrief.probes[0]))}
        ${row("Probe 2", escapeHtml(jimmyBrief.probes[1]))}
        ${row("Flag", escapeHtml(jimmyBrief.flag))}
      </table>
    `
    : `<p style="color:#666;font-size:14px;">AI brief unavailable for this submission — review assessment answers below.</p>`;

  // Built from questions.ts so the brief always shows the wording and score
  // the visitor actually saw, not a hand-maintained copy of it.
  const answerRows = ASSESSMENT_AREAS.map((area) => {
    const header = `<tr><td colspan="2" style="padding:6px 12px;background:#f0f0f0;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border:1px solid #e0e0e0;">${area.label}</td></tr>`;
    const qs = area.questions.map((q) => {
      const chosen = q.options.find((o) => o.value === answers[q.id]);
      const answer = chosen ? `${chosen.label} <span style="color:#999;">(${chosen.score}/4)</span>` : escapeHtml(answers[q.id] ?? "—");
      return row(`${q.id.toUpperCase()} — ${q.text}`, answer, "width:45%;");
    }).join("");
    return header + qs;
  }).join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:680px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <h1 style="font-size:20px;margin:0 0 4px;">New Exposure Check: ${name}</h1>
      <p style="color:#666;font-size:14px;margin:0 0 24px;">${levelLabel} · ${ASSESSMENT_VERSION} · ${new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

      ${flagBanner}

      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        ${row("Name", name, "width:30%;")}
        ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
        ${row("Website", website ? `<a href="${website}">${website}</a>` : "Not provided")}
        ${row("Level", levelLabel)}
        ${row("Marketing consent", marketingConsent ? "Yes — opted in, added to list 21" : "No — report and follow-up only. Do not add to marketing.")}
        ${row("Report", `<a href="${reportUrl}">View report →</a>`)}
      </table>

      ${briefSection}

      <h2 style="font-size:16px;margin:24px 0 8px;">Assessment Answers</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${answerRows}
      </table>

      <p style="margin-top:32px;font-size:12px;color:#999;">This email was generated automatically by the Maru Online Exposure Check. Reply to this email to contact ${name} directly.</p>
    </div>
  `;
}

// ── Utilities ──────────────────────────────────────────────────────────────

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
