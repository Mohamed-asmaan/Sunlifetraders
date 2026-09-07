import Image from "next/image";
import Link from "next/link";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard, Reveal } from "@/components/motion/Reveal";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SubsidyHook from "@/components/SubsidyHook";
import SurveyCta from "@/components/SurveyCta";
import type { CmsPage } from "@/lib/types";

const SERVICES = [
  {
    title: "Solar Plant Maintenance",
    description:
      "Solar plant maintenance involves cleaning panels, inspecting equipment, and servicing components to ensure efficient and reliable performance.",
    href: "/services/solar-plant-maintenance",
    image: "/images/services/card-maintenance.jpeg",
  },
  {
    title: "Solar Power Plant AMC",
    description:
      "Solar Power Plant AMC offers regular inspections, maintenance, and repairs to ensure continuous, efficient operation of the solar system.",
    href: "/services/solar-power-plant-amc",
    image: "/images/services/card-amc.jpeg",
  },
  {
    title: "Roof top solar plant Installation",
    description:
      "Rooftop solar installations effectively use panels to harness sunlight, generating electricity, reducing energy bills, and decreasing reliance on the power grid.",
    href: "/services/roof-top-solar-plant-installation",
    image: "/images/services/card-rooftop.png",
  },
  {
    title: "Ground Mount Solar Installation",
    description:
      "Ground mount solar installations place panels on the ground, optimizing sunlight exposure and energy generation for efficiency.",
    href: "/services/ground-mount-solar-installation",
    image: "/images/services/card-ground.png",
  },
];

export default function ServicesView({ page }: { page: CmsPage }) {
  return (
    <>
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <Image
          src="/images/services/hero.png"
          alt="Sunlife Traders solar plant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/25" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-14 md:px-6 md:py-20">
          <PageBreadcrumb
            light
            items={[
              { href: "/", label: "Home" },
              { label: "Services" },
            ]}
          />
          <div className="max-w-[720px] text-white [&_.eyebrow]:!text-white/70">
            <SectionIntro
              as="h1"
              inView={false}
              badge={page.badge}
              title="Explore SUNLIFE TRADERS' Services"
              description="Discover a range of services designed to empower your transition towards a more sustainable future."
              delay={0.2}
              light
              titleClass="display text-white"
              descriptionClass="copy mt-5 max-w-[52ch] text-white/80"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14">
        <SubsidyHook
          showImage
          title="Government Solar Subsidy & Affordable Financing"
          body="Reduce your energy costs with government-backed solar subsidies. Save up to ₹78,000 on MNRE-approved solar panels. Flexible financing options available, starting at ₹1,200 per lakh. Check your eligibility and start saving on electricity bills today."
        />
      </div>

      <Section pad="tight">
        <Reveal className="mb-8">
          <p className="eyebrow text-amber">Discover What We Offer</p>
          <h2 className="display mt-2">Four ways we keep your solar working</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <MotionCard key={service.title} i={i} className="group relative min-h-[360px] overflow-hidden rounded-[24px]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 640px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/30 to-ink/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="display-kicker text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{service.description}</p>
                <Link
                  href={service.href}
                  className="ui mt-4 inline-flex text-white underline underline-offset-4"
                >
                  Know More
                </Link>
              </div>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section pad="tight">
        <SurveyCta />
      </Section>
    </>
  );
}
