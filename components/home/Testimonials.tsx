"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SectionIntro } from "@/components/ui/Section";
import type { Intro, Testimonial } from "@/lib/types";

function Stars() {
  return (
    <div className="flex gap-1 text-amber" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3.2l2.4 5.1 5.6.8-4 3.9.9 5.6L12 16.8 6.1 18.6l.9-5.6-4-3.9 5.6-.8L12 3.2z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Card({ item }: { item: Testimonial }) {
  return (
    <article className="flex h-[280px] w-[300px] shrink-0 flex-col rounded-[24px] bg-soft p-5 sm:w-[340px]">
      <Stars />
      <p className="copy mt-5 line-clamp-6 flex-1">“{item.quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-amber-light text-sm font-semibold text-amber">
          {initials(item.name)}
        </span>
        <div>
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-muted">Google review</p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials({ intro, items }: { intro: Intro; items: Testimonial[] }) {
  const reviews = items.filter((item) => item.quote.trim().length > 8);
  const loop = [...reviews, ...reviews];
  const rowRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || reviews.length === 0) return;

    const measure = () => {
      const cards = [...row.children] as HTMLElement[];
      if (cards.length < reviews.length + 1) return;
      const first = cards[0].offsetLeft;
      const midpoint = cards[reviews.length].offsetLeft;
      setShift(midpoint - first);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reviews.length]);

  return (
    <section className="overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <SectionIntro
          badge={intro.badge}
          title={intro.title}
          description={intro.description}
          titleClass="display max-w-[16ch]"
        />
      </div>

      <div
        className="mt-10 overflow-hidden px-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={rowRef}
          className={shift ? "testimonials-track flex w-max gap-4" : "flex w-max gap-4"}
          style={
            {
              "--shift": `${shift}px`,
              animationDuration: `${Math.max(28, reviews.length * 3.4)}s`,
              animationPlayState: paused ? "paused" : "running",
            } as CSSProperties
          }
        >
          {loop.map((item, i) => (
            <Card key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
