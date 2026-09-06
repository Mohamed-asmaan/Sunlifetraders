"use client";

import type { ReactNode } from "react";
import Badge from "@/components/Badge";
import { BlurWords, Reveal } from "@/components/motion/Reveal";

const pads = {
  none: "",
  compact: "py-8 md:py-16",
  tight: "py-10 md:py-16",
  default: "py-12 md:py-24",
  roomy: "py-12 md:py-28",
  services: "py-16 md:py-24",
  contact: "pt-24 pb-10 md:pt-32 md:pb-16",
};

export function Section({
  id,
  pad = "default",
  className = "",
  children,
}: {
  id?: string;
  pad?: keyof typeof pads;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`mx-auto max-w-[1280px] px-4 md:px-6 ${pads[pad]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionIntro({
  badge,
  title,
  description,
  as = "h2",
  align = "left",
  inView = true,
  delay = 0.12,
  titleClass = "display",
  descriptionClass = "copy mt-5 max-w-[46ch] text-muted",
  className,
  light = false,
  children,
}: {
  badge: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  inView?: boolean;
  delay?: number;
  titleClass?: string;
  descriptionClass?: string;
  className?: string;
  light?: boolean;
  children?: ReactNode;
}) {
  const frame =
    className ?? (align === "center" ? "mx-auto w-full max-w-[700px] text-center" : "max-w-[720px]");

  return (
    <div className={frame}>
      <Reveal className={align === "center" ? "flex justify-center" : undefined}>
        <Badge light={light}>{badge}</Badge>
      </Reveal>
      <BlurWords as={as} text={title} className={titleClass} inView={inView} />
      {description ? (
        <Reveal delay={delay}>
          <p className={descriptionClass}>{description}</p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}

export function AccentDot({ className = "mb-5" }: { className?: string }) {
  return (
    <div className={`grid h-11 w-11 place-items-center rounded-xl bg-white ${className}`}>
      <span className="h-2.5 w-2.5 rounded-full bg-amber" />
    </div>
  );
}
