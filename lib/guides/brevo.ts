import "server-only";

import {
  BREVO_GUIDE_LIST_NAME,
  BREVO_LIST_FOLDER_ID,
  BREVO_NOTES_LIST_NAME,
  GUIDE_SENDER,
  PREVIEW_ALLOWED_RECIPIENTS,
} from "./config";

/**
 * Brevo access for the guide flow (copy handover entry 19 §7, §12 item 2).
 *
 * One interface, two implementations:
 *   - live: the Brevo REST API, same key and header as the assessment route.
 *   - stub: logs what it would have done and touches nothing. Used when no
 *     BREVO_API_KEY is set, and for every off-production request not
 *     addressed to PREVIEW_ALLOWED_RECIPIENTS (§12: no real email to any real
 *     address from a preview).
 *
 * Lists and attributes are created on first use, by name, because nothing
 * else can create them: the Brevo connector is read-only and the API refuses
 * calls from the Mac's IP. Creation is idempotent.
 */

export interface GuideContact {
  email: string;
  firstName: string;
  company?: string;
  consentMarketing: boolean;
  consentDate: string;          // ISO timestamp of the request (or confirmation)
  consentSource: string;
  consentTextVersion: string;
}

export interface TransactionalEmail {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent: string;
  tags: string[];
}

export interface GuideBrevo {
  readonly mode: "live" | "stub";
  /** Upserts the contact and adds it to Guide Downloads (never any other list). */
  recordDownload(contact: GuideContact): Promise<void>;
  /** Adds a CONFIRMED subscriber to the notes list. */
  addToNotesList(contact: GuideContact): Promise<void>;
  sendTransactional(email: TransactionalEmail): Promise<void>;
}

const API = "https://api.brevo.com/v3";

/** Entry 19 §7. CONSENT_MARKETING is boolean; the rest are text/date. */
const REQUIRED_ATTRIBUTES: { name: string; type: "text" | "boolean" | "date" }[] = [
  { name: "COMPANY", type: "text" },
  { name: "CONSENT_MARKETING", type: "boolean" },
  { name: "CONSENT_DATE", type: "date" },
  { name: "CONSENT_SOURCE", type: "text" },
  { name: "CONSENT_TEXT_VERSION", type: "text" },
];

export function isProductionEnvironment(): boolean {
  return process.env.VERCEL_ENV === "production";
}

export function currentEnvironment(): "production" | "preview" | "development" {
  if (process.env.VERCEL_ENV === "production") return "production";
  if (process.env.VERCEL_ENV === "preview") return "preview";
  return "development";
}

/**
 * The Brevo client for one request. `recipient` is the visitor's email: off
 * production, anyone not on the allow-list gets the stub, so a preview link
 * shared around cannot email or store a stranger.
 */
export function getGuideBrevo(recipient: string): GuideBrevo {
  const key = (process.env.BREVO_API_KEY ?? "").trim();
  if (!key) return stub("no BREVO_API_KEY in this environment");
  if (!isProductionEnvironment() && !PREVIEW_ALLOWED_RECIPIENTS.includes(recipient.toLowerCase())) {
    return stub(`${currentEnvironment()} request for a non-allow-listed address`);
  }
  return live(key);
}

// ── Stub ─────────────────────────────────────────────────────────────────

function stub(reason: string): GuideBrevo {
  const log = (action: string, detail: Record<string, unknown>) =>
    console.warn(`[guide brevo stub: ${reason}] ${action}`, JSON.stringify(detail));
  return {
    mode: "stub",
    async recordDownload(c) {
      log("recordDownload", { list: BREVO_GUIDE_LIST_NAME, consentMarketing: c.consentMarketing });
    },
    async addToNotesList() {
      log("addToNotesList", { list: BREVO_NOTES_LIST_NAME });
    },
    async sendTransactional(e) {
      log("sendTransactional", { subject: e.subject, tags: e.tags });
    },
  };
}

// ── Live ─────────────────────────────────────────────────────────────────

/** Per-instance cache; list IDs never change once created. */
let setupPromise: Promise<{ guideListId: number; notesListId: number }> | null = null;

function live(key: string): GuideBrevo {
  const headers = { "api-key": key, "Content-Type": "application/json", accept: "application/json" };

  async function call(path: string, init: RequestInit = {}): Promise<unknown> {
    const res = await fetch(`${API}${path}`, { ...init, headers, signal: AbortSignal.timeout(10_000) });
    // Brevo answers some writes with 204 and no body (see CLAUDE.md §7).
    const text = await res.text();
    const body = text ? safeJson(text) : null;
    if (!res.ok) throw new BrevoError(res.status, `${init.method ?? "GET"} ${path}`, body);
    return body;
  }

  function setup() {
    setupPromise ??= (async () => {
      const lists = (await call("/contacts/lists?limit=50&offset=0")) as { lists?: { id: number; name: string }[] };
      const byName = new Map((lists?.lists ?? []).map((l) => [l.name, l.id]));
      const ensureList = async (name: string) => {
        const existing = byName.get(name);
        if (existing) return existing;
        const created = (await call("/contacts/lists", {
          method: "POST",
          body: JSON.stringify({ name, folderId: BREVO_LIST_FOLDER_ID }),
        })) as { id: number };
        console.log("Brevo list created", { name, id: created.id });
        return created.id;
      };

      const attrs = (await call("/contacts/attributes")) as { attributes?: { name: string; category: string }[] };
      const have = new Set((attrs?.attributes ?? []).filter((a) => a.category === "normal").map((a) => a.name));
      for (const a of REQUIRED_ATTRIBUTES) {
        if (have.has(a.name)) continue;
        await call(`/contacts/attributes/normal/${a.name}`, { method: "POST", body: JSON.stringify({ type: a.type }) });
        console.log("Brevo attribute created", a);
      }

      return {
        guideListId: await ensureList(BREVO_GUIDE_LIST_NAME),
        notesListId: await ensureList(BREVO_NOTES_LIST_NAME),
      };
    })().catch((err) => {
      setupPromise = null; // let the next request retry
      throw err;
    });
    return setupPromise;
  }

  const attributes = (c: GuideContact) => ({
    FIRSTNAME: c.firstName,
    ...(c.company ? { COMPANY: c.company } : {}),
    CONSENT_MARKETING: c.consentMarketing,
    CONSENT_DATE: c.consentDate.slice(0, 10),
    CONSENT_SOURCE: c.consentSource,
    CONSENT_TEXT_VERSION: c.consentTextVersion,
  });

  return {
    mode: "live",
    async recordDownload(c) {
      const { guideListId } = await setup();
      await call("/contacts", {
        method: "POST",
        body: JSON.stringify({ email: c.email, updateEnabled: true, listIds: [guideListId], attributes: attributes(c) }),
      });
    },
    async addToNotesList(c) {
      const { notesListId } = await setup();
      await call("/contacts", {
        method: "POST",
        body: JSON.stringify({ email: c.email, updateEnabled: true, listIds: [notesListId], attributes: attributes(c) }),
      });
    },
    async sendTransactional(e) {
      await call("/smtp/email", {
        method: "POST",
        body: JSON.stringify({
          sender: GUIDE_SENDER,
          replyTo: GUIDE_SENDER,
          to: [e.to],
          subject: e.subject,
          htmlContent: e.htmlContent,
          textContent: e.textContent,
          tags: e.tags,
          // Entry 19 §12 default (c) is "no open or click tracking". The v3
          // send API has no per-message switch for it: Brevo's transactional
          // open/click tracking is an account setting. The email's links are
          // plain hrefs, but whether Brevo rewrites them or adds a pixel must
          // be checked and switched off in Brevo before go-live (rebuild log #10).
        }),
      });
    },
  };
}

export class BrevoError extends Error {
  constructor(readonly status: number, readonly op: string, readonly body: unknown) {
    super(`Brevo ${op} → ${status}: ${JSON.stringify(body)}`);
  }
  /** 429 and 5xx are worth retrying; a 400 will fail the same way again. */
  get retryable() {
    return this.status === 429 || this.status >= 500;
  }
}

/**
 * Retry with backoff (1s, 3s, 9s). Entry 19 §7: a spike past the free plan's
 * 300 sends a day must not silently drop deliveries; failures are logged by
 * the caller and recorded on the request row, and the on-page download link
 * is the fallback.
 */
export async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<{ value?: T; attempts: number; error?: unknown }> {
  let last: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return { value: await fn(), attempts: i };
    } catch (err) {
      last = err;
      const retryable = !(err instanceof BrevoError) || err.retryable;
      if (!retryable || i === attempts) return { attempts: i, error: err };
      await new Promise((r) => setTimeout(r, 1000 * 3 ** (i - 1)));
    }
  }
  return { attempts, error: last };
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
