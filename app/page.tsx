"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-serif font-bold">
              Residencia Jurská
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#apartments"
                className="text-foreground hover:text-gold transition-colors"
              >
                Apartments
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-gold transition-colors"
              >
                Contact
              </a>
            </div>
            <button className="md:hidden">Menu</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/1920/1080?random=1"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-sm uppercase tracking-widest mb-4 font-medium">
              Residencia Jurská
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight">
              Experience the Future
              <br />
              of Living Today
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gold text-foreground px-8 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all duration-300 hover:scale-105">
                Contact Us
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-foreground transition-all duration-300 hover:scale-105">
                View Apartments
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold uppercase tracking-wider">
          <div className="w-4 h-6 border-2 border-white rounded-full mx-auto mb-4 relative">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
          Scroll down
        </div>
      </section>

      {/* Feature Intro Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                A New Home That Will Change Your World
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Discover unparalleled luxury and innovation in the heart of
                Bratislava. Our premium residences combine cutting-edge
                technology with timeless elegance.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white px-4 py-2 rounded-full text-sm font-medium">
                  Smart Living
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-sm font-medium">
                  Premium Materials
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-sm font-medium">
                  Quiet Location
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-sm font-medium">
                  No Compromises
                </span>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="mt-16 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-80 h-60 relative overflow-hidden rounded-lg"
                >
                  <Image
                    src={`https://picsum.photos/320/240?random=${i + 10}`}
                    alt={`Interior ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* USP Cards Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Technology",
                description:
                  "State-of-the-art smart home systems and cutting-edge automation for modern living.",
              },
              {
                icon: "🌱",
                title: "Ecology",
                description:
                  "Sustainable design with green roofs, energy-efficient systems, and eco-friendly materials.",
              },
              {
                icon: "📍",
                title: "Location",
                description:
                  "Prime location in Bratislava with excellent transport links and urban amenities.",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-2xl font-serif font-bold mb-4">
                  {card.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Value Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-6">
                Investment in Excellence
              </h3>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                Our residences offer timeless value through exceptional
                location, superior craftsmanship, and future-proof design that
                appreciates over time.
              </p>
              <a
                href="#contact"
                className="text-gold hover:underline font-medium"
              >
                Learn more about our investment potential
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 overflow-hidden rounded-lg"
            >
              <Image
                src="https://picsum.photos/600/400?random=20"
                alt="Investment value"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 overflow-hidden rounded-lg order-2 lg:order-1"
            >
              <Image
                src="https://picsum.photos/600/400?random=21"
                alt="Premium materials"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-3xl font-serif font-bold mb-6">
                Premium Materials & Craftsmanship
              </h3>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                Every detail is crafted with the finest materials and attention
                to quality. From imported stone finishes to custom cabinetry,
                excellence is in every element.
              </p>
              <a
                href="#apartments"
                className="text-gold hover:underline font-medium"
              >
                Explore our material selections
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Technology Section */}
      <section className="py-24 px-4 bg-foreground text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Smart & Strong Technologies
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Technology serves functionality, savings, and comfort. Our
              high-tech standard integrates seamlessly with the TapHome smart
              home system.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "TapHome App",
                description:
                  "Control your entire home from your smartphone with intuitive touch controls and automation.",
                image: "https://picsum.photos/300/200?random=30",
              },
              {
                title: "Smart Security",
                description:
                  "Advanced security systems with biometric access and 24/7 monitoring for peace of mind.",
                image: "https://picsum.photos/300/200?random=31",
              },
              {
                title: "Ceiling Cooling",
                description:
                  "Efficient climate control with radiant cooling systems for optimal comfort year-round.",
                image: "https://picsum.photos/300/200?random=32",
              },
              {
                title: "Floor Heating",
                description:
                  "Underfloor heating systems provide even warmth and eliminate cold spots in your home.",
                image: "https://picsum.photos/300/200?random=33",
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-32 mb-4 overflow-hidden rounded">
                  <Image
                    src={tech.image}
                    alt={tech.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-serif font-bold mb-3">
                  {tech.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4 bg-gold">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
              Interested in our project?
            </h2>
            <button className="bg-foreground text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all duration-300 hover:scale-105">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* Project Philosophy / Testimonials */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold mb-6">
              Project Philosophy
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This project represents the perfect blend of luxury and functionality. Every decision was made with the resident's lifestyle in mind.",
                name: "Architect Name",
                title: "Lead Architect",
                avatar: "https://picsum.photos/100/100?random=40",
              },
              {
                quote:
                  "The attention to detail and commitment to quality is unparalleled. This is more than just a building—it's a legacy.",
                name: "Developer Name",
                title: "Project Developer",
                avatar: "https://picsum.photos/100/100?random=41",
              },
              {
                quote:
                  "Living here feels like the future has arrived. The technology and design work seamlessly together.",
                name: "Resident Name",
                title: "Early Resident",
                avatar: "https://picsum.photos/100/100?random=42",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <blockquote className="text-lg italic text-text-secondary mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-text-secondary">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Distance Map Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gray-200 rounded-lg flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <p className="text-text-secondary">Interactive Map</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-8">
                Prime Location in Bratislava
              </h3>
              <div className="space-y-4">
                {[
                  { place: "Train Station Vinohrady", time: "5 min" },
                  { place: "Shopping Center", time: "8 min" },
                  { place: "City Center", time: "12 min" },
                  { place: "Airport", time: "25 min" },
                  { place: "International School", time: "10 min" },
                  { place: "Medical Center", time: "6 min" },
                ].map((location) => (
                  <div
                    key={location.place}
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <span className="flex items-center">
                      <span className="mr-3">📍</span>
                      {location.place}
                    </span>
                    <span className="font-semibold text-gold">
                      {location.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold mb-8">
                Get in Touch
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <Image
                    src="https://picsum.photos/80/80?random=50"
                    alt="Agent"
                    width={80}
                    height={80}
                    className="rounded-full mr-6"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">John Smith</h3>
                    <p className="text-text-secondary">Sales Representative</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <span className="mr-3">📞</span>
                    <span>+421 123 456 789</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">✉️</span>
                    <span>john.smith@residencia.sk</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">📍</span>
                    <span>Jurská 123, Bratislava</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Interest
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                    <option>1-Bedroom Apartment</option>
                    <option>2-Bedroom Apartment</option>
                    <option>3-Bedroom Apartment</option>
                    <option>Penthouse</option>
                    <option>Investment Opportunity</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="privacy" className="mr-3" />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-text-secondary"
                  >
                    I agree to the processing of personal data according to the
                    privacy policy.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-foreground py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-serif font-bold mb-4">
                Residencia Jurská
              </div>
              <p className="text-gray-300 mb-4">
                Premium apartments in the heart of Bratislava.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gold transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-gold transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-gold transition-colors">
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>+421 123 456 789</p>
                <p>info@residencia.sk</p>
                <p>Jurská 123, Bratislava</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="#apartments"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Apartments
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Gallery
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Residencia Jurská. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
