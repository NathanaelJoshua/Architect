import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

// Aeonik Pro is paid — Geist is the closest free Google Font:
// same flat-top E, geometric p/t, neutral grotesk feel.
const aeonikSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Aeonik Mono is a paid type — JetBrains Mono is the closest free
// Google Font (geometric, wide-set, distinctive zero/g shapes).
const aeonikMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Residencia Jurská",
  description: "Exceptional living for those who build with vision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", aeonikSans.variable, aeonikMono.variable)}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-ink">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
