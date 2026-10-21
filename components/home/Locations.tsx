"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section, SectionIntro } from "@/components/ui/Section";
import type { Intro, Office } from "@/lib/types";

const PIN_BY_CITY: Record<string, string> = {
  "Kollam, Kerala": "kollam",
  "Thiruvananthapuram, Kerala": "thiruvananthapuram",
  "Kanyakumari (Karankodu), Tamil Nadu": "karankodu",
  "Kanyakumari (Thiruvithancode), Tamil Nadu": "thiruvithancode",
  "Chennai, Tamil Nadu": "chennai",
};

const PIN_ORDER = ["kollam", "thiruvananthapuram", "karankodu", "thiruvithancode", "chennai"];
const CITY_BY_PIN = Object.fromEntries(Object.entries(PIN_BY_CITY).map(([city, pin]) => [pin, city]));

const PIN_XY: Record<string, { x: number; y: number }> = {
  kollam: { x: 251.4, y: 634.5 },
  thiruvananthapuram: { x: 284.7, y: 692.2 },
  karankodu: { x: 315.9, y: 748.3 },
  thiruvithancode: { x: 352.9, y: 734.3 },
  chennai: { x: 730.4, y: 101.4 },
};

const VIEWBOX = { w: 760, h: 827 };
const TAG_GAP = 22;
const EDGE = 8;

function mapsHref(address: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export default function Locations({ intro, offices }: { intro: Intro; offices: Office[] }) {
  const ordered = [...offices].sort((a, b) => {
    const ai = PIN_ORDER.indexOf(PIN_BY_CITY[a.city] ?? "");
    const bi = PIN_ORDER.indexOf(PIN_BY_CITY[b.city] ?? "");
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
  const [active, setActive] = useState(ordered[0]?.city ?? null);
  const office = ordered.find((item) => item.city === active) ?? ordered[0];

  return (
    <Section id="locations">
      <SectionIntro
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        descriptionClass="copy mt-5 max-w-[52ch] text-muted"
      />

      <div className="mx-auto mt-10 max-w-[720px] rounded-[28px] bg-soft p-4 md:p-6">
        <OfficesMap active={active} office={office} onActive={setActive} />
      </div>
    </Section>
  );
}

function OfficesMap({
  active,
  office,
  onActive,
}: {
  active: string | null;
  office?: Office;
  onActive: (city: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [tagSize, setTagSize] = useState({ w: 280, h: 150 });

  useEffect(() => {
    let alive = true;
    fetch("/images/locations/offices-map.svg")
      .then((res) => res.text())
      .then((svg) => {
        if (alive) setMarkup(svg);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const root = mapRef.current;
    if (!root || !markup) return;

    const nodes = [...root.querySelectorAll<SVGGElement>("[data-office]")];
    const unbind: Array<() => void> = [];

    nodes.forEach((node) => {
      const pin = node.getAttribute("data-office") ?? "";
      const city = CITY_BY_PIN[pin];
      if (!city) return;
      const select = () => onActive(city);
      node.addEventListener("mouseenter", select);
      node.addEventListener("click", select);
      node.addEventListener("focus", select);
      unbind.push(() => {
        node.removeEventListener("mouseenter", select);
        node.removeEventListener("click", select);
        node.removeEventListener("focus", select);
      });
    });

    return () => unbind.forEach((fn) => fn());
  }, [markup, onActive]);

  useEffect(() => {
    const root = mapRef.current;
    if (!root) return;
    root.querySelectorAll("[data-office]").forEach((node) => {
      const pin = node.getAttribute("data-office") ?? "";
      node.classList.toggle("is-on", CITY_BY_PIN[pin] === active);
    });
  }, [active, markup]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => setBox({ w: wrap.clientWidth, h: wrap.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [markup]);

  useEffect(() => {
    const tag = tagRef.current;
    if (!tag) return;
    setTagSize({ w: tag.offsetWidth, h: tag.offsetHeight });
  }, [office, box.w]);

  const pin = PIN_BY_CITY[office?.city ?? ""];
  const xy = pin ? PIN_XY[pin] : undefined;
  const n = String(PIN_ORDER.indexOf(pin ?? "") + 1).padStart(2, "0");

  let placement: { left: number; top: number; below: boolean; arrowLeft: number } | null = null;
  if (xy && box.w) {
    const px = (xy.x / VIEWBOX.w) * box.w;
    const py = (xy.y / VIEWBOX.h) * box.h;
    const below = py - TAG_GAP - tagSize.h < EDGE;
    const rightward = px - 18 + tagSize.w <= box.w - EDGE;
    const anchor = rightward ? px - 18 : px - tagSize.w + 18;
    const left = Math.min(Math.max(anchor, EDGE), box.w - tagSize.w - EDGE);
    const top = below ? py + TAG_GAP : py - TAG_GAP - tagSize.h;
    const arrowLeft = Math.min(Math.max(px - left, 18), tagSize.w - 18);
    placement = { left, top, below, arrowLeft };
  }

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[640px]">
      <div
        ref={mapRef}
        className="offices-map w-full [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
        aria-label="Interactive map of Sunlife offices in Kerala and Tamil Nadu"
      />

      {office && placement ? (
        <div
          ref={tagRef}
          className="absolute z-10 w-[min(280px,calc(100%-16px))] transition-[left,top] duration-300 ease-out"
          style={{ left: placement.left, top: placement.top }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: placement.below ? -6 : 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative rounded-[18px] border border-line bg-white p-4 shadow-[0_14px_36px_rgba(17,17,17,0.14)]"
            >
              <span
                aria-hidden
                className={`absolute h-3.5 w-3.5 rotate-45 border-line bg-white ${
                  placement.below ? "-top-[7px] border-t border-l" : "-bottom-[7px] border-r border-b"
                }`}
                style={{ left: placement.arrowLeft - 7 }}
              />
              <p className="text-[13px] font-semibold tracking-[0.14em] text-amber">{n}</p>
              <h3 className="mt-1 text-[19px] leading-tight font-semibold text-ink">{office.city.split(",")[0]}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-ink/75">{office.address}</p>
              <a
                href={mapsHref(office.address)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition duration-200 hover:text-amber hover:decoration-amber"
              >
                Get directions
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : null}
    </div>
  );
}
