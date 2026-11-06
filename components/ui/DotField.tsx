"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * DotField — halftone dot background (layout exploration, Nov 2026).
 *
 * Modelled on the openinstinct.sh background: a fine dot grid whose
 * brightness is shaped by low-frequency noise, so the dots gather into soft
 * cloud / terrain forms with empty "weather" between them. Rebuilt from
 * scratch (their landing source is not published); no code copied.
 *
 * - `tone="dark"`  pale dots on navy grounds (hero, diagram band, footer)
 * - `tone="light"` navy dots on Warm Stone grounds, kept faint
 * Colours come from brand tokens at runtime, so no raw hex lives here.
 *
 * Performance: one 2D canvas, DPR capped at 2, redraws ~20fps only while
 * on screen, renders a single static frame under prefers-reduced-motion.
 */

type Tone = "dark" | "light";
type Mask = "none" | "edges" | "top" | "bottom" | "right" | "left" | "y";

const MASKS: Record<Mask, string | undefined> = {
  none: undefined,
  edges: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 100%)",
  top: "linear-gradient(to bottom, #000 0%, transparent 85%)",
  bottom: "linear-gradient(to top, #000 0%, transparent 85%)",
  right: "linear-gradient(to left, #000 15%, transparent 75%)",
  left: "linear-gradient(to right, #000 15%, transparent 75%)",
  y: "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
};

interface DotFieldProps {
  tone?: Tone;
  /** Grid pitch in CSS px. openinstinct sits at ~6px. */
  pitch?: number;
  /** 0–1 overall strength. Defaults: dark 1, light 0.55. */
  intensity?: number;
  /** Noise scale; lower = bigger cloud forms. */
  scale?: number;
  /** 0–1: how much of the frame the dots cover (clouds are the gaps). */
  coverage?: number;
  /** Which part of the field stays visible. */
  mask?: Mask;
  /** Pin to the viewport (one continuous field behind the page). */
  fixed?: boolean;
  /** Drift the cloud forms slowly. Off under reduced motion regardless. */
  animate?: boolean;
  /** Seed so two sections don't show identical clouds. */
  seed?: number;
  className?: string;
}

// ── value noise + fbm (small, dependency-free) ───────────────────────────────
function makeNoise(seed: number) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed * 9301 + 49297;
  for (let i = 255; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const rnd = (x: number, y: number) => perm[(perm[x & 255] + y) & 511] / 255;
  const fade = (t: number) => t * t * (3 - 2 * t);
  const value = (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = fade(xf), v = fade(yf);
    const a = rnd(xi, yi), b = rnd(xi + 1, yi);
    const c = rnd(xi, yi + 1), d = rnd(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  return (x: number, y: number) =>
    value(x, y) * 0.55 + value(x * 2.03, y * 2.03) * 0.3 + value(x * 4.1, y * 4.1) * 0.15;
}

function readRgb(varName: string, fallback: [number, number, number]) {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const m = raw.match(/^#([0-9a-f]{6})$/i);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as [number, number, number];
}

export default function DotField({
  tone = "dark",
  pitch = 6,
  intensity,
  scale = 0.0021,
  coverage = 0.6,
  mask = "none",
  fixed = false,
  animate = true,
  seed = 7,
  className,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const moving = animate && !reduced;
    const strength = intensity ?? (tone === "dark" ? 1 : 0.55);
    const noise = makeNoise(seed);

    // Pale stone dots on navy; navy dots on stone. Cyan threads through the
    // densest areas so the field reads as Maru, not generic grey.
    const base = tone === "dark"
      ? readRgb("--color-ink-inverted", [250, 250, 248])
      : readRgb("--color-navy", [26, 58, 92]);
    const accent = readRgb("--color-cyan", [61, 184, 198]);
    const maxAlpha = (tone === "dark" ? 0.62 : 0.36) * strength;

    let w = 0, h = 0, dpr = 1, raf = 0, last = 0, visible = true, t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const smooth = (e0: number, e1: number, x: number) => {
      const k = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
      return k * k * (3 - 2 * k);
    };

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const dot = Math.max(1, pitch * 0.32);
      const drift = t * 0.018;
      const edge = 0.62 - coverage * 0.24;
      // Phones: the clouds fill the whole column and sit under every line of
      // text, so the field recedes to keep copy legible.
      const damp = w < 768 ? 0.5 : 1;
      for (let y = pitch / 2; y < h; y += pitch) {
        for (let x = pitch / 2; x < w; x += pitch) {
          const n = noise(x * scale + drift, y * scale - drift * 0.6);
          // Clouds = where noise is low: no dots. Field = where it's high.
          // Fairly hard edge, as on openinstinct: the clouds read as shapes.
          const a = smooth(edge - 0.03, edge + 0.03, n);
          if (a < 0.04) continue;
          // Brightness varies inside the field on a second, finer noise.
          const b = noise(x * scale * 2.7 + 40, y * scale * 2.7 - drift);
          const alpha = damp * maxAlpha * a * (0.3 + 0.7 * smooth(0.3, 0.75, b));
          const hot = smooth(edge + 0.17, edge + 0.23, n);
          const c = hot > 0.5 ? accent : base;
          ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`;
          ctx!.fillRect(x, y, dot, dot);
        }
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 50) return;
      t += (now - (last || now)) / 1000;
      last = now;
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) last = performance.now();
    });
    io.observe(canvas);
    resize();
    if (moving) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [tone, pitch, intensity, scale, coverage, animate, seed]);

  const maskImage = MASKS[mask];
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none inset-0 h-full w-full",
        fixed ? "fixed" : "absolute",
        className,
      )}
      style={maskImage ? { maskImage, WebkitMaskImage: maskImage } : undefined}
    />
  );
}
