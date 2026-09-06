"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard } from "@/components/motion/Reveal";
import { openRoi } from "@/components/roi/RoiOverlay";
import type { Intro, Solution } from "@/lib/types";

const profiles: Record<string, { tag: string; icon: ReactNode }> = {
  "My bill is ₹5,000+": { tag: "Bill Shock", icon: <DollarIcon /> },
  "I own or plan an EV": { tag: "EV Future", icon: <CarIcon /> },
  "I'm building a new home": { tag: "New Build", icon: <HomeIcon /> },
  "I run a business": { tag: "Commercial", icon: <BuildingIcon /> },
};

export default function Solutions({
  id = "solution",
  intro,
  items,
}: {
  id?: string;
  intro: Intro;
  items: Solution[];
}) {
  const buyers = id === "solution";

  return (
    <Section id={id} pad="tight">
      <SectionIntro badge={intro.badge} title={intro.title} description={intro.description} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) =>
          buyers ? <BuyerCard key={item.title} item={item} i={i} /> : <CatalogCard key={item.title} item={item} i={i} />,
        )}
      </div>
    </Section>
  );
}

function BuyerCard({ item, i }: { item: Solution; i: number }) {
  const profile = profiles[item.title];
  const opensCalculator = item.cta === "See the math" || item.cta === "Commercial ROI";

  const body = (
    <MotionCard i={i} hover={-8} amount={0.25} className="h-full overflow-hidden rounded-2xl bg-soft">
      <div className="relative aspect-[5/4] overflow-hidden bg-soft">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-white" />
        )}
        {profile ? (
          <span className="ui absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[12px] text-ink">
            {profile.tag}
          </span>
        ) : null}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-ink/50">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber text-white">
            {profile?.icon ?? <HomeIcon />}
          </span>
          <span className="eyebrow">Profile</span>
        </div>
        <h3 className="display-card mt-3">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        {item.cta ? (
          <span className="ui mt-5 inline-flex items-center gap-1 text-ink">
            {item.cta}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M3 6h6M6.5 3.5 9 6 6.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}
      </div>
    </MotionCard>
  );

  return (
    <Link
      href={opensCalculator ? "/#calculator" : "/#quiz"}
      onClick={opensCalculator ? () => openRoi() : undefined}
      className="block h-full"
    >
      {body}
    </Link>
  );
}

const productIcons: Record<string, ReactNode> = {
  "Solar Panels": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  Inverters: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  Meters: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 13l4-3.5M8 8.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  "Electrical Components": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 7V4.5M14 7V4.5M10 19.5V17M14 19.5V17M7 10H4.5M7 14H4.5M19.5 10H17M19.5 14H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

function CatalogCard({ item, i }: { item: Solution; i: number }) {
  return (
    <MotionCard i={i} hover={-6} amount={0.25} className="rounded-2xl border border-line bg-white p-6">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-amber text-white">
        {productIcons[item.title] ?? productIcons["Solar Panels"]}
      </div>
      <h3 className="display-card mt-5">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
    </MotionCard>
  );
}

function DollarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v10M9.4 9.2c.6-1 1.6-1.5 2.6-1.5 1.5 0 2.5.8 2.5 2s-1 2-2.6 2.3c-1.6.3-2.6.8-2.6 2.2s1.1 2.1 2.7 2.1c1.1 0 2.1-.5 2.6-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 15.5v1.2A1.3 1.3 0 0 0 5.3 18h.9A1.3 1.3 0 0 0 7.5 16.7V15.5m9 0v1.2a1.3 1.3 0 0 0 1.3 1.3h.9a1.3 1.3 0 0 0 1.3-1.3V15.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 13.5h16l-1.4-4.2A2 2 0 0 0 16.7 8H7.3a2 2 0 0 0-1.9 1.3L4 13.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 11.5 12 5l8 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6.5 10.8V19h11V10.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 20V6.5A1.5 1.5 0 0 1 6.5 5h6A1.5 1.5 0 0 1 14 6.5V20M14 10h4.5A1.5 1.5 0 0 1 20 11.5V20" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8.5h3M8 12h3M8 15.5h3M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
