"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import RoiCalculator from "./RoiCalculator";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const RoiCtx = createContext<Ctx>({ open: false, setOpen: () => {} });

export function openRoi() {
  window.dispatchEvent(new Event("open-roi"));
}

export function useRoiOverlay() {
  return useContext(RoiCtx);
}

export function RoiOverlayProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setOpen(true);
    const onHash = () => {
      if (window.location.hash === "#calculator") setOpen(true);
    };
    window.addEventListener("open-roi", openModal);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      window.removeEventListener("open-roi", openModal);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <RoiCtx.Provider value={{ open, setOpen }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-0 md:items-center md:p-6">
          <button
            type="button"
            aria-label="Close calculator"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Solar savings calculator"
            className="relative my-0 w-full max-w-5xl overflow-hidden bg-white shadow-[0_24px_80px_rgba(17,17,17,0.2)] md:my-8 md:rounded-[32px]"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-7">
              <div>
                <p className="eyebrow text-ink/50">Live calculator</p>
                <p className="display-kicker mt-1 text-ink">Your bill before and after solar</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-soft"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto md:max-h-[78vh]">
              <RoiCalculator onLockQuote={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </RoiCtx.Provider>
  );
}
