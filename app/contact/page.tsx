"use client";

/**
 * /contact — fluid.glass-style contact page.
 *
 * Sections:
 *  1. Hero — title + intro
 *  2. Contact form (left) + contact details / hours / map (right)
 *  3. Showroom card with image
 *  4. Footer
 *
 * Palette: cream / ink / taupe / black only.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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

const FIELDS = [
  { name: "name",    label: "Name",         type: "text",  placeholder: "Your name", span: 1 },
  { name: "email",   label: "Email",        type: "email", placeholder: "you@email.com", span: 1 },
  { name: "phone",   label: "Phone",        type: "tel",   placeholder: "+421 …", span: 1 },
  { name: "subject", label: "Interest",     type: "select", options: [
      "Apartment", "Penthouse", "Wellness", "Investment", "Press / Other",
    ], span: 1 },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-cream text-ink">
      <FluidNavbar />

      {/* 1. HERO ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pt-48 pb-20 max-w-7xl mx-auto">
        <Reveal>
          <span className="label-mono opacity-60">Contact — 06</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight max-w-5xl">
            Tell us what<br />you have in mind.
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 max-w-xl text-lg md:text-xl text-ink/70 font-light leading-relaxed">
            We answer every enquiry personally — usually within two working days.
            Choose a channel below, or write to us using the form.
          </p>
        </Reveal>
      </section>

      {/* 2. FORM + DETAILS ───────────────────────────────────── */}
      <section className="px-6 md:px-16 py-20 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <span className="label-mono opacity-60">01 — Write to us</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-10 space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {FIELDS.map((f) => (
                  <div key={f.name} className="relative">
                    <label className="label-mono opacity-60 block mb-3">{f.label}</label>
                    {f.type === "select" ? (
                      <select
                        name={f.name}
                        className="w-full bg-transparent border-b border-ink/30 py-2 text-lg font-light focus:outline-none focus:border-ink fluid-transition appearance-none"
                      >
                        {f.options?.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={f.type}
                        name={f.name}
                        placeholder={f.placeholder}
                        className="w-full bg-transparent border-b border-ink/30 py-2 text-lg font-light placeholder:text-ink/30 focus:outline-none focus:border-ink fluid-transition"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="label-mono opacity-60 block mb-3">Message</label>
                <textarea
                  rows={5}
                  placeholder="Briefly describe your project, location, and timeline."
                  className="w-full bg-transparent border-b border-ink/30 py-2 text-lg font-light placeholder:text-ink/30 focus:outline-none focus:border-ink fluid-transition resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <input id="privacy" type="checkbox" className="mt-1.5 accent-ink" />
                <label htmlFor="privacy" className="text-sm text-ink/60 font-light">
                  I agree to the processing of personal data according to the privacy policy.
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-ink text-cream rounded-full px-8 py-4 label-mono hover:opacity-90 fluid-transition"
              >
                {submitted ? "Thank you — we'll be in touch" : "Send message"}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 lg:pl-8 flex flex-col gap-12">
            <div>
              <span className="label-mono opacity-60">02 — Direct</span>
              <ul className="mt-8 space-y-6">
                {[
                  { icon: Phone, label: "Phone", value: "+421 123 456 789", href: "tel:+421123456789" },
                  { icon: Mail,  label: "Email", value: "hello@residencia.sk", href: "mailto:hello@residencia.sk" },
                  { icon: MapPin, label: "Studio", value: "Jurská 123, 811 02 Bratislava", href: "#" },
                ].map((i) => (
                  <li key={i.label} className="flex items-start gap-4 group">
                    <span className="w-10 h-10 rounded-full border border-ink/30 flex items-center justify-center group-hover:bg-ink group-hover:text-cream fluid-transition">
                      <i.icon className="w-4 h-4" />
                    </span>
                    <div className="flex flex-col">
                      <span className="label-mono opacity-60">{i.label}</span>
                      <a href={i.href} className="text-lg font-light hover:opacity-60 fluid-transition">
                        {i.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink/15 pt-8">
              <span className="label-mono opacity-60">03 — Hours</span>
              <dl className="mt-6 space-y-2 text-base font-light">
                {[
                  ["Mon — Fri", "09:00 — 18:00"],
                  ["Saturday",  "10:00 — 16:00"],
                  ["Sunday",    "By appointment"],
                ].map(([d, h]) => (
                  <div key={d} className="flex justify-between border-b border-ink/10 py-2">
                    <dt>{d}</dt>
                    <dd className="opacity-70">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWROOM CARD ────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-32 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden bg-taupe">
            <Image
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop"
              alt="Showroom"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="lg:col-span-6 lg:pl-12">
            <span className="label-mono opacity-60">Visit — Showroom</span>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight">
              Come and see the materials in person.
            </h2>
            <p className="mt-8 text-lg text-ink/70 font-light leading-relaxed max-w-md">
              Our sales gallery in Bratislava holds full-scale samples of every
              finish, fitting and detail used in the residences. Drop in for a
              walk-through or book a private viewing.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#"
                className="inline-flex items-center gap-3 bg-ink text-cream rounded-full px-8 py-4 label-mono hover:opacity-90 fluid-transition"
              >
                Book a viewing <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 label-mono border border-ink/30 hover:bg-ink hover:text-cream fluid-transition"
              >
                See the collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer7 />
    </div>
  );
}
