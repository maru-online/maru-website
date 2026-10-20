-- Consent log for the "AI and POPIA" guide (copy handover entry 19 §7).
-- Additive only: creates one new table and two indexes, touches nothing else.
-- Applied by hand to maru_lead_engine (shared by Preview and Production), not
-- with `drizzle-kit push --force`, which can rewrite tables it thinks drifted.
-- Mirror: guideRequests in lib/db/schema/lead-engine.ts.

CREATE TABLE IF NOT EXISTS guide_requests (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              timestamptz NOT NULL DEFAULT now(),
  guide                   text NOT NULL,
  environment             text NOT NULL,
  email                   text NOT NULL,
  first_name              text NOT NULL,
  company                 text,
  marketing_ticked        boolean NOT NULL,
  consent_text            text NOT NULL,
  privacy_text            text NOT NULL,
  consent_text_version    text NOT NULL,
  confirm_token           uuid UNIQUE,
  marketing_confirmed_at  timestamptz,
  ip_hash                 text,
  delivery_status         text NOT NULL DEFAULT 'pending',
  delivery_attempts       integer NOT NULL DEFAULT 0,
  delivery_error          text,
  brevo_status            text NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS guide_requests_email_idx   ON guide_requests (email);
CREATE INDEX IF NOT EXISTS guide_requests_created_idx ON guide_requests (created_at);
