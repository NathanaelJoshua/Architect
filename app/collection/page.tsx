"use client";

/**
 * /collection — index of all collections / case studies.
 *
 * Sections:
 *  1. Hero — title + filter chips
 *  2. Featured collection (large 2-col, sticky-pin feeling)
 *  3. Collection grid (4 cards, each links to /collection/[slug])
 *  4. Stat band
 *  5. CTA banner
 *  6. Footer
 *
 * Palette: cream / ink / taupe / black only.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FluidNavbar } from "@/components/ui/fluid-navbar";
import { Footer7 } from "@/components/ui/footer-7";

const EASE = [0.76, 0, 0.24, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type Item = {
  slug: string;
  category: string;
  name: string;
  spec: string;
  year: string;
  img: string;
};

const ITEMS: Item[] = [
  {
    slug: "the-skyline-suite",
    category: "Penthouse",
    name: "The Skyline Suite",
    spec: "310 m² · 3 bed",
    year: "2025",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "atelier-loft",
    category: "Apartment",
    name: "Atelier Loft 04",
    spec: "96 m² · 2 bed",
    year: "2024",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "garden-residence",
    category: "Apartment",
    name: "The Garden Residence",
    spec: "240 m² · 4 bed",
    year: "2024",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "courtyard-house",
    category: "Penthouse",
    name: "Courtyard House",
    spec: "142 m² · 3 bed",
    year: "2023",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "wellness-pavilion",
    category: "Wellness",
    name: "Wellness Pavilion",
    spec: "Shared · 220 m²",
    year: "2023",
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    slug: "atrium-apartments",
    category: "Apartment",
    name: "Atrium Apartments",
    spec: "12 units · 60–110 m²",
    year: "2022",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop",
  },
];

const FILTERS = ["All", "Apartment", "Penthouse", "Wellness"];

export default function CollectionIndexPage() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? ITEMS : ITEMS.filter((i) => i.category === filter);

  return (
    <div className="bg-cream text-ink">
      <FluidNavbar />

      {/* 1. HERO ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pt-48 pb-20 max-w-7xl mx-auto">
        <Reveal>
          <span className="label-mono opacity-60">Collection — Index</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight max-w-5xl">
            Every house<br />we have made.
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-xl text-lg md:text-xl text-ink/70 font-light leading-relaxed">
            Fifteen years, forty-two homes. Browse the full collection below, or
            filter by type.
          </p>
        </Reveal>

        {/* Filter chips */}
        <Reveal delay={0.35}>
          <div className="mt-14 flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="label-mono px-5 py-2 rounded-full border fluid-transition"
                style={{
                  background: filter === f ? "var(--ink)" : "transparent",
                  color: filter === f ? "var(--cream)" : "var(--ink)",
                  borderColor: filter === f ? "var(--ink)" : "color-mix(in srgb, var(--ink) 25%, transparent)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 2. FEATURED ─────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <span className="label-mono opacity-60">Featured</span>
            <h2 className="mt-6 text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] tracking-tight">
              {ITEMS[0].name}
            </h2>
            <p className="mt-6 text-lg text-ink/70 font-light leading-relaxed max-w-md">
              A 310 m² penthouse engineered around uninterrupted city views and a
              single, perfect line of light.
            </p>
            <Link
              href={`/collection/${ITEMS[0].slug}`}
              className="mt-8 inline-flex items-center gap-3 label-mono hover:opacity-60 fluid-transition"
            >
              Read the case study <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <Link href={`/collection/${ITEMS[0].slug}`} className="block group">
              <div className="relative aspect-[4/3] overflow-hidden bg-taupe">
                <Image
                  src={ITEMS[0].img}
                  alt={ITEMS[0].name}
                  fill
                  className="object-cover group-hover:scale-105 fluid-transition"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. GRID ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 border-t border-ink/15">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <span className="label-mono opacity-60">All projects</span>
            <span className="label-mono opacity-60">{visible.length} of {ITEMS.length}</span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16"
            >
              {visible.map((it, i) => (
                <motion.div
                  key={it.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
                >
                  <Link href={`/collection/${it.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-taupe">
                      <Image
                        src={it.img}
                        alt={it.name}
                        fill
                        className="object-cover group-hover:scale-105 fluid-transition"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between">
                      <div>
                        <span className="label-mono opacity-60">{it.category}</span>
                        <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-tight">
                          {it.name}
                        </h3>
                      </div>
                      <span className="label-mono opacity-60">{it.year}</span>
                    </div>
                    <p className="mt-2 text-base text-ink/60 font-light">{it.spec}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. STAT BAND ────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 border-t border-ink/15 bg-ink text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { value: "42", label: "Homes built" },
            { value: "15", label: "Years of practice" },
            { value: "14", label: "People in studio" },
            { value: "100%", label: "On-time handover" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="text-[clamp(3rem,6vw,5.5rem)] font-light leading-[0.9]">{s.value}</div>
              <div className="mt-4 label-mono opacity-60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. CTA ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto border border-ink/20 px-6 md:px-24 py-32 md:py-44 text-center">
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-light leading-[1] tracking-tight max-w-4xl mx-auto">
              Could yours be<br />the next one?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-ink text-cream rounded-full px-8 py-4 label-mono hover:opacity-90 fluid-transition"
              >
                Start a project <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/approach"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 label-mono border border-ink/30 hover:bg-ink hover:text-cream fluid-transition"
              >
                Read our approach
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer7 />
    </div>
  );
}
