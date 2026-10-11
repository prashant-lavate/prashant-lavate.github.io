"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number; // 0..1 (normalised, so resizes don't reshuffle the sky)
  y: number; // 0..1
  z: number; // depth: 0.2 (far) .. 1 (near)
  r: number;
  base: number;
  phase: number;
  speed: number;
  color: string;
  halo: boolean;
  sx: number; // last screen position, used for constellation lines
  sy: number;
};

type Shooter = { x: number; y: number; vx: number; vy: number; life: number; max: number };

const TAU = Math.PI * 2;
const TINTS = ["255,255,255", "255,255,255", "255,255,255", "170,200,255", "190,170,255"];
const CURSOR_RADIUS = 160; // stars inside this ring around the cursor can connect
const LINK_DIST = 100; // max distance between two stars for a line

/**
 * Site-wide space background: parallax stars, cursor constellations, a rare
 * shooting star, and a speed-streak effect while scrolling.
 *
 * Plain 2D canvas, no dependencies. Respects prefers-reduced-motion (draws one
 * static frame) and pauses while the tab is hidden.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let raf = 0;
    let last = 0;
    let running = !reduceMotion;
    let nextShooterIn = 5 + Math.random() * 6;
    let lastScroll = window.scrollY;
    let boost = 0; // smoothed scroll speed
    let scrollDir = 1;

    const mouse = { x: -9999, y: -9999, active: false };
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    function makeStars() {
      const count = Math.round(Math.min(210, Math.max(70, (w * h) / 9500)));
      stars = Array.from({ length: count }, () => {
        const z = 0.2 + Math.random() * 0.8;
        return {
          x: Math.random(),
          y: Math.random(),
          z,
          r: 0.35 + z * 1.05,
          base: 0.35 + z * 0.45,
          phase: Math.random() * TAU,
          speed: 0.6 + Math.random() * 1.4,
          color: `rgb(${TINTS[Math.floor(Math.random() * TINTS.length)]})`,
          halo: z > 0.88 && Math.random() < 0.6,
          sx: 0,
          sy: 0,
        };
      });
    }

    function resize() {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      const widthChanged = nw !== w;
      // Mobile browsers fire resize while the URL bar shows/hides; ignore tiny height-only changes.
      if (!widthChanged && w !== 0 && Math.abs(nh - h) < 120) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = nw;
      h = nh;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!stars.length || widthChanged) makeStars();
      if (reduceMotion) paint(0, false);
    }

    function step(dt: number, dScroll: number) {
      for (const s of stars) {
        s.y -= dt * 0.006 * s.z; // slow upward drift
        s.x += dt * 0.002 * s.z;
        s.y -= (dScroll * s.z * 0.35) / h; // parallax against page scroll
        s.x = ((s.x % 1) + 1) % 1;
        s.y = ((s.y % 1) + 1) % 1;
      }
    }

    function paint(t: number, animate: boolean) {
      ctx!.clearRect(0, 0, w, h);
      ctx!.lineCap = "round";

      const streak = animate && boost > 6 ? (boost - 6) * 0.9 : 0;

      for (const s of stars) {
        s.sx = s.x * w + parallax.x * s.z * 18;
        s.sy = s.y * h + parallax.y * s.z * 18;
        const a = animate ? s.base * (0.7 + 0.3 * Math.sin(t * s.speed + s.phase)) : s.base;

        ctx!.globalAlpha = a;
        if (streak > 0.5) {
          ctx!.strokeStyle = s.color;
          ctx!.lineWidth = s.r;
          ctx!.beginPath();
          ctx!.moveTo(s.sx, s.sy);
          ctx!.lineTo(s.sx, s.sy + scrollDir * streak * s.z);
          ctx!.stroke();
        } else {
          ctx!.fillStyle = s.color;
          ctx!.beginPath();
          ctx!.arc(s.sx, s.sy, s.r, 0, TAU);
          ctx!.fill();
          if (s.halo) {
            ctx!.globalAlpha = a * 0.14;
            ctx!.beginPath();
            ctx!.arc(s.sx, s.sy, s.r * 3.4, 0, TAU);
            ctx!.fill();
          }
        }
      }

      // Constellations around the cursor (mouse only)
      if (animate && finePointer && mouse.active) {
        const near: Star[] = [];
        for (const s of stars) {
          if (Math.hypot(s.sx - mouse.x, s.sy - mouse.y) < CURSOR_RADIUS) near.push(s);
          if (near.length >= 24) break;
        }
        ctx!.lineWidth = 0.7;
        ctx!.strokeStyle = "rgb(120,170,255)";
        for (let i = 0; i < near.length; i++) {
          const a = near[i];
          const da = Math.hypot(a.sx - mouse.x, a.sy - mouse.y);
          ctx!.globalAlpha = (1 - da / CURSOR_RADIUS) * 0.3;
          ctx!.beginPath();
          ctx!.moveTo(mouse.x, mouse.y);
          ctx!.lineTo(a.sx, a.sy);
          ctx!.stroke();
          for (let j = i + 1; j < near.length; j++) {
            const b = near[j];
            const d = Math.hypot(a.sx - b.sx, a.sy - b.sy);
            if (d < LINK_DIST) {
              ctx!.globalAlpha = (1 - d / LINK_DIST) * 0.35;
              ctx!.beginPath();
              ctx!.moveTo(a.sx, a.sy);
              ctx!.lineTo(b.sx, b.sy);
              ctx!.stroke();
            }
          }
        }
      }

      // Shooting stars
      if (animate) {
        for (const sh of shooters) {
          const fade = Math.sin((Math.PI * sh.life) / sh.max);
          const tx = sh.x - sh.vx * 0.13;
          const ty = sh.y - sh.vy * 0.13;
          const g = ctx!.createLinearGradient(sh.x, sh.y, tx, ty);
          g.addColorStop(0, "rgba(255,255,255,1)");
          g.addColorStop(1, "rgba(160,190,255,0)");
          ctx!.globalAlpha = Math.max(0, fade);
          ctx!.strokeStyle = g;
          ctx!.lineWidth = 1.4;
          ctx!.beginPath();
          ctx!.moveTo(sh.x, sh.y);
          ctx!.lineTo(tx, ty);
          ctx!.stroke();
        }
      }

      ctx!.globalAlpha = 1;
    }

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;

      const sy = window.scrollY;
      const dScroll = sy - lastScroll;
      lastScroll = sy;
      if (dScroll !== 0) scrollDir = dScroll > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(dScroll), 80) - boost) * 0.12;

      parallax.x += (parallax.tx - parallax.x) * 0.05;
      parallax.y += (parallax.ty - parallax.y) * 0.05;

      step(dt, dScroll);

      nextShooterIn -= dt;
      if (nextShooterIn <= 0 && shooters.length === 0) {
        shooters.push({
          x: w * (0.35 + Math.random() * 0.65),
          y: Math.random() * h * 0.35,
          vx: -(520 + Math.random() * 200),
          vy: 260 + Math.random() * 120,
          life: 0,
          max: 0.9 + Math.random() * 0.4,
        });
        nextShooterIn = 7 + Math.random() * 9;
      }
      for (const sh of shooters) {
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        sh.life += dt;
      }
      shooters = shooters.filter((sh) => sh.life < sh.max);

      paint(now / 1000, true);
      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      parallax.tx = -(e.clientX / w - 0.5) * 2;
      parallax.ty = -(e.clientY / h - 0.5) * 2;
    }

    function onLeave() {
      mouse.active = false;
      parallax.tx = 0;
      parallax.ty = 0;
    }

    function onVisibility() {
      if (reduceMotion) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        last = performance.now();
        lastScroll = window.scrollY;
        raf = requestAnimationFrame(frame);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Nebula glows — drift animation comes from .orb-a / .orb-b in globals.css */}
      <div className="orb-a absolute -top-1/4 -left-1/4 size-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(76,141,255,0.16),transparent_65%)]" />
      <div className="orb-b absolute top-1/3 -right-1/4 size-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(139,108,255,0.14),transparent_65%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}