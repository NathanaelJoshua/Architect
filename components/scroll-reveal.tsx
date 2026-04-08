"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-reveal: finds headings, paragraphs, images, figures, list
 * items, and blockquotes on the current page and fades/translates them in
 * when they enter the viewport. Skips anything inside [data-no-reveal] and
 * anything already animated by framer-motion (which sets inline styles).
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const selector =
      "h1, h2, h3, h4, h5, p, img, figure, picture, blockquote, li, .reveal-target";

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    ).filter((el) => {
      if (el.closest("[data-no-reveal]")) return false;
      if (el.dataset.revealed === "true") return false;
      // Skip elements inside framer-motion components (they have their own anim)
      if (el.closest("[style*='transform']") && el.closest("[style*='opacity']"))
        return false;
      return true;
    });

    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i * 20, 200)}ms`;
      el.dataset.revealed = "true";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
