"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { Fragment, type ReactNode } from "react";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0.001, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const blurUp = {
  hidden: { opacity: 0.001, y: 20, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function MotionCard({
  children,
  className,
  i = 0,
  hover = -6,
  amount = 0.3,
  step = 0.08,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  i?: number;
  hover?: number | false;
  amount?: number;
  step?: number;
  duration?: number;
}) {
  return (
    <motion.article
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay: i * step, ease: easeOutExpo }}
      whileHover={hover === false ? undefined : { y: hover }}
    >
      {children}
    </motion.article>
  );
}

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  blur?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  blur = false,
  className,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={blur ? blurUp : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function BlurWords({
  text,
  className,
  delay = 0,
  as: Tag = "p",
  inView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  inView?: boolean;
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            variants={blurUp}
            initial="hidden"
            {...(inView
              ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
              : { animate: "show" })}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.045,
              ease: easeOutExpo,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
