"use client";

import Image from "next/image";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard } from "@/components/motion/Reveal";
import type { Intro, Project } from "@/lib/types";

function splitTitle(title: string) {
  const parts = title.split(" · ");
  const hook = parts.find((part) => part.includes("→") && part.includes("₹"));
  return {
    lead: parts.filter((part) => part !== hook).join(" · "),
    hook,
  };
}

function splitQuote(description: string) {
  const [quote, who] = description.split(" — ");
  return { quote: quote?.trim() ?? description, who: who?.trim() };
}

export default function Projects({ intro, items }: { intro: Intro; items: Project[] }) {
  return (
    <Section id="projects" pad="tight">
      <SectionIntro
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        className="max-w-[640px]"
        descriptionClass="copy mt-5 text-muted"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map((project, i) => {
          const { lead, hook } = splitTitle(project.title);
          const { quote, who } = splitQuote(project.description);

          return (
            <MotionCard
              key={project.title}
              i={i}
              hover={false}
              duration={0.85}
              step={0.1}
              className="group relative min-h-[320px] overflow-hidden rounded-[28px] md:min-h-[380px]"
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4">
                <div className="rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(17,17,17,0.08)] md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="display-card text-[18px] min-[810px]:text-[22px]">{lead}</h3>
                      {hook ? (
                        <span className="mt-1 inline-block rounded-full bg-amber px-2 py-0.5 text-[11px] font-medium text-white">
                          {hook}
                        </span>
                      ) : null}
                    </div>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" aria-hidden />
                  </div>

                  <div className="mt-3 grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="copy text-muted">{quote}</p>
                      {who ? <p className="eyebrow mt-2 text-ink/50">{who}</p> : null}
                    </div>
                  </div>
                </div>
              </div>
            </MotionCard>
          );
        })}
      </div>
    </Section>
  );
}
