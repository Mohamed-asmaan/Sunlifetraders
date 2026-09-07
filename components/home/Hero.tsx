"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import ArrowButton from "@/components/ArrowButton";
import { openRoi } from "@/components/roi/RoiOverlay";
import { BlurWords, easeOutExpo, fadeUp } from "@/components/motion/Reveal";
import type { HeroContent, HeroSlide } from "@/lib/types";
import skyBg from "../../public/images/hero/sky.png";

function WordLine({
  as: Tag,
  text,
  className,
}: {
  as: "h1" | "p";
  text: string;
  className: string;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block">{word}</span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

function SlideCopy({ slide, animated }: { slide: HeroSlide; animated: boolean }) {
  const titleClass = "display-hero mx-auto mt-3 w-full max-w-[16ch] text-center text-ink min-[810px]:mt-5";
  const bodyClass = "copy mx-auto mt-2.5 w-full max-w-[46ch] text-center text-ink min-[810px]:mt-4";
  const buttonClass = "w-[75%] min-[810px]:w-auto";

  return (
    <div className="flex w-full flex-col items-center text-center">
      {animated ? (
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-ink py-[3px] pr-[14px] pl-[3px]"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
        >
          <span
            className="rounded-full bg-amber-light px-[9px] py-[2px] text-[11px] font-medium text-amber"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            {slide.badge}
          </span>
          <span
            className="text-[11px] font-medium text-white/80"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            {slide.badgeSuffix}
          </span>
        </motion.div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-full bg-ink py-[3px] pr-[14px] pl-[3px]">
          <span
            className="rounded-full bg-amber-light px-[9px] py-[2px] text-[11px] font-medium text-amber"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            {slide.badge}
          </span>
          <span
            className="text-[11px] font-medium text-white"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            {slide.badgeSuffix}
          </span>
        </div>
      )}

      {animated ? (
        <BlurWords as="h1" inView={false} delay={0.22} text={slide.title} className={titleClass} />
      ) : (
        <WordLine as="h1" text={slide.title} className={titleClass} />
      )}

      {animated ? (
        <BlurWords as="p" inView={false} delay={0.55} text={slide.description} className={bodyClass} />
      ) : (
        <WordLine as="p" text={slide.description} className={bodyClass} />
      )}

      {animated ? (
        <motion.div
          className="mt-4 flex flex-wrap items-center justify-center gap-3 min-[810px]:mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, delay: 1.05, ease: easeOutExpo }}
        >
          <ArrowButton onClick={openRoi} className={buttonClass}>{slide.cta}</ArrowButton>
          {slide.secondaryCta && slide.secondaryHref ? (
            <ArrowButton href={slide.secondaryHref} variant="light" className={buttonClass}>
              {slide.secondaryCta}
            </ArrowButton>
          ) : null}
        </motion.div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 min-[810px]:mt-6">
          <ArrowButton onClick={openRoi} className={buttonClass}>{slide.cta}</ArrowButton>
          {slide.secondaryCta && slide.secondaryHref ? (
            <ArrowButton href={slide.secondaryHref} variant="light" className={buttonClass}>
              {slide.secondaryCta}
            </ArrowButton>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function Hero({ hero }: { hero: HeroContent }) {
  const [index, setIndex] = useState(0);
  const slide = hero.slides[index] ?? hero.slides[0];

  useEffect(() => {
    if (hero.slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % hero.slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [hero.slides.length, index]);

  if (!slide) return null;

  return (
    <section id="hero" className="relative overflow-hidden">
      <Image
        src={skyBg}
        alt=""
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      <div className="relative z-10 flex flex-col min-[810px]:min-h-[100svh]">
        <div className="mx-auto flex w-full max-w-[1100px] shrink-0 flex-col items-center px-5 pt-[84px] text-center min-[810px]:pt-[120px]">
          <div className="relative w-full">
            <div
              className="invisible pointer-events-none grid w-full justify-items-center"
              aria-hidden
              inert
            >
              {hero.slides.map((item) => (
                <div key={item.title} className="col-start-1 row-start-1 w-full">
                  <SlideCopy slide={item} animated={false} />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.title}
                  className="flex w-full flex-col items-center"
                  initial={{ opacity: 0.001, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.001, y: -8 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                >
                  <SlideCopy slide={slide} animated />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {hero.slides.length > 1 ? (
            <div className="mt-4 flex w-[180px] shrink-0 gap-1.5 min-[810px]:mt-6">
              {hero.slides.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={item.badge}
                  className="relative flex-1 py-2"
                  onClick={() => setIndex(i)}
                >
                  <span className="block h-[3px] w-full overflow-hidden rounded-full bg-black/15">
                    <span
                      key={i === index ? `active-${index}` : `idle-${i}`}
                      className={`block h-full origin-left rounded-full bg-ink ${
                        i === index ? "hero-progress" : "scale-x-0"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {hero.trust.length ? (
            <div className="mt-4 flex max-w-[42rem] flex-wrap items-center justify-center gap-2 min-[810px]:mt-5">
              {hero.trust.map((item) => (
                <span key={item} className="ui rounded-full bg-white/80 px-3 py-1 text-[12px] text-ink/70">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <motion.div
          className="relative mt-4 w-full origin-bottom min-[810px]:mt-auto"
          initial={{ y: 48, scale: 1.08, opacity: 0.001, filter: "blur(10px)" }}
          animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.35, delay: 0.55, ease: easeOutExpo }}
        >
          <div className="grid w-full">
            {hero.slides.map((item, i) => (
              <img
                key={item.houseImage}
                src={item.houseImage}
                alt={i === index ? item.houseAlt : ""}
                width={1060}
                height={473}
                className="col-start-1 row-start-1 h-auto max-h-[34svh] w-full object-contain object-bottom transition-opacity duration-500 min-[810px]:max-h-none"
                style={{ opacity: i === index ? 1 : 0 }}
              />
            ))}
          </div>
          <div className="hero-bottom-blur" />
          <div className="hero-bottom-fade" />
        </motion.div>
      </div>
    </section>
  );
}
