'use client';
import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, Barline, Voice, Formatter, Accidental } from 'vexflow';
import noteSets, { parseNotes, NoteKey } from './notes';

/** Total SVG height: 2rem top padding + 41px staff (10px gap × 4 + 1px line). */
const SVG_HEIGHT = 2 * 32 + 41; // 2rem (32px) + staff

/** Left margin for notes and accidentals, in pixels. */
const STAVE_LEFT_PADDING = 50;

interface CustomSvgStaveProps {
  /** Key into the noteSets map — selects which 4-note pattern to render. */
  noteKey?: NoteKey;
}

const CustomSvgStave = ({ noteKey = 'about' }: CustomSvgStaveProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { notes, beams } = parseNotes(noteSets[noteKey]);

  useEffect(() => {
    if (!containerRef.current) return;

    const draw = (width: number) => {
      // Clear old elements to prevent stacking duplicates on re-render
      containerRef.current!.innerHTML = '';

      // Create the SVG renderer using our React DOM ref container
      const renderer = new Renderer(containerRef.current!, Renderer.Backends.SVG);

      // Match the container width (equivalent to width: 100%; max-width: 600px)
      const w = Math.round(width);
      renderer.resize(w, SVG_HEIGHT);
      const context = renderer.getContext();
      context.setFont('Arial', 10);

      // Position stave so lines sit vertically centered in the SVG
      const stave = new Stave(0, 32 - 40, w);

      // Strip out the start and end barlines as requested
      stave.setBegBarType(Barline.type.NONE);
      stave.setEndBarType(Barline.type.NONE);
      
      // Set the fill color for the stave lines
      // stave.setStyle({ fillStyle: "var(--color-hairline)", strokeStyle: "var(--color-hairline)" });

      // Connect it to the rendering context and draw
      const hairlineColor = "var(--color-hairline)";
      context.setFillStyle(hairlineColor);
      context.setStrokeStyle(hairlineColor);
      stave.setContext(context).draw();

      // Apply color to all note elements (heads, stems, AND ledger lines)
      const noteStyle = { fillStyle: hairlineColor, strokeStyle: hairlineColor };
      notes.forEach((note) => {
        note.setStyle(noteStyle);
        note.setLedgerLineStyle(noteStyle);
      });

      const voice = new Voice({ numBeats: 4, beatValue: 4 });
      voice.addTickables(notes);

      // Format to minimum width, then center within the stave's usable space
      const formatter = new Formatter().joinVoices([voice]);
      const tw = w - STAVE_LEFT_PADDING;
      const uw = tw * (tw - 17.0 - STAVE_LEFT_PADDING) / (tw * 3 / 4 + (17 + STAVE_LEFT_PADDING) + 12)
      formatter.format([voice], uw);
      notes.forEach((note) => {
        note.setXShift(STAVE_LEFT_PADDING);
        // Shift accidentals right so they sit within the left margin
        note.getModifiers().forEach((mod) => {
          if (mod instanceof Accidental) {
            mod.setXShift(-STAVE_LEFT_PADDING);
          }
        });
      });
      voice.draw(context, stave);
      beams.forEach((beam) => beam.setContext(context).draw());
    };

    // Initial draw using the container's actual width
    const el = containerRef.current;
    draw(el.clientWidth);

    // Redraw whenever the container resizes (responsive width)
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        draw(entry.contentRect.width);
      }
    });
    ro.observe(el);

    // Cleanup: stop observing and wipe SVG on unmount
    return () => {
      ro.disconnect();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [noteKey]);

  return (
    <div className="staff-divider">
      <div ref={containerRef} style={{ width: '100%' }} />
    </div>
  );
};

export default CustomSvgStave;