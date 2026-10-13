# Warm Stone — Light-Theme Token Sheet (Direction 2, final)

> Chosen 31 Jul 2026 (the owner). Implements PLAN-2026-08-LIGHT-REFRESH.md Phase B output.
> Additions requested during review: gradient depth system, button shadows, isometric
> prism background motif.

## Changed tokens (`app/globals.css`)

| Token | Old | New | Why |
|---|---|---|---|
| `--color-bg-navy-deep` | `#0D1B2A` | `#16324F` | Hero/footer lightened one step |
| `--color-bg-darkest` | `#060E15` | `#122A45` | No near-black surfaces anywhere |

## New tokens

```css
--gradient-hero:      linear-gradient(150deg, #16324F 0%, #1A3A5C 100%);
--gradient-navy-soft: linear-gradient(160deg, #1A3A5C 0%, #16324F 100%);
--gradient-surface:   linear-gradient(180deg, #FAFAF8 0%, #F5F4F0 100%);
--gradient-gold:      linear-gradient(135deg, #D6B76A 0%, #C39F45 100%);
--shadow-btn:         0 2px 8px rgba(13, 27, 42, 0.18);
--shadow-btn-hover:   0 6px 20px rgba(205, 170, 83, 0.40);
```

## Application rules

- **Dark surfaces** exist only in nav/hero/footer/assessment-band — always as a
  gradient (`--gradient-hero` for hero, `--gradient-navy-soft` for footer/bands),
  never flat.
- **Light sections** on the warm scale (`#FFFFFF` / `#FAFAF8` / `#F5F4F0`); canvas
  sections use `--gradient-surface` for subtle depth.
- **Primary buttons**: `--gradient-gold` fill, navy ink, resting `--shadow-btn`,
  hover `--shadow-btn-hover` (gold-tinted). Cyan demoted to secondary/functional.
- **Prism motif**: isometric SVG prism (gold-tint top face, teal-tint right face,
  faint-light left face, `drop-shadow(0 48px 96px rgba(6,14,21,0.45))`) as hero
  background object — see `app/page.tsx` hero. Reusable pattern for other dark bands.
- Unchanged: type scale, Outfit/Inter, tracking, spacing rhythm, gold hexes.

## Session 2 (remaining sweep)

~16 files still reference `bg-navy`/`bg-darkest` surfaces (services/*, about,
pricing, process, contact, booking, insights, resources, operations-assessment,
Nav mobile overlay, ImageSplit, LeadCaptureForm, CookieConsent). Token change
already recolours them; session 2 converts mid-page dark sections to light
equivalents and applies gradients per the rules above, then full-route QA.
