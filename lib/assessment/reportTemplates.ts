/**
 * Maru Online — Operations Assessment Report Templates (v2)
 *
 * GTmetrix-style per-area structured findings.
 * Each area has findings at 3 severity levels:
 *   critical | significant | partial | strong
 *
 * Structure per area + status:
 *   - observation: 1–2 sentences. What the answers reveal. Operational language only.
 *   - issues: 3–5 bullets. Specific problems typical at this status in this area.
 *   - (strong areas get a positive note instead)
 *
 * Summary block (bottom of report) is level-dependent (1, 2, or 3).
 */

export type AreaStatus = "critical" | "significant" | "partial" | "strong";

export interface AreaFinding {
  observation: string;
  issues: string[];
}

export interface AreaTemplate {
  critical: AreaFinding;
  significant: AreaFinding;
  partial: AreaFinding;
  strong: AreaFinding;
}

export interface ReportSummary {
  approachHeading: string;
  approach: string;
  outcomeHeading: string;
  outcome: string;
  segmentBNote?: string;
}

// ── Area Templates ─────────────────────────────────────────────────────────

export const areaTemplates: Record<string, AreaTemplate> = {

  // ── Process & Workflow ──────────────────────────────────────────────────

  process: {
    critical: {
      observation: "Your answers suggest that work moves through the business without a defined structure — tasks are figured out as they go, and the method varies by whoever is handling it. This is the most common starting point for SA SMEs, but it creates a ceiling that becomes harder to push through as the business grows.",
      issues: [
        "No documented process means every task relies on individual memory and judgment",
        "Inconsistent execution increases the chance of errors, missed steps, and client experience variation",
        "Onboarding new team members takes significantly longer — there is nothing to hand over",
        "The owner or a senior person is regularly pulled in to resolve operational questions that a system should handle",
        "Business continuity is at risk — if a key person is unavailable, operations are disrupted",
      ],
    },
    significant: {
      observation: "Your business has some process structure but it breaks down under pressure or when the usual person is unavailable. The process exists in principle — it just is not reliable enough to execute consistently without specific individuals.",
      issues: [
        "Processes are known but not documented in a form others can follow independently",
        "Execution quality varies depending on who is handling the task",
        "Recurring tasks take more effort than they should because the method is not standardised",
        "Handoffs between team members create friction — context gets lost in translation",
        "Scaling volume through the current process will require more people, not better systems",
      ],
    },
    partial: {
      observation: "Your processes are reasonably defined and the team generally follows them — but there are identifiable points where the structure breaks down or requires manual intervention that slows things down.",
      issues: [
        "Some processes are documented, others exist only in institutional knowledge",
        "Manual steps sit between automated ones, creating unnecessary coordination overhead",
        "Edge cases and exceptions are handled ad hoc rather than being built into the process",
        "Process review is infrequent — existing workflows may not reflect how the business actually operates today",
      ],
    },
    strong: {
      observation: "Your processes are well-defined and consistently followed. The team executes reliably across most scenarios, including when key individuals are unavailable.",
      issues: [
        "Continue reviewing processes quarterly as volume and complexity increase",
        "Identify any remaining manual steps between automated stages — these are optimisation opportunities",
      ],
    },
  },

  // ── Data & Information Flow ─────────────────────────────────────────────

  data: {
    critical: {
      observation: "Your business data is fragmented across email, WhatsApp, spreadsheets, and individual memory. There is no reliable single source, which means retrieving accurate information requires effort — and the information you find may already be out of date.",
      issues: [
        "Customer and operational data exists in multiple places with no master record",
        "Re-entering the same information across tools wastes time and introduces errors",
        "When information is manually copied between systems, inconsistencies accumulate over time",
        "Historical data is difficult to access or trust — decisions are made on incomplete information",
        "As volume increases, data fragmentation compounds — small issues become significant operational failures",
      ],
    },
    significant: {
      observation: "Your business uses defined tools but data moves between them manually. The information exists — it is just not connected in a way that makes it usable without effort.",
      issues: [
        "Manual data transfer between tools creates delay and error risk at every handoff point",
        "The same data is often stored in more than one place, leading to version control issues",
        "When a system is updated, other systems are not automatically updated — staff work from stale records",
        "Time spent on data entry and reconciliation is a measurable operational cost that goes unexamined",
        "Errors from manual data handling take time to identify and fix — often after they have already caused a problem",
      ],
    },
    partial: {
      observation: "Most of your tools are in place and data generally flows through the business — but there are specific points where manual re-entry or data inconsistency creates friction.",
      issues: [
        "Certain handoffs between tools still require manual data entry that should be automated",
        "Data quality issues surface occasionally — inconsistent formatting, duplicate records, or missing fields",
        "Not all systems share a common identifier (like a client ID), making cross-system lookup cumbersome",
        "Some data is captured but not consistently used — it sits in a system without informing decisions",
      ],
    },
    strong: {
      observation: "Your systems are connected and data flows reliably between them. Manual re-entry is minimal and your records are generally accurate and accessible.",
      issues: [
        "Audit data quality periodically — connected systems can propagate errors as well as accuracy",
        "Look for any remaining manual data journeys — each one is a potential automation opportunity",
      ],
    },
  },

  // ── Client & Lead Management ────────────────────────────────────────────

  client: {
    critical: {
      observation: "Your client and lead management is reactive — enquiries are handled when someone sees them, and follow-up depends on memory or available capacity. This means the business is losing opportunities it should be closing.",
      issues: [
        "No defined intake process means response time and quality vary significantly between enquiries",
        "Follow-up is not systematic — leads that require more than one touch are frequently lost",
        "There is no reliable record of where each lead sits in the process at any given moment",
        "Marketing spend is undermined by the inconsistency of what happens after a lead arrives",
        "High-quality leads receive the same experience as low-quality ones — no prioritisation or differentiation",
      ],
    },
    significant: {
      observation: "Your lead management process exists but depends on the availability and memory of specific team members. Some leads are handled well — others fall through gaps that are visible but not yet addressed.",
      issues: [
        "Response time to enquiries varies depending on workload and who picks it up",
        "Follow-up sequences are not automated — they depend on individual initiative",
        "Leads in the nurture stage receive inconsistent engagement based on capacity rather than process",
        "There is no clear handoff point between marketing interest and active sales engagement",
        "Conversion rate data is not tracked systematically — it is difficult to improve what is not measured",
      ],
    },
    partial: {
      observation: "Your intake and follow-up process is functional and catches most leads — but there are specific points where the process loses momentum or relies on manual effort that should be automated.",
      issues: [
        "Initial response is consistent but nurture sequences have gaps or timing variability",
        "Lead status is tracked but requires manual updates — real-time visibility is limited",
        "Some leads fall through at the proposal or closing stage due to insufficient follow-up cadence",
        "The handoff from inquiry to qualified prospect is not fully systematised",
      ],
    },
    strong: {
      observation: "Your lead and client management is systematic — enquiries enter a defined process, follow-up is consistent, and conversion data is tracked.",
      issues: [
        "Review conversion rates by lead source to identify where to invest more",
        "Look for personalisation opportunities in the nurture sequence — timing and content can be refined",
      ],
    },
  },

  // ── Visibility & Reporting ──────────────────────────────────────────────

  visibility: {
    critical: {
      observation: "Your business does not have a reliable operational view — performance is assessed through instinct and experience, and problems typically surface after they have already caused impact. This is the most common blind spot in early-stage SA businesses.",
      issues: [
        "No systematic way to track how the business is performing against key indicators",
        "Revenue, pipeline, and delivery health are checked manually and infrequently",
        "Problems are reactive — they are addressed after a client flags them or a deadline is missed",
        "The owner carries most of the operational awareness in their head — it does not exist in a shareable form",
        "Without measurement, it is impossible to identify which part of the operation is the bottleneck",
      ],
    },
    significant: {
      observation: "You get a picture of performance by pulling reports from your tools — but it takes effort and happens less frequently than it should. By the time a trend is visible, it has already had time to develop.",
      issues: [
        "Manual report compilation takes time that could be spent acting on the information",
        "Data is pulled from multiple systems and combined by hand — inconsistencies accumulate",
        "The reporting cadence is too slow to surface emerging issues before they become significant",
        "Different team members may be working from different versions of the same data",
        "Decision-making lags actual performance by days or weeks",
      ],
    },
    partial: {
      observation: "You have reasonable visibility into business performance but some metrics still require manual effort to compile, and there are gaps in what gets tracked consistently.",
      issues: [
        "Some reporting is automated, other parts still require manual data extraction",
        "Certain operational areas have good visibility while others are opaque",
        "The current view shows what happened — it does not yet signal what is about to happen",
        "Reporting is available but not always reviewed at a cadence that allows early action",
      ],
    },
    strong: {
      observation: "Your business has good operational visibility — key metrics surface automatically and problems are typically identified before they cause significant impact.",
      issues: [
        "Consider adding leading indicators alongside lagging ones — signals that predict issues before they occur",
        "Ensure your visibility extends to team capacity and delivery load, not just revenue metrics",
      ],
    },
  },

  // ── People & Dependency ─────────────────────────────────────────────────

  people: {
    critical: {
      observation: "Your business has high dependency on specific individuals — operational knowledge is concentrated in a small number of people, and if any one of them were unavailable, the impact on the business would be significant.",
      issues: [
        "Critical processes exist only in specific people's knowledge — not in any documented form",
        "Business continuity is at risk from staff absences, departures, or capacity overload",
        "The owner is regularly drawn into operational decisions that should not require their involvement",
        "Bringing new staff up to speed is slow and dependent on tribal knowledge transfer",
        "Growth is constrained by the capacity of existing individuals — the business cannot scale without them",
      ],
    },
    significant: {
      observation: "Some roles in your business carry more operational weight than they should. The team generally covers when needed, but the scramble to do so is a sign that the underlying dependency has not been resolved.",
      issues: [
        "A small number of people are the operational backbone — processes fall apart when they are unavailable",
        "Coverage during absences creates additional burden on other team members",
        "Knowledge transfer happens informally — new team members learn by watching, not by following a defined process",
        "Delegation is limited because the processes are not documented clearly enough to hand over",
        "Senior time is regularly consumed by operational tasks rather than strategic work",
      ],
    },
    partial: {
      observation: "Your business has reduced its dependency on specific individuals in most areas, but there are still roles or processes where a single person's unavailability would create noticeable friction.",
      issues: [
        "Most processes can be handed over — but a few critical ones still live with one person",
        "Documentation exists but is not always current or complete enough to rely on independently",
        "Some approval or decision flows still route through senior individuals unnecessarily",
        "Onboarding is faster than it used to be but still slower than it should be",
      ],
    },
    strong: {
      observation: "Your business has good resilience — processes are documented, knowledge is distributed, and the team can execute reliably without depending on any single individual.",
      issues: [
        "Continue reviewing decision flows as the business grows — dependencies re-emerge at scale",
        "Ensure documentation is maintained actively — it decays quickly without a process to keep it current",
      ],
    },
  },
};

// ── Summary Templates ──────────────────────────────────────────────────────

export const summaryTemplates: Record<ReadinessLevel, ReportSummary> = {
  1: {
    approachHeading: "Recommended approach",
    approach: "The right starting point is a structured conversation to map exactly where the highest-friction processes sit in your business. Before building anything, we need to understand what is actually costing you the most time and money — not what appears to be the problem from the outside. The POPIA-Safe AI Audit is designed to answer that question with precision, so that any implementation work that follows is targeted and measurable rather than speculative.",
    outcomeHeading: "What a successful engagement looks like",
    outcome: "A business where the two or three highest-effort manual processes have been replaced with reliable systems. The team's time is redirected from administration and coordination to client work and growth. Operational knowledge that lived in people's heads is captured in a form the business can actually use. The owner's involvement in day-to-day operational decisions reduces significantly.",
  },
  2: {
    approachHeading: "Recommended approach",
    approach: "Your business has structure — the opportunity is in connecting the gaps between what exists. The starting point is identifying the specific handoff points where information currently travels manually and where the cost of that manual journey is highest. A POPIA-Safe AI Audit will map those handoffs with precision and produce a prioritised plan: the three integration points that would deliver the most return, in the order they should be addressed.",
    outcomeHeading: "What a successful engagement looks like",
    outcome: "Manual handoffs between your existing tools are replaced with reliable automatic flows. The team's time shifts from data entry and coordination to the work that actually moves the business forward. Lead and client information flows from intake to delivery without anyone having to move it by hand. Errors from manual re-entry drop to near zero. You have a current, accurate view of the business without needing to compile it.",
  },
  3: {
    approachHeading: "Recommended approach",
    approach: "At your level of operational maturity, the opportunity is in precision optimisation rather than foundation-building. The focus is on identifying where the current infrastructure has hit its ceiling — the manual steps between automated stages, the reporting that still requires human compilation, the approval flows that route through people unnecessarily. A POPIA-Safe AI Audit at this stage is a targeted audit of those gaps, not a ground-up assessment.",
    outcomeHeading: "What a successful engagement looks like",
    outcome: "The remaining manual steps between your connected systems are automated. Reporting that currently requires effort becomes available automatically. Decision flows are redesigned to match your actual risk tolerance — senior time is freed from routine approval and directed to decisions that genuinely require it. The business has the operational headroom to absorb significantly more volume without a proportional increase in overhead.",
  },
};

export type ReadinessLevel = 1 | 2 | 3;

// ── Segment B overlay ──────────────────────────────────────────────────────

export const segmentBNote: Record<ReadinessLevel, string> = {
  1: "Your assessment indicates you have brought external help in before and it did not fully deliver. That experience is worth examining directly before committing to anything further. In most cases the gap comes down to one of three things: the scope was too broad for where the business was at the time, the implementation was not connected to how the business actually operates, or the output was delivered without enough internal ownership to sustain it. The discovery call is the right place to examine which of these applies.",
  2: "A prior external engagement that fell short is worth addressing directly. Businesses at the Building stage that have had an unsuccessful implementation often have a specific gap: the work was done but not integrated in a way that made it self-sustaining. The starting point for any new work is assessing what already exists, understanding why the connections did not hold, and building from there rather than starting from scratch.",
  3: "A prior implementation that did not deliver expectations at your level of maturity usually has a specific cause — a vendor that was technically competent but did not account for the operational context of the business, or a scope that was correct in principle but delivered without the change management needed to embed it. It is worth examining that experience clearly before the discovery call so we understand what worked, what did not, and what a different engagement structure would look like.",
};

// ── Public API ─────────────────────────────────────────────────────────────

export function getAreaFinding(areaKey: string, status: AreaStatus): AreaFinding {
  const template = areaTemplates[areaKey];
  if (!template) {
    return {
      observation: "Your assessment flagged this area as requiring attention. A more detailed review during the discovery call will give us the specific picture.",
      issues: ["Detailed findings will be discussed during the discovery call."],
    };
  }
  return template[status];
}

export function getReportSummary(level: ReadinessLevel, isSegmentB: boolean): ReportSummary {
  const base = summaryTemplates[level];
  if (!isSegmentB) return base;
  return { ...base, segmentBNote: segmentBNote[level] };
}

// Legacy shim — keeps existing API route happy during transition
export interface ReportTemplate {
  intro: string;
  insight1: string;
  insight2: string;
  insight3: string;
}
export interface FullTemplate extends ReportTemplate {
  segmentBOverlay?: string;
}
export function getFullTemplate(level: ReadinessLevel, painTag: string, isSegmentB: boolean): FullTemplate {
  const s = summaryTemplates[level];
  return {
    intro: s.approach,
    insight1: s.outcome,
    insight2: "",
    insight3: "",
    ...(isSegmentB ? { segmentBOverlay: segmentBNote[level] } : {}),
  };
}
