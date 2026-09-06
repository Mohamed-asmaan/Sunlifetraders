"use client";

import { FormEvent, useState } from "react";
import { Section, SectionIntro } from "@/components/ui/Section";
import { fieldClass, submitClass } from "@/components/ui/form";
import { submitLead } from "@/lib/actions";
import { Reveal } from "@/components/motion/Reveal";
import type { QuizContent } from "@/lib/types";

function estimate(bill: string) {
  if (bill.includes("20,000+")) return 16000;
  if (bill.includes("10,000")) return 10500;
  if (bill.includes("5,000 - ₹10,000")) return 6000;
  return 2800;
}

export default function Quiz({ quiz }: { quiz: QuizContent }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quiz.questions.length).fill(""));
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const question = quiz.questions[step];
  const last = step === quiz.questions.length - 1;

  async function next(e: FormEvent) {
    e.preventDefault();
    if (!answers[step]) return;
    if (!last) {
      setStep((n) => n + 1);
      return;
    }
    setStatus("sending");
    const data = new FormData();
    data.set("name", "Savings quiz");
    data.set("phone", answers[3] || "");
    data.set("source", "quiz");
    data.set(
      "message",
      quiz.questions.map((item, i) => `${item.question} ${answers[i]}`).join("\n"),
    );
    const result = await submitLead(data);
    setStatus(result.ok ? "sent" : "error");
  }

  return (
    <Section id="quiz">
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionIntro
          badge={quiz.badge}
          title={quiz.title}
          description={quiz.description}
          descriptionClass="copy mt-5 max-w-[42ch] text-muted"
        />

        <Reveal className="rounded-[28px] border border-line bg-white p-5 md:p-7">
          {status === "sent" ? (
            <div>
              <p className="text-sm font-medium text-muted">Estimated monthly savings</p>
              <p className="display-hero mt-2">₹{estimate(answers[0]).toLocaleString("en-IN")}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                A senior engineer from Sunlife will WhatsApp you the full report with recommended
                system size, subsidy, EMI options and payback period, within 2 working hours.
              </p>
            </div>
          ) : (
            <form onSubmit={next}>
              <p className="text-xs font-medium text-muted" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
                Step {step + 1} / {quiz.questions.length}
              </p>
              <h3 className="display-kicker mt-3">{question?.question}</h3>
              {question?.options.length ? (
                <div className="mt-5 grid gap-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rounded-2xl px-4 py-3 text-left text-sm ${
                        answers[step] === option ? "bg-ink text-white" : "bg-soft"
                      }`}
                      onClick={() =>
                        setAnswers((current) => current.map((value, i) => (i === step ? option : value)))
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  required
                  value={answers[step]}
                  placeholder={question?.placeholder}
                  className={`mt-5 ${fieldClass}`}
                  onChange={(e) =>
                    setAnswers((current) => current.map((value, i) => (i === step ? e.target.value : value)))
                  }
                />
              )}
              <button
                type="submit"
                disabled={status === "sending" || !answers[step]}
                className={submitClass}
              >
                {status === "sending" ? "Sending…" : last ? "Reveal my savings" : "Next"}
              </button>
              {status === "error" ? (
                <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
              ) : null}
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
