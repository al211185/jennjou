"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const IMAGE_COUNT = 9;
const INTERVAL_MS = 100;

export default function BumpSequence() {
  const images = useMemo(
    () => Array.from({ length: IMAGE_COUNT }, (_, index) => `/images/${index + 1}.png`),
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const tick = () => {
      setActiveIndex((previous) => (previous + 1) % images.length);
    };

    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(tick, INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [images.length, isPlaying]);

  const activeImage = images[activeIndex];
  const isPaused = !isPlaying;


  return (
    <section
      data-fullpage-section
      aria-label="Secuencia de imágenes destacadas"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden border-y border-black bg-black/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_65%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl aspect-[16/9] lg:aspect-[16/5.5]">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`Composición ${activeIndex + 1}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
          <button
            type="button"
            onClick={() => setIsPlaying((previous) => !previous)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-black/70 px-5 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-black/80"
            aria-pressed={isPaused}
            aria-label={isPlaying ? "Pausar secuencia" : "Reproducir secuencia"}
            title={isPlaying ? "Pausar secuencia" : "Reproducir secuencia"}
          >
            <span className="inline-flex h-2 w-2 items-center justify-center">
              {isPlaying ? (
                <span className="grid h-2 w-2 grid-cols-2 gap-[2px]">
                  <span className="block h-full w-full bg-white" />
                  <span className="block h-full w-full bg-white" />
                </span>
              ) : (
                <span className="block h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white" />
              )}
            </span>
            {isPlaying ? "Pausar" : "Reproducir"}
          </button>
        </div>
      </div>
    </section>
  );
}
