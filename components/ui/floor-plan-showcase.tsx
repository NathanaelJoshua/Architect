"use client";

/**
 * Floor-plan showcase section (jurska.sk-style).
 *  - Eyebrow + serif italic title
 *  - Tab row with thumbnail icons (multiple plans)
 *  - Large centered floor-plan image with hotspot markers
 *  - Stats bar at the bottom
 *  - Decorative pickets on the side edges
 *
 * Uses only the existing palette: ink (dark), cream, taupe.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

type Plan = {
  code: string;     // e.g. "RD2 02"
  title: string;    // e.g. "2-bedroom with terrace"
  image: string;    // floor-plan drawing
  hotspots: { x: string; y: string; label: string }[];
  stats: { label: string; value: string }[];
};

const DEFAULT_PLANS: Plan[] = [
  {
    code: "RD1 01",
    title: "1-bedroom with garden",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1600&auto=format&fit=crop",
    hotspots: [
      { x: "30%", y: "45%", label: "1-A.01" },
      { x: "62%", y: "55%", label: "1-A.02" },
    ],
    stats: [
      { label: "Living rooms", value: "1" },
      { label: "Floor",        value: "1.NP" },
      { label: "Interior",     value: "62 m²" },
      { label: "Exterior",     value: "18 m²" },
      { label: "Status",       value: "Available" },
    ],
  },
  {
    code: "RD2 02",
    title: "2-bedroom with terrace",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    hotspots: [
      { x: "28%", y: "40%", label: "2-B.02" },
      { x: "48%", y: "38%", label: "2-B.01" },
      { x: "32%", y: "62%", label: "2-B.03" },
      { x: "70%", y: "55%", label: "2-B.04" },
      { x: "62%", y: "78%", label: "2-B.05" },
    ],
    stats: [
      { label: "Living rooms", value: "2" },
      { label: "Floor",        value: "2.NP" },
      { label: "Interior",     value: "84 m²" },
      { label: "Exterior",     value: "13.16 m²" },
      { label: "Status",       value: "Available" },
    ],
  },
  {
    code: "RD3 04",
    title: "3-bedroom penthouse",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    hotspots: [
      { x: "35%", y: "50%", label: "3-C.01" },
      { x: "60%", y: "45%", label: "3-C.02" },
      { x: "75%", y: "65%", label: "3-C.03" },
    ],
    stats: [
      { label: "Living rooms", value: "3" },
      { label: "Floor",        value: "3.NP" },
      { label: "Interior",     value: "142 m²" },
      { label: "Exterior",     value: "42 m²" },
      { label: "Status",       value: "Reserved" },
    ],
  },
];

function Pickets({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${side}-4 md:${
        side === "left" ? "left-10" : "right-10"
      } flex gap-[6px] pointer-events-none opacity-60`}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-px bg-cream/35"
          style={{ height: `${50 + Math.sin(i * 0.7) * 30 + 60}px` }}
        />
      ))}
    </div>
  );
}

function Hotspot({ x, y, label }: { x: string; y: string; label: string }) {
  return (
    <div
      style={{ left: x, top: y }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
    >
      <span className="block w-3 h-3 bg-cream rotate-45 shadow-[0_0_0_4px_rgba(243,240,236,0.15)]" />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 label-mono text-cream/70 whitespace-nowrap opacity-0 group-hover:opacity-100 fluid-transition">
        {label}
      </span>
    </div>
  );
}

export function FloorPlanShowcase({ plans = DEFAULT_PLANS }: { plans?: Plan[] }) {
  const [activeIdx, setActiveIdx] = useState(1);
  const active = plans[activeIdx];

  return (
    <section className="relative bg-ink text-cream overflow-hidden py-24 md:py-32">
      <Pickets side="left" />
      <Pickets side="right" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Eyebrow */}
        <span className="label-mono text-cream/60">BYT — {active.code}</span>

        {/* Serif title */}
        <h2
          className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-light tracking-tight leading-[1.05] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
        >
          {active.title}
        </h2>

        {/* Tab row */}
        <div className="mt-12 flex justify-center items-center gap-10 flex-wrap">
          <span className="label-mono text-cream/60">Floor plan</span>
          <div className="flex gap-2">
            {plans.map((p, i) => (
              <button
                key={p.code}
                onClick={() => setActiveIdx(i)}
                aria-label={p.code}
                className={`label-mono w-12 h-9 border flex items-center justify-center fluid-transition ${
                  i === activeIdx
                    ? "border-cream bg-cream/10 text-cream"
                    : "border-cream/25 text-cream/50 hover:text-cream hover:border-cream/60"
                }`}
              >
                {p.code.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Plan image */}
        <div className="relative mt-16 mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative aspect-[16/10] bg-black/30 border border-cream/15 overflow-hidden"
            >
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover opacity-80 mix-blend-screen"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
              {active.hotspots.map((h, i) => (
                <Hotspot key={i} {...h} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats bar */}
        <AnimatePresence mode="wait">
          <motion.dl
            key={`stats-${active.code}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-6 border-t border-cream/15 pt-10"
          >
            {active.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <dt className="label-mono text-cream/60">{s.label}</dt>
                <dd
                  className="text-2xl md:text-3xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </AnimatePresence>
      </div>
    </section>
  );
}
