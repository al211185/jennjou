"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const IMAGE_COUNT = 9;
const INTERVAL_MS = 500;

export default function BumpSequence() {
  const images = useMemo(
    () => Array.from({ length: IMAGE_COUNT }, (_, index) => `/images/${index + 1}.png`),
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const tick = () => {
      setActiveIndex((previous) => (previous + 1) % images.length);
    };

    const intervalId = window.setInterval(tick, INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [images.length]);

  return (
    <section
      aria-label="Secuencia de imágenes destacadas"
      className="relative mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center overflow-hidden rounded-3xl border border-black bg-gradient-to-br from-fuchsia-100 via-white to-cyan-100 px-6 py-16 shadow-[0_35px_120px_-80px_rgba(0,0,0,0.55)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65),_transparent_65%)]" aria-hidden />
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Moodboard en movimiento</p>
        <h2 className="text-3xl font-bold sm:text-5xl">
          Hyperpop visual en constante mutación
        </h2>
        <p className="max-w-2xl text-base text-gray-700 sm:text-lg">
          Una cadencia de flashes visuales que anticipan la vibra del estudio: cada medio segundo aparece una nueva pieza del universo Jennjou.
        </p>
        <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl backdrop-blur">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Composición ${index + 1}`}
              fill
              sizes="(max-width: 768px) 90vw, 640px"
              className={`rounded-xl object-cover transition-opacity duration-300 ease-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
