"use client";

import { SectionIntro } from "@/components/ui/Section";
import type { BrandLogo, Intro } from "@/lib/types";

export default function Brands({ intro, items }: { intro: Intro; items: BrandLogo[] }) {
  const set = [...items, ...items, ...items, ...items];
  const loop = [...set, ...set];

  return (
    <section className="overflow-hidden py-8 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <SectionIntro badge={intro.badge} title={intro.title} description={intro.description} />
      </div>

      <div className="logo-marquee mt-6 md:mt-10" aria-label="Manufacturer partners">
        <div className="logo-marquee-track">
          {loop.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="logo-marquee-item">
              <img src={logo.image} alt={i < set.length ? logo.name : ""} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
