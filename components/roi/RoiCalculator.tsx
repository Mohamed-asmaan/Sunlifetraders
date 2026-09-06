"use client";

import { useMemo, useState } from "react";
import ArrowButton from "@/components/ArrowButton";
import { calcRoi, formatInr, ROI_STATES, type RoiState } from "@/lib/roi";

export default function RoiCalculator({ onLockQuote }: { onLockQuote?: () => void }) {
  const [bill, setBill] = useState(6000);
  const [state, setState] = useState<RoiState>("kerala");
  const [hasEv, setHasEv] = useState(false);
  const result = useMemo(() => calcRoi(bill, state, hasEv), [bill, state, hasEv]);

  return (
    <div id="calculator" className="overflow-hidden bg-soft">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="border-b border-line p-6 md:p-8 lg:border-r lg:border-b-0">
          <p className="eyebrow text-ink/50">Your economics, live</p>
          <h3 className="display-card mt-2 text-ink">Move the slider. Payback updates instantly.</h3>
          <p className="copy mt-2 text-ink/70">
            Sized from your state tariff and peak sun hours, including PM Surya Ghar subsidy.
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm">
              <label className="font-medium" htmlFor="roi-bill">
                Monthly EB bill
              </label>
              <span className="ui tabular-nums">{formatInr(bill)}</span>
            </div>
            <input
              id="roi-bill"
              type="range"
              min={1500}
              max={30000}
              step={500}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="roi-range mt-3 w-full"
            />
            <div className="mt-1 flex justify-between text-[11px] text-ink/45">
              <span>₹1,500</span>
              <span>₹30,000</span>
            </div>
          </div>

          <p className="mt-6 text-sm font-medium">State</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(Object.keys(ROI_STATES) as RoiState[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setState(key)}
                className={`ui rounded-2xl px-3 py-2.5 text-left transition ${
                  state === key ? "bg-ink text-white" : "bg-white text-ink"
                }`}
              >
                {ROI_STATES[key].label}
              </button>
            ))}
          </div>

          <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3">
            <span className="text-sm">
              <span className="font-medium">Plan for an EV</span>
              <span className="mt-0.5 block text-xs text-ink/55">Adds ~25% load for right-sizing</span>
            </span>
            <span className={`relative h-5 w-9 rounded-full transition ${hasEv ? "bg-ink" : "bg-line"}`}>
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                  hasEv ? "left-4" : "left-0.5"
                }`}
              />
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={hasEv}
              onChange={(e) => setHasEv(e.target.checked)}
            />
          </label>
        </div>

        <div className="bg-white p-6 md:p-8">
          <BillFlip before={bill} after={Math.max(80, bill - result.monthlySavings)} sysKw={result.sysKw} />

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Metric label="Payback" value={`${result.paybackYears.toFixed(1)} yrs`} accent />
            <Metric label="EMI · 7 yr @ 9%" value={`${formatInr(result.emi)}/mo`} />
            <Metric label="PM Surya subsidy" value={formatInr(result.subsidy)} />
            <Metric label="Net investment" value={formatInr(result.net)} />
          </div>

          <div className="mt-6 rounded-2xl bg-soft p-4">
            <div className="flex items-center justify-between text-xs text-ink/55">
              <span>System cost</span>
              <span className="tabular-nums">{formatInr(result.gross)}</span>
            </div>
            <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-white">
              <div className="h-full bg-amber" style={{ width: `${(result.subsidy / result.gross) * 100}%` }} />
              <div className="h-full bg-ink" style={{ width: `${(result.net / result.gross) * 100}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-ink/55">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber" />
                Subsidy {formatInr(result.subsidy)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink" />
                Your net {formatInr(result.net)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-ink p-4 text-white">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" />
              </svg>
            </span>
            <p className="copy text-white/90">
              25-year net gain after subsidy:{" "}
              <span className="font-medium text-white tabular-nums">{formatInr(result.twentyFive)}</span>
            </p>
          </div>

          <div className="mt-5 flex justify-center" onClick={onLockQuote}>
            <ArrowButton href="/#franchise">Lock in this quote</ArrowButton>
          </div>
          <p className="copy mt-3 text-center text-[12px] text-ink/45">
            Based on {result.tariff.toFixed(1)}₹/unit and {result.sunHours} peak sun hours. Final quote after survey.
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 ${accent ? "bg-amber-light border border-amber/20" : "bg-soft"}`}>
      <p className="eyebrow text-ink/50">{label}</p>
      <p className="mt-1 text-lg font-medium tabular-nums">{value}</p>
    </div>
  );
}

function BillFlip({ before, after, sysKw }: { before: number; after: number; sysKw: number }) {
  const [side, setSide] = useState<"before" | "after">("before");
  const drop = Math.round(((before - after) / before) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="eyebrow text-ink/50">Bill flip · {sysKw.toFixed(1)} kW</p>
        <div className="inline-flex rounded-full bg-soft p-0.5">
          {(["before", "after"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSide(key)}
              className={`ui rounded-full px-2.5 py-1 text-[12px] ${
                side === key ? "bg-ink text-white" : "text-ink/55"
              }`}
            >
              {key === "before" ? "Now" : "With Sunlife"}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-[24px] p-5 md:p-6 ${side === "before" ? "bg-soft" : "bg-amber-light border border-amber/20"}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-ink/50">{side === "before" ? "Amount due" : "After solar"}</p>
            <p className="display-card mt-1 tabular-nums">
              {formatInr(side === "before" ? before : after)}
            </p>
            <p className="copy mt-1 text-ink/60">
              {side === "before" ? "Grid-only, rising every quarter" : `${drop}% lower than today`}
            </p>
          </div>
          <span className="ui rounded-full bg-white px-3 py-1 text-[12px]">
            {side === "before" ? "Paid to grid" : "Sunlife saves"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSide((s) => (s === "before" ? "after" : "before"))}
        className="ui mt-3 w-full text-ink/60"
      >
        Tap to flip
      </button>
    </div>
  );
}
