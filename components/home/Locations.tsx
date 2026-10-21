"use client";

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
  const n = String(PIN_ORDER.indexOf(PIN_BY_CITY[office?.city ?? ""] ?? "") + 1).padStart(2, "0");

  return (
    <Section id="locations">
      <SectionIntro
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        descriptionClass="copy mt-5 max-w-[52ch] text-muted"
      />

      <div className="mx-auto mt-10 grid max-w-[720px] gap-6">
        <div className="overflow-hidden rounded-[28px] bg-soft p-4 md:p-6">
          <OfficesMap active={active} onActive={setActive} />
        </div>

        {office ? (
          <div className="rounded-[24px] border border-line bg-white px-6 py-6 md:px-8 md:py-7">
            <p className="text-[15px] font-semibold tracking-[0.16em] text-amber uppercase">{n}</p>
            <h3 className="mt-2 text-[32px] leading-tight font-semibold text-ink md:text-[40px]">
              {office.city.split(",")[0]}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[18px] leading-relaxed text-ink/80 md:text-[20px]">
              {office.address}
            </p>
            <a
              href={mapsHref(office.address)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[18px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition duration-200 hover:text-amber hover:decoration-amber"
            >
              Get directions
              <span aria-hidden>→</span>
            </a>
          </div>
        ) : null}
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
      className="offices-map mx-auto w-full max-w-[640px] [&_svg]:h-auto [&_svg]:w-full"
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
      aria-label="Interactive map of Sunlife offices in Kerala and Tamil Nadu"
    />
  );
}
