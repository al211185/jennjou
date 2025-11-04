// src/components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, MouseEvent } from "react";

const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const shellRef = useRef<HTMLDivElement>(null);

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

  return (
    <nav className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-5xl px-6 py-3">
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
          {/* Distorsión fuerte localizada (más “refraction”) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              WebkitBackdropFilter: "blur(36px) saturate(180%) contrast(120%)",
              backdropFilter: "blur(36px) saturate(180%) contrast(120%)",
              maskImage:
                "radial-gradient(260px 200px at var(--glass-x,50%) var(--glass-y,50%), #000 42%, transparent 75%)",
            }}
          />

          {/* Distorsión suave amplia (para ver más el fondo) */}
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

          {/* Highlight líquido (lucecita) */}
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

          {/* Brillo “sheen” sutil */}
          <span
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-2xl opacity-60
              before:absolute before:inset-[-30%]
              before:content-['']
              before:[background:conic-gradient(from_180deg,rgba(255,255,255,0.24)_0deg,transparent_120deg,rgba(255,255,255,0.24)_240deg)]
              before:animate-[spin_18s_linear_infinite]
              [mask-image:radial-gradient(420px_300px_at_var(--glass-x,_50%)_var(--glass-y,_50%),#000_35%,transparent_85%)]
              [mix-blend-mode:soft-light]
            "
          />

          {/* Grano más tenue (para no tapar el fondo) */}
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
              className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-black/80 dark:text-white/80"
            >
              <Image
                src="/images/logo.png"
                alt="Logo Jennjou"
                width={40}
                height={40}
                priority
              />
              Jennjou
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-black dark:hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Borde interno sutil */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          />
        </div>
      </div>
    </nav>
  );
}
