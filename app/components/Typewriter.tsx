"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * TYPEWRITER COMPONENT
 * ====================
 *
 * Types through an array of words sequentially, deletes between them,
 * and loops continuously. Shows a blinking cursor.
 *
 * WHY A CUSTOM COMPONENT INSTEAD OF MAGIC UI?
 * Magic UI's registry pulls in shadcn, Radix, and tailwind-merge.
 * This project doesn't use any of those — adding them for one component
 * would triple the JS bundle. A clean ~70-line component gives us the
 * same visual result with zero extra dependencies.
 *
 * HOW IT WORKS:
 * A single useEffect owns ONE setTimeout chain. Each tick:
 * 1. Reads current text from a ref (not state) to avoid stale closures
 * 2. Computes the next string
 * 3. Sets state (for rendering)
 * 4. Schedules exactly ONE next tick
 *
 * No scheduling happens inside setState callbacks — that was the bug
 * in the previous version. Each tick is a single, predictable step.
 */

interface TypewriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDelay?: number;
  className?: string;
  /** Text to show immediately on mount before the first delete cycle */
  initialText?: string;
}

export function Typewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDelay = 2000,
  className,
  initialText = "",
}: TypewriterProps) {
  const [text, setText] = useState(initialText);

  // All mutable state lives in refs so the effect doesn't re-run on changes.
  // The effect runs ONCE on mount and owns the entire timer chain.
  const textRef = useRef(initialText);
  const wordIndexRef = useRef(0);
  // If there's initial text, we start by deleting it before typing the first word
  const isDeletingRef = useRef(initialText.length > 0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    const currentWord = words[wordIndexRef.current];
    const currentText = textRef.current;
    let nextText: string;
    let delay: number;

    if (!isDeletingRef.current) {
      // TYPING: append one character
      nextText = currentWord.slice(0, currentText.length + 1);

      if (nextText === currentWord) {
        // Word fully typed — pause, then start deleting
        delay = pauseDelay;
        isDeletingRef.current = true;
      } else {
        delay = typeSpeed;
      }
    } else {
      // DELETING: remove one character
      nextText = currentWord.slice(0, currentText.length - 1);

      if (nextText === "") {
        // Word fully deleted — advance to next word
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
        isDeletingRef.current = false;
        delay = typeSpeed;
      } else {
        delay = deleteSpeed;
      }
    }

    // Update ref and state together — ref for the next tick to read,
    // state for React to render
    textRef.current = nextText;
    setText(nextText);

    // Schedule exactly ONE next tick
    timerRef.current = setTimeout(tick, delay);
  }, [words, typeSpeed, deleteSpeed, pauseDelay]);

  useEffect(() => {
    // Start typing after the initial pause
    timerRef.current = setTimeout(tick, pauseDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick]);

  return (
    <span className={className}>
      {text}
      <span
        className="inline-block w-[2px] h-[1em] ml-[2px] align-middle"
        style={{
          background: "var(--color-crimson)",
          animation: "blink 1s step-end infinite",
        }}
        aria-hidden="true"
      />
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
