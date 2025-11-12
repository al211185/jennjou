// src/components/HorizontalCarousel.tsx
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import useEmblaCarousel, {
  type EmblaCarouselType,
} from "embla-carousel-react";

interface Props {
  children: ReactNode[];
  ariaLabel?: string;
}

export default function HorizontalCarousel({ children, ariaLabel }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: children.length > 1,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateNavigationState = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateNavigationState(emblaApi);
    emblaApi.on("select", updateNavigationState);
    emblaApi.on("reInit", updateNavigationState);

    return () => {
      emblaApi.off("select", updateNavigationState);
      emblaApi.off("reInit", updateNavigationState);
    };
  }, [emblaApi, updateNavigationState]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const snapDisplay = useMemo(() => {
    if (snapCount === 0) return "-";
    return `${selectedIndex + 1} / ${snapCount}`;
  }, [selectedIndex, snapCount]);

  const canScroll = snapCount > 1;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <div className="overflow-hidden" ref={emblaRef} aria-label={ariaLabel}>
        <div className="flex gap-6 px-6 pb-4">
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-[0_0_86vw] shrink-0 sm:flex-[0_0_420px] lg:flex-[0_0_520px]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none mt-4 flex items-center justify-between px-4 text-sm text-foreground/70 sm:px-6">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScroll}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 text-base transition hover:bg-foreground/10 disabled:opacity-40"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                fill="currentColor"
                d="M15.41 16.59a1 1 0 0 1-1.41 0L9.29 12l4.71-4.59a1 1 0 1 1 1.41 1.42L12.41 12l3 3.17a1 1 0 0 1 0 1.42Z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScroll}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 text-base transition hover:bg-foreground/10 disabled:opacity-40"
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                fill="currentColor"
                d="M8.59 7.41a1 1 0 0 1 1.41 0L14.71 12l-4.71 4.59a1 1 0 1 1-1.41-1.42L11.59 12l-3-3.17a1 1 0 0 1 0-1.42Z"
              />
            </svg>
          </button>
        </div>
        <div className="pointer-events-auto rounded-full border border-foreground/20 bg-foreground/5 px-3 py-1 text-xs uppercase tracking-wide">
          {snapDisplay}
        </div>
      </div>
    </div>
  );
}
