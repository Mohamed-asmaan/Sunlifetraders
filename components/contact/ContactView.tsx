"use client";

import ContactForm from "@/components/contact/ContactForm";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal, MotionCard } from "@/components/motion/Reveal";
import type { ContactContent } from "@/lib/types";

export default function ContactView({ page }: { page: ContactContent }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(page.mapsQuery)}&z=15&output=embed`;

  return (
    <Section pad="contact">
      <SectionIntro
        as="h1"
        inView={false}
        badge={page.badge}
        title={page.title}
        description={page.description}
        delay={0.2}
        descriptionClass="copy mt-5 max-w-[48ch] text-muted"
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal blur className="min-h-[260px] overflow-hidden rounded-[28px] bg-soft md:min-h-[420px]">
          <iframe
            title="Google Maps"
            src={mapSrc}
            className="h-full min-h-[260px] w-full border-0 md:min-h-[420px]"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <ContactForm propertyTypes={page.propertyTypes} />
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {page.cards.map((card, i) => (
          <MotionCard key={card.title} i={i} step={0.1} className="rounded-[24px] bg-soft p-6">
            <AccentDot />
            <h2 className="display-kicker">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
            <a href={card.href} className="mt-4 inline-block text-sm font-medium underline">
              {card.label}
            </a>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
