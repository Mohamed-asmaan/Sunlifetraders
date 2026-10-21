"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/data";

const POINTS = ["Free site survey", "No obligation", "Proposal in 2 working hours"];

export default function SurveyCta({
  title = "Get your solar proposal on WhatsApp",
  body = "Tell us your pincode and monthly EB bill. A senior engineer replies with system size, subsidy, EMI and install timeline.",
  primaryHref = "/contact",
  primaryLabel = "Prefer a form? Request a proposal",
  fieldLabel = "Pincode",
  fieldPlaceholder = "e.g. 695584",
  message = "Hi Sunlife, I'd like a free site survey.",
  showBill = true,
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  fieldLabel?: string;
  fieldPlaceholder?: string;
  message?: string;
  showBill?: boolean;
}) {
  const [place, setPlace] = useState("");
  const [bill, setBill] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = [message];
    if (place.trim()) lines.push(`${fieldLabel}: ${place.trim()}`);
    if (showBill && bill.trim()) lines.push(`Monthly EB bill: ₹${bill.trim()}`);
    const base = site.company.whatsappHref.split("?")[0];
    window.open(`${base}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  const input =
    "h-12 w-full rounded-xl border border-line bg-white px-4 text-[16px] text-ink outline-none placeholder:text-ink/35 focus:border-[#25D366]";

  return (
    <Reveal>
      <div className="grid overflow-hidden rounded-[32px] border border-amber/20 bg-amber-light md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="p-6 md:p-10">
          <p className="eyebrow text-amber">Free · Takes 30 seconds</p>
          <h2 className="display-card mt-3 max-w-[22ch] text-ink">{title}</h2>
          <p className="copy mt-3 max-w-[48ch] text-ink/75">{body}</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-[15px] text-ink">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber text-white">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col justify-center gap-3 bg-white p-6 md:p-10">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">{fieldLabel}</span>
            <input
              required
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder={fieldPlaceholder}
              className={input}
            />
          </label>
          {showBill ? (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Monthly EB bill (₹)</span>
              <input
                inputMode="numeric"
                value={bill}
                onChange={(e) => setBill(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="e.g. 3500"
                className={input}
              />
            </label>
          ) : null}
          <button
            type="submit"
            className="ui mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-white transition hover:bg-[#1fb858]"
          >
            <WhatsAppIcon size={18} className="text-white" />
            Send on WhatsApp
          </button>
          <Link
            href={primaryHref}
            className="ui self-center text-ink/60 underline decoration-ink/20 underline-offset-4 transition hover:text-amber hover:decoration-amber"
          >
            {primaryLabel}
          </Link>
        </form>
      </div>
    </Reveal>
  );
}
