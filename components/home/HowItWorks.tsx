"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard } from "@/components/motion/Reveal";
import type { Intro, Step } from "@/lib/types";

export default function HowItWorks({ intro, steps }: { intro: Intro; steps: Step[] }) {
  const reduce = useReducedMotion();

  return (
    <Section id="how-it-works">
      <SectionIntro
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        descriptionClass="copy mt-5 max-w-[52ch] text-muted"
      />
      {reduce ? <StepGrid steps={steps} /> : <StepStack steps={steps} />}
    </Section>
  );
}

function StepGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {steps.map((step, i) => (
        <MotionCard key={step.number} i={i} step={0.1} className="rounded-[24px] bg-soft p-6">
          <StepBody step={step} next={steps[i + 1]} total={steps.length} />
        </MotionCard>
      ))}
    </div>
  );
}

function StepStack({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stackRef.current;
    if (!root) return;

    const update = () => {
      const cards = root.querySelectorAll<HTMLElement>("[data-step-index]");
      let current = 0;
      cards.forEach((card) => {
        if (card.getBoundingClientRect().top <= 168) {
          current = Number(card.dataset.stepIndex);
        }
      });
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function goTo(index: number) {
    document.getElementById(`step-${steps[index].number}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div ref={stackRef} className="mt-10">
      <div className="sticky top-[76px] z-30 -mx-4 bg-white/90 px-4 py-3 backdrop-blur-md md:-mx-6 md:px-6">
        <p className="eyebrow text-ink/45">Pipeline · step {steps[active]?.number} of {String(steps.length).padStart(2, "0")}</p>
        <div className="mt-3 flex items-center gap-1 overflow-x-auto pb-1">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "step" : undefined}
                className={`ui flex items-center gap-2 rounded-full px-2.5 py-1.5 whitespace-nowrap transition ${
                  i === active
                    ? "bg-amber text-white"
                    : i < active
                      ? "bg-ink text-white"
                      : "bg-soft text-ink/50"
                }`}
              >
                <span>{step.number}</span>
                <span className="hidden sm:inline">{step.title}</span>
              </button>
              {i < steps.length - 1 ? (
                <span
                  className={`mx-1 h-px w-4 shrink-0 md:w-6 ${i < active ? "bg-ink" : "bg-line"}`}
                  aria-hidden
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <ol className="relative mt-4">
        {steps.map((step, i) => (
          <li
            key={step.number}
            id={`step-${step.number}`}
            data-step-index={i}
            className="h-[68svh] min-h-[420px] max-h-[640px]"
          >
            <article
              className="sticky overflow-hidden rounded-[24px] bg-soft shadow-[0_12px_40px_rgba(17,17,17,0.06)]"
              style={{ top: `calc(148px + ${i * 12}px)`, zIndex: i + 1 }}
            >
              <div
                className="h-1 bg-amber"
                style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                aria-hidden
              />
              <div className="p-6 md:p-8">
                <StepBody step={step} next={steps[i + 1]} total={steps.length} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StepBody({ step, next, total }: { step: Step; next?: Step; total: number }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="ui grid h-11 w-11 place-items-center rounded-full bg-amber text-white">{step.number}</div>
        <p className="eyebrow text-ink/40">
          Step {step.number} / {String(total).padStart(2, "0")}
        </p>
      </div>
      <h3 className="display-card mt-6">{step.title}</h3>
      <ul className="mt-4 max-w-[46ch] space-y-3">
        {step.points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
            {point}
          </li>
        ))}
      </ul>
      {next ? (
        <p className="ui mt-6 inline-flex items-center gap-2 text-ink/45">
          Then
          <span className="rounded-full bg-white px-2.5 py-1 text-ink">
            {next.number} {next.title}
          </span>
        </p>
      ) : (
        <p className="ui mt-6 text-ink/45">Pipeline complete · monitoring starts</p>
      )}
    </>
  );
}
