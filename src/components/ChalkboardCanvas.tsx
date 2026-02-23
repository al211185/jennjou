"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const STROKE_WIDTH = 3;
const SECTION_SELECTOR = "[data-fullpage-section]";
const FALLBACK_SECTION_KEY = "global";

type Point = { x: number; y: number };
type SectionBound = { top: number; bottom: number; key: string };

function hashText(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateSectionStrokeColor(sectionKey: string) {
  const hue = hashText(sectionKey) % 360;
  return `hsla(${hue}, 75%, 44%, 0.42)`;
}

export default function ChalkboardCanvas() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointRef = useRef<Point | null>(null);
  const activeSectionKeyRef = useRef(FALLBACK_SECTION_KEY);
  const sectionBoundsRef = useRef<SectionBound[]>([]);
  const sectionColorsRef = useRef<Map<string, string>>(new Map());
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!isHome) {
      canvas.style.width = "0px";
      canvas.style.height = "0px";
      canvas.width = 1;
      canvas.height = 1;
      sectionBoundsRef.current = [];
      lastPointRef.current = null;
      activeSectionKeyRef.current = FALLBACK_SECTION_KEY;
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    if (reduceMotionQuery.matches || coarsePointerQuery.matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;
    let pendingPoint: Point | null = null;
    let refreshRaf: number | null = null;

    const updateSections = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)
      );
      sectionBoundsRef.current = sections.map((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const key = section.id || section.dataset.sectionId || `${top}`;
        return { top, bottom, key };
      });
    };

    const getSectionKeyByY = (pageY: number) => {
      for (const section of sectionBoundsRef.current) {
        if (pageY >= section.top && pageY < section.bottom) {
          return section.key;
        }
      }
      return FALLBACK_SECTION_KEY;
    };

    const getContentHeight = () => {
      if (sectionBoundsRef.current.length > 0) {
        const last = sectionBoundsRef.current[sectionBoundsRef.current.length - 1];
        return Math.max(last.bottom, window.innerHeight);
      }
      return Math.max(document.documentElement.scrollHeight, window.innerHeight);
    };

    const getStrokeColor = (sectionKey: string) => {
      const existing = sectionColorsRef.current.get(sectionKey);
      if (existing) return existing;
      const generated = generateSectionStrokeColor(sectionKey);
      sectionColorsRef.current.set(sectionKey, generated);
      return generated;
    };

    const configureContext = (sectionKey: string) => {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = STROKE_WIDTH;
      ctx.strokeStyle = getStrokeColor(sectionKey);
    };

    const setSize = () => {
      const width = document.documentElement.clientWidth;
      const height = getContentHeight();

      if (width === sizeRef.current.width && height === sizeRef.current.height) {
        return;
      }

      sizeRef.current = { width, height };
      const pixelRatio = window.devicePixelRatio ?? 1;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
    };

    const refreshLayoutBounds = () => {
      if (refreshRaf !== null) cancelAnimationFrame(refreshRaf);
      refreshRaf = requestAnimationFrame(() => {
        updateSections();
        setSize();
      });
    };

    const draw = (point: Point) => {
      const sectionKey = getSectionKeyByY(point.y);
      if (sectionKey !== activeSectionKeyRef.current) {
        activeSectionKeyRef.current = sectionKey;
        lastPointRef.current = null;
      }

      configureContext(sectionKey);
      const lastPoint = lastPointRef.current ?? point;

      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();

      lastPointRef.current = point;
    };

    const flushPendingPoint = () => {
      rafId = null;
      if (!pendingPoint) return;
      draw(pendingPoint);
      pendingPoint = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      pendingPoint = { x: event.clientX, y: event.clientY + window.scrollY };
      if (rafId === null) {
        rafId = window.requestAnimationFrame(flushPendingPoint);
      }
    };

    const resetPath = () => {
      lastPointRef.current = null;
    };

    refreshLayoutBounds();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(refreshLayoutBounds)
        : null;
    resizeObserver?.observe(document.documentElement);

    window.addEventListener("resize", refreshLayoutBounds);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", resetPath, { passive: true });
    window.addEventListener("blur", resetPath);
    window.addEventListener("load", refreshLayoutBounds);
    document.addEventListener("load", refreshLayoutBounds, true);
    document.addEventListener("mouseleave", resetPath);

    return () => {
      window.removeEventListener("resize", refreshLayoutBounds);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", resetPath);
      window.removeEventListener("blur", resetPath);
      window.removeEventListener("load", refreshLayoutBounds);
      document.removeEventListener("load", refreshLayoutBounds, true);
      document.removeEventListener("mouseleave", resetPath);
      resizeObserver?.disconnect();

      if (refreshRaf !== null) cancelAnimationFrame(refreshRaf);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 -z-10 ${
        isHome ? "block" : "hidden"
      }`}
    />
  );
}
