"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const LANDMARK: Record<string, string> = {
  "Thiruvananthapuram, Kerala": "Temple city · Kovalam coast",
  "Kanyakumari (Karankodu), Tamil Nadu": "Land's end · Vivekananda Rock",
  "Kanyakumari (Thiruvithancode), Tamil Nadu": "Padmanabhapuram Palace",
  "Kollam, Kerala": "Ashtamudi backwaters",
  "Chennai, Tamil Nadu": "Perungudi · OMR corridor",
};

const PHOTO: Record<string, string> = {
  "Thiruvananthapuram, Kerala": "/images/locations/tvm.jpg",
  "Kanyakumari (Karankodu), Tamil Nadu": "/images/locations/kanyakumari.jpg",
  "Kanyakumari (Thiruvithancode), Tamil Nadu": "/images/locations/palace.jpg",
  "Kollam, Kerala": "/images/locations/kollam.jpg",
  "Chennai, Tamil Nadu": "/images/locations/chennai.jpg",
};

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

  return (
    <Section id="locations">
      <SectionIntro
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        descriptionClass="copy mt-5 max-w-[52ch] text-muted"
      />

      <div className="mt-10 flex flex-col items-stretch gap-6 lg:flex-row lg:gap-10">
        <div className="relative mx-auto aspect-square h-[500px] w-[500px] max-w-full shrink-0 overflow-hidden rounded-[28px] bg-soft p-3 max-lg:h-auto max-lg:w-full">
          <OfficesMap active={active} onActive={setActive} />
        </div>

        <div className="grid flex-1 grid-cols-2 grid-rows-3 gap-3 lg:h-[500px]">
          {ordered.map((office, index) => {
            const on = active === office.city;
            const n = String(PIN_ORDER.indexOf(PIN_BY_CITY[office.city] ?? "") + 1).padStart(2, "0");
            const last = index === ordered.length - 1;
            return (
              <button
                key={office.city}
                type="button"
                onClick={() => setActive(office.city)}
                onMouseEnter={() => setActive(office.city)}
                className={`group flex min-h-0 overflow-hidden rounded-[20px] border text-left transition ${
                  on ? "border-amber shadow-[0_10px_28px_rgba(249,115,22,0.12)]" : "border-line hover:border-amber/40"
                } ${last ? "col-span-2" : ""}`}
              >
                <span className={`relative ${last ? "w-[42%]" : "w-[38%]"} shrink-0`}>
                  <Image
                    src={PHOTO[office.city] ?? "/images/locations/tvm.jpg"}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="180px"
                  />
                </span>
                <span className="flex min-w-0 flex-1 flex-col justify-center bg-white px-3 py-3 md:px-4">
                  <span className="text-[11px] font-medium tracking-[0.16em] text-amber uppercase">{n}</span>
                  <span className="mt-1 text-[17px] leading-tight font-semibold text-ink md:text-[19px]">
                    {office.city.split(",")[0].replace(/ \(.+\)/, "")}
                  </span>
                  <span className="mt-1 text-[13px] leading-snug text-muted md:text-[14px]">
                    {LANDMARK[office.city] ?? "Sunlife office"}
                  </span>
                  <a
                    href={mapsHref(office.address)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[14px] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition duration-200 group-hover:text-amber group-hover:decoration-amber hover:text-amber"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get directions
                    <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function OfficesMap({
  active,
  onActive,
}: {
  active: string | null;
  onActive: (city: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");

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
    const root = ref.current;
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
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll("[data-office]").forEach((node) => {
      const pin = node.getAttribute("data-office") ?? "";
      node.classList.toggle("is-on", CITY_BY_PIN[pin] === active);
    });
  }, [active, markup]);

  return (
    <div
      ref={ref}
      className="offices-map h-full w-full [&_svg]:h-full [&_svg]:w-full"
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
      aria-label="Interactive map of Sunlife offices in Kerala and Tamil Nadu"
    />
  );
}
