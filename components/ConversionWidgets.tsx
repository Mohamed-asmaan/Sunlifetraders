"use client";

import { openRoi } from "@/components/roi/RoiOverlay";

export function MobileStickyBar({ phoneHref }: { phoneHref: string }) {
  if (!phoneHref) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-2 backdrop-blur-md lg:hidden"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-2 gap-2">
        <a href={phoneHref} className="ui flex h-12 items-center justify-center rounded-2xl bg-ink text-white">
          One-tap call
        </a>
        <button
          type="button"
          onClick={() => openRoi()}
          className="ui flex h-12 items-center justify-center rounded-2xl bg-amber text-white"
        >
          Check savings
        </button>
      </div>
    </nav>
  );
}

export function CalculatorFloat() {
  return (
    <button
      type="button"
      onClick={() => openRoi()}
      aria-label="Open savings calculator"
      className="fixed right-4 bottom-36 z-40 grid h-12 w-12 place-items-center rounded-2xl bg-amber text-white shadow-lg md:right-6 md:h-14 md:w-14 lg:bottom-24"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 8h8M8 12h8M8 16h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </button>
  );
}
