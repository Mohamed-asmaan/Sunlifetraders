"use client";

import { FormEvent, useState } from "react";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { Reveal, MotionCard } from "@/components/motion/Reveal";
import { fieldClass, areaClass, submitClass } from "@/components/ui/form";
import { submitLead } from "@/lib/actions";
import type { ContactContent } from "@/lib/types";

const CONTACT_FAQS = [
  {
    q: "How can I get in touch with Sunlife Traders?",
    a: "You can contact us via phone, email, or the contact form on our website for any inquiries or support.",
  },
  {
    q: "What information should I provide when requesting a quote?",
    a: "Please provide details about your energy needs, location, and any specific requirements for an accurate quote.",
  },
  {
    q: "Where is your office located?",
    a: "Our office is located in Kerala, India. Visit our website for the full address and directions.",
  },
  {
    q: "How quickly can I expect a response after contacting you?",
    a: "We aim to respond to all inquiries within 24 hours.",
  },
  {
    q: "Can I schedule a consultation?",
    a: "Yes, you can schedule a consultation by contacting us through the website or calling our office directly.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="display-kicker pr-2">{q}</span>
        <span className="mt-0.5 shrink-0 text-amber text-xl leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="copy pb-4 text-muted">{a}</p>}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const result = await submitLead(data);
    if (result.ok) {
      setStatus("sent");
      form.reset();
      return;
    }
    setStatus("error");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-white p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Name *</span>
          <input required name="name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Mobile Number *</span>
          <input required name="phone" type="tel" className={fieldClass} />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Email *</span>
        <input required name="email" type="email" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Interested in solar installation?</span>
        <select name="propertyType" defaultValue="Yes" className={fieldClass}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Location *</span>
        <input required name="city" className={fieldClass} placeholder="Your city or district" />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Current Electricity Bill</span>
        <input name="message" className={fieldClass} placeholder="e.g. ₹3,000/month" />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Your Service Needs</span>
        <textarea name="source" rows={4} className={areaClass} placeholder="Tell us about your requirements…" />
      </label>
      <button type="submit" disabled={status === "sending"} className={submitClass}>
        {status === "sending" ? "Submitting…" : "Submit"}
      </button>
      {status === "sent" ? (
        <p className="mt-3 text-sm text-ink">Thanks — we&apos;ll get back to you shortly.</p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}

export default function ContactView({ page }: { page: ContactContent }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(page.mapsQuery)}&z=15&output=embed`;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section pad="contact">
        <SectionIntro
          as="h1"
          inView={false}
          badge={page.badge}
          title="Get In Touch"
          description="Contact Sunlife Traders for reliable solar energy solutions and services. We're here to support your solar power needs with expert installation, maintenance, and custom solutions."
          delay={0.2}
          descriptionClass="copy mt-5 max-w-[52ch] text-muted"
        />
        <Reveal delay={0.3}>
          <p className="copy mt-3 max-w-[52ch] text-muted">
            Please fill out the form below to help us understand your requirements. This will enable us to provide
            the best possible service tailored to your needs.
          </p>
        </Reveal>
      </Section>

      {/* ── Map + Form ───────────────────────────────────────── */}
      <Section pad="tight">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal blur className="min-h-[260px] overflow-hidden rounded-[28px] bg-soft md:min-h-[420px]">
            <iframe
              title="Google Maps — Sunlife Traders Pothencode"
              src={mapSrc}
              className="h-full min-h-[260px] w-full border-0 md:min-h-[420px]"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* ── Contact info cards ────────────────────────────────── */}
      <Section pad="tight">
        <div className="grid gap-4 md:grid-cols-3">
          {page.cards.map((card, i) => (
            <MotionCard key={card.title} i={i} step={0.1} className="rounded-[24px] bg-soft p-6">
              <AccentDot />
              <h2 className="display-kicker">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
              <a href={card.href} className="mt-4 inline-block text-sm font-medium underline break-all">
                {card.label}
              </a>
            </MotionCard>
          ))}
        </div>
      </Section>

      {/* ── Office locations + GSTIN ─────────────────────────── */}
      <Section pad="tight">
        <div className="grid gap-4 md:grid-cols-2">
          <MotionCard i={0} className="rounded-[24px] border border-line bg-soft p-6">
            <AccentDot />
            <h2 className="display-kicker">Kerala Office</h2>
            <p className="copy mt-2 text-muted">Sunlife Traders LLP</p>
            <p className="copy text-muted">Pothencode, Thiruvananthapuram</p>
            <p className="copy text-muted">Kerala 695584</p>
          </MotionCard>
          <MotionCard i={1} className="rounded-[24px] border border-line bg-soft p-6">
            <AccentDot />
            <h2 className="display-kicker">Tamil Nadu Office</h2>
            <p className="copy mt-2 text-muted">Sunlife Traders LLP</p>
            <p className="copy text-muted">Karankodu, Kanyakumari District</p>
            <p className="copy text-muted">Tamil Nadu 629809</p>
          </MotionCard>
        </div>

        {/* Company details */}
        <Reveal className="mt-4">
          <div className="rounded-[24px] border border-line bg-soft p-6">
            <AccentDot />
            <h2 className="display-kicker">Company Details</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <p className="eyebrow text-amber mb-1">GSTIN</p>
                <p className="ui text-ink font-mono">32AEQFS6514R1Z9</p>
              </div>
              <div>
                <p className="eyebrow text-amber mb-1">Email</p>
                <a href="mailto:sales.sunlifetradersllp@gmail.com" className="ui text-ink underline break-all">
                  sales.sunlifetradersllp@gmail.com
                </a>
                <br />
                <a href="mailto:sunlifetradersllp@gmail.com" className="ui text-ink underline break-all">
                  sunlifetradersllp@gmail.com
                </a>
              </div>
              <div>
                <p className="eyebrow text-amber mb-1">Mobile</p>
                <a href="tel:+917010283437" className="ui text-ink underline">
                  +91 7010283437
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <Section pad="default">
        <SectionIntro
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Your Guide to Solar Energy Solutions with Sunlife Traders"
          descriptionClass="copy mt-3 max-w-[52ch] text-muted"
        />
        <Reveal delay={0.2} className="mt-8 max-w-[760px] rounded-[24px] border border-line bg-soft p-6 md:p-8">
          {CONTACT_FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </Reveal>
      </Section>
    </>
  );
}
