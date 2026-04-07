"use client";

/**
 * Horizontal-scroll collection showcase.
 * - Section is pinned for N × 100vh
 * - Vertical scroll → horizontal translateX of an inner row
 * - Layout per slide mirrors the jurska.sk reference (overlapping
 *   primary + secondary images, hotspots, decorative pickets, badge)
 * - Uses the existing fluid.glass palette only (cream / ink / taupe / black)
 */

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

type Collection = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  hotspots: { x: string; y: string }[];
};

const COLLECTIONS: Collection[] = [
  {
    slug: "the-skyline-suite",
    eyebrow: "01 — Apartments",
    title: "Investment in the exceptional",
    body: "Residencia Jurská offers value that does not expire — through its location, its execution, and its potential.",
    primary:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
    secondary:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    hotspots: [
      { x: "32%", y: "30%" },
      { x: "78%", y: "22%" },
    ],
  },
  {
    slug: "penthouses",
    eyebrow: "02 — Penthouses",
    title: "Architecture with a view",
    body: "Every detail designed to serve the view — from the line of light to the stone underfoot.",
    primary:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop",
    secondary:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    hotspots: [
      { x: "40%", y: "55%" },
      { x: "70%", y: "35%" },
    ],
  },
  {
    slug: "wellness",
    eyebrow: "03 — Wellness",
    title: "Quiet in every gesture",
    body: "Wellness, gardens and shared rooms — places where the day turns slowly.",
    primary:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1800&auto=format&fit=crop",
    secondary:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
    hotspots: [
      { x: "25%", y: "40%" },
      { x: "65%", y: "60%" },
    ],
  },
];

/* ── + hotspot marker ─────────────────────────────────── */
function Hotspot({ x, y }: { x: string; y: string }) {
  return (
    <div
      style={{ left: x, top: y }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <span className="relative flex w-10 h-10">
        <span className="absolute inset-0 rounded-full border border-ink/40 animate-ping" />
        <span className="relative w-10 h-10 rounded-full bg-cream/70 border border-ink/40 backdrop-blur-sm flex items-center justify-center">
          <Plus className="w-4 h-4 text-ink" />
        </span>
      </span>
    </div>
  );
}

/* ── decorative vertical pickets ──────────────────────── */
function Pickets() {
  return (
    <div className="absolute left-[6%] bottom-[14%] flex gap-[5px] pointer-events-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="w-px bg-ink/30"
          style={{ height: `${30 + Math.sin(i * 0.6) * 20 + 50}px` }}
        />
      ))}
    </div>
  );
}

/* ── single slide ─────────────────────────────────────── */
function Slide({ collection }: { collection: Collection }) {
  return (
    <div className="relative shrink-0 w-screen h-screen flex items-center">
      <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-16 grid grid-cols-12 gap-6">
        {/* Text */}
        <div className="col-span-12 lg:col-span-5 z-20 self-start pt-16 lg:pt-24">
          <span className="label-mono text-ink/60">{collection.eyebrow}</span>
          <h2 className="mt-6 text-[clamp(2.25rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
            {collection.title}
          </h2>
          <p className="mt-6 max-w-md text-base md:text-lg text-ink/70 font-light leading-relaxed">
            {collection.body}
          </p>
          <Link
            href={`/collection/${collection.slug}`}
            className="mt-10 inline-flex items-center gap-3 label-mono text-ink hover:opacity-60 fluid-transition"
          >
            View collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Primary image bleeding off the right */}
        <div className="col-span-12 lg:col-start-6 lg:col-span-8 relative aspect-[16/10] -mr-6 md:-mr-16 z-10 overflow-hidden bg-taupe">
          <Image
            src={collection.primary}
            alt={collection.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          {collection.hotspots.map((h, i) => (
            <Hotspot key={i} x={h.x} y={h.y} />
          ))}
        </div>

        {/* Secondary image overlapping bottom-left */}
        <div className="col-span-10 col-start-2 lg:col-start-3 lg:col-span-6 relative aspect-[16/10] -mt-32 lg:-mt-48 z-30 overflow-hidden bg-taupe">
          <Image
            src={collection.secondary}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-cover"
          />
          <Hotspot x="48%" y="55%" />
        </div>
      </div>
    </div>
  );
}

export function CollectionScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Vertical scroll → horizontal translate of the slide row.
  // The row is N × 100vw wide, so x ranges from 0% to -((N-1)/N * 100%).
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((COLLECTIONS.length - 1) / COLLECTIONS.length) * 100}%`],
  );

  return (
    <section
      ref={ref}
      id="categories"
      className="relative bg-cream py-10"
      style={{ height: `${COLLECTIONS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Top labels */}
        <div className="absolute top-10 left-6 md:left-16 z-40 label-mono text-ink/60">
          Collection — 02
        </div>
        <div className="absolute top-10 right-6 md:right-16 z-40 label-mono text-ink/60">
          Scroll →
        </div>

        {/* Horizontal sliding row */}
        <motion.div
          style={{ x, width: `${COLLECTIONS.length * 100}vw` }}
          transition={{ ease: EASE }}
          className="flex h-full"
        >
          {COLLECTIONS.map((c) => (
            <Slide key={c.slug} collection={c} />
          ))}
        </motion.div>

        <Pickets />
      </div>
    </section>
  );
}
