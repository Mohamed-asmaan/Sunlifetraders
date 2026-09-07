import Link from "next/link";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard, Reveal } from "@/components/motion/Reveal";
import ArrowButton from "@/components/ArrowButton";
import type { CmsPage } from "@/lib/types";

const SERVICES = [
  {
    title: "Solar Plant Maintenance",
    description:
      "Solar plant maintenance involves cleaning panels, inspecting equipment, and servicing components to ensure efficient and reliable performance.",
    href: "/services/solar-plant-maintenance",
  },
  {
    title: "Solar Power Plant AMC",
    description:
      "Solar Power Plant AMC offers regular inspections, maintenance, and repairs to ensure continuous, efficient operation of the solar system.",
    href: "/services/solar-power-plant-amc",
  },
  {
    title: "Roof top solar plant Installation",
    description:
      "Rooftop solar installations effectively use panels to harness sunlight, generating electricity, reducing energy bills, and decreasing reliance on the power grid.",
    href: "/services/roof-top-solar-plant-installation",
  },
  {
    title: "Ground Mount Solar Installation",
    description:
      "Ground mount solar installations place panels on the ground, optimizing sunlight exposure and energy generation for efficiency.",
    href: "/services/ground-mount-solar-installation",
  },
];

export default function ServicesView({ page }: { page: CmsPage }) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section pad="contact">
        <SectionIntro
          as="h1"
          inView={false}
          badge={page.badge}
          title="Explore SUNLIFE TRADERS' Services"
          description="Discover a range of services designed to empower your transition towards a more sustainable future."
          delay={0.2}
          descriptionClass="copy mt-5 max-w-[52ch] text-muted"
        />
      </Section>

      {/* ── Subsidy banner ────────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <Reveal>
          <div className="flex flex-col items-start gap-4 rounded-[20px] border border-amber/20 bg-amber-light p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="eyebrow text-amber">Government Solar Subsidy &amp; Affordable Financing</p>
              <p className="copy mt-2 max-w-[68ch] text-ink/80">
                Reduce your energy costs with government-backed solar subsidies. Save up to ₹78,000 on
                MNRE-approved solar panels. Flexible financing options available, starting at ₹1,200 per lakh.
                Check your eligibility and start saving on electricity bills today.
              </p>
            </div>
            <ArrowButton href="/contact" variant="dark" className="shrink-0">
              Click here!
            </ArrowButton>
          </div>
        </Reveal>
      </div>

      {/* ── Service cards ─────────────────────────────────────── */}
      <Section pad="default">
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <MotionCard key={service.title} i={i} className="rounded-[24px] bg-soft p-6">
              <AccentDot />
              <h2 className="display-kicker">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              <Link
                href={service.href}
                className="ui mt-4 inline-flex text-ink underline underline-offset-4"
              >
                Know More
              </Link>
            </MotionCard>
          ))}
        </div>
      </Section>
    </>
  );
}
