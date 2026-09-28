"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive grid background — lines warp toward a "focus point" and ripple
 * on click/tap. Adapted from the original full-screen `KineticGrid`.
 *
 * Who controls the focus point:
 *  1. A finger (tap / drag) — holds the focus for ~2.5s after the last touch.
 *  2. A mouse inside the section — follows the cursor.
 *  3. Otherwise an AUTO-PILOT drifts along a smooth looping path and drops a
 *     soft ripple every few seconds. This is what phones (no hover) and idle
 *     desktops see, so the background is alive without any input.
 *
 * Other behaviour:
 *  - Scoped to its parent section (absolute + ResizeObserver), transparent
 *    canvas, accent-blue colours, edges fade out with a mask.
 *  - Smaller cells / warp radius on narrow screens; ~30fps + lower pixel
 *    ratio on coarse-pointer devices to save battery.
 *  - Static dot texture is CSS; inactive lines/nodes are batched into single
 *    paths; pauses while scrolled off-screen or in a background tab.
 *  - prefers-reduced-motion: one static frame, no loop, no listeners.
 *
 * Place inside a `relative` section; put the section's content in a later
 * `relative` sibling so it paints on top.
 */

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  /** Starting opacity — auto-pilot ripples are softer than tap ripples. */
  strength: number;
  born: number;
}

const DOT_SPACING = 28;
const LERP_SPEED = 0.14;
const EDGE_MARGIN = 1.5;
const TOUCH_HOLD_MS = 2500;
const AUTO_RIPPLE_EVERY_MS = 4200;
const MOBILE_FRAME_MS = 33; // ~30fps on coarse pointers

const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.07 };
const LINE_ACTIVE = { r: 76, g: 141, b: 255, a: 0.9 }; // --color-accent
const NODE_BASE = { r: 255, g: 255, b: 255, a: 0.16 };
const NODE_ACTIVE = { r: 76, g: 141, b: 255, a: 1 };
const GLOW_RGB = "76,141,255";
const RIPPLE_RGB = "110,165,255";

type RGBA = { r: number; g: number; b: number; a: number };

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(base: RGBA, active: RGBA, t: number): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

const BASE_LINE_STYLE = lerpColor(LINE_BASE, LINE_BASE, 0);
const BASE_NODE_STYLE = lerpColor(NODE_BASE, NODE_BASE, 0);

const FADE_MASK =
  "radial-gradient(ellipse 95% 85% at 50% 40%, black 45%, transparent 100%)";

export default function KineticGrid({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let W = 0;
    let H = 0;
    let cols = 2;
    let rows = 2;
    let cellW = 0;
    let cellH = 0;
    let cell = 56;
    let radius = 240;
    let maxWarp = 22;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pr = new Float32Array(0);

    let rafId = 0;
    let visible = true;
    let dirty = true;
    let hasPointer = false;
    let influence = 0;
    let lastDraw = 0;
    let touchUntil = 0;
    let lastAutoRipple = performance.now() - 2500; // first one after ~1.7s
    const pointer: Point = { x: 0, y: 0 }; // mouse, client coords
    const touch: Point = { x: 0, y: 0 }; // finger, client coords
    const mouse: Point = { x: 0, y: 0 }; // smoothed focus, section-relative
    const target: Point = { x: 0, y: 0 }; // raw focus, section-relative
    const ripples: Ripple[] = [];

    /* --- Sizing ---------------------------------------------------------- */

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));

      // Denser, gentler grid on narrow screens.
      const narrow = W < 640;
      cell = narrow ? 44 : 56;
      radius = narrow ? 150 : 240;
      maxWarp = narrow ? 16 : 22;

      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(2, Math.ceil(W / cell)) + 1;
      rows = Math.max(2, Math.ceil(H / cell)) + 1;
      cellW = W / (cols - 1);
      cellH = H / (rows - 1);
      const n = cols * rows;
      px = new Float32Array(n);
      py = new Float32Array(n);
      pr = new Float32Array(n);
      dirty = true;
    };

    /* --- Drawing --------------------------------------------------------- */

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const age = (now - rp.born) / 1000;
        rp.radius = Math.max(0, age * 400);
        rp.opacity = Math.max(0, rp.strength - age * 1.2);
        if (rp.opacity <= 0) ripples.splice(i, 1);
      }

      // Warped node positions + proximity to the focus point.
      for (let row = 0; row < rows; row++) {
        const rowPin = Math.min(
          row / EDGE_MARGIN,
          (rows - 1 - row) / EDGE_MARGIN,
          1,
        );
        for (let col = 0; col < cols; col++) {
          const colPin = Math.min(
            col / EDGE_MARGIN,
            (cols - 1 - col) / EDGE_MARGIN,
            1,
          );
          // Edge pin: boundary rows/cols stay put so the grid never tears.
          const pin = colPin * colPin * rowPin * rowPin;
          const i = row * cols + col;
          const gx = col * cellW;
          const gy = row * cellH;

          let ox = 0;
          let oy = 0;

          for (const rp of ripples) {
            const rdx = gx - rp.x;
            const rdy = gy - rp.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = rdist - rp.radius;
            const waveWidth = 55;
            if (Math.abs(diff) < waveWidth && rdist > 0) {
              const strength =
                (1 - Math.abs(diff) / waveWidth) * rp.opacity * 18 * pin;
              const sign = diff < 0 ? -1 : 1;
              ox += -sign * strength * (rdx / rdist);
              oy += -sign * strength * (rdy / rdist);
            }
          }

          const dx = gx - mouse.x;
          const dy = gy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let proximity = 0;
          if (influence > 0 && dist < radius) {
            proximity = (1 - dist / radius) * pin * influence;
            if (dist > 0) {
              const t = dist / radius;
              const eased = (1 - t) * (1 - t) * Math.min(1, dist / 60);
              const amt = eased * maxWarp * pin * influence;
              ox -= (dx / dist) * amt;
              oy -= (dy / dist) * amt;
            }
          }

          px[i] = gx + ox;
          py[i] = gy + oy;
          pr[i] = proximity;
        }
      }

      // Lines, pass 1: everything at base colour in a single path.
      ctx.lineCap = "butt";
      ctx.beginPath();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          if (col < cols - 1) {
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[i + 1], py[i + 1]);
          }
          if (row < rows - 1) {
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[i + cols], py[i + cols]);
          }
        }
      }
      ctx.strokeStyle = BASE_LINE_STYLE;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Lines, pass 2: only segments near the focus get accent colour.
      const strokeActive = (a: number, b: number) => {
        const avg = (pr[a] + pr[b]) / 2;
        if (avg < 0.02) return;
        const t = avg * avg * (3 - 2 * avg);
        ctx.beginPath();
        ctx.moveTo(px[a], py[a]);
        ctx.lineTo(px[b], py[b]);
        ctx.strokeStyle = lerpColor(LINE_BASE, LINE_ACTIVE, t);
        ctx.lineWidth = lerpN(0.8, 1.5, t);
        ctx.stroke();
      };
      if (influence > 0) {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const i = row * cols + col;
            if (col < cols - 1) strokeActive(i, i + 1);
            if (row < rows - 1) strokeActive(i, i + cols);
          }
        }
      }

      // Nodes, pass 1: all at base size/colour in a single fill.
      ctx.beginPath();
      for (let i = 0; i < cols * rows; i++) {
        ctx.moveTo(px[i] + 1.8, py[i]);
        ctx.arc(px[i], py[i], 1.8, 0, Math.PI * 2);
      }
      ctx.fillStyle = BASE_NODE_STYLE;
      ctx.fill();

      // Nodes, pass 2: active nodes grow, glow and turn accent blue.
      if (influence > 0) {
        for (let i = 0; i < cols * rows; i++) {
          const p = pr[i];
          if (p < 0.02) continue;
          const t = p * p * (3 - 2 * p);
          const r = lerpN(1.8, 3.2, t);

          if (t > 0.3) {
            const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
            const grd = ctx.createRadialGradient(
              px[i],
              py[i],
              r * 0.5,
              px[i],
              py[i],
              glowR,
            );
            grd.addColorStop(0, `rgba(${GLOW_RGB},${(t * 0.3).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${GLOW_RGB},0)`);
            ctx.beginPath();
            ctx.arc(px[i], py[i], glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(NODE_BASE, NODE_ACTIVE, t);
          ctx.fill();
        }
      }

      // Ripple rings.
      for (const rp of ripples) {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, Math.max(0, rp.radius), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${RIPPLE_RGB},${(rp.opacity * 0.28).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    /* --- Loop ------------------------------------------------------------ */

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      if (!visible) return;
      if (coarse && now - lastDraw < MOBILE_FRAME_MS) return;

      // Decide who owns the focus point this frame: finger, mouse, or auto.
      let auto = false;
      if (now < touchUntil) {
        const r = wrap.getBoundingClientRect();
        target.x = touch.x - r.left;
        target.y = touch.y - r.top;
      } else {
        let mouseInside = false;
        if (hasPointer) {
          const r = wrap.getBoundingClientRect();
          mouseInside =
            pointer.x >= r.left &&
            pointer.x <= r.right &&
            pointer.y >= r.top &&
            pointer.y <= r.bottom;
          if (mouseInside) {
            target.x = pointer.x - r.left;
            target.y = pointer.y - r.top;
          }
        }
        if (!mouseInside) {
          // Auto-pilot: two slow sine waves trace a wandering loop.
          auto = true;
          target.x = W * 0.5 + W * 0.36 * Math.sin(now * 0.00042);
          target.y = H * 0.46 + H * 0.3 * Math.sin(now * 0.00061 + 1.3);
        }
      }

      // Fade the effect in on first paint; start the smoothed focus at the
      // target so it doesn't sweep in from the corner.
      if (influence < 0.01) {
        mouse.x = target.x;
        mouse.y = target.y;
      }
      influence += (1 - influence) * 0.06;
      if (1 - influence < 0.003) influence = 1;

      mouse.x += (target.x - mouse.x) * LERP_SPEED;
      mouse.y += (target.y - mouse.y) * LERP_SPEED;

      if (auto && now - lastAutoRipple > AUTO_RIPPLE_EVERY_MS) {
        lastAutoRipple = now;
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          radius: 0,
          opacity: 0.8,
          strength: 0.8,
          born: now,
        });
      }

      const moving =
        Math.abs(target.x - mouse.x) > 0.1 ||
        Math.abs(target.y - mouse.y) > 0.1;

      // Nothing changed since the last frame — skip the redraw entirely.
      if (!dirty && ripples.length === 0 && !moving && influence === 1) return;
      dirty = false;
      lastDraw = now;
      draw(now);
    };

    /* --- Input ----------------------------------------------------------- */

    const inside = (x: number, y: number) => {
      const r = wrap.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        hasPointer = true;
      } else if (inside(e.clientX, e.clientY)) {
        // Finger dragging across the section.
        touch.x = e.clientX;
        touch.y = e.clientY;
        touchUntil = performance.now() + TOUCH_HOLD_MS;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        return;
      }
      if (e.pointerType !== "mouse") {
        touch.x = e.clientX;
        touch.y = e.clientY;
        touchUntil = performance.now() + TOUCH_HOLD_MS;
      }
      ripples.push({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        radius: 0,
        opacity: 1,
        strength: 1,
        born: performance.now(),
      });
    };

    const onLeave = () => {
      hasPointer = false;
    };

    /* --- Wiring ---------------------------------------------------------- */

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    ro.observe(wrap);

    if (reduceMotion) {
      draw(performance.now());
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) dirty = true;
    });
    io.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.06) 0.8px, transparent 0.8px)",
        backgroundSize: `${DOT_SPACING}px ${DOT_SPACING}px`,
        backgroundPosition: `${DOT_SPACING / 2}px ${DOT_SPACING / 2}px`,
        maskImage: FADE_MASK,
        WebkitMaskImage: FADE_MASK,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}