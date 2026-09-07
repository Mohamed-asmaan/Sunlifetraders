"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard, Reveal } from "@/components/motion/Reveal";
import ArrowButton from "@/components/ArrowButton";
import { submitLead } from "@/lib/actions";
import { fieldClass, submitClass } from "@/components/ui/form";
import type { CmsPage } from "@/lib/types";

// ─── Types ───────────────────────────────────────────────────────────────────

type ServiceCard = {
  title: string;
  description: string;
  essentialGuide?: string;
  worksBestFor?: string[];
  benefits?: string[];
};

type WhyChooseItem = string;

type ServiceData = {
  heroTitle: string;
  heroDescription: string;
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyChoosePoints: WhyChooseItem[];
  solutionsTitle: string;
  solutionsDescription: string;
  cards: ServiceCard[];
  whatWeOffer: string[];
  trustedTitle: string;
  trustedPoints: { title: string; desc: string }[];
  image: string;
  extraSections?: { title: string; content: string; list?: string[] }[];
};

// ─── Per-service data ─────────────────────────────────────────────────────────

const SERVICE_DATA: Record<string, ServiceData> = {
  "roof-top-solar-plant-installation": {
    heroTitle: "Roof Top Solar Plant Installation",
    heroDescription: "Reliable solar panel installation services for sustainable energy",
    whyChooseTitle: "Power Your Home with Reliable Solar Panel Installation Services",
    whyChooseSubtitle:
      "Join the sustainable energy movement with expert solar solutions that are efficient, affordable, and hassle-free.",
    whyChoosePoints: [
      "Save on Bills: Lower your electricity costs.",
      "Eco-Friendly: Reduce carbon footprint.",
      "Government Incentives: Enjoy subsidies and tax benefits.",
      "Boost Home Value: Solar homes are more attractive to buyers.",
      "Long-Lasting & Low Maintenance: Reliable power with minimal upkeep.",
    ],
    solutionsTitle: "Our Rooftop Solar Solutions",
    solutionsDescription:
      "At Sunlife Traders, we offer three distinct rooftop solar system setups to cater to your energy needs: On-Grid, Off-Grid, and Hybrid systems.",
    cards: [
      {
        title: "On-Grid Solar System",
        description:
          "Our On-Grid Solar Systems connect directly to the public electricity grid, allowing you to reduce your electricity bills while feeding excess power back to the grid. Perfect for urban homes and businesses looking for cost-effective energy solutions.",
        essentialGuide:
          "On-Grid systems are perfect for homes and businesses connected to the public electricity grid. They generate solar power during the day, reduce your electricity bills, and allow you to earn credits by feeding excess power back into the grid.",
        worksBestFor: ["Homes in Cities and Suburbs", "Businesses Seeking Cost Savings", "Schools, Hospitals, and Offices"],
        benefits: ["Lower Electricity Bills", "Earn Credits", "Low Maintenance", "Environmental Impact"],
      },
      {
        title: "Off-Grid Solar System",
        description:
          "Gain complete energy independence with our Off-Grid Solar Systems. Designed for remote locations or those seeking self-sufficiency, these systems store solar energy in batteries for use anytime, unaffected by grid outages.",
        worksBestFor: ["Remote Homes and Cabins", "Agricultural and Rural Areas", "Backup Power for Emergency Facilities"],
        benefits: [
          "Achieve Energy Independence",
          "Ensure Power Reliability",
          "Reduce Monthly Expenses",
          "Lower Environmental Impact",
        ],
      },
      {
        title: "Hybrid Solar System",
        description:
          "Enjoy the best of both worlds with our Hybrid Solar Systems. These setups combine solar power, battery storage, and grid connectivity, ensuring uninterrupted power supply and energy savings, even during outages.",
        worksBestFor: [
          "Homes with High Energy Usage",
          "Businesses Requiring Uninterrupted Power",
          "Areas with Frequent Power Outages",
        ],
        benefits: [
          "Enjoy Energy Security",
          "Reduce Electricity Costs",
          "Benefit from Flexible Power Options",
          "Support Environmental Sustainability",
        ],
      },
    ],
    whatWeOffer: [
      "6+ Years of Experience",
      "Excellent After-Sale Support",
      "Designed to Meet Highest Safety Standards",
      "Flexible Financing Options to Suit Every Budget",
      "Get Your Solar Investment Back in 3 to 4 Years",
    ],
    trustedTitle: "Your Trusted Solar Partner in Kerala and Tamil Nadu",
    trustedPoints: [
      { title: "Lower Electricity Bills", desc: "Save on energy costs with solar power." },
      { title: "Eco-Friendly Energy", desc: "Reduce your carbon footprint locally." },
      { title: "Government Incentives", desc: "Access subsidies for solar in Kerala and Tamil Nadu." },
      { title: "Increase Property Value", desc: "Solar homes are more attractive to buyers." },
      {
        title: "Reliable & Low Maintenance",
        desc: "Durable solar systems built for our region's climate.",
      },
    ],
    image: "/images/services/rooftop-hero.png",
  },

  "ground-mount-solar-installation": {
    heroTitle: "Ground Mount Solar Power Plant Installation",
    heroDescription: "Reliable solar power plant installation services for large-scale sustainable energy",
    whyChooseTitle: "Power Your Operations with Ground Mount Solar Power Plant Installation Services",
    whyChooseSubtitle:
      "Step into the future of sustainable energy with cutting-edge solutions tailored for large-scale energy demands.",
    whyChoosePoints: [
      "Significant Energy Savings: Reduce electricity expenses on a large scale.",
      "Sustainable and Green: Drastically cut carbon emissions.",
      "Government Support: Benefit from attractive subsidies and tax incentives.",
      "Scalability: Ideal for industrial, agricultural, and commercial applications.",
      "Durability: Built for long-term reliability with low maintenance needs.",
    ],
    solutionsTitle: "Our Ground Mount Solar Solutions",
    solutionsDescription:
      "At Sunlife Traders, we specialize in three key Ground Mount Solar System types: Fixed-Tilt Systems, Single-Axis Tracking Systems, and Double-Axis Tracking Systems.",
    cards: [
      {
        title: "Fixed-Tilt Systems",
        description:
          "Panels set at an optimal fixed angle for your latitude. The most cost-effective option for flat or gently-sloping land, with low maintenance needs and proven long-term durability suited to South India's climate.",
        worksBestFor: [
          "Residential Properties with open land",
          "Commercial and Industrial Sites",
          "Agricultural fields needing reliable power",
        ],
        benefits: [
          "Maximize Energy Output",
          "Expand Scalability",
          "Reduce Maintenance Hassles",
          "Eco-Friendly Energy",
        ],
      },
      {
        title: "Single-Axis Tracking Systems",
        description:
          "Panels follow the sun east-to-west through the day, increasing energy generation by up to 25% compared to fixed-tilt. Ideal for commercial and industrial sites where maximum output justifies the additional investment.",
        worksBestFor: ["Commercial Facilities", "Industrial Sites", "Large Farms"],
        benefits: [
          "Higher Energy Yield",
          "Cost-Effective for Large Scale",
          "Low Operational Cost",
          "Clean Energy Production",
        ],
      },
      {
        title: "Double-Axis Tracking Systems",
        description:
          "Full tracking on both axes for the highest possible energy yield. Panels follow the sun's altitude and azimuth continuously — best suited for utility-scale and high-value agricultural installations.",
        worksBestFor: ["Utility-Scale Projects", "High-Value Agricultural Installations", "Research Facilities"],
        benefits: [
          "Maximum Energy Generation",
          "Optimal Sunlight Capture",
          "Best ROI for Large Installations",
          "Environmental Leadership",
        ],
      },
    ],
    extraSections: [
      {
        title: "Essential Guide: Ground-Mounted Solar Systems",
        content:
          "Ground-mounted solar systems are the ultimate solution for harnessing large-scale solar energy. Designed to optimize energy generation, they are versatile, efficient, and suitable for both residential and commercial applications.",
        list: [
          "Residential Properties: Ideal for homeowners with spacious land who want to save on energy bills.",
          "Commercial and Industrial Sites: Excellent for large businesses aiming to meet high energy demands sustainably.",
          "Agricultural Fields: Perfect for farms needing reliable power for irrigation and equipment.",
        ],
      },
    ],
    whatWeOffer: [
      "6+ Years of Experience",
      "Excellent After-Sale Support",
      "Designed to Meet Highest Safety Standards",
      "Flexible Financing Options to Suit Every Budget",
      "Get Your Solar Investment Back in 3 to 4 Years",
    ],
    trustedTitle: "Your Trusted Solar Partner in Kerala and Tamil Nadu",
    trustedPoints: [
      { title: "Lower Electricity Bills", desc: "Save on energy costs with solar power." },
      { title: "Eco-Friendly Energy", desc: "Reduce your carbon footprint locally." },
      { title: "Government Incentives", desc: "Access subsidies for solar in Kerala and Tamil Nadu." },
      { title: "Increase Property Value", desc: "Solar homes are more attractive to buyers." },
      {
        title: "Reliable & Low Maintenance",
        desc: "Durable solar systems built for our region's climate.",
      },
    ],
    image: "/images/services/ground-mount.png",
  },

  "solar-plant-maintenance": {
    heroTitle: "Solar Plant Maintenance Service",
    heroDescription: "Reliable solar power plant maintenance for optimal performance",
    whyChooseTitle: "Keep Your Solar Plant Running at Its Best with Our Maintenance Services",
    whyChooseSubtitle:
      "Maximize the lifespan and efficiency of your solar energy system with professional maintenance tailored to your needs.",
    whyChoosePoints: [
      "Maximized Efficiency: Ensure that your system operates at its highest efficiency level.",
      "Preventive Care: Identify and fix potential issues before they impact your system.",
      "Cost Savings: Reduce the need for costly repairs and replacements with regular maintenance.",
      "Expert Support: Benefit from the knowledge and experience of our qualified technicians.",
      "Eco-Friendly: Maintain your solar system's eco-friendly benefits with optimized performance.",
    ],
    solutionsTitle: "Our Solar Plant Maintenance",
    solutionsDescription:
      "At Sunlife Traders, we provide expert solar plant maintenance services to ensure your system performs at its best. Our maintenance package includes routine inspections, performance monitoring, cleaning, repairs, and system optimization.",
    cards: [
      {
        title: "Routine Inspections",
        description:
          "Check and clean solar panels, inverters, and wiring to ensure everything is functioning efficiently. We spot underperformance before you see it on the monthly bill.",
        worksBestFor: ["Residential Rooftop Systems", "Commercial Solar Plants", "Ground-Mount Installations"],
        benefits: [
          "Increase Energy Efficiency",
          "Reduce Unexpected Costs",
          "Ensure Long-Term Reliability",
          "Sustain Clean Energy",
        ],
      },
      {
        title: "Performance Monitoring",
        description:
          "Track the energy output to identify and address any performance issues. We compare generation against your baseline and local irradiance data so anomalies are caught early.",
        worksBestFor: ["All System Sizes", "Remote Monitoring", "Post-Install Verification"],
        benefits: [
          "Early Issue Detection",
          "Data-Driven Decisions",
          "Maximized Output",
          "Peace of Mind",
        ],
      },
      {
        title: "Repairs & System Optimization",
        description:
          "Quickly handle any faulty components to minimize downtime and protect your 25-year output warranty. Adjust settings and configurations to improve performance and energy savings.",
        worksBestFor: ["Any Solar System", "Post-Storm Recovery", "Aging Installations"],
        benefits: [
          "Minimize Downtime",
          "Protect Warranty",
          "Improved Performance",
          "Extended System Life",
        ],
      },
    ],
    extraSections: [
      {
        title: "The Importance of Solar Plant Maintenance",
        content:
          "Solar plant maintenance is crucial for maximizing the energy output of your system. With regular checks and cleaning, your plant can continue to provide reliable, renewable energy for years to come.",
        list: [
          "Routine Inspections: Check and clean solar panels, inverters, and wiring to ensure everything is functioning efficiently.",
          "Performance Monitoring: Track the energy output to identify and address any performance issues.",
          "Repairs and Replacements: Quickly handle any faulty components to minimize downtime.",
          "Cleaning and Upkeep: Ensure your solar panels remain free of debris and dirt for optimal sunlight absorption.",
          "System Optimization: Adjust settings and configurations to improve performance and energy savings.",
        ],
      },
    ],
    whatWeOffer: [
      "6+ Years of Experience",
      "Excellent After-Sale Support",
      "Designed to Meet Highest Safety Standards",
      "Flexible Financing Options to Suit Every Budget",
      "Get Your Solar Investment Back in 3 to 4 Years",
    ],
    trustedTitle: "Your Trusted Solar Partner in Kerala and Tamil Nadu",
    trustedPoints: [
      { title: "Lower Electricity Bills", desc: "Save on energy costs with solar power." },
      { title: "Eco-Friendly Energy", desc: "Reduce your carbon footprint locally." },
      { title: "Government Incentives", desc: "Access subsidies for solar in Kerala and Tamil Nadu." },
      { title: "Increase Property Value", desc: "Solar homes are more attractive to buyers." },
      {
        title: "Reliable & Low Maintenance",
        desc: "Durable solar systems built for our region's climate.",
      },
    ],
    image: "/images/services/maintenance.png",
  },

  "solar-power-plant-amc": {
    heroTitle: "Solar Power Plant AMC Service",
    heroDescription: "Reliable AMC services for uninterrupted solar power performance",
    whyChooseTitle: "Maintain Peak Performance with Expert Solar Power Plant AMC Services",
    whyChooseSubtitle:
      "Keep your solar power plant running at its best with customized maintenance solutions designed for large-scale operations.",
    whyChoosePoints: [
      "Maximized Energy Efficiency: Regular servicing ensures consistent performance.",
      "Prolonged System Life: Preventive maintenance reduces wear and tear.",
      "Cost Savings: Avoid expensive downtime and repairs.",
      "Professional Expertise: Managed by skilled technicians using advanced tools.",
      "Compliance Ready: Ensures your solar system meets safety and efficiency standards.",
    ],
    solutionsTitle: "Our AMC Solutions",
    solutionsDescription:
      "At Sunlife Traders, we offer three comprehensive AMC packages: Basic AMC, Advanced AMC, and Comprehensive AMC. Each plan is designed to provide proactive care.",
    cards: [
      {
        title: "Basic AMC",
        description:
          "Two scheduled visits per year. Panel cleaning, visual inspection, inverter health check and a written performance report. Ideal for residential rooftop systems up to 10 kW.",
        essentialGuide:
          "Annual Maintenance Contracts are critical for maintaining the efficiency and longevity of your solar power systems.",
        worksBestFor: ["Residential Properties", "Small Commercial Sites", "Systems up to 10 kW"],
        benefits: [
          "Optimize Performance",
          "Reduce Downtime",
          "Ensure Safety",
          "Extend System Life",
        ],
      },
      {
        title: "Advanced AMC",
        description:
          "Four visits per year plus on-call remote monitoring. Includes thermal imaging, string-level performance analysis, connector torque checks and priority dispatch within 24 hours.",
        worksBestFor: ["Commercial and Industrial Sites", "Systems 10–100 kW", "High-Uptime Requirements"],
        benefits: [
          "Priority Response",
          "Thermal Imaging",
          "Detailed Reports",
          "24-Hour Dispatch",
        ],
      },
      {
        title: "Comprehensive AMC",
        description:
          "Unlimited visits, dedicated site engineer, monthly energy reports and a named technician on WhatsApp. Covers commercial, industrial and ground-mount systems from 10 kW to 1 MW.",
        worksBestFor: [
          "Utility-Scale Installations",
          "Industrial Sites above 100 kW",
          "Critical Power Infrastructure",
        ],
        benefits: [
          "Dedicated Engineer",
          "Monthly Reports",
          "WhatsApp Support",
          "Unlimited Visits",
        ],
      },
    ],
    extraSections: [
      {
        title: "What's Covered in Every Plan",
        content:
          "Planned visits, panel and equipment cleaning, electrical checks, inverter health, wiring inspection and compliance documentation. No subcontractors — the same team that installed your plant maintains it.",
        list: [
          "Residential Properties: For homeowners who want hassle-free solar upkeep.",
          "Commercial and Industrial Sites: Critical for businesses relying on high energy outputs.",
          "Utility-Scale Installations: Ensures smooth operation of large-scale projects.",
        ],
      },
    ],
    whatWeOffer: [
      "6+ Years of Experience",
      "Excellent After-Sale Support",
      "Designed to Meet Highest Safety Standards",
      "Flexible Financing Options to Suit Every Budget",
      "Get Your Solar Investment Back in 3 to 4 Years",
    ],
    trustedTitle: "Your Trusted Solar Partner in Kerala and Tamil Nadu",
    trustedPoints: [
      { title: "Lower Electricity Bills", desc: "Save on energy costs with solar power." },
      { title: "Eco-Friendly Energy", desc: "Reduce your carbon footprint locally." },
      { title: "Government Incentives", desc: "Access subsidies for solar in Kerala and Tamil Nadu." },
      { title: "Increase Property Value", desc: "Solar homes are more attractive to buyers." },
      {
        title: "Reliable & Low Maintenance",
        desc: "Durable solar systems built for our region's climate.",
      },
    ],
    image: "/images/services/amc.png",
  },
};

const BILL_OPTIONS = [
  "Less than ₹1500",
  "₹1500–₹2500",
  "₹2500–₹4000",
  "₹4000–₹8000",
  "More than ₹8000",
];

// ─── Inline lead form ─────────────────────────────────────────────────────────

function ServiceLeadForm() {
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
      <h3 className="display-kicker mb-5">Get a Free Quote</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Name *</span>
          <input required name="name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">WhatsApp Number *</span>
          <input required name="phone" type="tel" className={fieldClass} />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Email</span>
        <input name="email" type="email" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Monthly Electricity Bill</span>
        <select name="propertyType" defaultValue={BILL_OPTIONS[0]} className={fieldClass}>
          {BILL_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Pin Code</span>
          <input name="city" className={fieldClass} placeholder="Pin code" />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">City</span>
          <input name="message" className={fieldClass} placeholder="Your city" />
        </label>
      </div>
      <input type="hidden" name="source" value="service-detail" />
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function ServiceDetailView({ page }: { page: CmsPage }) {
  const data = SERVICE_DATA[page.slug];

  // Fallback to generic layout if no custom data (shouldn't happen for known slugs)
  if (!data) {
    return (
      <Section pad="contact">
        <SectionIntro
          as="h1"
          inView={false}
          badge={page.badge}
          title={page.title}
          description={page.description}
          delay={0.2}
          descriptionClass="copy mt-5 max-w-[52ch] text-muted"
        />
      </Section>
    );
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section pad="contact">
        <SectionIntro
          as="h1"
          inView={false}
          badge={page.badge}
          title={data.heroTitle}
          description={data.heroDescription}
          delay={0.2}
          descriptionClass="copy mt-5 max-w-[52ch] text-muted"
        />

        <Reveal delay={0.35} className="mt-8 flex flex-wrap items-center gap-3">
          <ArrowButton href="/contact">Get a Quote</ArrowButton>
          <Link href="/services" className="ui text-ink/60 underline underline-offset-4">
            All services
          </Link>
        </Reveal>
      </Section>

      {/* ── Hero image ────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <Reveal>
          <div className="relative h-[220px] w-full overflow-hidden rounded-[24px] md:h-[400px] lg:h-[480px]">
            <Image
              src={data.image}
              alt={data.heroTitle}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>
        </Reveal>
      </div>

      {/* ── Subsidy banner ────────────────────────────────────── */}
      <div className="mx-auto mt-8 max-w-[1280px] px-4 md:px-6">
        <Reveal>
          <div className="flex flex-col items-start gap-4 rounded-[20px] border border-amber/20 bg-amber-light p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="eyebrow text-amber">PM Surya Ghar</p>
              <p className="copy mt-1 max-w-[60ch] text-ink/80">
                Did you know that the PM-Surya Ghar Solar Project offers up to ₹78,000 in government subsidies? By
                switching to solar, you can significantly lower your electricity bills while enjoying easy financing
                options with EMIs starting as low as ₹1,200 per lakh.
              </p>
            </div>
            <ArrowButton href="/contact" variant="dark" className="shrink-0">
              Check eligibility
            </ArrowButton>
          </div>
        </Reveal>
      </div>

      {/* ── Why Choose + Lead Form ────────────────────────────── */}
      <Section pad="default">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Why choose */}
          <Reveal>
            <div>
              <p className="eyebrow text-amber mb-3">Why Choose Us</p>
              <h2 className="display-kicker mb-3">{data.whyChooseTitle}</h2>
              <p className="copy mb-5 text-muted">{data.whyChooseSubtitle}</p>
              <ul className="space-y-3">
                {data.whyChoosePoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                    <span className="copy text-ink/80">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* Lead form */}
          <Reveal delay={0.12}>
            <ServiceLeadForm />
          </Reveal>
        </div>
      </Section>

      {/* ── Solutions section ─────────────────────────────────── */}
      <Section pad="tight">
        <Reveal className="mb-8">
          <h2 className="display-kicker">{data.solutionsTitle}</h2>
          <p className="copy mt-2 max-w-[64ch] text-muted">{data.solutionsDescription}</p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {data.cards.map((card, i) => (
            <MotionCard key={card.title} i={i} className="rounded-[24px] bg-soft p-6">
              <AccentDot />
              <h3 className="display-kicker">{card.title}</h3>
              <p className="copy mt-2 text-muted">{card.description}</p>

              {card.essentialGuide && (
                <div className="mt-4 rounded-[16px] bg-white p-4">
                  <p className="eyebrow text-amber mb-1">Essential Guide</p>
                  <p className="copy text-muted">{card.essentialGuide}</p>
                </div>
              )}

              {card.worksBestFor && card.worksBestFor.length > 0 && (
                <div className="mt-4">
                  <p className="ui text-ink mb-2">Works best for:</p>
                  <ul className="space-y-1">
                    {card.worksBestFor.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        <span className="copy text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {card.benefits && card.benefits.length > 0 && (
                <div className="mt-4">
                  <p className="ui text-ink mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {card.benefits.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] text-ink/70"
                      >
                        <span className="h-1 w-1 rounded-full bg-amber" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </MotionCard>
          ))}
        </div>
      </Section>

      {/* ── Extra sections (essential guide, importance, etc.) ── */}
      {data.extraSections && data.extraSections.length > 0 && (
        <Section pad="tight">
          {data.extraSections.map((section) => (
            <Reveal key={section.title} className="mb-6">
              <div className="rounded-[24px] border border-line bg-soft p-6 md:p-8">
                <AccentDot />
                <h2 className="display-kicker">{section.title}</h2>
                <p className="copy mt-3 max-w-[72ch] text-muted">{section.content}</p>
                {section.list && section.list.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                        <span className="copy text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </Section>
      )}

      {/* ── What We Offer strip ───────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 pb-8">
        <Reveal>
          <div className="rounded-[24px] bg-ink p-5 md:p-6">
            <p className="eyebrow text-white/50 mb-4">What We Offer for You</p>
            <div className="flex flex-wrap gap-3">
              {data.whatWeOffer.map((item) => (
                <span
                  key={item}
                  className="ui inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Trusted partner section ───────────────────────────── */}
      <Section pad="tight">
        <Reveal>
          <div className="rounded-[24px] bg-soft p-6 md:p-8">
            <AccentDot />
            <h2 className="display-kicker">{data.trustedTitle}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.trustedPoints.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-[16px] bg-white p-4">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  <div>
                    <p className="ui text-ink">{item.title}</p>
                    <p className="copy mt-1 text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Certifications ────────────────────────────────────── */}
      <Section pad="tight">
        <div className="grid gap-4 md:grid-cols-2">
          <MotionCard i={0} className="rounded-[24px] border border-line bg-soft p-6">
            <AccentDot />
            <h3 className="display-kicker">EVVO Certification</h3>
            <p className="copy mt-2 text-muted">
              Certified by EVVO (2023–2025), we deliver premium solar installations that meet the highest safety,
              reliability and efficiency standards.
            </p>
          </MotionCard>
          <MotionCard i={1} className="rounded-[24px] border border-line bg-soft p-6">
            <AccentDot />
            <h3 className="display-kicker">MNRE Registered Vendor</h3>
            <p className="copy mt-2 text-muted">
              Government-approved solar solutions. Trust us to navigate the subsidy and compliance process while
              you focus on saving on electricity bills.
            </p>
          </MotionCard>
        </div>
      </Section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <Section pad="tight">
        <Reveal className="flex flex-wrap gap-3">
          <ArrowButton href="/contact">Get a free quote</ArrowButton>
          <Link
            href="/services"
            className="ui inline-flex items-center gap-2 rounded-xl border border-line bg-soft px-4 py-[9px] text-ink transition hover:bg-white"
          >
            View all services
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
