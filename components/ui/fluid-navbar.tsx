"use client";

/**
 * Fluid.glass-style navbar — morphs from a small bottom bar into a
 * centered dark panel on click.
 *
 * Closed : 22rem × 4rem, fixed bottom-center
 * Open   : 22rem × ~38rem, centered in viewport
 * Layout inside open panel:
 *   - "MENU" eyebrow
 *   - Vertical nav links (large, light)
 *   - Two-column contact block (News/Showroom · phone/email)
 *   - "Get a quote" button
 *   - X close at bottom
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

type Section = { id: string; label: string };
type MenuLink = { href: string; label: string };

const SECTIONS: Section[] = [
  { id: "top", label: "Residencia Jurská" },
  { id: "about", label: "About — 01" },
  { id: "categories", label: "Collection — 02" },
  { id: "gallery", label: "Visit — 03" },
  { id: "projects", label: "Featured — 04" },
  { id: "stories", label: "Stories — 05" },
  { id: "contact", label: "Contact — 06" },
];

/* Page-level routes shown in the open menu */
const MENU_LINKS: MenuLink[] = [
  { href: "/",           label: "Home" },
  { href: "/about",      label: "About" },
  { href: "/collection", label: "Collection" },
  { href: "/approach",   label: "Approach" },
  { href: "/contact",    label: "Contact" },
];

/* Title shown in the closed bar — one entry per route */
const PAGE_TITLES: Record<string, string> = {
  "/":          "Residencia Jurská",
  "/about":     "About — Studio",
  "/collection":"Collection",
  "/approach":  "Approach",
  "/contact":   "Contact",
};

export function FluidNavbar() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const pageTitle = PAGE_TITLES[pathname] ?? "Residencia Jurská";
  const [activeIdx, setActiveIdx] = useState(0);
  const [open, setOpen] = useState(false);

  // Track which section is in view → drives the title reel.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop dimmer (only when open) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[4] bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* ── MORPHING PANEL ──────────────────────────────────── */}
      {/* Anchored by `top` always — only `height` and `y` tween, both
          numeric/rem so framer can interpolate smoothly. The panel grows
          downward, then a translateY recenters it visually. */}
      <motion.header
        initial={false}
        animate={
          open
            ? { width: "22rem", height: "38rem", y: "calc(50vh - 21rem)" }
            : { width: "22rem", height: "4rem",  y: 0 }
        }
        transition={{
          height: { duration: 0.7, ease: EASE },
          y:      { duration: 0.7, ease: EASE },
          width:  { duration: 0.7, ease: EASE },
        }}
        style={{
          top: "2rem",
          background: "color-mix(in srgb, #0b1012 85%, transparent)",
          backdropFilter: "blur(2rem) saturate(140%)",
          WebkitBackdropFilter: "blur(2rem) saturate(140%)",
        }}
        className="fixed left-1/2 -translate-x-1/2 z-[5] text-white select-none max-w-[calc(100vw-2rem)] overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!open ? (
            /* ── CLOSED STATE: compact bar ─────────────────── */
            <motion.div
              key="bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.3 }}
              className="flex items-center h-16 w-full"
            >
              {/* Logo */}
              <a
                href="#top"
                className="w-16 h-16 flex items-center justify-center"
                aria-label="Home"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    transform="rotate(45 12 12)"
                  />
                </svg>
              </a>

              {/* Title — section reel on home, static page name elsewhere */}
              <div
                className="relative overflow-hidden flex-1 flex items-center justify-center"
                style={{ height: "1.2rem" }}
              >
                {isHome ? (
                  <motion.div
                    animate={{ y: `-${activeIdx * 1.2}rem` }}
                    transition={{ duration: 0.8, ease: EASE }}
                    style={{ willChange: "transform" }}
                    className="flex flex-col items-center"
                  >
                    {SECTIONS.map((s) => (
                      <span
                        key={s.id}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.78rem",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          lineHeight: "1.2rem",
                          textTransform: "uppercase",
                        }}
                        className="whitespace-nowrap"
                      >
                        {s.label}
                      </span>
                    ))}
                  </motion.div>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      lineHeight: "1.2rem",
                      textTransform: "uppercase",
                    }}
                    className="whitespace-nowrap"
                  >
                    {pageTitle}
                  </span>
                )}
              </div>

              {/* Burger */}
              <button
                onClick={() => setOpen(true)}
                className="w-16 h-16 flex items-center justify-center cursor-pointer"
                aria-label="Open menu"
              >
                <svg width="22" height="14" viewBox="0 0 32 18" fill="none">
                  <line
                    x1="0"
                    y1="4"
                    x2="32"
                    y2="4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <line
                    x1="0"
                    y1="14"
                    x2="32"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </motion.div>
          ) : (
            /* ── OPEN STATE: full menu panel ───────────────── */
            <motion.div
              key="panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
              className="flex flex-col px-8 pt-8 pb-6 gap-6 h-full"
            >
              {/* Eyebrow */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                }}
                className="uppercase opacity-60"
              >
                Menu
              </span>

              {/* Vertical nav */}
              <nav className="flex flex-col gap-3">
                {MENU_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.05,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-light tracking-tight hover:opacity-60 fluid-transition"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Contact block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                className="grid grid-cols-2 gap-x-6 gap-y-1 pt-6 border-t border-white/15"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                }}
              >
                <a href="#" className="hover:opacity-60 fluid-transition">
                  News
                </a>
                <a
                  href="tel:+421123456789"
                  className="opacity-70 hover:opacity-100 fluid-transition"
                >
                  +421 123 456 789
                </a>
                <a
                  href="#gallery"
                  className="hover:opacity-60 fluid-transition"
                >
                  Showroom
                </a>
                <a
                  href="mailto:hello@residencia.sk"
                  className="opacity-70 hover:opacity-100 fluid-transition"
                >
                  hello@residencia.sk
                </a>
              </motion.div>

              {/* Get a quote */}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
                className="flex items-center justify-center gap-3 h-14 border border-white/30 hover:bg-white hover:text-black fluid-transition"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <ArrowRight className="w-4 h-4" /> Get a quote
              </motion.a>

              {/* Close X */}
              <button
                onClick={() => setOpen(false)}
                className="self-center w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 fluid-transition"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 3 L17 17 M17 3 L3 17"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
