import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

interface Footer7Props {
  brand?: string;
  description?: string;
  sections?: Array<{ title: string; links: Array<{ name: string; href: string }> }>;
  socialLinks?: Array<{ icon: React.ReactElement; href: string; label: string }>;
  copyright?: string;
  legalLinks?: Array<{ name: string; href: string }>;
}

const defaultSections = [
  {
    title: "Residences",
    links: [
      { name: "Apartments", href: "#categories" },
      { name: "Penthouses", href: "#categories" },
      { name: "Amenities", href: "#categories" },
      { name: "Wellness", href: "#categories" },
    ],
  },
  {
    title: "Studio",
    links: [
      { name: "About", href: "#about" },
      { name: "Featured", href: "#projects" },
      { name: "Stories", href: "#stories" },
      { name: "Press", href: "#" },
    ],
  },
  {
    title: "Visit",
    links: [
      { name: "Sales gallery", href: "#gallery" },
      { name: "Book a viewing", href: "#contact" },
      { name: "Jurská 123", href: "#" },
      { name: "Bratislava, SK", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-4" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-4" />, href: "#", label: "Facebook" },
  { icon: <FaLinkedin className="size-4" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Cookies", href: "#" },
];

export const Footer7 = ({
  brand = "Residencia Jurská",
  description = "Premium residences in the heart of Bratislava — crafted with material honesty and quiet luxury.",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  copyright = "© 2025 Residencia Jurská — All rights reserved",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="relative bg-black text-cream overflow-hidden">
      {/* Top content */}
      <div className="px-6 md:px-16 pt-24 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand block */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <span className="label-mono opacity-60">— Residencia</span>
            <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight max-w-md">
              {description}
            </p>
            <ul className="flex items-center gap-4 mt-4">
              {socialLinks.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black fluid-transition"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="label-mono opacity-60 mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-base font-light hover:opacity-60 fluid-transition"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giant brand wordmark */}
      <div className="px-6 md:px-16 max-w-[1800px] mx-auto pointer-events-none select-none">
        <h2
          className="font-light tracking-tighter leading-[0.8] text-cream/[0.08] whitespace-nowrap"
          style={{ fontSize: "clamp(5rem, 18vw, 22rem)" }}
        >
          {brand}
        </h2>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="px-6 md:px-16 py-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 label-mono opacity-60">
          <p>{copyright}</p>
          <ul className="flex flex-wrap gap-6">
            {legalLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="hover:opacity-100 fluid-transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
