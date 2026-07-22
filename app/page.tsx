import Image from "next/image";
import { StaffDivider } from "./components/StaffDivider";
import { Typewriter } from "./components/Typewriter";

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
 * Organized as a const object so it's easy to update.
 * Each category has a name, description, accent color, and full song list.
 *
 * WHY INLINE AND NOT FETCHED?
 * This is a brochure page — the repertoire won't change often.
 * When it does, a developer edits this file. No CMS needed for
 * a page that updates a few times a year at most.
 */
const REPERTOIRE = {
  jazz: {
    name: "Jazz Standards",
    description:
      "The Great American Songbook — the songs people danced to, fell in love to, and carried with them through a lifetime.",
    accent: "var(--color-crimson)",
    songs: [
      "(Love is) The Tender Trap",
      "A Kiss to Build a Dream On",
      "Ac-centuate the Positive",
      "After You've Gone",
      "Afternoon in Paris",
      "All of Me",
      "All the Things You Are",
      "Almost Blue",
      "Ask Me Now",
      "Autumn Leaves",
      "Bewitched",
      "Beyond the Sea",
      "Blue and Sentimental",
      "Blue Bossa",
      "Blue In Green",
      "Blue Moon",
      "Blues from 'An American in Paris'",
      "Body and Soul",
      "Call Me Irresponsible",
      "Can't Stop Falling in Love with You",
      "Chicago",
      "Come Fly With Me",
      "Crystal Silence",
      "Dear Hearts and Gentle People",
      "Don't Fence Me In",
      "Dream a Little Dream of Me",
      "Fall",
      "Fly Me to the Moon",
      "Gee, Baby, Ain't I Good to You",
      "Girl From Ipanema",
      "I Remember Clifford",
      "I've Got You Under My Skin",
      "If You Could See Me Now",
      "In a Sentimental Mood",
      "It Could Happen To You",
      "Just In Time",
      "Land of the Misty Giants",
      "Misty",
      "Moonglow",
      "Moonlight Serenade",
      "My Favorite Things",
      "My Way",
      "On Green Dolphin Street",
      "On The Sunny Side of The Street",
      "Orange Colored Sky",
      "Our Love is Here to Stay",
      "Route 66",
      "San Fernando Valley",
      "Something's Gotta Give",
      "Stompin' At the Savoy",
      "The Girl From Ipanema",
      "The Nearness of You",
      "There'll Be a Hot Time in the Town of Berlin",
      "Time After Time",
      "We'll Meet Again",
      "When I Fall in Love",
      "When You're Smiling",
      "You Are Too Beautiful",
      "You Belong to Me",
      "You're Nobody 'Til Somebody Loves You",
      "You're The Top",
    ],
  },
  classical: {
    name: "Classical Favorites",
    description:
      "Timeless pieces from the orchestral and chamber repertoire — elegant, intimate, and perfectly suited to a live setting.",
    accent: "var(--color-gold)",
    songs: [
      "Clair de Lune",
      "Concertino",
      "Fur Elise",
      "Nimrod",
      "Pie Jesu",
      "Romance (Five Bagatelles II)",
      "Stamitz",
      "Waltz",
      "Young Prince and Young Princess",
    ],
  },
  seasonal: {
    name: "Seasonal Specials",
    description:
      "Holiday favourites that bring warmth and nostalgia to any gathering — available during the festive season.",
    accent: "var(--color-crimson)",
    songs: [
      "Deck the Halls",
      "Frosty The Snowman",
      "Holly Jolly Christmas",
      "It's Beginning to Look a Lot Like Christmas",
      "It's the Most Wonderful Time of the Year",
      "Jingle Bell Rock",
      "Let it Snow Let it Snow",
      "Mele Kalikimaka",
      "Santa Baby",
      "Santa Claus is Coming to Town",
      "Silent Night",
      "We Wish You a Merry Christmas",
      "White Christmas",
      "Winter Wonderland",
    ],
  },
} as const;

const TESTIMONIALS = [
  {
    name: "Gary Maher",
    text: "They are very Young and Good at music. We enjoy watching their Performance. Their performance is Impressive. They have a bright future in music because of their talent.",
  },
  {
    name: "Barbara Rusland",
    text: "They are so good. The piano Performance very impressive. I really enjoyed watching it. They performed with great passion and Confidence from start to finish.",
  },
  {
    name: "Louis and Doreen",
    text: "Enda and Caden are two very pleasant young entertainers. Always very well prepared, always interesting and informative, with visuals and some conversation.",
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
          - Circular portrait with hero.jpg, sized w-56/w-72 responsive
          - The scroll indicator is at the very bottom, below the fold
            on mobile, which is intentional — it draws the eye down
      */}
      <section className="hero-background relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-32 md:py-40">
        {/* Circular portrait of the performers */}
        <div className="relative mb-10 w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-hairline overflow-hidden shadow-lg">
          <Image
            src="/images/hero.jpg"
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
          We&apos;ll bring a good start to your{" "}
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
          Caden Zhang · Piano &nbsp;|&nbsp; Enda Du · Clarinet, Saxophone &amp; Vocals
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

      <StaffDivider />

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
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto w-full">
        <h2 className="text-center mb-12">About Bossa Boys</h2>

        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          {/* Image placeholder */}
          <div className="w-full aspect-3/4 rounded-lg border border-hairline bg-sunlight/30 flex items-center justify-center">
            <span className="text-5xl opacity-20" aria-hidden="true">
              ♫
            </span>
          </div>

          {/* About copy — verbatim from the spec revisions */}
          <div className="space-y-5 max-w-prose">
            <p>
              Bossa Boys is composed of Enda and Caden — two friends who met
              through school, bonded over a shared love of jazz, and found
              themselves with a purpose bigger than just playing music.
            </p>
            <p>
              There&apos;s something remarkable about what a song can do. For someone
              living with dementia, a familiar melody can cut through the fog in a
              way that words alone often can&apos;t. A few bars of a Sinatra tune or a
              Gershwin standard can bring a face back to life, a smile, a memory,
              a moment of recognition that reminds everyone in the room of the
              person still present underneath it all. That&apos;s not just music.
              That&apos;s something close to magic.
            </p>
            <p>
              It&apos;s that belief that drives Bossa Boys. Enda and Caden have
              made it their mission to bring live jazz into retirement homes and
              care communities, not as background entertainment, but as a genuine
              act of connection.
            </p>
            <p>
              The repertoire is drawn from the Great American Songbook: the songs
              that defined a generation, the ones people danced to, fell in love
              to, and carried with them through a lifetime. Played up close,
              unhurried, and with care, they&apos;re more than just songs. For many
              in the audience, they&apos;re a way home.
            </p>
          </div>
        </div>
      </section>

      <StaffDivider />

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
      <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto w-full">
        <h2 className="text-center mb-12">Meet the Performers</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Enda */}
          <div className="performer-card bg-white/50 rounded-lg p-8 border-l-4 border-crimson">
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

          {/* Caden */}
          <div className="performer-card bg-white/50 rounded-lg p-8 border-l-4 border-gold">
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
      </section>

      <StaffDivider />

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
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto w-full">
        <h2 className="text-center mb-4">Our Repertoire</h2>
        <p className="text-center text-ink-muted mb-12 max-w-2xl mx-auto">
          Drawn from the Great American Songbook and beyond — the songs that
          defined a generation.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {(Object.entries(REPERTOIRE) as [string, typeof REPERTOIRE.jazz][]).map(
            ([key, category]) => (
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
                <div className="flex-1 max-h-100 overflow-y-auto pr-2">
                  <ul className="song-list text-base">
                    {category.songs.map((song) => (
                      <li key={song}>{song}</li>
                    ))}
                  </ul>
                </div>

                {/* Song count */}
                <p className="mt-4 text-xs text-ink-muted italic text-center border-t border-hairline pt-3">
                  {category.songs.length} songs
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <StaffDivider />

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
        <div
          className="absolute inset-0 bg-paper/75 z-0"
          aria-hidden="true"
        />

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
              </div>
            ))}
          </div>
        </div>
      </section>

      <StaffDivider />

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
      <section className="px-6 py-16 md:py-24 max-w-2xl mx-auto w-full text-center">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:goodprefixes@example.com"
              className="inline-block px-6 py-3 bg-crimson text-paper rounded-lg font-body font-semibold hover:bg-crimson/90 transition-colors"
            >
              Send an Email
            </a>
            <a
              href="tel:+1234567890"
              className="inline-block px-6 py-3 border-2 border-gold text-ink rounded-lg font-body font-semibold hover:bg-gold/10 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      <StaffDivider />

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
          © {new Date().getFullYear()} Bossa Boys — Caden Zhang &amp;
          Enda Du
        </p>
        <p className="mt-1 italic">
          Bringing the warmth of classic music to your community.
        </p>
      </footer>
    </main>
  );
}
