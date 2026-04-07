"use client";

/**
 * /about — fluid.glass-style studio page.
 *
 * Sections:
 *  1. Hero — large headline + intro
 *  2. Sticky portrait + scrolling philosophy text
 *  3. Numbered values (4 cards)
 *  4. Team grid (6 portraits)
 *  5. Manifesto (huge serif italic line)
 *  6. CTA banner
 *  7. Footer
 *
 * Palette: cream / ink / taupe / black only.
 */

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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

const VALUES = [
  { code: "01", title: "Material honesty", body: "We never imitate. Stone is stone, timber is timber, glass is glass." },
  { code: "02", title: "Quiet detail",     body: "The best detail is the one nobody notices for the first six months." },
  { code: "03", title: "Long horizons",    body: "We design for buildings that age across decades, not seasons." },
  { code: "04", title: "One relationship", body: "From first sketch to twentieth anniversary — the same hands, the same names." },
];

const TEAM = [
  { name: "Anna Krajčí",      role: "Founding Architect",  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
  { name: "Tomáš Bureš",      role: "Design Director",      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
  { name: "Marie Voláková",   role: "Head of Interiors",    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
  { name: "Jakub Svoboda",    role: "Project Lead",         img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "Eva Horáková",     role: "Construction",         img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" },
  { name: "Michal Petrík",    role: "Sustainability Lead",  img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" },
];

export default function AboutPage() {
  /* Sticky-scroll parallax for the portrait */
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className="bg-cream text-ink">
      <FluidNavbar />

      {/* 1. HERO ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pt-48 pb-32 max-w-7xl mx-auto">
        <Reveal>
          <span className="label-mono opacity-60">About — Studio</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight max-w-5xl">
            A practice built<br />on patience.
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-xl text-lg md:text-xl text-ink/70 font-light leading-relaxed">
            Founded in Bratislava in 2010, our studio designs and builds homes
            for clients who would rather wait a year longer than compromise a
            single detail.
          </p>
        </Reveal>
      </section>

      {/* 2. STICKY PORTRAIT + SCROLLING TEXT ─────────────────── */}
      <section className="px-6 md:px-16 pb-32 border-t border-ink/15 pt-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div ref={portraitRef} className="lg:sticky lg:top-32 relative aspect-[3/4] overflow-hidden bg-taupe">
              <motion.div style={{ y: portraitY }} className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                  alt="Studio"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-16 flex flex-col gap-20">
            {[
              {
                eyebrow: "Origins",
                title: "Two architects, one workshop.",
                body: "We began with a single commission: a stone house on the edge of the Carpathians. Fifteen years later, every house we have built shares the same DNA — material honesty, structural calm, and a refusal to hurry.",
              },
              {
                eyebrow: "Method",
                title: "We draw, we model, we make.",
                body: "Every project passes through pencil, foam, computer, and finally the workshop. Nothing reaches site that has not been touched by hand at least three times.",
              },
              {
                eyebrow: "Today",
                title: "A studio of fourteen.",
                body: "Six architects, three interior designers, two construction leads, and a team of trusted partner ateliers across central Europe. Small enough to know every joint, large enough to deliver every project on time.",
              },
            ].map((b, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <span className="label-mono opacity-60">{b.eyebrow}</span>
                <h3 className="mt-4 text-3xl md:text-4xl font-light tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-6 text-lg text-ink/70 font-light leading-relaxed max-w-xl">
                  {b.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VALUES ───────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 border-t border-ink/15">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <span className="label-mono opacity-60">Values</span>
            <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-light tracking-tight max-w-md text-right">
              Four ideas we have never broken.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
            {VALUES.map((v, i) => (
              <Reveal key={v.code} delay={i * 0.05} className="bg-cream p-10 min-h-[260px] flex flex-col justify-between">
                <span className="label-mono opacity-50">{v.code}</span>
                <div>
                  <h3 className="text-2xl font-light tracking-tight">{v.title}</h3>
                  <p className="mt-4 text-base text-ink/70 font-light leading-relaxed">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 border-t border-ink/15">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <span className="label-mono opacity-60">Team</span>
            <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-light tracking-tight max-w-md text-right">
              The hands behind every line.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="relative aspect-[3/4] overflow-hidden bg-taupe grayscale group">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    className="object-cover group-hover:scale-105 fluid-transition"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                </div>
                <div className="mt-4 flex justify-between items-baseline">
                  <h3 className="text-lg font-light">{m.name}</h3>
                  <span className="label-mono text-ink/60">{m.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MANIFESTO ────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-40 border-t border-ink/15 bg-ink text-cream">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="label-mono opacity-60">Manifesto</span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-[clamp(2rem,4.5vw,4.5rem)] font-light leading-[1.1] tracking-tight">
              We make houses we would want to grow old in
              <em className="font-serif italic"> — and we are growing old in them.</em>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. CTA ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto border border-ink/20 px-6 md:px-24 py-32 md:py-44 text-center">
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-light leading-[1] tracking-tight max-w-4xl mx-auto">
              Start a<br />conversation.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-ink text-cream rounded-full px-8 py-4 label-mono hover:opacity-90 fluid-transition"
              >
                Get in touch <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 label-mono border border-ink/30 hover:bg-ink hover:text-cream fluid-transition"
              >
                See the collection
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer7 />
    </div>
  );
}
