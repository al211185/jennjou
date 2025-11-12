// src/components/HorizontalCarousel.tsx
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";


interface Props {
  children: ReactNode[];
  ariaLabel?: string;
}

export default function HorizontalCarousel({ children, ariaLabel }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hasMultipleCards = children.length > 1;
  const [isReady, setIsReady] = useState(!hasMultipleCards);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartScrollRef = useRef(0);
  const isLoopAdjustingRef = useRef(false);

  const extendedChildren = useMemo(() => {
    if (!hasMultipleCards) {
      return children;
    }

    const lastChild = children[children.length - 1];
    const firstChild = children[0];
    return [lastChild, ...children, firstChild];
  }, [children, hasMultipleCards]);

  const getCardSpacing = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length === 0) return 0;

    if (cards.length === 1) {
      return cards[0].offsetWidth || el.clientWidth;
    }

    return cards[1].offsetLeft - cards[0].offsetLeft || cards[0].offsetWidth;
  }, []);

  const byOneCard = useCallback(
    (dir: 1 | -1, smooth = true) => {
      const el = scrollerRef.current;
      if (!el) return;

      const spacing = getCardSpacing();
      if (spacing === 0) return;

      el.scrollTo({
        left: el.scrollLeft + dir * spacing,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [getCardSpacing]
  );

  const syncLoopScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !hasMultipleCards || isLoopAdjustingRef.current) return;

    const spacing = getCardSpacing();
    if (spacing === 0) return;

    const totalRealCards = children.length;
    const totalScrollWidth = spacing * (totalRealCards + 1);
    const epsilon = Math.min(spacing * 0.1, 48);

    if (el.scrollLeft <= epsilon) {
      isLoopAdjustingRef.current = true;
      el.scrollLeft += spacing * totalRealCards;
    } else if (el.scrollLeft >= totalScrollWidth - epsilon) {
      isLoopAdjustingRef.current = true;
      el.scrollLeft -= spacing * totalRealCards;
    }

    
    if (isLoopAdjustingRef.current) {
      requestAnimationFrame(() => {
        isLoopAdjustingRef.current = false;
      });
    }
  }, [children.length, getCardSpacing, hasMultipleCards]);

  useEffect(() => {
    if (!hasMultipleCards) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [hasMultipleCards]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!hasMultipleCards) {
      setIsReady(true);
      return;
    }

    const spacing = getCardSpacing();
    if (spacing === 0) {
      setIsReady(true);
      return;
    }

    requestAnimationFrame(() => {
      el.scrollLeft = spacing;
      setIsReady(true);
    });
  }, [children.length, getCardSpacing, hasMultipleCards]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      syncLoopScroll();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [syncLoopScroll]);

  useEffect(() => {
    const onResize = () => {
      const el = scrollerRef.current;
      if (!el) return;

      if (!hasMultipleCards) {
        el.scrollLeft = 0;
        return;
      }

      const spacing = getCardSpacing();
      if (spacing === 0) return;
      el.scrollLeft = spacing;
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [getCardSpacing, hasMultipleCards]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartScrollRef.current = scrollerRef.current?.scrollLeft ?? 0;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const startX = touchStartXRef.current;
      touchStartXRef.current = null;

      if (startX == null) return;

      const endTouch = event.changedTouches[0];
      if (!endTouch) return;

      const deltaX = endTouch.clientX - startX;
      const scrollDiff = Math.abs(
        (scrollerRef.current?.scrollLeft ?? 0) - touchStartScrollRef.current
      );

      if (scrollDiff > 10) return;

      if (Math.abs(deltaX) > 40) {
        byOneCard(deltaX > 0 ? -1 : 1);
      }
    },
    [byOneCard]
  );

  return (
    <div className="relative">
      {/* Fade borders */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent" />

      {/* Scroller */}
      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="
          flex gap-8 overflow-x-auto scroll-px-6 px-6 pb-2
          snap-x snap-mandatory
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
                    touch-pan-x
        "
      >
        {isReady &&
          extendedChildren.map((child, i) => (
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
          disabled={!hasMultipleCards}
          className="pointer-events-auto rounded-full border border-black bg-black/5 px-3 py-2 text-sm transition hover:bg-black/10 disabled:opacity-40"
          aria-label="Anterior"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => byOneCard(1)}
          disabled={!hasMultipleCards}
          className="pointer-events-auto rounded-full border border-black bg-black/5 px-3 py-2 text-sm transition hover:bg-black/10 disabled:opacity-40"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </div>
  );
}
