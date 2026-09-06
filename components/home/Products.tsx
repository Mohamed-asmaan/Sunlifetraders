"use client";

import type { ReactNode } from "react";
import ArrowButton from "@/components/ArrowButton";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard } from "@/components/motion/Reveal";
import type { Intro } from "@/lib/types";

const cards: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Solar Panels",
    description: "Mono-PERC & bifacial modules from Tier-1 makers.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Inverters",
    description: "String & hybrid inverters with app-based monitoring.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Meters",
    description: "Net-metering approved bidirectional smart meters.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 13l4-3.5M8 8.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Electrical Components",
    description: "MC4s, DC/AC breakers, cables & surge protection.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 7V4.5M14 7V4.5M10 19.5V17M14 19.5V17M7 10H4.5M7 14H4.5M19.5 10H17M19.5 14H17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Products({ intro }: { intro: Intro }) {
  return (
    <Section id="products" pad="tight">
      <SectionIntro badge={intro.badge} title={intro.title} description={intro.description} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((item, i) => (
          <MotionCard key={item.title} i={i} hover={-6} amount={0.25} className="rounded-2xl border border-line bg-white p-6">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-amber text-white">{item.icon}</div>
            <h3 className="display-card mt-5">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          </MotionCard>
        ))}
      </div>

      <div className="mt-8">
        <ArrowButton href="/products">Explore all</ArrowButton>
      </div>
    </Section>
  );
}
