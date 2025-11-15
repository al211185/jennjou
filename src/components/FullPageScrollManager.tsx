"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SCROLL_DURATION = 800;
const SECTION_SELECTOR = "[data-fullpage-section]";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function FullPageScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      document.body.classList.remove("fullpage-active", "fullpage-ready");
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      document.body.classList.remove("fullpage-active", "fullpage-ready");
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)
    );

    if (sections.length === 0) {
      document.body.classList.remove("fullpage-active", "fullpage-ready");
      return;
    }

    document.body.classList.add("fullpage-active");

    let currentIndex = 0;
    let isAnimating = false;
    let touchStartY: number | null = null;
    let animationTimeout: number | null = null;

    const getIndexByHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        return 0;
      }

      const indexFromHash = sections.findIndex((section) => section.id === hash);
      return indexFromHash === -1 ? 0 : indexFromHash;
    };

    const updateVisibleSection = (index: number) => {
      sections.forEach((section, sectionIndex) => {
        section.classList.toggle("is-visible", sectionIndex === index);
      });
    };

    const scrollToSection = (index: number, behavior: ScrollBehavior = "smooth") => {
      const target = sections[index];
      if (!target) {
        return;
      }

      currentIndex = index;
      updateVisibleSection(index);
      target.scrollIntoView({ behavior, block: "start" });
    };

    const scheduleAnimationRelease = () => {
      if (animationTimeout) {
        window.clearTimeout(animationTimeout);
      }

      animationTimeout = window.setTimeout(() => {
        isAnimating = false;
        animationTimeout = null;
      }, SCROLL_DURATION);
    };

    const requestSectionChange = (nextIndex: number, behavior: ScrollBehavior = "smooth") => {
      const safeIndex = clamp(nextIndex, 0, sections.length - 1);

      if (safeIndex === currentIndex) {
        return;
      }

      const shouldAnimate = behavior === "smooth";

      if (shouldAnimate) {
        isAnimating = true;
      }

      scrollToSection(safeIndex, behavior);

      if (shouldAnimate) {
        scheduleAnimationRelease();
      } else {
        isAnimating = false;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (isAnimating) {
        event.preventDefault();
        return;
      }

      const { deltaY } = event;

      if (Math.abs(deltaY) < 10) {
        return;
      }

      const direction = deltaY > 0 ? 1 : -1;
      const nextIndex = clamp(currentIndex + direction, 0, sections.length - 1);

      if (nextIndex === currentIndex) {
        return;
      }

      event.preventDefault();
      requestSectionChange(nextIndex);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        return;
      }

      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartY === null || isAnimating) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;

      if (endY === undefined) {
        touchStartY = null;
        return;
      }

      const deltaY = touchStartY - endY;
      touchStartY = null;

      if (Math.abs(deltaY) < 60) {
        return;
      }

      const direction = deltaY > 0 ? 1 : -1;
      requestSectionChange(currentIndex + direction);
    };

    const handleTouchCancel = () => {
      touchStartY = null;
    };

    const handleHashChange = () => {
      const targetIndex = getIndexByHash();
      requestSectionChange(targetIndex, "auto");
    };

    currentIndex = getIndexByHash();
    updateVisibleSection(currentIndex);
    document.body.classList.add("fullpage-ready");
    scrollToSection(currentIndex, "auto");

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchCancel, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
      window.removeEventListener("hashchange", handleHashChange);

      if (animationTimeout) {
        window.clearTimeout(animationTimeout);
      }

      document.body.classList.remove("fullpage-active", "fullpage-ready");
      sections.forEach((section) => section.classList.remove("is-visible"));
    };
  }, [pathname]);

  return null;
}
