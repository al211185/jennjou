// src/components/HorizontalCarousel.tsx
"use client";

import { Children, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";


interface Props {
  children: ReactNode;
  ariaLabel?: string;
}

const EMBLA_OPTIONS = {
  align: "start" as const,
  dragFree: true,
  containScroll: "trimSnaps" as const,
};

export default function HorizontalCarousel({ children, ariaLabel }: Props) {
  const slides = Children.toArray(children);
  const [emblaRef] = useEmblaCarousel({
    ...EMBLA_OPTIONS,
    loop: slides.length > 1,
  });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <div
        className="cursor-grab overflow-hidden active:cursor-grabbing"
        ref={emblaRef}
        aria-label={ariaLabel}
      >
        <div className="flex gap-4 px-4 pb-4 pt-1 sm:gap-6 sm:px-6">
          {slides.map((child, index) => (
            <div
              key={
                typeof child === "object" &&
                child !== null &&
                "key" in child &&
                child.key !== null
                  ? String(child.key)
                  : `slide-${index}`
              }
              className="flex-[0_0_100%] shrink-0 sm:flex-[0_0_260px] md:flex-[0_0_280px] lg:flex-[0_0_320px]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
