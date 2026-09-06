"use client";

import Link from "next/link";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ArrowButton({
  href,
  onClick,
  children,
  variant = "dark",
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}) {
  const dark = variant === "dark";
  const classes = `group ui inline-flex items-center gap-3 rounded-xl py-[9px] pr-[6px] pl-[16px] transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] ${
    dark
      ? "bg-ink text-white hover:bg-white hover:text-ink hover:shadow-[0_8px_24px_rgba(17,17,17,0.12)]"
      : "bg-white text-ink hover:bg-ink hover:text-white"
  } ${className}`;

  const inner = (
    <>
      {children}
      <span
        className={`relative grid h-[30px] w-[30px] place-items-center overflow-hidden rounded-lg transition-colors duration-300 ${
          dark
            ? "bg-amber text-white group-hover:bg-ink group-hover:text-amber"
            : "bg-amber text-white group-hover:bg-white group-hover:text-ink"
        }`}
      >
        <span className="absolute grid place-items-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[110%] group-hover:-translate-y-[110%]">
          <ArrowIcon />
        </span>
        <span className="absolute grid place-items-center -translate-x-[110%] translate-y-[110%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0">
          <ArrowIcon />
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }

  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={classes}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {inner}
    </Link>
  );
}
