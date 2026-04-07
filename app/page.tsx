"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Footer7 } from "@/components/ui/footer-7";
import { FluidNavbar } from "@/components/ui/fluid-navbar";
import { CollectionScroll } from "@/components/ui/collection-scroll";

/* ─────────────────────────────────────────────────────────────
   Residencia Jurská — restyled in the fluid.glass design system
   Sections (mirrors fluid.glass homepage order):
     1. Intro loader
     2. Header (glass)
     3. Hero (dark)
     4. Philosophy text block
     5. About callout card
     6. 4-col category grid (hover-reveal images)
     7. Sales gallery banner (full-width dark)
     8. Featured residences grid
     9. Mood image blocks
    10. Resident stories carousel
    11. CTA banner
    12. Footer
   ───────────────────────────────────────────────────────────── */

const testimonials = [
  {
    text: "Living at Residencia Jurská has exceeded all my expectations. The luxury finishes and smart home technology make every day feel special.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Resident",
  },
  {
    text: "The location is perfect — close to everything, yet peaceful and private. The building's design is stunning.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Resident",
  },
  {
    text: "Exceptional service from the management team. Any issues are resolved quickly and professionally.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Resident",
  },
  {
    text: "The investment has been outstanding. Property values continue to rise, and the quality is unmatched.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Owner",
  },
  {
    text: "The amenities and common areas are beautifully maintained. A true community of like-minded people.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Resident",
  },
  {
    text: "Energy efficiency and modern systems save on utilities while providing comfort. Best decision I made.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Resident",
  },
  {
    text: "The architecture blends traditional elegance with modern functionality. It's a masterpiece.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Architect",
  },
  {
    text: "Safe, spacious, with excellent facilities for children and adults alike.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Resident",
  },
  {
    text: "The views are breathtaking. Waking up to this scenery every morning is priceless.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Resident",
  },
];

const projects = [
  {
    name: "The Garden Residence",
    tag: "Penthouse · 240 m²",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Atelier Loft 04",
    tag: "Apartment · 96 m²",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Skyline Suite",
    tag: "Penthouse · 310 m²",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Courtyard House",
    tag: "Apartment · 142 m²",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="relative bg-cream text-ink">
      {/* 1. INTRO LOADER ─────────────────────────────────────── */}
      <div className="intro-fade fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream">
        <div className="cube-spin w-12 h-12 border border-ink/30 rotate-45 mb-6" />
        <span className="label-mono text-ink/70">Residencia Jurská</span>
      </div>
      {/* 2. HEADER (fluid.glass-style fixed bottom-center bar) */}
      <FluidNavbar />
      {/* 3. HERO ──────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative h-screen w-full overflow-hidden bg-ink text-cream"
      >
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
          alt="Residencia Jurská"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 2 }}
            className="text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] tracking-tight max-w-5xl font-light"
          >
            Exceptional living for those who build with vision.
          </motion.h1>
          <div className="mt-10 flex items-center justify-between label-mono">
            <span>Bratislava — Est. 2025</span>
            <span className="flex items-center gap-2">
              Scroll <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </section>
      {/* 4. PHILOSOPHY ────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true }}
          className="text-[clamp(1.5rem,3vw,3rem)] leading-[1.2] font-light tracking-tight"
        >
          We craft homes for those who refuse compromise. Every surface, joint
          and sightline is considered — designed by architects, finished by
          artisans, and built to outlast a generation.
        </motion.p>
      </section>
      {/* 5. ABOUT CALLOUT ─────────────────────────────────────── */}
      <section id="about" className="px-6 md:px-16 pb-32">
        <div className="max-w-6xl mx-auto glass rounded-2xl p-10 md:p-16 flex flex-col md:flex-row gap-10 md:items-end justify-between">
          <div>
            <span className="label-mono text-ink/60">About — 01</span>
            <h2 className="text-3xl md:text-5xl font-light mt-4 max-w-xl tracking-tight">
              A practice rooted in material honesty and quiet luxury.
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-3 label-mono whitespace-nowrap"
          >
            Read our story
            <span className="w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center group-hover:rotate-45 fluid-transition">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>
      {/* 6. COLLECTION (jurska.sk-style sticky scroll) ───────── */}
      <CollectionScroll />
      {/* 7. SALES GALLERY BANNER ────────────────────────────────
      <section
        id="gallery"
        className="relative h-[70vh] w-full overflow-hidden bg-ink text-cream"
      >
        <Image
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2000&auto=format&fit=crop"
          alt="Sales gallery"
          fill
          className="object-cover opacity-50"
        />
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-16">
          <span className="label-mono">Visit — 03</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight max-w-2xl">
                The sales gallery,
                <br />
                Jurská 123, Bratislava.
              </h2>
              <p className="label-mono mt-4 opacity-70">
                By appointment — Mon to Sat
              </p>
            </div>
            <button className="glass text-white rounded-full px-6 py-3 label-mono inline-flex items-center gap-3 self-start md:self-auto">
              Book a viewing <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section> */}
      {/* 8. FEATURED RESIDENCES ───────────────────────────────── */}
      {/* <section id="projects" className="px-6 md:px-16 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 divider-hair pt-6">
            <span className="label-mono">Featured — 04</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              Selected residences
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.name} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 fluid-transition"
                  />
                </div>
                <div className="flex justify-between items-baseline mt-4">
                  <h3 className="text-xl md:text-2xl font-light tracking-tight">
                    {p.name}
                  </h3>
                  <span className="label-mono text-ink/60">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* 9. MOOD IMAGES ───────────────────────────────────────── */}
      {/* <section className="space-y-1">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2000&auto=format&fit=crop"
            alt="Mood"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop"
            alt="Mood"
            fill
            className="object-cover"
          />
        </div>
      </section> */}
      {/* 10. RESIDENT STORIES ─────────────────────────────────── */}
      <section id="stories" className="px-6 md:px-16 py-32 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 divider-hair pt-6">
            <span className="label-mono">Stories — 05</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              What our residents say
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
      {/* 11. CTA BANNER ───────────────────────────────────────── */}
      <section
        id="contact"
        className="relative px-6 md:px-16 py-40 bg-ink text-cream overflow-hidden"
      >
        <div className="max-w-6xl mx-auto text-center">
          <span className="label-mono opacity-70">
            Where vision meets execution
          </span>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-light tracking-tight leading-[1] mt-6">
            Become a<br />
            <em className="font-serif italic">resident</em>.
          </h2>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:hello@residencia.sk"
              className="glass text-white rounded-full px-8 py-4 label-mono inline-flex items-center gap-3"
            >
              Get in touch <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#categories"
              className="rounded-full px-8 py-4 label-mono inline-flex items-center gap-3 border border-white/30 hover:bg-white/10 fluid-transition"
            >
              Browse residences
            </a>
          </div>
        </div>
      </section>
      {/* 12. FOOTER ───────────────────────────────────────────── */}
      <Footer7 />
    </div>
  );
}
