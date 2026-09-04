import fs from "fs";
import path from "path";
import Image from "next/image";
import { StaffDivider } from "./components/StaffDivider";
import { Typewriter } from "./components/Typewriter";
import CustomSvgStave from "./components/CoolStaffDivider";
import ScrollingSongList from "./components/ClientScrollAnimator";

/**
 * BOSSA BOYS — INDEX PAGE
 * ==========================
 *
 * PAGE STRUCTURE:
 * This is a Server Component (no "use client") — the page itself
 * renders on the server for fast initial load. Only the Typewriter
 * animation is a client component (it needs browser JS to animate).
 *
 * The Typewriter is imported directly here and rendered inline.
 * This is fine because it's the only interactive element on the page.
 *
 * SECTION ORDER:
 * 1. Hero — band name, slogan with word rotation, image placeholder
 * 2. About — who Bossa Boys are and what they do
 * 3. Performers — individual bios for Enda and Caden
 * 4. Repertoire — full song list organized by genre
 * 5. Contact — booking CTA
 * 6. Footer — copyright
 */

/**
 * REPERTOIRE DATA:
 * Song lists are loaded from text files in the `data/` directory.
 * Each file has one song per line, sorted alphabetically.
 *
 * WHY FILES INSTEAD OF INLINE?
 * Keeps the song list maintainable — just edit the txt file.
 * Files are read at build time on the server, so no runtime cost.
 */
function readSongList(filename: string): readonly string[] {
  const filePath = path.join(process.cwd(), "data", filename);
  const content = fs.readFileSync(filePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .sort((a, b) => a.localeCompare(b));
}

const REPERTOIRE = {
  jazz: {
    name: "Jazz Standards",
    description:
      "The Great American Songbook — the songs people danced to, fell in love to, and carried with them through a lifetime.",
    accent: "var(--color-crimson)",
    songs: readSongList("jazz.txt"),
  },
  classical: {
    name: "Classical Favorites",
    description:
      "Timeless pieces from the orchestral and chamber repertoire — elegant, intimate, and perfectly suited to a live setting.",
    accent: "var(--color-gold)",
    songs: readSongList("classical.txt"),
  },
  seasonal: {
    name: "Seasonal Specials",
    description:
      "Holiday favourites that bring warmth and nostalgia to any gathering — available during the festive season.",
    accent: "var(--color-crimson)",
    songs: readSongList("seasonal.txt"),
  },
} as const;

const TESTIMONIALS = [
  {
    name: "Gary Maher",
    text: "They are very Young and Good at music. We enjoy watching their Performance. Their performance is Impressive. They have a bright future in music because of their talent.",
    role: "Resident of The Village of Glendale Crossing",
  },
  {
    name: "Barbara Rusland",
    text: "They are so good. The piano Performance very impressive. I really enjoyed watching it. They performed with great passion and Confidence from start to finish.",
    role: "Resident of The Village of Glendale Crossing",
  },
  {
    name: "Louis and Doreen",
    text: "Enda and Caden are two very pleasant young entertainers. Always very well prepared, always interesting and informative, with visuals and some conversation.",
    role: "Residents of The Village of Glendale Crossing",
  },
] as const;

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ============================================================
          HERO SECTION
          ============================================================

          DESIGN CHOICES:
          - hero-background class: CSS background image with gradient overlay
          - py-32 on mobile, py-40 on desktop: generous vertical space
            so the hero feels like an entrance, not a banner
          - The Typewriter cycles through "morning", "afternoon", "evening"
            to reflect the times of day they perform
          - Circular portrait with hero.webp, sized w-56/w-72 responsive
          - The scroll indicator is at the very bottom, below the fold
            on mobile, which is intentional — it draws the eye down
      */}
      <section className="hero-background relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-32 md:py-40">
        {/* Circular portrait of the performers */}
        <div className="relative mb-10 w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-hairline overflow-hidden shadow-lg">
          <Image
            src="/images/hero.webp"
            alt="Enda Du and Caden Zhang, the Bossa Boys, in performance attire"
            width={288}
            height={288}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Band name — the most important text on the page */}
        <h1 className="text-center font-display text-5xl md:text-7xl lg:text-8xl font-bold italic tracking-tight text-ink">
          Bossa Boys
        </h1>

        {/* Slogan with rotating words — the Typewriter handles the animation */}
        <p className="mt-6 text-center text-2xl md:text-3xl lg:text-4xl font-display italic text-ink-muted">
          We&apos;ll bring a good start to your <br />
          <Typewriter
            words={["morning", "afternoon", "evening"]}
            typeSpeed={120}
            deleteSpeed={80}
            pauseDelay={2500}
            initialText="day"
            className="text-crimson font-bold"
          />
          <span className="text-crimson">!</span>
        </p>

        {/* Performer names — smaller, understated */}
        <p className="mt-6 text-center text-base md:text-lg text-ink-muted font-body">
          Caden Zhang · Piano &nbsp;|&nbsp; Enda Du · Clarinet, Saxophone &amp;
          Vocals
        </p>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 text-ink-muted opacity-40">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      <CustomSvgStave noteKey="about" />

      {/* ============================================================
          ABOUT SECTION
          ============================================================

          DESIGN CHOICES:
          - Two-column on md+ screens, single column on mobile
          - Left: the image placeholder (same warm tone as hero)
          - Right: the full About text from the spec revisions
          - The text is left-aligned, not centered — long paragraphs
            are much harder to read when centered
          - max-w-3xl constrains line length to ~65 characters,
            which is the optimal reading width for body text
      */}
      <section className="px-6 py-5 max-w-5xl mx-auto w-full">
        <h2 className="text-center mb-12">About Bossa Boys</h2>

        <div className="flex justify-center gap-10 md:gap-14 items-start">
          {/* About copy — verbatim from the spec revisions */}
          <div className="max-w-prose text-center">
            <p>
              Bossa Boys is composed of Enda and Caden — two friends who met
              through school, bonded over a shared love of jazz, and found
              themselves with a purpose bigger than just playing music.
            </p>
            <br />
            <p>
              There&apos;s something remarkable about what a song can do. For
              someone living with dementia, a familiar melody can cut through
              the fog in a way that words alone often can&apos;t. A few bars of
              a Sinatra tune or a Gershwin standard can bring a face back to
              life, a smile, a memory, a moment of recognition that reminds
              everyone in the room of the person still present underneath it
              all. That&apos;s not just music. That&apos;s something close to
              magic.
            </p>
            <br />

            <p>
              It&apos;s that belief that drives Bossa Boys. Enda and Caden have
              made it their mission to bring live jazz into retirement homes and
              care communities, not as background entertainment, but as a
              genuine act of connection.
            </p>
            <br />

            <p>
              The repertoire is drawn from the Great American Songbook: the
              songs that defined a generation, the ones people danced to, fell
              in love to, and carried with them through a lifetime. Played up
              close, unhurried, and with care, they&apos;re more than just
              songs. For many in the audience, they&apos;re a way home.
            </p>
          </div>
        </div>
      </section>

      <CustomSvgStave noteKey="performers" />

      {/* ============================================================
          PERFORMERS SECTION
          ============================================================

          DESIGN CHOICES:
          - Individual performer cards side by side on desktop
          - Each card has: name, role, certifications, and a brief note
          - The left border uses crimson (Enda) and gold (Caden) to
            visually distinguish them while staying on-brand
          - Certifications are shown as a compact list — these are
            real credentials that build trust with activity coordinators
      */}
      <section className="px-6 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-center mb-12">Meet the Bossa Boys</h2>

        <div className="flex flex-col gap-10 py-8">
          {/* Enda */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl border-2 border-hairline overflow-hidden shadow-md flex-shrink-0">
              <Image
                src="/images/enda-photo.jpeg"
                alt="Enda Du holding a trophy"
                width={240}
                height={240}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="performer-card bg-white/50 rounded-lg p-8 border-l-4 border-crimson flex-1">
              <h3 className="font-display text-2xl font-bold text-ink mb-1">
                Enda Du
              </h3>
              <p className="font-body italic text-ink-muted text-sm mb-4">
                Group Coordinator
              </p>
              <ul className="space-y-1.5 text-base text-ink mb-5">
                <li>Vocalist</li>
                <li>Clarinet &amp; Saxophone</li>
              </ul>
              <div className="border-t border-hairline pt-4">
                <p className="text-xs uppercase tracking-wider text-ink-muted mb-2 font-body">
                  Awards & Certifications
                </p>
                <ul className="space-y-1 text-sm text-ink-muted">
                  <li>RCM 8 — Piano, Theory &amp; Clarinet</li>
                  <li>Central Concert Master</li>
                  <li>MVP — Grades 9 &amp; 10 Band</li>
                  <li>Best Section — Sr. Jazz Band</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Caden */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl border-2 border-hairline overflow-hidden shadow-md flex-shrink-0">
              <Image
                src="/images/caden-photo.jpg"
                alt="Caden Zhang"
                width={240}
                height={240}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="performer-card bg-white/50 rounded-lg p-8 border-l-4 border-gold flex-1">
              <h3 className="font-display text-2xl font-bold text-ink mb-1">
                Caden Zhang
              </h3>
              <p className="font-body italic text-ink-muted text-sm mb-4">
                Tech Specialist
              </p>
              <ul className="space-y-1.5 text-base text-ink mb-5">
                <li>Pianist</li>
                <li>Saxophone</li>
              </ul>
              <div className="border-t border-hairline pt-4">
                <p className="text-xs uppercase tracking-wider text-ink-muted mb-2 font-body">
                  Awards & Certifications
                </p>
                <ul className="space-y-1 text-sm text-ink-muted">
                  <li>RCM 9 — Piano</li>
                  <li>Level 9 — Harmony</li>
                  <li>Best Section — Sr. Jazz Band</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomSvgStave noteKey="repertoire" />

      {/* ============================================================
          REPERTOIRE SECTION
          ============================================================

          DESIGN CHOICES:
          - Three-column grid on desktop, stacking on mobile
          - Each card is a scrollable list (max-h with overflow-y-auto)
            so the jazz list (60+ songs) doesn't push the page to
            absurd length — the user scrolls within the card
          - The genre name uses the crimson/gold accent to create
            visual variety while staying on-brand
          - Song count shown at the bottom of each card header
            so coordinators know the breadth at a glance
          - max-w-6xl keeps the three columns from spreading too wide
      */}
      <section className="px-6 py-8 max-w-6xl mx-auto w-full">
        <h2 className="text-center mb-4">Our Repertoire</h2>
        <p className="text-center text-ink-muted mb-12 max-w-2xl mx-auto">
          Below are just some of the songs that the Bossa Boys have performed.
          We&apos;re happy to tailor our setlist to your community&apos;s
          preferences, so if you have any specific songs in mind, just let us
          know!
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {(
            Object.entries(REPERTOIRE) as [string, typeof REPERTOIRE.jazz][]
          ).map(([key, category]) => (
            <div
              key={key}
              className="repertoire-card rounded-lg bg-white/50 p-6 flex flex-col"
            >
              {/* Category header */}
              <div className="mb-4">
                <h3
                  className="font-display text-xl font-bold italic mb-1"
                  style={{ color: category.accent }}
                >
                  {category.name}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Song list — scrollable for long lists */}
              <ScrollingSongList songs={category.songs} speed={20} />

              {/* Song count */}
              {/* <p className="mt-4 text-xs text-ink-muted italic text-center border-t border-hairline pt-3">
                  {category.songs.length} songs
                </p> */}
            </div>
          ))}
        </div>
      </section>

      <CustomSvgStave noteKey="testimonials" />

      {/* ============================================================
          TESTIMONIALS SECTION
          ============================================================

          DESIGN CHOICES:
          - performance.png as a full-width background image with warm overlay
          - Three testimonial cards in a responsive grid
          - Each card has a quote decoration and the person's name
          - Cards have a semi-transparent backdrop for readability
          - Section uses position: relative and overflow: hidden
      */}
      <section className="testimonials-section relative overflow-hidden px-6 py-16 md:py-24">
        {/* Warm overlay on top of the performance.png background */}
        <div className="absolute inset-0 bg-paper/75 z-0" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <h2 className="text-center mb-12">What Our Audience Says</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white/60 rounded-lg p-6 md:p-8 border border-hairline"
              >
                <span
                  className="text-5xl font-display leading-none text-gold opacity-40 block mb-2"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-base text-ink leading-relaxed mb-4 italic">
                  {testimonial.text}
                </p>
                <p className="text-sm font-body font-semibold text-ink-muted">
                  &mdash; {testimonial.name}
                </p>
                <p className="text-xs font-body text-ink-muted">
                  {testimonial.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CustomSvgStave noteKey="contact" />

      {/* ============================================================
          CONTACT / CTA SECTION
          ============================================================

          DESIGN CHOICES:
          - Centered card with generous padding — it should feel like
            an invitation, not a form
          - "Complimentary meet-and-greet" is the key phrase — it
            removes the pressure of commitment and makes booking
            feel like a conversation
          - Mailto link is preferred over a form for this audience —
            retirement home coordinators are more comfortable with
            email than web forms
          - The phone number is prominent — older staff members may
            prefer to call
      */}
      <section className="px-6 py-8 max-w-2xl mx-auto w-full text-center">
        <h2 className="mb-6">Book Bossa Boys</h2>
        <p className="text-ink-muted mb-8 max-w-lg mx-auto">
          We&apos;d love to bring live music to your community. Call or email to
          arrange a complimentary meet-and-greet — no obligation, just a
          conversation.
        </p>

        <div className="bg-white/50 border border-hairline rounded-lg p-8 md:p-10">
          <p className="font-display text-xl italic text-ink mb-2">
            Get in Touch
          </p>
          <p className="text-ink-muted mb-6">
            We&apos;ll respond within 24 hours.
          </p>

          <div className="flex flex-col gap-4 justify-center">
            <a
              href="mailto:bossaboys.connect@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3 bg-crimson text-paper rounded-lg text-xs sm:text-base font-body font-semibold hover:bg-crimson/90 transition-colors justify-center"
            >
              <svg
                className="w-5 h-5 hidden sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              bossaboys.connect@gmail.com
            </a>
            <a
              href="tel:+15197028217"
              className="inline-flex items-center gap-3 px-6 py-3 border-2 border-gold text-ink rounded-lg text-xs sm:text-base font-body font-semibold hover:bg-gold/10 transition-colors justify-center"
            >
              <svg
                className="w-5 h-5 hidden sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +1 (519) 702-8217
            </a>
          </div>
        </div>
      </section>

      {/* <StaffDivider /> */}
      <CustomSvgStave noteKey="footer" />

      {/* ============================================================
          FOOTER
          ============================================================

          Minimal. Copyright, the group name, and a note about the
          website. No social media links (not relevant for this audience).
          The footer is deliberately quiet — it exists to be correct,
          not to draw attention.
      */}
      <footer className="px-6 py-8 text-center text-sm text-ink-muted">
        <p>
          © {new Date().getFullYear()} Bossa Boys — Caden Zhang &amp; Enda Du
        </p>
        <p className="mt-1 italic">
          Bringing the warmth of classic music to your community.
        </p>
      </footer>
    </main>
  );
}
