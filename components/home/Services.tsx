"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard } from "@/components/motion/Reveal";
import type { Intro, Solution } from "@/lib/types";

const icons: Record<string, ReactNode> = {
  "Rooftop Solar Installation": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Ground Mount Installation": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 14.5 12 8l8 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M6.2 14.5V19h11.6v-4.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 21h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.2 14.5v4.5M12 12.8V19M15.8 14.5v4.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  "Solar Plant Maintenance": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.7 6.3a3.2 3.2 0 0 0 4.5 4.5L12 18l-4.2 1.2L8.9 15l5.8-8.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M4 20h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  "Solar Power Plant AMC": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 3.5h6v2.5H9V3.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 11h6M9 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function Services({
  intro,
  items,
}: {
  intro: Intro;
  items: Solution[];
}) {
  return (
    <Section id="services" pad="services">
      <SectionIntro
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        align="center"
        className="mx-auto w-full max-w-[640px] text-center"
        descriptionClass="copy mt-5 text-muted"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <MotionCard
            key={item.title}
            i={i}
            hover={-8}
            amount={0.25}
            className="flex h-full flex-col rounded-[24px] border border-line bg-white p-6"
          >
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-amber text-white">
              {icons[item.title] ?? fallbackIcon}
            </div>
            <h3 className="display-card mt-5">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            {item.href ? (
              <Link href={item.href} className="ui mt-4 inline-flex text-ink underline underline-offset-4">
                {item.cta ?? "Know more"}
              </Link>
            ) : null}
            <div className="mt-auto flex min-h-[180px] items-end justify-center pt-8">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={420}
                  height={260}
                  className="h-auto w-full max-h-[200px] object-contain object-bottom"
                />
              ) : null}
            </div>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
