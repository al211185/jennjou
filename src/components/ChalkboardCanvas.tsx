"use client";

import { useEffect, useRef } from "react";

const STROKE_COLOR = "rgba(20, 20, 20, 0.45)";
const STROKE_WIDTH = 3;

export default function ChalkboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number | null = null;

    const setSize = () => {
      const width = document.documentElement.clientWidth;
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      if (width === sizeRef.current.width && height === sizeRef.current.height) {
        return;
      }

      sizeRef.current = { width, height };
      const pixelRatio = window.devicePixelRatio ?? 1;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = STROKE_COLOR;
      ctx.lineWidth = STROKE_WIDTH;
    };

    setSize();

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => setSize())
      : null;
    resizeObserver?.observe(document.documentElement);

    const handleWindowResize = () => setSize();
    window.addEventListener("resize", handleWindowResize);

    const draw = (x: number, y: number) => {
      const lastPoint = lastPointRef.current;
      ctx.beginPath();
      if (lastPoint) {
        ctx.moveTo(lastPoint.x, lastPoint.y);
      } else {
        ctx.moveTo(x, y);
      }
      ctx.lineTo(x, y);
      ctx.stroke();
      lastPointRef.current = { x, y };
    };

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY + window.scrollY;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      animationFrame = window.requestAnimationFrame(() => draw(x, y));
    };

    const resetPath = () => {
      lastPointRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", resetPath);
    document.addEventListener("mouseleave", resetPath);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", resetPath);
      document.removeEventListener("mouseleave", resetPath);
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver?.disconnect();
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 -z-10"
    />
  );
}
