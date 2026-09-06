"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section, SectionIntro } from "@/components/ui/Section";
import { easeOutExpo } from "@/components/motion/Reveal";
import type { Benefit, Intro } from "@/lib/types";

const icons: Record<string, ReactNode> = {
  "LiDAR shading analysis": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 4.2v1.6M12 18.2v1.6M4.2 12h1.6M18.2 12h1.6M6.4 6.4l1.2 1.2M16.4 16.4l1.2 1.2M6.4 17.6l1.2-1.2M16.4 7.6l1.2-1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  "25-year performance monitoring": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4.5 16.5 9 12l3.2 3.2L19.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 8H19.5V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Certified structural safety": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.6 19 7.2v5c0 4.2-2.9 6.7-7 8.2-4.1-1.5-7-4-7-8.2v-5L12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "On-grid · Off-grid · Hybrid": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19c-4 0-7-2.6-7-7 0-3.4 2-6.2 5-7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M12 5c4 0 7 2.6 7 7 0 3.4-2 6.2-5 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 8.5v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  "Approvals, handled": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.8 12.2 11 14.3l4.4-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Tier-1 modules only": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 8.2 12 5.5l3.5 2.7v4.1L12 15.1 8.5 12.3V8.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 16.5h10M9 18.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const fallbackIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function Benefits({
  intro,
  items,
  image,
  imageAlt,
}: {
  intro: Intro;
  items: Benefit[];
  image: string;
  imageAlt: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <Section id="engineering">
      <SectionIntro
        align="center"
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        descriptionClass="copy mx-auto mt-5 max-w-[52ch] text-muted"
      />

      <div className="mt-10 overflow-hidden rounded-[32px] bg-soft lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-center gap-2.5 p-4 sm:p-6 lg:p-8">
          {items.map((item, i) => {
            const active = open === i;
            return (
              <button
                key={item.title}
                type="button"
                className={`flex w-full gap-4 rounded-[18px] bg-white px-4 py-3.5 text-left md:px-5 md:py-4 ${
                  active ? "items-start" : "items-center"
                }`}
                onClick={() => setOpen(i)}
                aria-expanded={active}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center text-ink">
                  {icons[item.title] ?? fallbackIcon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="display-kicker block">{item.title}</span>
                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.span
                        key={item.title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: easeOutExpo }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                          {item.description}
                        </span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center text-ink">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d={active ? "M7 17L17 7M17 7H8M17 7V16" : "M5 12h14M14 7l5 5-5 5"}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[280px] h-full lg:min-h-[560px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </Section>
  );
}
