"use client";

import { FormEvent, useEffect, useState } from "react";
import { openRoi } from "@/components/roi/RoiOverlay";

const KEY = "sunlife-popup-seen";

export default function MarketingPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;

    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      setOpen(true);
      sessionStorage.setItem(KEY, "1");
    };

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight;
      const h = document.documentElement.scrollHeight;
      if (y / h > 0.5) trigger();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!open) return null;

  const dismiss = () => setOpen(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    dismiss();
    openRoi();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button type="button" aria-label="Close" onClick={dismiss} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white p-6 md:p-7"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-xl bg-soft"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <p className="eyebrow text-ink/50">Free · 30 seconds</p>
        <h3 className="display-card mt-2 text-ink">See what your bill becomes.</h3>
        <p className="copy mt-2 text-ink/70">
          Slide your current EB bill and watch subsidy, EMI and payback update live.
        </p>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2">
          <div className="flex overflow-hidden rounded-2xl bg-soft">
            <span className="ui border-r border-line px-3 py-3 text-ink/55">+91</span>
            <input
              inputMode="numeric"
              maxLength={10}
              placeholder="WhatsApp number (optional)"
              className="h-12 flex-1 bg-transparent px-3 outline-none"
            />
          </div>
          <button type="submit" className="ui h-12 rounded-full bg-ink text-white">
            Show my savings
          </button>
          <button type="button" onClick={dismiss} className="ui text-ink/45">
            Maybe later
          </button>
        </form>
      </div>
    </div>
  );
}
