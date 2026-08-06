"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollingSongList
 *
 * A seamless infinite-scrolling song list. The scroll speed is constant
 * (pixels per second) regardless of how many songs are in the list.
 * Content is duplicated to create the seamless loop.
 */

interface ScrollingSongListProps {
  songs: readonly string[];
  speed?: number; // pixels per second, default 50
  className?: string;
}

export default function ScrollingSongList({
  songs,
  speed = 50,
  className = "",
}: ScrollingSongListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // The child scrolls up by half its total height
    const scrollDistance = el.scrollHeight / 2;
    const duration = scrollDistance / speed;
    el.style.setProperty("--scroll-duration", `${duration}s`);
  }, [songs, speed]);

  return (
    <div className={`overflow-hidden max-h-100 ${className}`}>
      <div ref={scrollRef} className="animate-scroll-up flex flex-col gap-4 pr-2">
        <ul className="song-list text-base">
          {songs.map((song) => (
            <li key={song} className="select-none">{song}</li>
          ))}
          {songs.map((song) => (
            <li key={`dup-${song}`} className="select-none">{song}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
