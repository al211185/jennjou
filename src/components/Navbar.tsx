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
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = top, 1 = umbral
  const [isBackgroundLight, setIsBackgroundLight] = useState(false);

  const handlePointer = (e: MouseEvent<HTMLDivElement>) => {
    const el = shellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--glass-x", `${x}%`);
    el.style.setProperty("--glass-y", `${y}%`);
  };

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.style.setProperty("--glass-x", "50%");
    el.style.setProperty("--glass-y", "50%");
  }, []);

  useEffect(() => {
    const threshold = 80; // px
    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / threshold));
      setScrollProgress(p);
      setIsScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const parseColor = (input: string) => {
      const match = input.match(
        /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/
      );
      if (!match) return null;
      const [, r, g, b, a] = match;
      return {
        r: Number(r),
        g: Number(g),
        b: Number(b),
        a: a === undefined ? 1 : Number(a),
      };
    };

    const getBackgroundRGB = (element: Element | null): [number, number, number] | null => {
      if (!element) return null;
      const color = window.getComputedStyle(element).backgroundColor;
      if (color && color !== "transparent") {
        const parsed = parseColor(color);
        if (parsed && parsed.a > 0.01) {
          return [parsed.r, parsed.g, parsed.b];
        }
      }
      return getBackgroundRGB(element.parentElement);
    };

    const evaluateBackground = () => {
      const shell = shellRef.current;
      if (!shell) return;

      const rect = shell.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const previousPointerEvents = shell.style.pointerEvents;
      shell.style.pointerEvents = "none";
      const target = document.elementFromPoint(x, y);
      shell.style.pointerEvents = previousPointerEvents;

      const rgb = getBackgroundRGB(target) ?? [255, 255, 255];
      const [r, g, b] = rgb;
      const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      setIsBackgroundLight(brightness >= 0.6);
    };

    let frame = 0;
    const scheduleEvaluation = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(evaluateBackground);
    };

    evaluateBackground();
    window.addEventListener("scroll", scheduleEvaluation, { passive: true });
    window.addEventListener("resize", scheduleEvaluation);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleEvaluation);
      window.removeEventListener("resize", scheduleEvaluation);
    };
  }, []);

  // Interpolaciones para el logo central
  // scale: 1.30 -> 0.75, translateY: 0% -> -35%, opacity: 1 -> 0
  const heroScale = 1.3 - 0.55 * scrollProgress;
  const heroTranslateY = -35 * scrollProgress;
  const heroOpacity = 1 - scrollProgress;
  const textColorClass = isBackgroundLight ? "text-neutral-900" : "text-white";

  return (
    <>

      {/* Logo central “hero” más grande arriba, se encoge con scroll */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
        style={{
          transform: `translateY(${heroTranslateY}%) scale(${heroScale})`,
          opacity: heroOpacity,
          transition: "transform 700ms ease-out, opacity 700ms ease-out",
        }}
      >
        {/* Quité el <p> Jennjou Studio */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt="Logo Jennjou"
            width={420}
            height={420}
            priority
            className="h-auto w-[220px] sm:w-[320px] md:w-[380px] lg:w-[420px]"
          />
        </div>
      </div>

      <nav className="fixed top-0 z-50 w-full">
        <div className="px-6 py-3 lg:px-12">
          <div
            ref={shellRef}
            onMouseMove={handlePointer}
            onMouseLeave={() => {
              const el = shellRef.current;
              if (!el) return;
              el.style.setProperty("--glass-x", "50%");
              el.style.setProperty("--glass-y", "50%");
            }}
            className="
              relative isolate
              w-full
              rounded-2xl
              border border-white/20
              bg-white/25 dark:bg-black/15
              backdrop-blur-2xl backdrop-saturate-150 backdrop-brightness-110
              supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-black/10
              shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_30px_-12px_rgba(2,6,23,0.35)]
              ring-1 ring-white/10
              transition-colors
            "
          >
            {/* Distorsión fuerte localizada */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                WebkitBackdropFilter:
                  "blur(36px) saturate(180%) contrast(120%)",
                backdropFilter: "blur(36px) saturate(180%) contrast(120%)",
                maskImage:
                  "radial-gradient(260px 200px at var(--glass-x,50%) var(--glass-y,50%), #000 42%, transparent 75%)",
              }}
            />
            {/* Distorsión suave amplia */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
                backdropFilter: "blur(14px) saturate(140%)",
                maskImage:
                  "radial-gradient(520px 380px at var(--glass-x,50%) var(--glass-y,50%), #000 32%, transparent 90%)",
              }}
            />
            {/* Highlight líquido */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-0 rounded-2xl
                [background:
                  radial-gradient(220px_160px_at_var(--glass-x,_50%)_var(--glass-y,_50%),
                    rgba(255,255,255,0.28), rgba(255,255,255,0.08) 45%, transparent 70%),
                  radial-gradient(120px_90px_at_calc(var(--glass-x,50%)_+_20%)_calc(var(--glass-y,50%)_+_10%),
                    rgba(255,255,255,0.18), transparent 70%)
                ]
                [mask-image:radial-gradient(320px_240px_at_var(--glass-x,_50%)_var(--glass-y,_50%),#000_35%,transparent_75%)]
                [mix-blend-mode:overlay]
                transition-[background,opacity]
                duration-300
                will-change:transform
              "
            />
            {/* Sheen */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-0 rounded-2xl opacity-60
                before:absolute before:inset-[-30%]
                before:content-['']
                before:[background:conic-gradient(from_180deg,rgba(255,255,255,0.24)_0deg,transparent_120deg,rgba(255,255,255,0.24)_240deg)]

                [mask-image:radial-gradient(420px_300px_at_var(--glass-x,_50%)_var(--glass-y,_50%),#000_35%,transparent_85%)]
                [mix-blend-mode:soft-light]
              "
            />
            {/* Grano */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-0 rounded-2xl opacity-12
                [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><filter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.8%22/></svg>')]
                [background-size:300px_300px]
                [mix-blend-mode:overlay]
              "
            />

            {/* Contenido */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-500 ${textColorClass} ${isScrolled
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-4 opacity-0"
                  }`}
              >
                <Image
                  src="/images/logo.png"
                  alt="Logo Jennjou"
                  width={40}
                  height={40}
                  priority
                  className={`transition-transform duration-500 ${isScrolled ? "scale-100" : "scale-0"
                    }`}
                />
                <span>Jennjou</span>
              </Link>

              <div
                className={`flex items-center gap-6 text-sm font-medium transition-colors ${textColorClass}`}
              >
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:opacity-80"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Borde interno */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
