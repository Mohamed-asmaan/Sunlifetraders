"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import type { Company, NavLink, SocialLink } from "@/lib/types";

const strip = [
  { src: "/images/footer/strip-1.jpg", alt: "Solar farm at golden hour" },
  { src: "/images/footer/strip-2.jpg", alt: "Mountain home with rooftop solar" },
  { src: "/images/footer/strip-3.jpg", alt: "Aerial solar array in green fields" },
  { src: "/images/footer/strip-4.jpg", alt: "Solar panels on a tiled roof" },
  // { src: "/images/footer/strip-5.jpg", alt: "Solar panels on a tiled roof" },
];

function SocialGlyph({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("whatsapp")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.73.45 3.4 1.3 4.88L2 22l5.45-1.42a10.1 10.1 0 0 0 4.59 1.1h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.08c-.24.67-1.4 1.28-1.95 1.36-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.19-.14.32-.28.49-.14.17-.3.38-.42.51-.14.15-.29.31-.12.6.16.29.73 1.2 1.56 1.95 1.08.96 1.98 1.26 2.26 1.4.29.14.45.12.62-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.67-.17 1.34z" />
      </svg>
    );
  }
  if (key.includes("mail") || key.includes("email")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 6.5h16v11H4v-11Zm0 0 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.8 12h16.4M12 3.8c2.4 2.6 3.6 5.4 3.6 8.2S14.4 17.6 12 20.2C9.6 17.6 8.4 14.8 8.4 12S9.6 6.4 12 3.8Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function Footer({
  company,
  navLinks,
  footerLinks,
  socials,
}: {
  company: Company;
  navLinks?: NavLink[];
  footerLinks: NavLink[];
  socials: SocialLink[];
}) {
  const links = [
    ...(navLinks ?? []),
    ...footerLinks.filter((link) => !(navLinks ?? []).some((nav) => nav.href === link.href)),
  ];

  return (
    <footer>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {strip.map((image) => (
          <div key={image.src} className="relative h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px]">
            <Image src={image.src} alt={image.alt} fill className="h-full w-full object-cover" sizes="25vw" quality={100} />
          </div>
        ))}
      </div>

      <div className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 sm:grid-cols-2 md:gap-14">
            <div>
              <Logo />
              <p className="copy mt-5 max-w-[42ch] text-ink/70">{company.tagline}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="ui text-ink hover:text-ink/50">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <p className="leading-relaxed text-ink/80">{company.address}</p>
                <a href={`mailto:${company.email}`} className="ui underline decoration-ink/25 underline-offset-4 hover:text-ink/50">
                  {company.email}
                </a>
                <a href={company.phoneHref} className="ui underline decoration-ink/25 underline-offset-4 hover:text-ink/50">
                  {company.phone}
                </a>
                <div className="mt-3 flex items-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="text-ink transition hover:text-ink/45"
                    >
                      <SocialGlyph label={social.label} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-12 border-t border-ink/10 pt-6 text-sm text-ink/40">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
