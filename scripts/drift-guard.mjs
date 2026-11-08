#!/usr/bin/env node
/**
 * Drift Guard — Maru Online design system.
 *
 * Run with `npm run lint:design`. Fails the build on the four ways this
 * codebase has actually drifted before:
 *
 *   1. Retired brand hex hardcoded in .tsx (the black era, the impostor cyan).
 *   2. Phantom colour utilities — classes like `text-light-soft` whose token
 *      was never defined. Tailwind silently emits nothing, so the element
 *      renders with no colour at all. This is the bug that hid three
 *      unreadable legal pages and a whole POPIA checklist.
 *   3. Default Tailwind palette colours, which CLAUDE.md forbids.
 *   4. Components that nothing imports. Matched on PATH, not basename —
 *      a basename check reported the stale components/ui/CookieConsent.tsx
 *      as live because components/CookieConsent.tsx shares its name.
 *   5. Retired terminology in visible copy ("free assessment", "diagnostic"
 *      era wording, hype phrases). Comment lines are ignored.
 *   6. Email assets that already-sent emails link to must still exist (the
 *      Maru logo in the report email header).
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC_DIRS = ["app", "components", "lib"];

// ── Rules ────────────────────────────────────────────────────────────────────

/** Hex values from superseded palettes. Keyed by what replaced them. */
const RETIRED_HEX = {
  "#161616": "black era — use var(--color-bg-navy-deep)",
  "#04B3CC": "impostor cyan — use var(--color-cyan)",
  "#00F0FF": "neon cyan — use var(--color-cyan)",
  "#FF9900": "amber — use var(--color-ochre)",
  "#0D1B2A": "pre-Warm-Stone navy — use var(--color-ink-primary) or var(--color-ink-on-gold)",
};

/** Colour names that read like brand tokens but are defined nowhere. */
const PHANTOM_TOKENS = [
  "accent", "accent-light", "light-soft", "card-dark",
  "electric-cyan", "deep-navy", "warm-amber", "highlight",
];

/** Stock Tailwind palettes — CLAUDE.md: never use the default palette. */
const STOCK_PALETTES = [
  "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
  "yellow", "lime", "green", "emerald", "teal", "sky", "blue", "indigo",
  "violet", "purple", "fuchsia", "pink", "rose", "cyan",
];

const UTIL = "(?:bg|text|border|ring|fill|stroke|from|via|to|divide|outline|shadow|accent|caret|decoration)";

/** Files exempt from a rule, with the reason. */
const EXEMPT = {
  hex: [
    "components/ui/Glyph.tsx",      // icon geometry, no colour decisions
    "app/global-error.tsx",         // replaces the root layout — no globals.css, so literals only
    "app/opengraph-image.tsx",      // Satori renders outside the DOM — CSS variables do not resolve
  ],
  stock: [],
  // Legal text is revised with the owner's lawyer, not in copy passes.
  terms: ["app/terms-conditions/page.tsx"],
  // v2 templates stay for reports emailed before 26 Sep 2026 (deleted after 12 months, per the Privacy Policy).
  v2: ["lib/assessment/reportTemplates.ts"],
};

/** Wording retired from the site (6 Nov 2026). Matched case-insensitively on non-comment lines. */
const RETIRED_TERMS = [
  "free assessment", "operations assessment", "operations diagnostic", "ai readiness assessment",
  "cutting-edge", "age of ai", "cut costs", "ai that actually", "marketing funnel",
  "retainer", "fixed-scope", "digital audit", "discovery call", "book a call",
];

// ── Walk ─────────────────────────────────────────────────────────────────────

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".next" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(full)) out.push(full);
  }
  return out;
}

const files = SRC_DIRS.flatMap((d) => walk(join(ROOT, d))).map((f) => relative(ROOT, f));
const read = new Map(files.map((f) => [f, readFileSync(join(ROOT, f), "utf8")]));

const failures = [];
const fail = (rule, file, detail) => failures.push({ rule, file, detail });

// ── 1. Retired hex ───────────────────────────────────────────────────────────

for (const [file, src] of read) {
  if (!file.endsWith(".tsx") || EXEMPT.hex.includes(file)) continue;
  for (const [hex, advice] of Object.entries(RETIRED_HEX)) {
    const re = new RegExp(hex.replace("#", "#"), "gi");
    const hits = src.match(re);
    if (hits) fail("retired-hex", file, `${hits.length}× ${hex} — ${advice}`);
  }
}

// ── 2. Phantom colour utilities ──────────────────────────────────────────────

for (const [file, src] of read) {
  if (!file.endsWith(".tsx")) continue;
  for (const token of PHANTOM_TOKENS) {
    const re = new RegExp(`\\b${UTIL}-${token}\\b(?![\\w-])`, "g");
    const hits = src.match(re);
    if (hits) {
      fail(
        "phantom-class",
        file,
        `${hits.length}× ${[...new Set(hits)].join(", ")} — no such token; renders with no colour`,
      );
    }
  }
}

// ── 3. Stock Tailwind palette ────────────────────────────────────────────────

for (const [file, src] of read) {
  if (!file.endsWith(".tsx") || EXEMPT.stock.includes(file)) continue;
  const re = new RegExp(`\\b${UTIL}-(?:${STOCK_PALETTES.join("|")})-\\d{2,3}\\b`, "g");
  const hits = src.match(re);
  if (hits) {
    fail("stock-palette", file, `${[...new Set(hits)].join(", ")} — use brand tokens`);
  }
}

// ── 4. Unimported components (path-aware) ────────────────────────────────────

const componentFiles = files.filter((f) => f.startsWith("components/") && f.endsWith(".tsx"));

for (const file of componentFiles) {
  // "components/ui/Nav.tsx" -> match "@/components/ui/Nav", "../ui/Nav", "./Nav"
  const noExt = file.replace(/\.tsx$/, "");
  const segments = noExt.split("/");
  const tails = segments.map((_, i) => segments.slice(i).join("/"));

  const imported = [...read].some(([other, src]) => {
    if (other === file) return false;
    return tails.some((tail) =>
      new RegExp(`from\\s+["'][^"']*(?:^|/)${tail}["']`, "m").test(src) ||
      new RegExp(`import\\(\\s*["'][^"']*(?:^|/)${tail}["']`, "m").test(src),
    );
  });

  if (!imported) fail("unimported", file, "nothing imports this file — delete it");
}

// ── 5. Retired terminology in visible copy ───────────────────────────────────

const isComment = (line) => /^\s*(\/\/|\*|\/\*|\{\/\*)/.test(line);

for (const [file, src] of read) {
  if (EXEMPT.terms.includes(file) || EXEMPT.v2.includes(file)) continue;
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    if (isComment(line)) return;
    // Ignore trailing line comments.
    const lower = line.replace(/\s\/\/.*$/, "").toLowerCase();
    for (const term of RETIRED_TERMS) {
      if (lower.includes(term)) fail("retired-term", file, `line ${i + 1}: "${term}" is retired wording`);
    }
  });
}

// ── Report ───────────────────────────────────────────────────────────────────

// ── Rule 6: email assets must not disappear ────────────────────────────────
// Emails already in people's inboxes load these by URL. Never rename or delete.
for (const asset of ["public/email/maru-logo-primary.png"]) {
  if (!existsSync(join(ROOT, asset))) fail("email-asset", asset, "missing: sent emails link to this file, restore it");
}

if (failures.length === 0) {
  console.log("✅ Drift guard passed — no design drift detected.");
  process.exit(0);
}

const byRule = failures.reduce((acc, f) => {
  (acc[f.rule] ||= []).push(f);
  return acc;
}, {});

const HEADINGS = {
  "retired-hex": "Retired brand hex hardcoded in .tsx",
  "phantom-class": "Colour classes with no matching token (render as nothing)",
  "stock-palette": "Default Tailwind palette colours",
  unimported: "Components nothing imports",
  "retired-term": "Retired terminology in visible copy",
};

console.error("❌ Drift guard failed.\n");
for (const [rule, items] of Object.entries(byRule)) {
  console.error(`  ${HEADINGS[rule]} (${items.length}):`);
  for (const { file, detail } of items) console.error(`    ${file}\n      ${detail}`);
  console.error("");
}
console.error(`${failures.length} problem${failures.length === 1 ? "" : "s"}. See docs/DESIGN-SYSTEM.md.`);
process.exit(1);
