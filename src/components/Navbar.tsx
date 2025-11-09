// src/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, MouseEvent, useState } from "react";

const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const shellRef = useRef<HTMLDivElement>(null);

  // SVG filter nodes
  const filterRef = useRef<SVGFilterElement>(null);
  const feImageRef = useRef<SVGImageElement>(null);

  // Pointer throttle
  const rafRef = useRef<number | null>(null);
  const lastXYRef = useRef<{ x: number; y: number }>({ x: 50, y: 50 });

  // UI state
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBackgroundLight, setIsBackgroundLight] = useState(false);

  // Tuning (look iOS-like)
  const TUNE = {
    scale: -34,        // desplazamiento sutil
    outBlur: 0.25,     // suavizado de salida
    sat: 1.15,         // saturación del fondo atrapado
    bright: 1.02,      // brillo general
    radius: 18,        // radio del glass
  };

  // Pointer hotspot
  const handlePointer = (e: MouseEvent<HTMLDivElement>) => {
    const el = shellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (Math.abs(x - lastXYRef.current.x) < 0.5 && Math.abs(y - lastXYRef.current.y) < 0.5) return;
    lastXYRef.current = { x, y };

    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--glass-x", `${x}%`);
      el.style.setProperty("--glass-y", `${y}%`);
    });
  };

  // Init hotspot
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.style.setProperty("--glass-x", "50%");
    el.style.setProperty("--glass-y", "50%");
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll state
  useEffect(() => {
    const threshold = 80;
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / threshold));
      setScrollProgress(p);
      setIsScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Background luminance sampler (para elegir color de texto)
  useEffect(() => {
    const parseColor = (input: string) => {
      const m = input.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/);
      if (!m) return null;
      const [, r, g, b, a] = m;
      return { r: +r, g: +g, b: +b, a: a === undefined ? 1 : +a };
    };
    const getOpaqueBg = (el: Element): [number, number, number] | null => {
      const color = window.getComputedStyle(el).backgroundColor;
      if (!color || color === "transparent") return null;
      const p = parseColor(color);
      if (!p || p.a <= 0.01) return null;
      return [p.r, p.g, p.b];
    };
    const sampler = document.createElement("canvas");
    sampler.width = 1;
    sampler.height = 1;
    const ctx = sampler.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const sampleMedia = (
      media: HTMLImageElement | HTMLVideoElement,
      x: number,
      y: number
    ): [number, number, number] | null => {
      const rect = media.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      const xr = (x - rect.left) / rect.width;
      const yr = (y - rect.top) / rect.height;
      if (xr < 0 || xr > 1 || yr < 0 || yr > 1) return null;
      const nw = media instanceof HTMLImageElement ? media.naturalWidth : media.videoWidth;
      const nh = media instanceof HTMLImageElement ? media.naturalHeight : media.videoHeight;
      if (!nw || !nh) return null;
      const sx = Math.floor(xr * nw);
      const sy = Math.floor(yr * nh);
      try {
        ctx.clearRect(0, 0, 1, 1);
        ctx.drawImage(media, sx, sy, 1, 1, 0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2]];
      } catch {
        return null;
      }
    };

    const evaluate = () => {
      const shell = shellRef.current;
      if (!shell) return;
      const rect = shell.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const prev = shell.style.pointerEvents;
      shell.style.pointerEvents = "none";
      const stack = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [];
      shell.style.pointerEvents = prev;

      let rgb: [number, number, number] | null = null;
      for (const el of stack) {
        rgb = getOpaqueBg(el);
        if (rgb) break;
        if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) {
          rgb = sampleMedia(el, x, y);
          if (rgb) break;
        }
      }
      const [r, g, b] = rgb ?? [255, 255, 255];
      const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      setIsBackgroundLight(brightness >= 0.6);
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    document.addEventListener("load", schedule, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      document.removeEventListener("load", schedule, true);
    };
  }, []);

  // Build displacement map to shell size
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !feImageRef.current) return;

    const build = (w: number, h: number, radius: number) => {
      const pad = Math.min(w, h) * 0.07;
      const innerW = Math.max(1, w - pad * 2);
      const innerH = Math.max(1, h - pad * 2);

      // Mapa con gradiente R/G + falloff, borde feather y leve “normal” de ruido
      const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="rgrad" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#000"/>
      <stop offset="100%" stop-color="rgb(255,0,0)"/>
    </linearGradient>
    <linearGradient id="ggrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000"/>
      <stop offset="100%" stop-color="rgb(0,255,0)"/>
    </linearGradient>
    <radialGradient id="fall" cx="50%" cy="50%" r="70%">
      <stop offset="60%" stop-color="rgba(128,128,128,0.9)"/>
      <stop offset="100%" stop-color="rgba(128,128,128,0)"/>
    </radialGradient>
    <filter id="edgeFeather" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.6"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="black"/>
  <rect width="${w}" height="${h}" rx="${radius}" fill="url(#rgrad)"/>
  <rect width="${w}" height="${h}" rx="${radius}" fill="url(#ggrad)" style="mix-blend-mode:screen"/>
  <g filter="url(#edgeFeather)">
    <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${radius}"
      fill="none" stroke="rgba(128,128,128,0.55)" stroke-width="1.5"/>
  </g>
  <rect x="${pad}" y="${pad}" width="${innerW}" height="${innerH}"
        rx="${radius}" fill="url(#fall)"/>
</svg>`;
      feImageRef.current!.setAttribute("href", `data:image/svg+xml,${encodeURIComponent(svg)}`);
    };

    let t: number | null = null;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cr = e.contentRect;
        if (t) cancelAnimationFrame(t);
        t = requestAnimationFrame(() =>
          build(Math.max(1, Math.floor(cr.width)), Math.max(1, Math.floor(cr.height)), TUNE.radius)
        );
      }
    });
    ro.observe(shell);

    const r = shell.getBoundingClientRect();
    build(Math.max(1, Math.floor(r.width)), Math.max(1, Math.floor(r.height)), TUNE.radius);

    return () => ro.disconnect();
  }, []);

  // Hero logo interp
  const heroScale = 1.3 - 0.55 * scrollProgress;
  const heroTranslateY = -35 * scrollProgress;
  const heroOpacity = 1 - scrollProgress;
  const textColorClass = isBackgroundLight ? "text-neutral-900" : "text-white";

  return (
    <>
      {/* SVG filter: single displacement (sin fringing) */}
      <svg className="fixed pointer-events-none opacity-0" width="0" height="0" aria-hidden>
        <defs>
          <filter
            id="nav-displace"
            colorInterpolationFilters="sRGB"
            ref={filterRef}
            x="-10%" y="-30%" width="120%" height="200%"
          >
            <feImage x="0" y="0" width="100%" height="100%" result="map" ref={feImageRef as any} />
            <feGaussianBlur in="map" stdDeviation="0.5" result="mapSoft"/>
            <feDisplacementMap
              in="SourceGraphic"
              in2="mapSoft"
              xChannelSelector="R"
              yChannelSelector="G"
              scale={TUNE.scale}
              result="disp"
            />
            {/* desaturación + leve contraste para “crispness” tipo iOS */}
            <feColorMatrix in="disp" type="saturate" values="0.8" result="desat"/>
            <feComponentTransfer in="desat" result="curve">
              <feFuncR type="gamma" amplitude="1" exponent="0.92" offset="0"/>
              <feFuncG type="gamma" amplitude="1" exponent="0.92" offset="0"/>
              <feFuncB type="gamma" amplitude="1" exponent="0.92" offset="0"/>
            </feComponentTransfer>
            <feGaussianBlur in="curve" stdDeviation={TUNE.outBlur}/>
          </filter>
        </defs>
      </svg>

      {/* Hero */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
        style={{
          transform: `translateY(${heroTranslateY}%) scale(${heroScale})`,
          opacity: heroOpacity,
          transition: "transform 700ms ease-out, opacity 700ms ease-out",
        }}
      >
        <Image
          src="/images/logo.png"
          alt="Logo Jennjou"
          width={420}
          height={420}
          priority
          className="h-auto w-[220px] sm:w-[320px] md:w-[380px] lg:w-[420px]"
        />
      </div>

      <nav className="fixed top-0 z-50 w-full">
        <div className="px-6 py-3 lg:px-12">
          <div
            ref={shellRef}
            data-glass="nav"
            onMouseMove={handlePointer}
            onMouseLeave={() => {
              const el = shellRef.current;
              if (!el) return;
              el.style.setProperty("--glass-x", "50%");
              el.style.setProperty("--glass-y", "50%");
            }}
            className="
              relative isolate w-full rounded-2xl border border-white/10
              bg-white/30 dark:bg-black/20
              backdrop-blur-2xl backdrop-saturate-150 backdrop-brightness-110
              supports-[backdrop-filter]:bg-white/12 supports-[backdrop-filter]:dark:bg-black/12
              shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_12px_30px_-12px_rgba(2,6,23,0.35)]
              ring-1 ring-white/10 transition-colors
            "
            style={{
              backdropFilter: `url(#nav-displace) saturate(${TUNE.sat}) brightness(${TUNE.bright})`,
              WebkitBackdropFilter: `url(#nav-displace) saturate(${TUNE.sat}) brightness(${TUNE.bright})`,
              ["--glass-x" as any]: "50%",
              ["--glass-y" as any]: "50%",
              willChange: "backdrop-filter, transform",
              transform: "translateZ(0)",
            }}
          >
            {/* Distorsión focal */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                WebkitBackdropFilter: "blur(30px) saturate(180%) contrast(115%)",
                backdropFilter: "blur(30px) saturate(180%) contrast(115%)",
                maskImage:
                  "radial-gradient(240px 180px at var(--glass-x,50%) var(--glass-y,50%), #000 42%, transparent 75%)",
              }}
            />
            {/* Distorsión amplia */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
                backdropFilter: "blur(14px) saturate(140%)",
                maskImage:
                  "radial-gradient(520px 360px at var(--glass-x,50%) var(--glass-y,50%), #000 34%, transparent 90%)",
              }}
            />

            {/* Brillo principal (specular que sigue el cursor) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-screen opacity-70"
              style={{
                background:
                  "radial-gradient(180px 120px at calc(var(--glass-x,50%)+6%) calc(var(--glass-y,50%)-8%), rgba(255,255,255,0.45), rgba(255,255,255,0.08) 55%, transparent 70%)",
                maskImage:
                  "radial-gradient(300px 220px at var(--glass-x,50%) var(--glass-y,50%), #000 40%, transparent 78%)",
                transition: "background .28s ease, opacity .28s ease",
              }}
            />

            {/* Viñeta interior sutil (profundidad) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(120% 140% at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.08) 100%)",
                mixBlendMode: "multiply",
                opacity: 0.7,
              }}
            />

            {/* Bevel/edge iOS-like */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 35%, rgba(0,0,0,0.08) 75%, rgba(0,0,0,0.16) 100%)",
                maskImage:
                  "radial-gradient(100% 100% at 50% 50%, transparent 58%, #000 60%)",
                mixBlendMode: "screen",
                opacity: 0.7,
              }}
            />

            {/* Sheen lateral (bisel en borde sup/izq) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "conic-gradient(from 210deg at 12% 0%, rgba(255,255,255,0.35), rgba(255,255,255,0) 20%)",
                maskImage:
                  "radial-gradient(80% 120% at 8% 0%, #000 0%, transparent 60%), linear-gradient(#000,#000)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                mixBlendMode: "screen",
                opacity: 0.5,
              }}
            />

            {/* Grano fino */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-10 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22><filter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.7%22/></svg>')",
                backgroundSize: "280px 280px",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-500 ${textColorClass} ${
                  isScrolled ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
                }`}
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo Jennjou"
                  width={40}
                  height={40}
                  priority
                  className={`transition-transform duration-500 ${isScrolled ? "scale-100" : "scale-0"}`}
                />
                <span>Jennjou</span>
              </Link>

              <div className={`flex items-center gap-6 text-sm font-medium transition-colors ${textColorClass}`}>
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:opacity-80">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Inner stroke */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
