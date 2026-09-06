"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, SectionIntro } from "@/components/ui/Section";
import type { Intro, Office } from "@/lib/types";

const places: Record<string, { landmark: string; image: string; x: number; y: number; short: string }> = {
  "Thiruvananthapuram, Kerala": {
    landmark: "Temple city · Kovalam coast",
    image: "/images/locations/tvm.jpg",
    x: 92,
    y: 292,
    short: "TVM",
  },
  "Kanyakumari (Karankodu), Tamil Nadu": {
    landmark: "Land’s end · Vivekananda Rock",
    image: "/images/locations/kanyakumari.jpg",
    x: 168,
    y: 372,
    short: "KK",
  },
  "Kanyakumari (Thiruvithancode), Tamil Nadu": {
    landmark: "Padmanabhapuram Palace",
    image: "/images/locations/palace.jpg",
    x: 186,
    y: 332,
    short: "TVC",
  },
  "Kollam, Kerala": {
    landmark: "Ashtamudi backwaters",
    image: "/images/locations/kollam.jpg",
    x: 84,
    y: 238,
    short: "KLM",
  },
};

const fallback = Object.values(places);

function metaFor(office: Office, i: number) {
  return places[office.city] ?? fallback[i] ?? fallback[0];
}

export default function Locations({ intro, offices }: { intro: Intro; offices: Office[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section id="locations">
      <SectionIntro
        badge={intro.badge}
        title={intro.title}
        description={intro.description}
        descriptionClass="copy mt-5 max-w-[52ch] text-muted"
      />

      <div className="mt-10 overflow-hidden rounded-[28px] bg-soft">
        <SouthIndiaMap offices={offices} active={active} onActive={setActive} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offices.map((office, i) => {
          const place = metaFor(office, i);
          const on = active === office.city;

          return (
            <article
              key={office.city}
              onMouseEnter={() => setActive(office.city)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(office.city)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              className={`group relative min-h-[260px] overflow-hidden rounded-[24px] outline-none transition duration-500 ${
                on ? "-translate-y-1 shadow-[0_16px_40px_rgba(17,17,17,0.12)]" : ""
              }`}
            >
              <Image
                src={place.image}
                alt={place.landmark}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="eyebrow text-white/70">{place.landmark}</p>
                <h3 className="display-kicker mt-1 flex items-center gap-2 text-white">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${on ? "bg-amber" : "bg-white"}`} />
                  {office.city.split(",")[0]}
                </h3>
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:grid-rows-[1fr]">
                  <p className="overflow-hidden">
                    <span className="copy mt-2 block text-white/75">{office.address}</span>
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function SouthIndiaMap({
  offices,
  active,
  onActive,
}: {
  offices: Office[];
  active: string | null;
  onActive: (city: string | null) => void;
}) {
  return (
    <svg viewBox="0 0 320 420" className="mx-auto h-auto w-full max-w-[560px]" role="img" aria-label="South India service map">
      <defs>
        <pattern id="map-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.05" fill="#cfcfcf" />
        </pattern>
      </defs>

      <path
        d="M86 28c-16 28-26 62-32 98-6 40-10 78-8 114 2 32 8 62 22 90 10 20 28 42 56 56 18 9 34 10 46 2 14-10 24-32 36-58 16-36 32-74 42-114 10-38 14-76 6-108-8-30-28-54-58-62C118 16 98 18 86 28Z"
        fill="url(#map-dots)"
      />
      <path
        d="M86 28c-16 28-26 62-32 98-6 40-10 78-8 114 2 32 8 62 22 90 10 20 28 42 56 56 18 9 34 10 46 2 14-10 24-32 36-58 16-36 32-74 42-114 10-38 14-76 6-108-8-30-28-54-58-62C118 16 98 18 86 28Z"
        fill="none"
        stroke="#111"
        strokeOpacity="0.16"
        strokeWidth="1.6"
      />

      <text x="78" y="168" className="fill-ink/25" style={{ fontSize: 11, fontFamily: "var(--font-geist), sans-serif" }}>
        Kerala
      </text>
      <text x="188" y="188" className="fill-ink/25" style={{ fontSize: 11, fontFamily: "var(--font-geist), sans-serif" }}>
        Tamil Nadu
      </text>

      {offices.map((office, i) => {
        const a = metaFor(office, i);
        const b = metaFor(offices[(i + 1) % offices.length], (i + 1) % offices.length);
        return (
          <line
            key={`${office.city}-line`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={active ? "#f97316" : "#111111"}
            strokeOpacity={active ? 0.7 : 0.12}
            strokeWidth="1.2"
            strokeDasharray="4 5"
          />
        );
      })}

      {offices.map((office, i) => {
        const place = metaFor(office, i);
        const on = active === office.city;
        return (
          <g
            key={office.city}
            transform={`translate(${place.x} ${place.y})`}
            className="cursor-pointer"
            onMouseEnter={() => onActive(office.city)}
            onMouseLeave={() => onActive(null)}
          >
            {on ? (
              <circle r="18" fill="#f97316" fillOpacity="0.25" className="origin-center animate-ping" />
            ) : null}
            <circle r={on ? 9 : 7} fill={on ? "#f97316" : "#111111"} className="transition-all duration-300" />
            <circle r="2.5" fill={on ? "#fff" : "#f97316"} />
            <text
              y={on ? -16 : -14}
              textAnchor="middle"
              className="pointer-events-none"
              style={{
                fontSize: 10,
                fontFamily: "var(--font-geist), sans-serif",
                fontWeight: 500,
                fill: "#111",
              }}
            >
              {place.short}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
