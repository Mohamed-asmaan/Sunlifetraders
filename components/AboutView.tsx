"use client";

import { useState } from "react";
import Image from "next/image";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard, Reveal } from "@/components/motion/Reveal";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Certifications from "@/components/Certifications";
import SurveyCta from "@/components/SurveyCta";
import type { CmsPage } from "@/lib/types";

const GALLERY = [
  "/images/about/gallery-1.jpg",
  "/images/about/gallery-2.jpg",
  "/images/about/gallery-3.jpg",
  "/images/about/gallery-4.jpg",
  "/images/about/gallery-5.jpg",
];

const INSTALLS = [
  "/images/about/install-1.jpg",
  "/images/about/install-2.jpg",
  "/images/about/install-3.jpg",
  "/images/about/install-4.jpg",
  "/images/about/install-5.jpg",
  "/images/about/install-6.jpg",
];

const QUALITY = [
  {
    title: "Quality and Reliability",
    desc: "Every panel, inverter and component is sourced from certified Tier-1 manufacturers tested against IEC standards.",
  },
  {
    title: "Trusted Products",
    desc: "We partner with Evvo Solar, Waaree, Adani Solar, Rayzon Solar and Growatt for proven, bankable performance.",
  },
  {
    title: "Our Commitment",
    desc: "Post-installation support, warranty handling and AMC ensure your system performs reliably for 25 years.",
  },
];

const FAQS = [
  {
    q: "What experience does Sunlife Traders have in the solar industry?",
    a: "We have years of experience in providing high-quality solar energy solutions across Kerala and Tamil Nadu.",
  },
  {
    q: "What are your core values?",
    a: "Our core values include reliability, quality, and customer satisfaction, aiming to make solar energy accessible to all.",
  },
  {
    q: "Who are your key partners?",
    a: "We partner with leading solar brands like Evvo Solar and Adani Solar to ensure top-notch products and services.",
  },
  {
    q: "What sets Sunlife Traders apart from other solar companies?",
    a: "Our commitment to customized solutions, excellent customer service, and post-installation support makes us stand out.",
  },
  {
    q: "What regions do you serve?",
    a: "We primarily serve Kerala and Tamil Nadu, expanding our reach to bring solar energy to more homes and businesses.",
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
        <span className="mt-0.5 shrink-0 text-xl leading-none text-amber">{open ? "−" : "+"}</span>
      </button>
      {open ? <p className="copy pb-4 text-muted">{a}</p> : null}
    </div>
  );
}

export default function AboutView({ page }: { page: CmsPage }) {
  return (
    <>
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <Image
          src="/images/about/hero.png"
          alt="Sunlife Traders solar installation team"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-14 md:px-6 md:py-20">
          <PageBreadcrumb
            light
            items={[
              { href: "/", label: "Home" },
              { label: "About Us" },
            ]}
          />
          <div className="max-w-[720px] text-white [&_.eyebrow]:!text-white/70">
            <SectionIntro
              as="h1"
              inView={false}
              badge={page.badge}
              title="About Sunlife Traders"
              description="We, Sunlife Traders LLP at Pothencode in Thiruvananthapuram, Kerala, are leading dealers of solar energy systems and other products. We design and install high-quality rooftop solar on-grid and off-grid systems to produce and utilize one of the greenest energy forms available free of cost. We deal in environmentally safe products such as solar panels, solar geysers, solar inverters, batteries, and more. Our aim is to provide the best products to our customers through excellent service."
              delay={0.2}
              light
              titleClass="display text-white"
              descriptionClass="copy mt-5 max-w-[64ch] text-white/80"
            />
          </div>
        </div>
      </section>

      <Section pad="default">
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <AccentDot />
              <h2 className="display-kicker">Our Products &amp; Quality Assurance</h2>
              <p className="copy mt-3 max-w-[72ch] text-muted">
                At Sunlife Traders, we take great pride in the products we use, ensuring that our clients receive the
                highest level of quality and reliability in every service we provide. We understand that in our field,
                precision and dependability are crucial, and that&apos;s why we only work with top-tier manufacturers
                and suppliers.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {QUALITY.map((item) => (
                  <div key={item.title} className="rounded-[20px] bg-soft p-5">
                    <span className="mb-3 block h-2 w-2 rounded-full bg-amber" />
                    <p className="ui text-ink">{item.title}</p>
                    <p className="copy mt-1 text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[24px]">
                <Image
                  src="/images/about/quality.png"
                  alt="Ground-mount solar array used in Sunlife installations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 360px"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] sm:mt-8">
                <Image
                  src="/images/about/quality-2.png"
                  alt="Solar installation quality detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 360px"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section pad="tight">
        <Reveal className="mb-8 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-amber">Certified installations</p>
            <h2 className="display-kicker mt-2 max-w-[40ch]">
              We&apos;re certified by trusted organizations, so you can be sure our installations are safe and of high
              quality.
            </h2>
            <p className="copy mt-3 max-w-[52ch] text-muted">
              At Sunlife Traders, we&apos;re excited to offer our solar solutions in Kerala and Tamil Nadu. We want to
              help you use the sun&apos;s energy easily and confidently.
            </p>
          </div>
          <Image
            src="/images/services/certs.png"
            alt="Trusted solar certification logos"
            width={280}
            height={80}
            className="h-16 w-auto object-contain"
          />
        </Reveal>
        <Certifications />
      </Section>

      <Section pad="tight">
        <div className="grid gap-4 md:grid-cols-2">
          <MotionCard i={0} className="rounded-[24px] bg-soft p-6 md:p-8">
            <AccentDot />
            <h2 className="display-kicker">Our History</h2>
            <p className="copy mt-3 text-muted">
              Sunlife Energies was founded in 2018 in Nedumangad, Kerala, with a vision to make renewable energy
              accessible and affordable. In 2022, we evolved into Sunlife Traders LLP and shifted our operations to
              Pothencode, Thiruvananthapuram, to better serve our growing customer base and expand our product
              offerings.
            </p>
          </MotionCard>
          <MotionCard i={1} className="rounded-[24px] bg-soft p-6 md:p-8">
            <AccentDot />
            <h2 className="display-kicker">Our Mission &amp; Vision</h2>
            <p className="copy mt-3 text-muted">
              At Sunlife Traders LLP, our mission is to harness the power of the sun to create sustainable and
              cost-effective energy solutions for our customers, promoting green energy and reducing the carbon
              footprint through innovative and high-quality solar products.
            </p>
          </MotionCard>
        </div>
      </Section>

      <Section pad="tight">
        <Reveal>
          <p className="eyebrow mb-4 text-amber">Gallery</p>
          <h2 className="display-kicker mb-6">Our Work in Photos</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {GALLERY.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                <Image
                  src={src}
                  alt={`Sunlife Traders solar installation photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section pad="tight">
        <Reveal>
          <p className="eyebrow mb-4 text-amber">Installations</p>
          <h2 className="display-kicker mb-6">Real Solar Installations Across Kerala &amp; Tamil Nadu</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INSTALLS.map((src, i) => (
            <Reveal key={src} delay={i * 0.05}>
              <div className="relative aspect-square overflow-hidden rounded-[16px]">
                <Image
                  src={src}
                  alt={`Solar installation site ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section pad="tight">
        <SurveyCta />
      </Section>

      <Section pad="default">
        <SectionIntro
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Your Guide to Solar Energy Solutions with Sunlife Traders"
          descriptionClass="copy mt-3 max-w-[52ch] text-muted"
        />
        <Reveal delay={0.2} className="mt-8 max-w-[760px] rounded-[24px] border border-line bg-soft p-6 md:p-8">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </Reveal>
      </Section>
    </>
  );
}
