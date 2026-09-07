"use client";

import { FormEvent, useState } from "react";
import { submitLead } from "@/lib/actions";

export default function FranchiseForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("source", "franchise");
    setStatus("sending");
    const result = await submitLead(data);
    if (result.ok) {
      setStatus("sent");
      form.reset();
      return;
    }
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div className="rounded-[24px] bg-soft p-8 text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12l5 5L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="display-kicker text-ink">Application received!</h3>
        <p className="copy mt-2 text-muted">
          Our franchise team will contact you within 1 working day to discuss territory and requirements.
        </p>
      </div>
    );
  }

  const fieldClass =
    "ui w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder-ink/35 outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/10";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="ui mb-1.5 block text-ink/70">Full name *</span>
          <input name="name" type="text" required placeholder="Your full name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="ui mb-1.5 block text-ink/70">WhatsApp number *</span>
          <input name="phone" type="tel" required placeholder="+91 99999 99999" className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="ui mb-1.5 block text-ink/70">Email</span>
          <input name="email" type="email" placeholder="you@example.com" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="ui mb-1.5 block text-ink/70">City / District</span>
          <input name="city" type="text" placeholder="e.g. Kottayam" className={fieldClass} />
        </label>
      </div>

      <label className="block text-sm">
        <span className="ui mb-1.5 block text-ink/70">Tell us about your background (optional)</span>
        <textarea
          name="message"
          rows={3}
          placeholder="e.g. Electrical contractor, 5 years experience, Kollam district"
          className={`${fieldClass} resize-none`}
        />
      </label>

      {status === "error" ? (
        <p className="copy text-red-500">Something went wrong. Please try again.</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group ui inline-flex items-center gap-3 rounded-xl bg-ink py-[9px] pr-[6px] pl-[16px] text-white transition-[background-color,transform] duration-300 hover:scale-[1.03] hover:bg-ink/85 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Apply for franchise"}
        <span className="grid h-[30px] w-[30px] place-items-center rounded-lg bg-amber text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </form>
  );
}
