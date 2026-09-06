"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ArrowButton from "@/components/ArrowButton";
import { Section, SectionIntro } from "@/components/ui/Section";
import { Reveal, easeOutExpo } from "@/components/motion/Reveal";
import type { Faq, FaqIntro } from "@/lib/types";

export default function FAQ({ intro, items }: { intro: FaqIntro; items: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faqs">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionIntro
            badge={intro.badge}
            title={intro.title}
            description={intro.description}
            descriptionClass="copy mt-4 max-w-[36ch] text-muted"
          />

          <Reveal delay={0.2} className="mt-10 rounded-[24px] bg-soft p-6">
            <h3 className="display-kicker">{intro.helpTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{intro.helpDescription}</p>
            <div className="mt-5">
              <ArrowButton href="/contact">Get Consultation</ArrowButton>
            </div>
          </Reveal>
        </div>

        <Reveal className="divide-y divide-line rounded-[28px] border border-line px-2">
          {items.map((item, i) => {
            const active = open === i;
            return (
              <div key={item.question} className="px-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(active ? -1 : i)}
                  aria-expanded={active}
                >
                  <span className="display-kicker">{item.question}</span>
                  <span className="relative h-5 w-5 shrink-0">
                    <span className="absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 bg-ink" />
                    <motion.span
                      className="absolute top-0 left-1/2 h-5 w-px -translate-x-1/2 bg-ink"
                      animate={{ scaleY: active ? 0 : 1 }}
                      transition={{ duration: 0.25, ease: easeOutExpo }}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}
