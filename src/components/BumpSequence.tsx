"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const IMAGE_COUNT = 9;
const INTERVAL_MS = 100;
const IMAGES = Array.from(
  { length: IMAGE_COUNT },
  (_, index) => `/images/${index + 1}.png`
);

type HeroToneStyle = React.CSSProperties & {
  "--hero-swatch": string;
};

function clamp(value: number, min = 0, max = 255) {
  return Math.min(Math.max(value, min), max);
}

function neutralizeColorChannel(channel: number) {
  const neutral = 205;
  const mixRatio = 0.42;
  return clamp(Math.round(channel * (1 - mixRatio) + neutral * mixRatio));
}

export default function BumpSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [heroSwatch, setHeroSwatch] = useState("204, 204, 204");
  const sectionRef = useRef<HTMLElement | null>(null);
  const isPlaying = isInView && !userPaused;
  const activeImage = IMAGES[activeIndex];
  const isPaused = !isPlaying;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      {
        threshold: 0.3,
        rootMargin: "120px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % IMAGES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isPlaying]);

  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.decoding = "async";
    image.src = activeImage;

    image.onload = () => {
      if (cancelled) {
        return;
      }

      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = 24;
      sampleCanvas.height = 24;
      const context = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        return;
      }

      context.drawImage(image, 0, 0, sampleCanvas.width, sampleCanvas.height);
      const pixels = context.getImageData(
        0,
        0,
        sampleCanvas.width,
        sampleCanvas.height
      ).data;

      let r = 0;
      let g = 0;
      let b = 0;
      let visiblePixels = 0;

      for (let index = 0; index < pixels.length; index += 4) {
        const alpha = pixels[index + 3] / 255;
        if (alpha <= 0.05) {
          continue;
        }

        r += pixels[index] * alpha;
        g += pixels[index + 1] * alpha;
        b += pixels[index + 2] * alpha;
        visiblePixels += alpha;
      }

      if (visiblePixels <= 0) {
        return;
      }

      const averageR = neutralizeColorChannel(r / visiblePixels);
      const averageG = neutralizeColorChannel(g / visiblePixels);
      const averageB = neutralizeColorChannel(b / visiblePixels);

      setHeroSwatch(`${averageR}, ${averageG}, ${averageB}`);
    };

    image.onerror = () => {
      if (!cancelled) {
        setHeroSwatch("204, 204, 204");
      }
    };

    return () => {
      cancelled = true;
    };
  }, [activeImage]);

  const heroToneStyle: HeroToneStyle = {
    "--hero-swatch": heroSwatch,
  };

  return (
    <section
      ref={sectionRef}
      data-fullpage-section
      data-tone="hero"
      aria-label="Secuencia de imágenes destacadas"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden border-y border-black px-4 py-12 sm:min-h-screen"
      style={heroToneStyle}
    >
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.46), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="section-shell reveal-up relative mx-auto w-full max-w-6xl p-4 sm:p-5">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-black/35 shadow-2xl sm:aspect-[16/9] lg:aspect-[16/5.5]">
          <Image
            key={activeImage}
            src={activeImage}
            alt={`Composición ${activeIndex + 1}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 60vw"
            className="object-cover"
            priority={activeIndex === 0}
          />
          <div className="pointer-events-none absolute inset-0" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
            <button
              type="button"
              onClick={() => setUserPaused((previous) => !previous)}
              className="btn-secondary pointer-events-auto inline-flex items-center gap-2 px-5 py-2 text-sm"
              aria-pressed={isPaused}
              aria-label={isPlaying ? "Pausar secuencia" : "Reproducir secuencia"}
              title={isPlaying ? "Pausar secuencia" : "Reproducir secuencia"}
            >
              <span className="inline-flex h-2 w-2 items-center justify-center">
                {isPlaying ? (
                  <span className="grid h-2 w-2 grid-cols-2 gap-[2px]">
                    <span className="block h-full w-full bg-current" />
                    <span className="block h-full w-full bg-current" />
                  </span>
                ) : (
                  <span className="block h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-current" />
                )}
              </span>
              {isPlaying ? "Pausar" : "Reproducir"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
