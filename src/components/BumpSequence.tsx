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
    <>
      <section
        aria-label="Secuencia de imágenes destacadas"
        className="relative w-full overflow-hidden border-y border-black/5 bg-black/5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_65%)]" aria-hidden />
        <div className="relative mx-auto w-full max-w-none min-h-[35vh] aspect-[16/9] lg:aspect-[16/5.5]">
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
      <section
        aria-labelledby="hyperpop-visual"
        className="relative mx-auto mt-12 flex w-full max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-3xl border border-black bg-gradient-to-br from-fuchsia-100 via-white to-cyan-100 px-6 py-16 text-center shadow-[0_35px_120px_-80px_rgba(0,0,0,0.55)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65),_transparent_65%)]" aria-hidden />
        <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Moodboard en movimiento</p>
          <h2 id="hyperpop-visual" className="text-3xl font-bold sm:text-5xl">
            Hyperpop visual en constante mutación
          </h2>
          <p className="max-w-2xl text-base text-gray-700 sm:text-lg">
            Una cadencia de flashes visuales que anticipan la vibra del estudio: cada medio segundo aparece una nueva pieza del universo Jennjou.
          </p>
        </div>
      </section>
    </>
  );
}
