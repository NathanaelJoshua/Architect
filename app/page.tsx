"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Footer7 } from "@/components/ui/footer-7";
import { FluidNavbar } from "@/components/ui/fluid-navbar";

/* ─────────────────────────────────────────────────────────────
   Architect — homepage modeled on findrealestate.com layout
   Sections:
     1. Intro loader
     2. Fluid navbar
     3. Parallax layered hero
     4. Why Architect
     5. Identity / Values (4 stacked image cards)
     6. Process (3 steps)
     7. Agent opportunity
     8. Testimonials
     9. Services (Buy / Sell / Rent)
    10. Support services (Mortgage / Management / Development)
    11. Journal (blog)
    12. Newsletter CTA
    13. Footer
   ───────────────────────────────────────────────────────────── */

const testimonials = [
  {
    text: "Architect connected us with an agent who actually listened. We closed on our dream home in three weeks.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Buyer",
  },
  {
    text: "Selling through Architect was effortless. The team handled every detail with quiet confidence.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Seller",
  },
  {
    text: "Finally a platform that treats real estate like a craft, not a transaction.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Investor",
  },
  {
    text: "The agent equity model is the future. I own my book of business now.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Agent",
  },
  {
    text: "Clarity from the very first call. No pressure, no jargon, just answers.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Buyer",
  },
  {
    text: "Architect's mortgage team made financing painless and transparent.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Buyer",
  },
  {
    text: "I trust their property management implicitly. Zero headaches.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Owner",
  },
  {
    text: "The most thoughtful real estate experience I've ever had.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Buyer",
  },
  {
    text: "From listing to closing, Architect made the process feel designed.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Seller",
  },
];

const values = [
  {
    title: "Identity",
    body: "Real estate is personal. We work with people who treat their home as an extension of who they are.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Progress",
    body: "Every move forward should feel deliberate. We design the path, you set the pace.",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Alignment",
    body: "Our agents only win when you do. No quotas, no pressure — just shared outcomes.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Craft",
    body: "We treat every transaction like architecture: structured, considered, built to last.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
  },
];

const steps = [
  {
    n: "01",
    title: "Talk to a real human",
    body: "Skip the chatbots. Begin with a conversation that respects your time.",
  },
  {
    n: "02",
    title: "Get clarity",
    body: "We map the market, the math, and the moves — until your next step is obvious.",
  },
  {
    n: "03",
    title: "Move forward",
    body: "When you're ready, we execute with the precision of a studio, not a sales floor.",
  },
];

const services = [
  {
    name: "Buy",
    tag: "Find your place",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Sell",
    tag: "Close with confidence",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Rent",
    tag: "Live without compromise",
    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
  },
];

const support = [
  {
    name: "Mortgage",
    body: "Financing aligned with your timeline, not the bank's.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Management",
    body: "Hands-off ownership for properties that pay you back.",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Development",
    body: "From land to legacy — full-service construction partners.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
  },
];

const journal = [
  {
    date: "Apr 2026",
    title: "The quiet rise of agent-owned brokerages",
    excerpt: "Why the next decade of real estate belongs to the operator-agent.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    date: "Mar 2026",
    title: "Reading a market without reading the news",
    excerpt: "Three signals that tell you more than any quarterly report.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
  },
  {
    date: "Feb 2026",
    title: "Designing a home that holds its value",
    excerpt: "Material choices that compound over twenty years of ownership.",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative bg-cream text-ink">
      {/* 1. INTRO LOADER */}
      <div className="intro-fade fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream">
        <div className="cube-spin w-12 h-12 border border-ink/30 rotate-45 mb-6" />
        <span className="label-mono text-ink/70">Architect</span>
      </div>

      {/* 2. NAV */}
      <FluidNavbar />

      {/* 3. PARALLAX HERO */}
      <section
        ref={heroRef}
        id="top"
        className="relative h-screen w-full overflow-hidden bg-ink text-cream"
      >
        <motion.div style={{ y: yBack }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2400&auto=format&fit=crop"
            alt="Sky"
            fill
            priority
            className="object-cover opacity-50"
          />
        </motion.div>
        <motion.div style={{ y: yMid }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop"
            alt="Architecture"
            fill
            className="object-cover opacity-60 mix-blend-luminosity"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        <motion.div
          style={{ y: yFront, opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="label-mono opacity-80"
          >
            Architect — Real estate, redesigned
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 2.1 }}
            className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] tracking-tight max-w-5xl font-light mt-6"
          >
            Find a place
            <br />
            <em className="font-serif italic">worth staying</em>.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="mt-12"
          >
            <a
              href="#services"
              className="glass text-white rounded-full px-8 py-4 label-mono inline-flex items-center gap-3"
            >
              Find properties <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6 md:px-16 label-mono text-cream/80 z-10">
          <span>Est. 2026</span>
          <span className="flex items-center gap-2">
            Scroll <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </section>

      {/* 4. WHY ARCHITECT */}
      <section className="px-6 md:px-16 py-32 max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label-mono text-ink/60"
        >
          Why Architect — 01
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true }}
          className="text-[clamp(1.5rem,3vw,3rem)] leading-[1.2] font-light tracking-tight mt-6"
        >
          We rebuilt real estate around the people who actually live in it.
          Honest agents, transparent process, and a team that treats your move
          like the milestone it is.
        </motion.p>
      </section>

      {/* 5. VALUES — 4 stacked image cards */}
      <section id="about" className="px-6 md:px-16 pb-32">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="label-mono text-ink/60">What we stand for — 02</span>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={v.img} alt={v.title} fill className="object-cover" />
              </div>
              <div>
                <span className="label-mono text-ink/50">0{i + 1}</span>
                <h3 className="text-3xl md:text-5xl font-light tracking-tight mt-3">
                  {v.title}
                </h3>
                <p className="mt-4 text-ink/70 max-w-md text-lg leading-relaxed">
                  {v.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. PROCESS */}
      <section className="px-6 md:px-16 py-32 bg-ink text-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 divider-hair pt-6 border-cream/20">
            <span className="label-mono opacity-70">Process — 03</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              Three steps. No theatrics.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="border-t border-cream/20 pt-6"
              >
                <span className="label-mono opacity-60">{s.n}</span>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight mt-4">
                  {s.title}
                </h3>
                <p className="mt-4 text-cream/70 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AGENT OPPORTUNITY */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                alt="Agent"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mt-12">
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop"
                alt="Agent"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <span className="label-mono text-ink/60">For agents — 04</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mt-4">
              Own your book.
              <br />
              <em className="font-serif italic">Build equity</em>.
            </h2>
            <p className="mt-6 text-ink/70 text-lg max-w-md leading-relaxed">
              Architect agents earn equity in the platform they grow. No splits
              that punish performance — just a model built around the people
              doing the work.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-3 label-mono group"
            >
              Join the movement
              <span className="w-10 h-10 rounded-full glass-dark text-white flex items-center justify-center group-hover:rotate-45 fluid-transition">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section id="stories" className="px-6 md:px-16 py-32 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 divider-hair pt-6">
            <span className="label-mono">Stories — 05</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              What our clients say
            </h2>
          </div>
          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[640px] overflow-hidden">
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} />
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

      {/* 9. SERVICES */}
      <section id="services" className="px-6 md:px-16 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 divider-hair pt-6">
            <span className="label-mono">Services — 06</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              Buy. Sell. Rent.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.a
                key={s.name}
                href="#"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    className="object-cover group-hover:scale-105 fluid-transition"
                  />
                </div>
                <div className="flex justify-between items-baseline mt-4">
                  <h3 className="text-2xl font-light tracking-tight">{s.name}</h3>
                  <span className="label-mono text-ink/60">{s.tag}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SUPPORT SERVICES */}
      <section className="px-6 md:px-16 py-32 bg-ink/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 divider-hair pt-6">
            <span className="label-mono">Adjacent — 07</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              Beyond the listing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {support.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={s.img} alt={s.name} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light tracking-tight">{s.name}</h3>
                  <p className="mt-3 text-ink/70 leading-relaxed">{s.body}</p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 label-mono"
                  >
                    Learn more <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. JOURNAL */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 divider-hair pt-6">
            <span className="label-mono">Journal — 08</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-md text-right">
              Recent thinking
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {journal.map((j, i) => (
              <motion.article
                key={j.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={j.img}
                    alt={j.title}
                    fill
                    className="object-cover group-hover:scale-105 fluid-transition"
                  />
                </div>
                <span className="label-mono text-ink/50 mt-4 block">{j.date}</span>
                <h3 className="text-xl md:text-2xl font-light tracking-tight mt-2">
                  {j.title}
                </h3>
                <p className="mt-2 text-ink/70 leading-relaxed">{j.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-2 label-mono">
                  Read more <ArrowRight className="w-3 h-3" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEWSLETTER CTA */}
      <section
        id="contact"
        className="relative px-6 md:px-16 py-40 bg-ink text-cream overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="label-mono opacity-70">Stay close</span>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-light tracking-tight leading-[1] mt-6">
            Move with
            <br />
            <em className="font-serif italic">intention</em>.
          </h2>
          <p className="mt-6 text-cream/70 max-w-md mx-auto">
            One thoughtful email a month. Market signals, new listings, and the
            occasional essay.
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
              Subscribe <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 13. FOOTER */}
      <Footer7 />
    </div>
  );
}
