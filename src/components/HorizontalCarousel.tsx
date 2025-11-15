// src/components/HorizontalCarousel.tsx
"use client";

import { type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";


interface Props {
  children: ReactNode[];
  ariaLabel?: string;
}

export default function HorizontalCarousel({ children, ariaLabel }: Props) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: children.length > 1,
    containScroll: "trimSnaps",
  });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <div className="overflow-hidden" ref={emblaRef} aria-label={ariaLabel}>
        <div className="flex gap-6 px-6 pb-4">
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-[0_0_60vw] shrink-0 sm:flex-[0_0_280px] md:flex-[0_0_320px] lg:flex-[0_0_360px]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
