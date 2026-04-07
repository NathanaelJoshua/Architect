"use client";

/**
 * Case study / collection detail — fluid.glass aesthetic.
 * Mirrors https://fluid.glass/collection/fluid-x-pivot-door
 *
 * Sections:
 *  1. Sticky-text hero with parallax image (image translateY on scroll)
 *  2. Tabs (Information / Configurations) — color-fade transition
 *  3. Configurations icon grid
 *  4. Full-bleed parallax image
 *  5. Benefits — large text with line-by-line reveal
 *  6. Architecture — text-only block, indented
 *  7. Technology — text + supporting parallax image
 *  8. Brochure CTA banner (image left / text right)
 *  9. Contact CTA — twin underline-on-hover buttons
 * 10. Footer
 */

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { use } from "react";
import { FluidNavbar } from "@/components/ui/fluid-navbar";
import { Footer7 } from "@/components/ui/footer-7";
import { FloorPlanShowcase } from "@/components/ui/floor-plan-showcase";

const EASE = [0.76, 0, 0.24, 1] as const;

/* ── Reusable parallax image (translateY based on viewport progress) ── */
function ParallaxImage({
  src,
  alt,
  className = "",
  amount = 120,
}: {
  src: string;
  alt: string;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[15%] inset-x-0">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
    </div>
  );
}

/* ── Text-reveal block: animates each line on enter ── */
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Page data — keyed by slug ── */
const COLLECTIONS: Record<
  string,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    heroImage: string;
    info: string[];
    configs: { label: string }[];
    fullImage1: string;
    fullImage2: string;
    benefits: string;
    architecture: string;
    technology: string;
    techImage: string;
    brochureImage: string;
  }
> = {
  "the-skyline-suite": {
    eyebrow: "Collection — 01",
    title: "The Skyline Suite",
    subtitle:
      "A 310 m² penthouse engineered around uninterrupted city views and a single, perfect line of light.",
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    info: [
      "310 m² internal area, 92 m² wraparound terrace",
      "Triple-height living volume with structural glazing",
      "Underfloor heating and cooling on all levels",
      "Smart home: lighting, climate, shading and security",
      "Bespoke kitchen by an artisan joinery in Vienna",
      "Dedicated lift access with biometric entry",
    ],
    configs: [
      { label: "3 Bedrooms" },
      { label: "4 Bathrooms" },
      { label: "Private Terrace" },
      { label: "2 Parking" },
    ],
    fullImage1:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    fullImage2:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop",
    benefits:
      "Designed to disappear. Every joint, sightline and material choice serves a single ambition: a home that recedes so the city can be seen.",
    architecture:
      "The plan reads as one continuous room. A central spine of stone organises the kitchen, hearth and stair, while the perimeter is left entirely to glass. Floors are micro-cement; ceilings are lime-washed timber. Nothing is louder than the view.",
    technology:
      "Behind every surface is a fully integrated building system: mechanical heat recovery, triple-glazed thermally broken frames, and a quiet hydronic loop tempering the slab. The home runs at the lowest energy class certified in the country.",
    techImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    brochureImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
  },
};

const FALLBACK = COLLECTIONS["the-skyline-suite"];

export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const data = COLLECTIONS[slug] ?? FALLBACK;
  const [tab, setTab] = useState<"info" | "configs">("info");

  /* Hero parallax: image drifts up while text column stays fixed */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroImgScale = useTransform(heroProgress, [0, 1], [1, 1.15]);

  return (
    <div className="bg-cream text-ink">
      <FluidNavbar />

      {/* 1. HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} id="top" className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Sticky text column */}
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 pt-32 pb-16">
          <Link href="/" className="label-mono opacity-60 hover:opacity-100 fluid-transition">
            ← Back to collection
          </Link>

          <div>
            <Reveal>
              <span className="label-mono opacity-60">{data.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-tight leading-[1.05] mt-6">
                {data.title}
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 text-lg md:text-xl text-ink/70 max-w-md font-light leading-relaxed">
                {data.subtitle}
              </p>
            </Reveal>
          </div>

          <div className="flex gap-3 label-mono">
            <span className="opacity-60">Scroll</span>
            <span className="w-12 h-px bg-ink/40 self-center" />
          </div>
        </div>

        {/* Parallax image column */}
        <div className="relative h-[80vh] lg:h-screen overflow-hidden bg-taupe">
          <motion.div
            style={{ y: heroImgY, scale: heroImgScale }}
            className="absolute inset-0"
          >
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. TABS ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 max-w-6xl mx-auto">
        <div className="flex gap-10 border-b border-ink/15 pb-4 mb-12">
          {(["info", "configs"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="label-mono fluid-transition"
              style={{
                color: tab === t ? "var(--ink)" : "color-mix(in srgb, var(--ink) 40%, transparent)",
              }}
            >
              {t === "info" ? "Information" : "Configurations"}
            </button>
          ))}
        </div>

        {tab === "info" ? (
          <motion.ul
            key="info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-lg font-light"
          >
            {data.info.map((line) => (
              <li key={line} className="flex gap-4 items-start">
                <span className="inline-block w-2 h-2 bg-ink rotate-45 mt-2.5 flex-none" />
                <span>{line}</span>
              </li>
            ))}
          </motion.ul>
        ) : (
          /* 3. CONFIG GRID inside Configurations tab */
          <motion.div
            key="configs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {data.configs.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-4 p-8 border border-ink/15 rounded-xl">
                <div className="w-12 h-12 border border-ink/40 rotate-45" />
                <span className="label-mono text-center">{c.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 4. FULL-BLEED PARALLAX IMAGE ────────────────────────── */}
      <ParallaxImage
        src={data.fullImage1}
        alt="Detail"
        className="h-[90vh] w-full"
        amount={140}
      />

      {/* 5. BENEFITS ─────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-40 border-t border-ink/15">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="label-mono opacity-60">Benefits — 02</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-[clamp(2.25rem,5vw,4.8rem)] font-light leading-[1.1] tracking-tight">
              {data.benefits}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* 6. ARCHITECTURE ─────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-5xl mx-auto lg:pl-32">
          <Reveal>
            <span className="label-mono opacity-60">Architecture — 03</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-8 text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.15] tracking-tight">
              A plan that reads as one room.
            </h3>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg text-ink/70 font-light leading-relaxed">
              {data.architecture}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FLOOR PLANS ─────────────────────────────────────────── */}
      <FloorPlanShowcase />

      {/* 4b. SECOND PARALLAX ─────────────────────────────────── */}
      <ParallaxImage
        src={data.fullImage2}
        alt="Living"
        className="h-[90vh] w-full"
        amount={140}
      />

      {/* 7. TECHNOLOGY ───────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-40 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <span className="label-mono opacity-60">Technology — 04</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-8 text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.15] tracking-tight">
                Engineered to disappear.
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-ink/70 font-light leading-relaxed">
                {data.technology}
              </p>
            </Reveal>
          </div>
          <ParallaxImage
            src={data.techImage}
            alt="Technology"
            className="aspect-[4/5] rounded-xl"
            amount={80}
          />
        </div>
      </section>

      {/* 8. BROCHURE CTA ─────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-24 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image src={data.brochureImage} alt="Brochure" fill className="object-cover" />
          </div>
          <div>
            <span className="label-mono opacity-60">Brochure</span>
            <h3 className="mt-6 text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.1] tracking-tight">
              Explore the full residence in print.
            </h3>
            <a
              href="#"
              className="mt-10 inline-flex items-center gap-3 px-6 h-14 rounded-full bg-ink text-cream label-mono hover:opacity-90 fluid-transition"
            >
              Download brochure <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. CONTACT CTA ──────────────────────────────────────── */}
      <section id="contact" className="px-6 md:px-16 py-32 border-t border-ink/15">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,5.6rem)] font-light leading-[1.05] tracking-tight">
              Where vision meets <em className="font-serif italic">execution</em>.
            </h2>
          </Reveal>
          <div className="mt-12 inline-flex flex-wrap justify-center gap-2 md:gap-8">
            {[
              { label: "Get in touch", href: "mailto:hello@residencia.sk" },
              { label: "Visit showroom", href: "/#gallery" },
            ].map((b) => (
              <a
                key={b.label}
                href={b.href}
                className="group relative label-mono inline-flex items-center gap-3 px-6 py-4"
              >
                {b.label}
                <ArrowUpRight className="w-4 h-4" />
                <span className="absolute left-6 right-6 bottom-3 h-px bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer7 />
    </div>
  );
}
