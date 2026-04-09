"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Footer7 } from "@/components/ui/footer-7";
import { FluidNavbar } from "@/components/ui/fluid-navbar";

/* ─────────────────────────────────────────────────────────────
   Architect — Home Architect Specialist
   Sections:
     1. Intro loader
     2. Fluid navbar
     3. Parallax layered hero
     4. Why Architect (intro)
     5. Immersive projects (full-bleed scroll showcase)
     6. Testimonials
     7. Newsletter CTA
     8. Footer
   ───────────────────────────────────────────────────────────── */

const testimonials = [
  {
    text: "They redesigned our family home with a sensitivity we didn't think was possible. Every room finally makes sense.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Homeowner",
  },
  {
    text: "From the first sketch to the final walkthrough, the process felt like a true collaboration.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Homeowner",
  },
  {
    text: "A studio that treats a private home with the same rigor as a major commission.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Client",
  },
  {
    text: "They listened, then they delivered something better than we knew how to ask for.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Homeowner",
  },
  {
    text: "Quiet, considered, and absolutely uncompromising on craft. We couldn't be happier.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Client",
  },
  {
    text: "They reshaped a tired bungalow into the home we'll grow old in.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Homeowner",
  },
  {
    text: "Material choices, light, proportion — everything was thought through twice.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Client",
  },
  {
    text: "The most thoughtful design experience we've ever had.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Homeowner",
  },
  {
    text: "A home that feels like it was always meant to be there.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Client",
  },
];

const projects = [
  {
    name: "Courtyard House",
    location: "Bratislava, SK",
    body: "A single-storey family home wrapped around a sunlit courtyard, blurring the line between living room and garden.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { value: "3,140", unit: "sq ft" },
      { value: "4", unit: "bedrooms · 1 courtyard" },
      { value: "11", unit: "months" },
    ],
  },
  {
    name: "The Glass Pavilion",
    location: "Vienna, AT",
    body: "A weekend retreat resting lightly on the landscape, framed entirely in steel and glass.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { value: "1,820", unit: "sq ft" },
      { value: "1", unit: "open-plan pavilion" },
      { value: "8", unit: "months" },
    ],
  },
  {
    name: "Stone & Oak Residence",
    location: "Tatra Foothills, SK",
    body: "An alpine home built from local stone and reclaimed oak, designed to weather a hundred winters.",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { value: "4,260", unit: "sq ft" },
      { value: "5", unit: "bedrooms · 2 fireplaces" },
      { value: "14", unit: "months" },
    ],
  },
  {
    name: "The Atelier Loft",
    location: "Prague, CZ",
    body: "A historic top-floor apartment reimagined as an open studio for an artist couple.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { value: "1,540", unit: "sq ft" },
      { value: "1", unit: "studio · 1 mezzanine" },
      { value: "6", unit: "months" },
    ],
  },
];

const products = [
  {
    title: "Doors",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Windows",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Additional",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Structural",
    img: "https://images.unsplash.com/photo-1600573472556-e636c2acda88?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="relative bg-cream text-ink">
      {/* 1. INTRO LOADER — fluid.glass inspired */}
      <FluidIntro />

      {/* 2. NAV */}
      <FluidNavbar />

      {/* 3. HERO — sketch, then parallax finished architecture */}
      <SketchToHouseHero />

      {/* 4. ABOUT — fluid.glass inspired */}
      <FluidAbout />

      {/* 4b. PRODUCT COLLECTION */}
      <ProductCollection />

      {/* 5. PROJECTS SHOWCASE */}
      <ProjectsShowcase />

      {/* 6. TESTIMONIALS — fluid.glass blockquote carousel */}
      <FluidTestimonials />

      {/* 7. CTA BANNER — "Where vision meets execution" */}
      <FluidCtaBanner />

      {/* 8. FOOTER */}
      <Footer7 />
    </div>
  );
}

/* ─── Sketch → photo hero (fluid.glass approach) ─────────────
   A pinned section. Heading sits at top. Below it, the same
   image is rendered twice: once through an SVG edge-detect
   filter (line art), once unfiltered (photo). As the user
   scrolls, a clip-path on the photo layer wipes upward, so
   the building "becomes real" from the ground up — sketch
   above the wipe line, finished photo below it.
   ───────────────────────────────────────────────────────────── */
function SketchToHouseHero() {
  const wipeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wipeRef,
    offset: ["start start", "end end"],
  });
  // Wipe: photo reveals from bottom up over the sketch as user scrolls
  // through the pinned stage.
  const wipe = useTransform(scrollYProgress, [0.1, 0.85], [100, 0]);
  const wipeClip = useMotionTemplate`inset(${wipe}% 0 0 0)`;
  // "Into reality" overlay — fades in alongside the wipe and stays.
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.25, 0.45], [40, 0]);
  // Zoom: both images scale up subtly as the user scrolls through the stage.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);

  return (
    <section
      id="top"
      data-no-reveal
      className="relative w-full bg-cream text-ink"
    >
      {/* Text block */}
      <div className="w-full px-6 pt-50  0 md:pt-46 pb-16 md:pb-15 text-center">
        <h1 className=" font-sans text-[clamp(2rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.02em] font-medium max-w-[20ch] mx-auto">
          Bring your
          <div className="font-serif italic font-normal">
            imagination to life
          </div>
        </h1>
      </div>

      {/* Sketch → finished wipe.
          Tall wrapper provides scroll budget; inner sticky pins
          the image stage, and the photo wipes up over the sketch. */}
      <div
        ref={wipeRef}
        className="relative w-full"
        style={{ height: "220vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-cream p-[15px]">
          <div
            className="relative w-full max-h-full"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Sketch — multiply blend drops the white paper to the cream canvas */}
            <motion.div
              style={{ scale: imgScale }}
              className="absolute inset-0 mix-blend-multiply"
            >
              <Image
                src="/sketche-house.png"
                alt="Architectural sketch"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            {/* Finished photo — wipes up from bottom */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: wipeClip, WebkitClipPath: wipeClip }}
            >
              <motion.div
                style={{ scale: imgScale }}
                className="absolute inset-0"
              >
                <Image
                  src="/finished-house.png"
                  alt="Finished house"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* "Into reality" overlay — fades in with the wipe */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference"
            >
              <span className="text-white text-[clamp(2.5rem,8vw,8rem)] leading-none tracking-[-0.02em] font-sans font-medium">
                into <em className="font-serif italic font-normal">reality</em>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Small helper: a word inside a line-mask (fluid.glass reveal) */
function Word({
  children,
  delay,
  italic,
}: {
  children: React.ReactNode;
  delay: number;
  italic?: boolean;
}) {
  const ease = [0.455, 0.03, 0.515, 0.955] as const;
  return (
    <span
      aria-hidden
      className="inline-block overflow-hidden leading-[1.15] py-[0.05em]"
    >
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease, delay }}
        className={`inline-block ${italic ? "font-serif italic" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ─── Fluid intro loader (fluid.glass inspired) ──────────────
   Cream full-screen overlay with a 3D-rotating cube + brand,
   then fades out after ~1.8s. ease-in-out-quad easing.
   ───────────────────────────────────────────────────────────── */
function FluidIntro() {
  const [hidden, setHidden] = useState(false);
  const [pointerOff, setPointerOff] = useState(false);
  const ease = [0.455, 0.03, 0.515, 0.955] as const;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onAnimationComplete={() => hidden && setPointerOff(true)}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      style={{ pointerEvents: pointerOff ? "none" : "auto" }}
    >
      <div className="[perspective:800px]">
        <motion.div
          initial={{
            rotateX: -30,
            rotateY: -315,
            scaleY: 0.78,
            opacity: 0,
          }}
          animate={{ rotateX: 0, rotateY: 0, scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease }}
          onAnimationComplete={() => setTimeout(() => setHidden(true), 250)}
          className="w-14 h-14 border border-ink/40 [transform-style:preserve-3d]"
        />
      </div>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="label-mono uppercase tracking-[0.1em] text-ink/70 mt-8"
      >
        Architect
      </motion.span>
    </motion.div>
  );
}

/* ─── Fluid about section (fluid.glass inspired) ─────────────
   24-col grid manifesto, three values (Clarity / Craft / Care),
   line-mask reveal animations on scroll, grayscale imagery.
   ───────────────────────────────────────────────────────────── */
const fluidValues = [
  {
    title: "Clarity",
    body: "Briefs distilled to their essence — every decision serves the people who will live with it.",
  },
  {
    title: "Craft",
    body: "An obsession with detail, material, and the joinery nobody is supposed to notice.",
  },
  {
    title: "Care",
    body: "Calm collaboration with architects, builders, and owners from first sketch to handover.",
  },
];

function FluidAbout() {
  const ease = [0.455, 0.03, 0.515, 0.955] as const;
  const lines = [
    "We bring architecture to life through",
    { italic: "craft and innovation" },
    ". Trusted by architects who",
    "demand precision, beauty, and care.",
  ] as const;

  return (
    <section id="about" className="relative bg-cream text-ink overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-40 md:py-56 text-center">
        {/* eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center justify-center gap-3 label-mono uppercase tracking-[0.1em] text-ink/70 text-sm"
        >
          <span className="text-ink">◆</span>
          <span>About Architect</span>
        </motion.div>

        {/* line-mask headline */}
        <h2 className="mt-12 text-[clamp(1.5rem,3.2vw,3rem)] font-light leading-[1.15] tracking-[-0.02em] max-w-3xl mx-auto">
          {[
            "Quiet homes designed for the people",
            { text: "who will live in them — drawn slowly,", italic: "slowly" },
            "built with patience, finished with care.",
          ].map((line, i) => {
            const isObj = typeof line === "object";
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: 0.12 * i, ease }}
                className="block"
              >
                {isObj ? (
                  <>
                    who will live in them — drawn{" "}
                    <em className="font-serif italic">slowly</em>,
                  </>
                ) : (
                  (line as string)
                )}
              </motion.span>
            );
          })}
        </h2>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-3 bg-ink text-cream rounded-none px-7 py-4 label-mono uppercase tracking-[0.1em] text-sm hover:bg-ink/85 fluid-transition group"
          >
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 fluid-transition" />
            Who we are
          </a>
        </motion.div>
      </div>

      {/* unused but kept for reference suppression */}
      {false && fluidValues.length}
    </section>
  );
}

/* ─── Projects showcase ──────────────────────────────────────
   Padded slideshow — no scroll-jacking. Picture and text
   crossfade to the next project on click. A vertical track
   on the right acts as a custom scrollbar / index showing
   the active project (click a tick to jump).
   ───────────────────────────────────────────────────────────── */
function ProjectsShowcase() {
  const total = projects.length;
  const [active, setActive] = useState(0);
  const ease = [0.76, 0, 0.24, 1] as const;

  // auto-advance every 6s
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  const p = projects[active];

  return (
    <section
      id="projects"
      className="relative bg-ink text-cream h-screen w-full overflow-hidden"
    >
      {/* image crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={p.name}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease }}
          className="absolute inset-0"
        >
          <Image
            src={p.img}
            alt={p.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* top bar — title + ticks */}
      <div className="absolute top-16 left-6 md:left-16 right-6 md:right-16 flex items-center justify-between z-20">
        <span className="label-mono opacity-60">
          Selected work — 0{total} residences
        </span>
        <div className="flex items-center gap-3">
          {projects.map((proj, i) => (
            <button
              key={proj.name}
              onClick={() => setActive(i)}
              aria-label={`Show ${proj.name}`}
              className="relative h-px w-10 md:w-14 bg-cream/25 fluid-transition"
            >
              <motion.span
                initial={false}
                animate={{ scaleX: i === active ? 1 : 0 }}
                transition={{ duration: 0.6, ease }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 bg-cream"
              />
            </button>
          ))}
        </div>
      </div>

      {/* text — bottom */}
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 pb-20 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.name + "-text"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="label-mono opacity-70">
                Project — {String(active + 1).padStart(2, "0")} · {p.location}
              </span>
              <h3 className="mt-6 text-[clamp(2.75rem,6vw,5.5rem)] font-light tracking-tight leading-[0.95] text-cream max-w-4xl">
                {p.name}
              </h3>
              <p className="mt-6 max-w-xl text-base md:text-lg text-cream/80 font-light leading-relaxed">
                {p.body}
              </p>
              <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
                {p.stats.map((s, si) => (
                  <div key={si} className="flex items-baseline gap-3">
                    <span className="text-2xl md:text-3xl font-light leading-none">
                      {s.value}
                    </span>
                    <span className="label-mono opacity-65 text-xs">
                      {s.unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── Product Collection ─────────────────────────────────────
   24-col grid (6-col mobile) of four product blocks. Hover
   lifts the image slightly and fades in a label arrow.
   ───────────────────────────────────────────────────────────── */
function ProductCollection() {
  const ease = [0.455, 0.03, 0.515, 0.955] as const;
  return (
    <section
      id="collection"
      className="relative bg-cream text-ink px-6 md:px-16 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 divider-hair pt-6">
          <span className="label-mono">Collection — 02</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] max-w-md text-right">
            Built for those who
            <br />
            <em className="font-serif italic">build with vision</em>.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((prod, i) => (
            <motion.a
              key={prod.title}
              href="#projects"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease }}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
                <Image
                  src={prod.img}
                  alt={prod.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover fluid-transition group-hover:scale-[1.04] opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="label-mono uppercase tracking-[0.08em] text-xs">
                  0{i + 1} — {prod.title}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:rotate-45 fluid-transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Fluid Testimonials ─────────────────────────────────────
   Single-active blockquote carousel. Large quote text, client
   photo (grayscale), prev/next nav. Crossfade between slides.
   ───────────────────────────────────────────────────────────── */
function FluidTestimonials() {
  const slides = testimonials.slice(0, 5);
  const [active, setActive] = useState(0);
  const ease = [0.76, 0, 0.24, 1] as const;
  const total = slides.length;
  const t = slides[active];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % total), 7000);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section
      id="stories"
      className="relative bg-cream text-ink px-6 md:px-16 py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 divider-hair pt-6">
          <span className="label-mono">Stories — 03</span>
          <span className="label-mono opacity-60">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* photo */}
          <div className="md:col-span-4 lg:col-span-3 order-2 md:order-1">
            <div className="relative w-[173px] h-[213px] overflow-hidden bg-ink/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="173px"
                    className="object-cover grayscale"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* quote */}
          <div className="md:col-span-8 lg:col-span-9 order-1 md:order-2">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.8, ease }}
                className="text-[clamp(1.75rem,4.2vw,4rem)] font-light leading-[1.1] tracking-[-0.02em]"
              >
                <span className="font-serif italic opacity-50 mr-2">“</span>
                {t.text}
                <span className="font-serif italic opacity-50 ml-1">”</span>
                <footer className="mt-10 label-mono uppercase tracking-[0.08em] text-xs opacity-70">
                  {t.name} — {t.role}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={() => setActive((a) => (a - 1 + total) % total)}
                aria-label="Previous"
                className="w-12 h-12 rounded-full border border-ink/25 flex items-center justify-center hover:bg-ink hover:text-cream fluid-transition"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % total)}
                aria-label="Next"
                className="w-12 h-12 rounded-full border border-ink/25 flex items-center justify-center hover:bg-ink hover:text-cream fluid-transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Fluid CTA Banner ───────────────────────────────────────
   Bordered container, two buttons. "Where vision meets
   execution". Inspired by fluid.glass closing CTA.
   ───────────────────────────────────────────────────────────── */
function FluidCtaBanner() {
  const ease = [0.455, 0.03, 0.515, 0.955] as const;
  return (
    <section
      id="contact"
      className="relative bg-cream text-ink px-6 md:px-16 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="relative border border-ink/25 px-8 md:px-20 py-20 md:py-32 text-center overflow-hidden"
        >
          <span className="label-mono opacity-70">Begin a project</span>
          <h2 className="mt-8 text-[clamp(2.5rem,6.4vw,6.4rem)] font-light tracking-[-0.03em] leading-[1]">
            Where vision meets
            <br />
            <em className="font-serif italic">execution</em>.
          </h2>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#collection"
              className="inline-flex items-center justify-center gap-3 bg-ink text-cream px-8 py-4 label-mono uppercase tracking-[0.08em] text-xs hover:bg-ink/85 fluid-transition group"
            >
              Visit showroom
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 fluid-transition" />
            </a>
            <a
              href="mailto:hello@architect.studio"
              className="inline-flex items-center justify-center gap-3 border border-ink/30 px-8 py-4 label-mono uppercase tracking-[0.08em] text-xs hover:bg-ink hover:text-cream fluid-transition group"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 fluid-transition" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
