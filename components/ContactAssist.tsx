import Link from "next/link";
import ArrowButton from "@/components/ArrowButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/data";

const CHANNELS = [
  { href: `mailto:${site.company.email}`, label: "Via mail", kind: "mail" as const },
  { href: site.company.phoneHref, label: "Via call", kind: "call" as const },
];

function ChannelIcon({ kind }: { kind: "mail" | "call" }) {
  if (kind === "mail") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 6.5h16v11H4v-11Zm0 0 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3.8h3.2l1.2 3L9.8 8.4a12.4 12.4 0 0 0 5.8 5.8l1.6-1.6 3 1.2V17A2.2 2.2 0 0 1 18 19.2 15.2 15.2 0 0 1 4.8 6 2.2 2.2 0 0 1 7 3.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactAssist() {
  return (
    <Reveal>
      <div className="flex flex-col gap-6 rounded-[28px] border border-amber/20 bg-amber-light p-6 md:p-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[52ch]">
          <p className="eyebrow text-amber">Need immediate assistance?</p>
          <h2 className="display-card mt-3 text-ink">We&apos;re here to help you.</h2>
          <p className="copy mt-3 text-ink/70">
            Reach out immediately by visiting our page, or contact us via WhatsApp, mail, or call.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ArrowButton href="/contact">Contact Us!</ArrowButton>
          <WhatsAppButton variant="solid">Via WhatsApp</WhatsAppButton>
          {CHANNELS.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href}
              className="ui inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-white px-4 text-ink transition hover:border-amber/40"
            >
              <ChannelIcon kind={channel.kind} />
              {channel.label}
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
