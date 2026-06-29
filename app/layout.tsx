import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/**
 * FONT CHOICES EXPLAINED:
 *
 * Playfair Display — a high-contrast, sharp serif with 1930s–40s magazine elegance.
 * Used ONLY for the band name and section headings (with italic). It's decorative
 * and catches attention, like a marquee title on a classic record sleeve.
 * Not a body font — too ornate for long reading.
 *
 * Source Serif 4 — Adobe's warm, highly readable serif. The body workhorse.
 * Chosen for its large x-height and generous proportions — critical for an older
 * audience who may have vision challenges. Every paragraph is set in this face.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

/**
 * METADATA:
 *
 * Title includes "Good Prefixes" — this is what Google shows in search results
 * and browser tabs. The description is written for retirement home coordinators
 * who search for "jazz performance retirement home" or similar — it's SEO without
 * being spammy.
 */
export const metadata: Metadata = {
  title: "Good Prefixes — Live Jazz for Retirement Communities",
  description:
    "Good Prefixes brings the warmth of classic jazz, classical, and seasonal music directly into retirement homes and care communities. Book a performance by Caden Zhang and Enda Du.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
