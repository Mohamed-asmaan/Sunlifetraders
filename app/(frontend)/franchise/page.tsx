import type { Metadata } from "next";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard, Reveal } from "@/components/motion/Reveal";
import ArrowButton from "@/components/ArrowButton";
import FranchiseForm from "@/components/FranchiseForm";
import { seo, site } from "@/lib/data";

export const metadata: Metadata = {
  title: `Franchise Opportunity | ${seo.title}`,
  description:
    "Become a Sunlife Traders franchise partner. Get protected territory, engineering support, MNRE subsidy handling and a proven solar brand behind you.",
  openGraph: {
    title: `Solar Franchise Opportunity | ${seo.title}`,
    description:
      "Join the Sunlife Traders franchise network. Protected territory, full technical support, and a growing solar market in Kerala & Tamil Nadu.",
    type: "website",
  },
};

const BENEFITS = [
  {
    title: "Protected territory",
    description:
      "Each franchise partner is assigned an exclusive district or zone. No internal competition from other Sunlife partners.",
  },
  {
    title: "Engineering support",
    description:
      "Our technical team handles LiDAR design, structural sign-off and KSEB/TANGEDCO approvals — so you focus on sales and relationships.",
  },
  {
    title: "MNRE subsidy expertise",
    description:
      "We manage PM Surya Ghar subsidy paperwork end-to-end. Your customers get up to ₹78,000 in benefits, handled by us.",
  },
  {
    title: "Brand & marketing",
    description:
      "Use the Sunlife Traders brand, certifications and marketing materials. EVVO certified and MNRE registered — credentials that close deals.",
  },
  {
    title: "Training & onboarding",
    description:
      "Hands-on training at our Pothencode depot, product demos, sales process coaching and access to our CRM from day one.",
  },
  {
    title: "Proven ROI model",
    description:
      "Solar installations with 3–4 year payback. EMI from ₹1,200 per lakh makes it easy to sell. Our calculator closes the loop.",
  },
];

const REQUIREMENTS = [
  "Passion for clean energy and local business growth",
  "Basic electrical or sales background (preferred, not mandatory)",
  "Ability to manage customer relationships in your district",
  "Small workspace or office for customer visits",
  "Initial investment for territory licensing and setup",
  "Commitment to Sunlife quality standards and brand guidelines",
];

const PROCESS = [
  { number: "01", title: "Apply", desc: "Fill in the form with your name, contact and district." },
  { number: "02", title: "Intro call", desc: "Our franchise team calls within 1 working day to discuss fit." },
  { number: "03", title: "Depot visit", desc: "Visit our Pothencode depot for a hands-on product demo and Q&A." },
  { number: "04", title: "Agreement", desc: "Territory agreement signed, training scheduled, credentials issued." },
  { number: "05", title: "Go live", desc: "Start taking enquiries. Engineering and subsidy support from day one." },
];

export default function FranchisePage() {
  return (
    <>
      {/* Hero */}
      <Section pad="contact" id="franchise">
        <SectionIntro
          as="h1"
          inView={false}
          badge="Sunlife Network"
          title="Become a Sunlife franchise partner"
          description="Get a protected territory, full engineering support and the MNRE brand behind you. Join the growing solar market in Kerala and Tamil Nadu."
          delay={0.2}
          descriptionClass="copy mt-5 max-w-[52ch] text-muted"
        />

        <Reveal delay={0.35} className="mt-8 flex flex-wrap gap-3">
          <ArrowButton href="#apply">Apply now</ArrowButton>
          <a
            href={site.company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="ui inline-flex items-center gap-2 rounded-xl border border-line bg-soft px-4 py-[9px] text-ink transition hover:bg-white"
          >
            WhatsApp us first
          </a>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.5} className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { value: "500+", label: "Systems installed", desc: "Across Kerala & Tamil Nadu" },
            { value: "₹78K", label: "Max subsidy handled", desc: "Per MNRE-approved install" },
            { value: "4.8★", label: "Google rating", desc: "From 200+ verified reviews" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[20px] border border-line bg-soft p-5">
              <p className="display-card text-ink">{stat.value}</p>
              <p className="ui mt-1 text-ink/80">{stat.label}</p>
              <p className="copy mt-0.5 text-muted">{stat.desc}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* Benefits */}
      <Section pad="tight">
        <SectionIntro
          badge="Why partner with us"
          title="What you get as a Sunlife franchise"
          description="More than a brand licence — a full operational partnership with engineering, subsidy and customer support baked in."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <MotionCard key={b.title} i={i} className="rounded-[24px] bg-soft p-6">
              <AccentDot />
              <h2 className="display-kicker">{b.title}</h2>
              <p className="copy mt-2 text-muted">{b.description}</p>
            </MotionCard>
          ))}
        </div>
      </Section>

      {/* Requirements */}
      <Section pad="compact">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionIntro
                badge="Requirements"
                title="What we look for in a franchise partner"
                description="We're looking for motivated individuals and businesses who share our commitment to quality solar installations across South India."
                inView={false}
              />
            </div>
            <div className="rounded-[24px] bg-ink p-6 text-white md:p-8">
              <ul className="flex flex-col gap-3">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                    <p className="copy text-white/85">{req}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Process */}
      <Section pad="tight">
        <SectionIntro
          badge="Process"
          title="From enquiry to live franchise — 5 steps"
          description="A clear, fast onboarding process so you can start taking enquiries in your district within weeks."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((step, i) => (
            <MotionCard key={step.number} i={i} className="rounded-[24px] bg-soft p-5">
              <p className="display-card text-amber">{step.number}</p>
              <h3 className="display-kicker mt-2 text-ink">{step.title}</h3>
              <p className="copy mt-1 text-muted">{step.desc}</p>
            </MotionCard>
          ))}
        </div>
      </Section>

      {/* Application form */}
      <Section pad="default" id="apply">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          {/* Left: info */}
          <div>
            <SectionIntro
              badge="Apply today"
              title="Register your interest"
              description="Fill in your details and our franchise team will contact you within 1 working day."
              inView={false}
            />

            <Reveal delay={0.25} className="mt-6 flex flex-col gap-3">
              <a
                href={site.company.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="ui flex items-center gap-3 rounded-xl border border-line bg-soft p-4 text-ink transition hover:bg-white"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.73.45 3.4 1.3 4.88L2 22l5.45-1.42a10.1 10.1 0 0 0 4.59 1.1h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-medium">WhatsApp enquiry</p>
                  <p className="copy text-muted">{site.company.phone}</p>
                </div>
              </a>
              <a
                href={`mailto:${site.company.email}`}
                className="ui flex items-center gap-3 rounded-xl border border-line bg-soft p-4 text-ink transition hover:bg-white"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 6.5h16v11H4v-11Zm0 0 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-medium">Email us</p>
                  <p className="copy text-muted">{site.company.email}</p>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.2} className="rounded-[24px] border border-line bg-soft p-6 md:p-8">
            <h2 className="display-kicker mb-6 text-ink">Franchise application</h2>
            <FranchiseForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
