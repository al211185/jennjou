// src/components/HorizontalCarousel.tsx
"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode[];
  ariaLabel?: string;
}

export default function HorizontalCarousel({ children, ariaLabel }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const byOneCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const delta = card ? card.offsetWidth + 32 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Fade borders */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

      {/* Scroller */}
      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        className="
          flex gap-8 overflow-x-auto scroll-px-6 px-6 pb-2
          snap-x snap-mandatory
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
        "
      >
        {children.map((child, i) => (
          <div
            key={i}
            data-card
            className="
              snap-start shrink-0
              w-[86vw] sm:w-[420px] lg:w-[520px]
            "
          >
            {child}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => byOneCard(-1)}
          disabled={!canPrev}
          className="pointer-events-auto rounded-full border border-black bg-white px-3 py-2 text-sm disabled:opacity-40"
          aria-label="Anterior"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => byOneCard(1)}
          disabled={!canNext}
          className="pointer-events-auto rounded-full border border-black bg-white px-3 py-2 text-sm disabled:opacity-40"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </div>
  );
}
