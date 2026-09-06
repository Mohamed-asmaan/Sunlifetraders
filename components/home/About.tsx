"use client";

import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal, MotionCard } from "@/components/motion/Reveal";
import { useEffect, useRef, useState } from "react";
import type { AboutContent, Stat } from "@/lib/types";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p
      ref={ref}
      className="font-[family-name:var(--font-geist)] text-[32px] font-medium tracking-tight"
    >
      {n}
      {suffix}
    </p>
  );
}

export default function About({ about, stats }: { about: AboutContent; stats: Stat[] }) {
  return (
    <Section id="about" pad="roomy">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionIntro badge={about.badge} title={about.title} description={about.description}>
            <Reveal delay={0.25} className="mt-8">
              <ArrowButton href="/#solution">{about.cta}</ArrowButton>
            </Reveal>
          </SectionIntro>
        </div>

        <Reveal blur>
          <div className="relative overflow-hidden rounded-[28px] bg-soft">
            <Image
              src={about.image}
              alt={about.imageAlt}
              width={1024}
              height={1024}
              className="h-[420px] w-full object-cover md:h-[500px]"
            />
            <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-white/90 p-4 backdrop-blur-md md:right-auto md:max-w-[320px]">
              <p className="text-xs text-muted">{about.cardDate}</p>
              <p className="mt-1 display-kicker">{about.cardTitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{about.cardDescription}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <MotionCard key={stat.title} i={i} step={0.12} amount={0.35} className="rounded-2xl bg-soft p-6">
            <AccentDot className="mb-6" />
            <Counter value={stat.value} suffix={stat.suffix} />
            <h3 className="mt-2 display-kicker">{stat.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stat.description}</p>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
