"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import type React from "react";

const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mi" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contacto", label: "Contacto" },
];

type GlassStyle = React.CSSProperties & {
  "--glass-x": string;
  "--glass-y": string;
  "--glass-v": string;
};

const TUNE = {
  scale: -46,
  outBlur: 1.45,
  sat: 1.03,
  bright: 1.05,
  contrast: 1.12,
  radius: 52,
  pointerLerp: 0.16,
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const links = isHome
    ? navigation
    : navigation.map((item) => ({ ...item, href: `/${item.href}` }));

  const shellRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement | null>(null);
  const feTurbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const feDisplacementRef = useRef<SVGFEDisplacementMapElement | null>(null);

  const pointerRafRef = useRef<number | null>(null);
  const pointerTargetRef = useRef({ x: 50, y: 50 });
  const pointerCurrentRef = useRef({ x: 50, y: 50 });
  const pointerVelocityRef = useRef(0);

  const [isScrolled, setIsScrolled] = useState<boolean>(() => !isHome);
  const [scrollProgress, setScrollProgress] = useState<number>(() =>
    isHome ? 0 : 1
  );
  const [isBackgroundLight, setIsBackgroundLight] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiquidEnabled, setIsLiquidEnabled] = useState(false);

  const shellStyle: GlassStyle = {
    backdropFilter: isLiquidEnabled
      ? `url(#nav-displace) saturate(${TUNE.sat}) brightness(${TUNE.bright}) contrast(${TUNE.contrast})`
      : "blur(20px) saturate(120%) brightness(1.03)",
    WebkitBackdropFilter: isLiquidEnabled
      ? `url(#nav-displace) saturate(${TUNE.sat}) brightness(${TUNE.bright}) contrast(${TUNE.contrast})`
      : "blur(20px) saturate(120%) brightness(1.03)",
    "--glass-x": "50%",
    "--glass-y": "50%",
    "--glass-v": "0",
    willChange: isLiquidEnabled ? "backdrop-filter, transform" : "transform",
    transform: "translateZ(0)",
  };

  const animatePointer = () => {
    const el = shellRef.current;
    if (!el) {
      pointerRafRef.current = null;
      return;
    }

    const current = pointerCurrentRef.current;
    const target = pointerTargetRef.current;
    const nextX = current.x + (target.x - current.x) * TUNE.pointerLerp;
    const nextY = current.y + (target.y - current.y) * TUNE.pointerLerp;

    pointerCurrentRef.current = { x: nextX, y: nextY };
    pointerVelocityRef.current *= 0.9;

    el.style.setProperty("--glass-x", `${nextX.toFixed(2)}%`);
    el.style.setProperty("--glass-y", `${nextY.toFixed(2)}%`);
    el.style.setProperty(
      "--glass-v",
      Math.min(1, pointerVelocityRef.current).toFixed(3)
    );

    const closeToTarget =
      Math.abs(target.x - nextX) < 0.06 && Math.abs(target.y - nextY) < 0.06;
    if (closeToTarget && pointerVelocityRef.current < 0.02) {
      pointerRafRef.current = null;
      return;
    }

    pointerRafRef.current = requestAnimationFrame(animatePointer);
  };

  const schedulePointerAnimation = () => {
    if (pointerRafRef.current !== null) {
      return;
    }
    pointerRafRef.current = requestAnimationFrame(animatePointer);
  };

  const setPointerTarget = (x: number, y: number) => {
    const current = pointerCurrentRef.current;
    const velocity = Math.min(1, Math.hypot(x - current.x, y - current.y) / 16);
    pointerVelocityRef.current = Math.max(pointerVelocityRef.current, velocity);
    pointerTargetRef.current = { x, y };
    schedulePointerAnimation();
  };

  const handlePointer = (e: MouseEvent<HTMLDivElement>) => {
    if (!isLiquidEnabled) return;

    const el = shellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointerTarget(x, y);
  };

  const handlePointerLeave = () => {
    if (!isLiquidEnabled) return;

    pointerVelocityRef.current = Math.max(pointerVelocityRef.current, 0.08);
    setPointerTarget(50, 50);
  };

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.style.setProperty("--glass-x", "50%");
    el.style.setProperty("--glass-y", "50%");
    el.style.setProperty("--glass-v", "0");

    return () => {
      if (pointerRafRef.current !== null) {
        cancelAnimationFrame(pointerRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isLiquidEnabled || pointerRafRef.current === null) return;
    cancelAnimationFrame(pointerRafRef.current);
    pointerRafRef.current = null;
  }, [isLiquidEnabled]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    const update = () => {
      setIsLiquidEnabled(!reduceMotion.matches && finePointer.matches);
    };

    update();
    reduceMotion.addEventListener("change", update);
    finePointer.addEventListener("change", update);
    return () => {
      reduceMotion.removeEventListener("change", update);
      finePointer.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      setScrollProgress(1);
      setIsScrolled(true);
      return;
    }

    const threshold = 80;
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / threshold));
      setScrollProgress(p);
      setIsScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setIsBackgroundLight(true);
      return;
    }

    const parseColor = (input: string) => {
      const m = input.match(
        /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/
      );
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

      const nw =
        media instanceof HTMLImageElement ? media.naturalWidth : media.videoWidth;
      const nh =
        media instanceof HTMLImageElement ? media.naturalHeight : media.videoHeight;
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
      const stack = document.elementsFromPoint
        ? document.elementsFromPoint(x, y)
        : [];
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
  }, [isHome]);

  useEffect(() => {
    if (!isLiquidEnabled) return;

    const shell = shellRef.current;
    if (!shell || !feImageRef.current) return;

    const buildMap = (w: number, h: number, radius: number) => {
      const pad = Math.min(w, h) * 0.09;
      const innerW = Math.max(1, w - pad * 2);
      const innerH = Math.max(1, h - pad * 2);
      const lensR = Math.max(72, Math.min(w, h) * 0.42);

      const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="xMap" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="rgb(20,0,0)"/>
      <stop offset="100%" stop-color="rgb(236,0,0)"/>
    </linearGradient>
    <linearGradient id="yMap" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgb(0,24,0)"/>
      <stop offset="100%" stop-color="rgb(0,234,0)"/>
    </linearGradient>
    <radialGradient id="lensCore" cx="50%" cy="50%" r="64%">
      <stop offset="0%" stop-color="rgba(146,146,146,0.96)"/>
      <stop offset="60%" stop-color="rgba(132,132,132,0.72)"/>
      <stop offset="100%" stop-color="rgba(124,124,124,0.02)"/>
    </radialGradient>
    <radialGradient id="microWarp" cx="50%" cy="45%" r="76%">
      <stop offset="12%" stop-color="rgba(255,0,0,0.2)"/>
      <stop offset="50%" stop-color="rgba(0,255,0,0.15)"/>
      <stop offset="100%" stop-color="rgba(128,128,128,0)"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="rgb(128,128,128)"/>
  <rect width="${w}" height="${h}" rx="${radius}" fill="url(#xMap)" opacity="0.92"/>
  <rect width="${w}" height="${h}" rx="${radius}" fill="url(#yMap)" opacity="0.9" style="mix-blend-mode:screen"/>
  <circle cx="${w / 2}" cy="${h / 2}" r="${lensR}" fill="url(#lensCore)"/>
  <rect width="${w}" height="${h}" rx="${radius}" fill="url(#microWarp)" opacity="0.56"/>
  <rect x="${pad}" y="${pad}" width="${innerW}" height="${innerH}" rx="${radius}" fill="rgba(128,128,128,0.1)"/>
</svg>`;

      feImageRef.current?.setAttribute(
        "href",
        `data:image/svg+xml,${encodeURIComponent(svg)}`
      );
    };

    let resizeRaf: number | null = null;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() =>
          buildMap(
            Math.max(1, Math.floor(cr.width)),
            Math.max(1, Math.floor(cr.height)),
            TUNE.radius
          )
        );
      }
    });
    ro.observe(shell);

    const rect = shell.getBoundingClientRect();
    buildMap(
      Math.max(1, Math.floor(rect.width)),
      Math.max(1, Math.floor(rect.height)),
      TUNE.radius
    );

    return () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      ro.disconnect();
    };
  }, [isLiquidEnabled]);

  useEffect(() => {
    if (!isLiquidEnabled) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let raf = 0;
    let t = Math.random() * 1000;
    const animate = () => {
      t += 0.013;

      const freqX = 0.0078 + Math.sin(t * 0.73) * 0.0018;
      const freqY = 0.029 + Math.cos(t * 0.62) * 0.0023;
      feTurbulenceRef.current?.setAttribute(
        "baseFrequency",
        `${freqX.toFixed(4)} ${freqY.toFixed(4)}`
      );

      const dynamicScale =
        TUNE.scale +
        Math.sin(t * 1.28) * 2.4 +
        Math.min(1, pointerVelocityRef.current) * 8;
      feDisplacementRef.current?.setAttribute("scale", dynamicScale.toFixed(2));

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isLiquidEnabled]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const deltaThreshold = 6;
    const hideThreshold = 120;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      if (currentY <= hideThreshold) {
        setIsNavHidden(false);
        return;
      }

      if (delta > deltaThreshold) {
        setIsNavHidden(true);
      } else if (delta < -deltaThreshold) {
        setIsNavHidden(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isNavHidden) setIsMenuOpen(false);
  }, [isNavHidden]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavLinkClick = () => setIsMenuOpen(false);

  const renderNavLink = (
    item: (typeof navigation)[number],
    className = "",
    onClick?: () => void
  ) => {
    const combinedClass = `transition hover:opacity-80 ${className}`.trim();
    const isHashLink = isHome && item.href.startsWith("#");

    if (isHashLink) {
      return (
        <a
          key={item.href}
          href={item.href}
          className={combinedClass}
          onClick={onClick}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={combinedClass}
        onClick={onClick}
      >
        {item.label}
      </Link>
    );
  };

  const heroScale = 1.3 - 0.55 * scrollProgress;
  const heroTranslateY = -35 * scrollProgress;
  const heroOpacity = 1 - scrollProgress;
  const textColorClass = isBackgroundLight ? "text-neutral-900" : "text-white";

  return (
    <>
      {isLiquidEnabled ? (
        <svg className="fixed pointer-events-none opacity-0" width="0" height="0" aria-hidden>
          <defs>
            <filter
              id="nav-displace"
              colorInterpolationFilters="sRGB"
              x="-10%"
              y="-30%"
              width="120%"
              height="200%"
            >
              <feImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                result="map"
                ref={feImageRef}
              />
              <feTurbulence
                ref={feTurbulenceRef}
                type="fractalNoise"
                baseFrequency="0.0078 0.029"
                numOctaves="2"
                seed="11"
                stitchTiles="stitch"
                result="flowNoise"
              />
              <feGaussianBlur in="flowNoise" stdDeviation="0.42" result="noiseSoft" />
              <feComposite
                in="noiseSoft"
                in2="map"
                operator="arithmetic"
                k1="0"
                k2="0.18"
                k3="0.82"
                k4="0"
                result="mapMix"
              />
              <feGaussianBlur in="mapMix" stdDeviation="0.34" result="mapSoft" />
              <feDisplacementMap
                ref={feDisplacementRef}
                in="SourceGraphic"
                in2="mapSoft"
                xChannelSelector="R"
                yChannelSelector="G"
                scale={TUNE.scale}
                result="disp"
              />
              <feColorMatrix in="disp" type="saturate" values="0.76" result="desat" />
              <feComponentTransfer in="desat" result="curve">
                <feFuncR type="gamma" amplitude="1" exponent="0.91" offset="0" />
                <feFuncG type="gamma" amplitude="1" exponent="0.91" offset="0" />
                <feFuncB type="gamma" amplitude="1" exponent="0.91" offset="0" />
              </feComponentTransfer>
              <feGaussianBlur in="curve" stdDeviation={TUNE.outBlur} />
            </filter>
          </defs>
        </svg>
      ) : null}

      {isHome && (
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
            src="/images/logo-optimized.png"
            alt="Logo Jennjou"
            width={420}
            height={420}
            priority
            className="h-auto w-[220px] sm:w-[320px] md:w-[380px] lg:w-[420px]"
          />
        </div>
      )}

      <nav
        className={`fixed top-0 z-50 w-full transform-gpu transition-transform duration-300 ease-out ${
          isNavHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="px-6 py-3 lg:px-12">
          <div
            ref={shellRef}
            data-glass="nav"
            onMouseMove={handlePointer}
            onMouseLeave={handlePointerLeave}
            className="
              relative isolate w-full rounded-2xl border border-white/25
              bg-white/36
              backdrop-blur-2xl backdrop-saturate-125 backdrop-brightness-110
              supports-[backdrop-filter]:bg-white/22
              shadow-[inset_0_1px_0_rgba(255,255,255,0.52),0_14px_36px_-14px_rgba(2,6,23,0.36)]
              ring-1 ring-white/18 transition-colors
            "
            style={shellStyle}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                WebkitBackdropFilter: "blur(30px) saturate(178%) contrast(116%)",
                backdropFilter: "blur(30px) saturate(178%) contrast(116%)",
                maskImage:
                  "radial-gradient(240px 180px at var(--glass-x,50%) var(--glass-y,50%), #000 42%, transparent 75%)",
              }}
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                WebkitBackdropFilter: "blur(14px) saturate(138%)",
                backdropFilter: "blur(14px) saturate(138%)",
                maskImage:
                  "radial-gradient(520px 360px at var(--glass-x,50%) var(--glass-y,50%), #000 34%, transparent 90%)",
              }}
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-screen"
              style={{
                background:
                  "radial-gradient(196px 136px at calc(var(--glass-x,50%)+6%) calc(var(--glass-y,50%)-8%), rgba(255,255,255,0.62), rgba(255,255,255,0.12) 54%, transparent 72%)",
                maskImage:
                  "radial-gradient(300px 220px at var(--glass-x,50%) var(--glass-y,50%), #000 40%, transparent 78%)",
                opacity: "calc(0.42 + (var(--glass-v,0) * 0.38))",
                transition: "background .24s ease, opacity .24s ease",
              }}
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-45"
              style={{
                background:
                  "conic-gradient(from 130deg at var(--glass-x,50%) var(--glass-y,50%), rgba(255,255,255,0.36), rgba(255,255,255,0.08) 20%, rgba(0,0,0,0.14) 46%, rgba(255,255,255,0.22) 70%, rgba(0,0,0,0.07) 86%, rgba(255,255,255,0.36))",
                mixBlendMode: "soft-light",
              }}
            />

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

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.14) 35%, rgba(0,0,0,0.09) 75%, rgba(0,0,0,0.18) 100%)",
                maskImage:
                  "radial-gradient(100% 100% at 50% 50%, transparent 58%, #000 60%)",
                mixBlendMode: "screen",
                opacity: 0.72,
              }}
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.12] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22320%22><filter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.92%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.7%22/></svg>')",
                backgroundSize: "300px 300px",
              }}
            />

            <div className="relative z-10 flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                className={`flex items-center text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-500 ${textColorClass} ${
                  isScrolled
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-4 opacity-0"
                }`}
              >
                <Image
                  src="/images/logo-optimized.png"
                  alt="Logo Jennjou"
                  width={40}
                  height={40}
                  priority
                  className={`transition-transform duration-500 ${
                    isScrolled ? "scale-100" : "scale-0"
                  }`}
                />
                <span className="sr-only">Ir al inicio</span>
              </Link>

              <div
                className={`hidden items-center gap-6 text-sm font-medium transition-colors md:flex ${textColorClass}`}
              >
                {links.map((item) => renderNavLink(item))}
              </div>

              <button
                type="button"
                aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                className={`relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition md:hidden ${textColorClass}`}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <span className="relative block h-4 w-6">
                  <span
                    className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                      isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 opacity-0"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45"
                        : "bottom-0"
                    }`}
                  />
                </span>
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute left-4 right-4 top-full z-20 mt-3 md:hidden" id="mobile-nav">
                <div className="rounded-2xl border border-white/25 bg-white/92 p-4 text-sm font-medium text-neutral-900 shadow-2xl backdrop-blur">
                  <div className="flex flex-col gap-4">
                    {links.map((item) =>
                      renderNavLink(
                        item,
                        "block text-base font-semibold",
                        handleNavLinkClick
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.58)]"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
