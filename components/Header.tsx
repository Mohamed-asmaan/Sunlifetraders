"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import ArrowButton from "./ArrowButton";
import Logo from "./Logo";
import { easeOutExpo } from "@/components/motion/Reveal";
import type { NavLink } from "@/lib/types";

export default function Header({
  navLinks,
  cta = { href: "/contact", label: "Get Consultation" },
}: {
  navLinks: NavLink[];
  cta?: NavLink;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(pathname !== "/");

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setSolid(true);
      return;
    }

    const update = () => {
      setSolid(hero.getBoundingClientRect().bottom <= 80);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const io = new IntersectionObserver(update, { threshold: [0, 0.01, 1], rootMargin: "-80px 0px 0px 0px" });
    io.observe(hero);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      io.disconnect();
    };
  }, [pathname]);

  const filled = solid || open;

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        filled
          ? "bg-white shadow-[0_1px_0_rgba(17,17,17,0.06)]"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0.001, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
    >
      <div className="mx-auto flex max-w-[1310px] items-center justify-between px-[18px] py-3 md:px-[30px] md:py-3">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ui text-ink/70 transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ArrowButton href={cta.href} className="hidden sm:inline-flex">
            {cta.label}
          </ArrowButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-black/10 bg-white/70 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span className={`h-px w-full bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ui rounded-xl px-3 py-3"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              className="ui mt-2 rounded-xl bg-ink px-3 py-3 text-center text-white"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
