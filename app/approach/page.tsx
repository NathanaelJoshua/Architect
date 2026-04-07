"use client";

/**
 * /approach — port of https://fluid.glass/approach
 *
 * Sections:
 *  1. Hero (cream, large headline)
 *  2. Sticky technical drawing
 *  3. Services (4 offerings — sticky title + scrolling content)
 *  4. Testimonial moment (large quote + portrait)
 *  5. PROCESS (dark ink section, horizontal scroll with 4 steps,
 *     sticky title, top progress bar)
 *  6. Process outro (dark, centered CTA + image strip)
 *  7. FAQ accordion
 *  8. CTA banner (cream)
 *  9. Footer
 *
 * Palette: cream / ink / taupe / black only.
 */

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { FluidNavbar } from "@/components/ui/fluid-navbar";
import { Footer7 } from "@/components/ui/footer-7";

const EASE = [0.76, 0, 0.24, 1] as const;

/* ── Reveal helper ────────────────────────────────────── */
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

/* ── Data ─────────────────────────────────────────────── */
const SERVICES = [
  {
    code: "01",
    title: "Insights",
    body: "We start with research — site, brief, climate, light. Every project begins with weeks of careful listening before a single line is drawn.",
    points: ["Site analysis", "Brief refinement", "Feasibility & cost", "Stakeholder workshops"],
  },
  {
    code: "02",
    title: "Design",
    body: "Sketches harden into drawings, drawings into models, models into a single coherent proposal that we defend, refine and detail.",
    points: ["Concept design", "Technical drawings", "Material studies", "3D visualisation"],
  },
  {
    code: "03",
    title: "Build",
    body: "We oversee every trade on site, week after week, until the home reads exactly as it did on paper — and a little better.",
    points: ["Trade coordination", "Site supervision", "Quality control", "Programme management"],
  },
  {
    code: "04",
    title: "Aftercare",
    body: "After handover, we stay in touch. Buildings change with use; we are there to tune them, repair them and watch them age well.",
    points: ["12-month review", "Servicing", "Warranty", "Long-term partnership"],
  },
];

const PROCESS = [
  {
    step: "Step 01",
    title: "Design",
    body: "Six to twelve weeks of conversation, sketching and modelling. We finish with a single drawing set that everyone signs.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    step: "Step 02",
    title: "Site survey",
    body: "Lasers, levels and a clipboard. We measure the existing fabric until we know it as well as the architect who first drew it.",
    image: "https://images.unsplash.com/photo-1503594384566-461fe158e797?q=80&w=1400&auto=format&fit=crop",
  },
  {
    step: "Step 03",
    title: "Production",
    body: "Frames, glass, joinery and stone are made in our workshop and partner ateliers. Tolerances are tighter than the regulations require.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop",
  },
  {
    step: "Step 04",
    title: "Completion",
    body: "We hand over a finished, photographed, snag-free home. The keys come with a binder of every drawing and material we used.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "From first sketch to handover, expect 14 to 22 months for a single residence — longer for full restorations.",
  },
  {
    q: "Do you work outside Bratislava?",
    a: "Yes. We have completed projects across Slovakia, Austria and the Czech Republic, and welcome enquiries further afield.",
  },
  {
    q: "Can you work with my existing architect?",
    a: "Often, yes. We act as design-and-build partners on around a third of our projects, collaborating with the lead architect throughout.",
  },
  {
    q: "What is your fee structure?",
    a: "We work on a fixed-fee basis once the brief is agreed, with a small contingency for client-led variations. No surprises.",
  },
];

/* ── PROCESS — horizontal scroll section ──────────────── */
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((PROCESS.length - 1) / PROCESS.length) * 100}%`]
  );

  return (
    <section
      ref={ref}
      className="relative bg-ink text-cream"
      style={{ height: `${PROCESS.length * 120}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-16 left-6 md:left-16 right-6 md:right-16 h-px bg-cream/15 z-30">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left center" }}
            className="absolute inset-0 bg-cream"
          />
        </div>

        {/* Sticky title */}
        <div className="absolute top-24 left-6 md:left-16 z-30 label-mono opacity-60">
          The process — 04 steps
        </div>

        {/* Horizontal row */}
        <motion.div
          style={{ x, width: `${PROCESS.length * 100}vw` }}
          className="flex h-full"
        >
          {PROCESS.map((p) => (
            <div
              key={p.step}
              className="shrink-0 w-screen h-screen flex items-center px-6 md:px-16"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
                <div className="lg:pl-16">
                  <span className="label-mono opacity-60">{p.step}</span>
                  <h3 className="mt-6 text-[clamp(2.75rem,6vw,5.5rem)] font-light tracking-tight leading-[1] text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-8 max-w-md text-lg text-cream/75 font-light leading-relaxed">
                    {p.body}
                  </p>
                </div>
                <div className="relative aspect-[4/5] w-full max-w-[420px] mx-auto">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 420px, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ accordion item ───────────────────────────────── */
function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-ink/15">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 py-8 text-left group"
      >
        <span className="text-xl md:text-2xl font-light tracking-tight">
          <span className="label-mono opacity-50 mr-4">
            {String(idx + 1).padStart(2, "0")}
          </span>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="shrink-0 w-10 h-10 rounded-full border border-ink/30 flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-8 max-w-2xl text-lg text-ink/70 font-light leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ApproachPage() {
  /* Hero parallax on the technical drawing */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hp } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const drawY = useTransform(hp, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-cream text-ink">
      <FluidNavbar />

      {/* 1. HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} id="top" className="relative">
        <div className="px-6 md:px-16 pt-48 pb-24 max-w-7xl mx-auto">
          <Reveal>
            <span className="label-mono opacity-60">Approach</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight max-w-5xl">
              How we build a<br />home from scratch.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-lg md:text-xl text-ink/70 font-light leading-relaxed">
              Four phases, dozens of trades, hundreds of decisions — and a single
              relationship that begins with a conversation and never really ends.
            </p>
          </Reveal>
        </div>

        {/* 2. STICKY TECHNICAL DRAWING with parallax */}
        <div className="relative h-[80vh] overflow-hidden bg-taupe">
          <motion.div style={{ y: drawY }} className="absolute -inset-y-[10%] inset-x-0">
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
              alt="Technical drawing"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES ─────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="label-mono opacity-60">Services</span>
              <h2 className="mt-6 text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.1] tracking-tight">
                Four offerings, one practice.
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col">
            {SERVICES.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.05}>
                <div className="border-t border-ink/15 py-12">
                  <div className="flex items-baseline gap-6 mb-6">
                    <span className="label-mono opacity-50">{s.code}</span>
                    <h3 className="text-3xl md:text-4xl font-light tracking-tight">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-lg text-ink/70 font-light leading-relaxed max-w-xl">
                    {s.body}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3 max-w-xl">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-base font-light">
                        <span className="w-1.5 h-1.5 bg-ink rotate-45 flex-none" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL MOMENT ───────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-3">
            <div className="relative aspect-[3/4] grayscale">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
                alt="Client"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 80vw"
              />
            </div>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="text-[clamp(2rem,4.5vw,4.5rem)] font-light leading-[1.1] tracking-tight">
                &ldquo;They listened for months before they drew anything. The
                house we ended up with feels like it was always going to be
                here.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex items-baseline gap-6">
                <span className="text-2xl font-light">Anna Krajčí</span>
                <span className="label-mono opacity-60">Owner — Garden Residence</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. PROCESS — horizontal scroll ──────────────────────── */}
      <ProcessSection />

      {/* 6. PROCESS OUTRO ────────────────────────────────────── */}
      <section className="bg-ink text-cream py-40 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="label-mono opacity-60">After handover</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-[clamp(2.25rem,4.8vw,4.8rem)] font-light leading-[1.1] tracking-tight">
              Every project is the start of a long relationship.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-cream/75 font-light leading-relaxed max-w-xl mx-auto">
              We come back to every house we build — at six months, twelve months,
              and whenever the owner asks. The buildings teach us what to do next.
            </p>
          </Reveal>
        </div>

        {/* Image strip */}
        <Reveal delay={0.3}>
          <div className="mt-20 flex gap-6 overflow-hidden justify-center">
            {[
              { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop", w: "16/9" },
              { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop", w: "11/16" },
              { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", w: "16/9" },
            ].map((img, i) => (
              <div
                key={i}
                className="relative h-64 md:h-80"
                style={{ aspectRatio: img.w }}
              >
                <Image src={img.src} alt="" fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 7. FAQ ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="label-mono opacity-60">FAQ</span>
            <h2 className="mt-6 text-[clamp(2rem,3.5vw,3.5rem)] font-light tracking-tight leading-[1.1]">
              Questions, answered.
            </h2>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} idx={i} />
            ))}
            <div className="border-t border-ink/15" />
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER ───────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto border border-ink/20 px-6 md:px-24 py-32 md:py-44 text-center">
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-light leading-[1] tracking-tight max-w-4xl mx-auto">
              Ready to start a<br />conversation?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:hello@residencia.sk"
                className="inline-flex items-center gap-3 bg-ink text-cream rounded-full px-8 py-4 label-mono hover:opacity-90 fluid-transition"
              >
                Get in touch <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="/#categories"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 label-mono border border-ink/30 hover:bg-ink hover:text-cream fluid-transition"
              >
                See the collection
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer7 />
    </div>
  );
}
