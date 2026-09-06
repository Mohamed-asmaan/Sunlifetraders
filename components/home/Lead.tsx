"use client";

import { FormEvent, useState } from "react";
import { Section, SectionIntro } from "@/components/ui/Section";
import { fieldClass, submitClass } from "@/components/ui/form";
import { submitLead } from "@/lib/actions";
import { Reveal } from "@/components/motion/Reveal";
import type { Intro } from "@/lib/types";

export default function Lead({ intro }: { intro: Intro & { cta: string } }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("source", "proposal");
    setStatus("sending");
    const result = await submitLead(data);
    if (result.ok) {
      setStatus("sent");
      form.reset();
      return;
    }
    setStatus("error");
  }

  return (
    <Section id="franchise">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <SectionIntro badge={intro.badge} title={intro.title} description={intro.description} />
        <Reveal>
          <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-white p-5 md:p-7">
            <p className="mb-5 text-sm font-medium">Request a free proposal</p>
            <label className="block text-sm">
              <span className="mb-2 block font-medium">Your name</span>
              <input required name="name" className={fieldClass} />
            </label>
            <label className="mt-4 block text-sm">
              <span className="mb-2 block font-medium">Phone / WhatsApp</span>
              <input required name="phone" type="tel" className={fieldClass} />
            </label>
            <label className="mt-4 block text-sm">
              <span className="mb-2 block font-medium">City / locality</span>
              <input name="city" className={fieldClass} />
            </label>
            <button type="submit" disabled={status === "sending"} className={submitClass}>
              {status === "sending" ? "Sending…" : intro.cta}
            </button>
            {status === "sent" ? (
              <p className="mt-3 text-sm text-ink">
                Thanks! We’ll WhatsApp your proposal within 2 working hours.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
