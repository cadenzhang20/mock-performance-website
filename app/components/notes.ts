import { StaveNote, Stem, Beam, Accidental } from "vexflow";

/**
 * Note sets stored as compact strings.
 *
 * Format per note: "{pitch} [more pitches...] {duration} [u|d]"
 *   - pitches are VexFlow key strings, accidentals included
 *     (e.g. "c/4", "eb/4", "f#/4", "bb/4")
 *   - duration is a VexFlow duration string (e.g. "q", "8", "h")
 *   - optional stem direction: "u" = UP, "d" = DOWN (omit for default)
 *
 * Separators:
 *   ","  — independent notes (no beam between them)
 *   "-"  — notes joined by a beam (typically eighth notes)
 *
 * Example — four beamed eighth notes, then a quarter rest:
 *   "c/4 8 u - eb/4 8 u - f/4 8 u - f#/4 8 u, g/4 q d"
 */
const noteSets: Record<string, string> = {
  about: "c/4 q u, e/4 q u, g/4 q u, c/5 q d",
  performers: "c/5 q d, g/4 q u, e/4 q u, c/4 q u",
  repertoire: "c/4 8 u - eb/4 8 u - f/4 8 u - f#/4 8 u, g/4 8 u - bb/4 8 u, c/5 4 d",
  testimonials: "c/4 h u, g/4 h u",
  contact: "g/4 h u, b/4 h d",
  footer: "c/5 q d, g/4 q u, e/4 q u, c/4 q u",
};

export type NoteKey = keyof typeof noteSets;

export interface ParseResult {
  notes: InstanceType<typeof StaveNote>[];
  beams: InstanceType<typeof Beam>[];
}

const stemDirectionMap: Record<string, typeof Stem.UP | typeof Stem.DOWN> = {
  u: Stem.UP,
  d: Stem.DOWN,
};

/**
 * Split a VexFlow key string like "eb/4" into its bare pitch ("e/4")
 * and accidental string ("b"). Returns ["e/4", "b"].
 * No accidental → returns ["c/4", ""].
 */
function splitKey(raw: string): [string, string] {
  const match = raw.match(/^([a-g])(bb|#|b|n)?(\/\d+)$/);
  if (!match) return [raw, ""];
  const [, letter, accidental = "", octave] = match;
  return [`${letter}${octave}`, accidental];
}

const accidentalTypeMap: Record<string, string> = {
  "b": "b",
  "#": "#",
  "bb": "bb",
  "##": "##",
  "n": "n",
};

function parseSingleNote(segment: string): InstanceType<typeof StaveNote> {
  const tokens = segment.trim().split(/\s+/);

  // Last token may be a stem direction
  const lastToken = tokens[tokens.length - 1];
  let stemDirection: typeof Stem.UP | typeof Stem.DOWN | undefined;
  let durationIndex = tokens.length - 1;

  if (lastToken in stemDirectionMap) {
    stemDirection = stemDirectionMap[lastToken];
    durationIndex--;
  }

  const duration = tokens[durationIndex];
  const rawKeys = tokens.slice(0, durationIndex);

  // Strip accidentals from keys for VexFlow, track them for addModifier
  const keys: string[] = [];
  const accidentals: { index: number; type: string }[] = [];

  rawKeys.forEach((raw, i) => {
    const [bare, acc] = splitKey(raw);
    keys.push(bare);
    if (acc && acc in accidentalTypeMap) {
      accidentals.push({ index: i, type: accidentalTypeMap[acc] });
    }
  });

  const opts: { keys: string[]; duration: string; stemDirection?: typeof Stem.UP | typeof Stem.DOWN } = { keys, duration };
  if (stemDirection !== undefined) opts.stemDirection = stemDirection;

  const note = new StaveNote(opts);
  accidentals.forEach(({ index, type }) => note.addModifier(new Accidental(type), index));

  return note;
}

/**
 * Parse a note-set string into StaveNote instances and Beams.
 *
 * Comma-separated segments are independent notes.
 * Hyphen-separated segments within a comma group are beamed together.
 */
export function parseNotes(input: string): ParseResult {
  const notes: InstanceType<typeof StaveNote>[] = [];
  const beams: InstanceType<typeof Beam>[] = [];

  // Split by commas to get top-level groups
  const groups = input.split(",");

  for (const group of groups) {
    // Check if this group contains hyphens (beamed notes)
    if (group.includes("-")) {
      const beamedSegments = group.split("-").filter((s) => s.trim());
      const beamedNotes = beamedSegments.map(parseSingleNote);
      notes.push(...beamedNotes);
      beams.push(new Beam(beamedNotes));
    } else {
      notes.push(parseSingleNote(group));
    }
  }

  return { notes, beams };
}

export default noteSets;
