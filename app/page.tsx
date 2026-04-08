"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
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

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative bg-cream text-ink">
      {/* 1. INTRO LOADER — fluid.glass inspired */}
      <FluidIntro />

      {/* 2. NAV */}
      <FluidNavbar />

      {/* 3. HERO — centered, glass-button */}
      <section
        ref={heroRef}
        id="top"
        data-no-reveal
        className="relative h-screen w-full overflow-hidden bg-[#212325] text-cream"
      >
        <motion.div style={{ y: yBack }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop"
            alt="Architecture"
            fill
            priority
            className="object-cover opacity-40"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

        <motion.div
          style={{ y: yFront, opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="label-mono uppercase tracking-[0.1em] text-cream/70"
          >
            Glazing specialists
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.455, 0.03, 0.515, 0.955],
              delay: 2.5,
            }}
            className="text-[clamp(2.75rem,6.4vw,6.4rem)] leading-[1] tracking-[-0.03em] max-w-5xl font-light mt-6"
          >
            Exceptional glazing
            <br />
            for those who build
            <br />
            <em className="font-serif italic">with vision</em>.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="mt-12"
          >
            <a
              href="#about"
              className="rounded-full px-8 py-4 label-mono uppercase tracking-[0.1em] inline-flex items-center gap-3 text-white border border-white/25 backdrop-blur-2xl bg-white/5 hover:bg-white/15 fluid-transition"
            >
              View our work <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6 md:px-16 label-mono uppercase tracking-[0.1em] text-cream/70 z-10">
          <span>Est. 2026</span>
          <span className="flex items-center gap-2">
            Scroll <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </section>

      {/* 4. ABOUT — fluid.glass inspired */}
      <FluidAbout />

      {/* 5. PROJECTS SHOWCASE */}
      <ProjectsShowcase />

      {/* 6. TESTIMONIALS */}
      <section id="stories" className="px-6 md:px-16 py-32 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 divider-hair pt-6">
            <span className="label-mono">Stories — 03</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              What our clients say
            </h2>
          </div>
          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[640px] overflow-hidden">
            <TestimonialsColumn
              testimonials={testimonials.slice(0, 3)}
              duration={15}
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(3, 6)}
              className="hidden md:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(6, 9)}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER CTA */}
      <section
        id="contact"
        className="relative px-6 md:px-16 py-40 bg-ink text-cream overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="label-mono opacity-70">Begin a project</span>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-light tracking-tight leading-[1] mt-6">
            Build the home
            <br />
            <em className="font-serif italic">you imagined</em>.
          </h2>
          <p className="mt-6 text-cream/70 max-w-md mx-auto">
            Tell us about your site, your family, and the way you want to live.
            We'll take it from there.
          </p>
          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@domain.com"
              className="flex-1 rounded-full px-6 py-4 bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 outline-none focus:border-white/60 fluid-transition"
            />
            <button
              type="submit"
              className="glass text-white rounded-full px-6 py-4 label-mono inline-flex items-center justify-center gap-3"
            >
              Get in touch <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 8. FOOTER */}
      <Footer7 />
    </div>
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
