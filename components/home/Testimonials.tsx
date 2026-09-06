"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SectionIntro } from "@/components/ui/Section";
import type { Intro, Testimonial } from "@/lib/types";

function Stars() {
  return (
    <div className="flex gap-1 text-ink" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3.2l2.4 5.1 5.6.8-4 3.9.9 5.6L12 16.8 6.1 18.6l.9-5.6-4-3.9 5.6-.8L12 3.2z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ item }: { item: Testimonial }) {
  return (
    <article className="w-[300px] shrink-0 rounded-[24px] bg-soft p-5 sm:w-[340px]">
      <Stars />
      <p className="copy mt-5 min-h-[120px]">“{item.quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <Image
          src={item.image}
          alt={`${item.name} photo`}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
        <p className="text-sm font-medium">{item.name}</p>
      </div>
    </article>
  );
}

export default function Testimonials({ intro, items }: { intro: Intro; items: Testimonial[] }) {
  const loop = [...items, ...items];

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

      <motion.div
        className="mt-10 flex w-max gap-4 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <Card key={`${item.name}-${i}`} item={item} />
        ))}
      </motion.div>
    </section>
  );
}
