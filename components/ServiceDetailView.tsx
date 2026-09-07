"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard, Reveal } from "@/components/motion/Reveal";
import ArrowButton from "@/components/ArrowButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import ContactAssist from "@/components/ContactAssist";
import Certifications from "@/components/Certifications";
import SurveyCta from "@/components/SurveyCta";
import { submitLead } from "@/lib/actions";
import { fieldClass, submitClass } from "@/components/ui/form";
import type { CmsPage } from "@/lib/types";

type Point = { title: string; desc: string };

type SolutionCard = {
  title: string;
  description: string;
  image: string;
  href: string;
};

type Guide = {
  id: string;
  title: string;
  content: string;
  worksBestTitle: string;
  worksBestFor: Point[];
  benefitsTitle: string;
  benefits: Point[];
};

type ServiceData = {
  breadcrumb: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  secondaryImage?: string;
  subsidyBody: string;
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyChooseHeading: string;
  whyChoosePoints: Point[];
  solutionsTitle: string;
  solutionsDescription: string;
  cards?: SolutionCard[];
  guides: Guide[];
};

const GROUND_SUBSIDY =
  "By installing a Ground Mount Solar Power Plant, you can achieve unparalleled energy efficiency while accessing financing options with EMIs starting as low as ₹1,200 per lakh. Leverage this opportunity to power your operations with solar energy today!";

const SERVICE_DATA: Record<string, ServiceData> = {
  "roof-top-solar-plant-installation": {
    breadcrumb: "Roof Top Solar Plant",
    heroTitle: "Roof Top Solar Plant Installation",
    heroDescription: "Reliable solar panel installation services for sustainable energy",
    image: "/images/services/rooftop-hero.jpg",
    secondaryImage: "/images/services/rooftop-secondary.jpg",
    subsidyBody:
      "By switching to solar, you can significantly lower your electricity bills while enjoying easy financing options with EMIs starting as low as ₹1,200 per lakh. Take advantage of this initiative and start saving today!",
    whyChooseTitle: "Power Your Home with Reliable Solar Panel Installation Services",
    whyChooseSubtitle:
      "Join the sustainable energy movement with expert solar solutions that are efficient, affordable, and hassle-free.",
    whyChooseHeading: "Why Choose Solar for Your Home?",
    whyChoosePoints: [
      { title: "Save on Bills", desc: "Lower your electricity costs." },
      { title: "Eco-Friendly", desc: "Reduce carbon footprint." },
      { title: "Government Incentives", desc: "Enjoy subsidies and tax benefits." },
      { title: "Boost Home Value", desc: "Solar homes are more attractive to buyers." },
      { title: "Long-Lasting & Low Maintenance", desc: "Reliable power with minimal upkeep." },
    ],
    solutionsTitle: "Our Rooftop Solar Solutions",
    solutionsDescription:
      "At Sunlife Traders, we offer three distinct rooftop solar system setups to cater to your energy needs: On-Grid, Off-Grid, and Hybrid systems. Each solution is designed to maximize efficiency and savings while ensuring reliable energy access for your home or business. Discover how our tailored solar installations can help you harness the power of the sun effectively.",
    cards: [
      {
        title: "On-Grid Solar System",
        description:
          "Our On-Grid Solar Systems connect directly to the public electricity grid, allowing you to reduce your electricity bills while feeding excess power back to the grid. Perfect for urban homes and businesses looking for cost-effective energy solutions.",
        image: "/images/services/rooftop-ongrid.jpg",
        href: "#on-grid",
      },
      {
        title: "Off-Grid Solar System",
        description:
          "Gain complete energy independence with our Off-Grid Solar Systems. Designed for remote locations or those seeking self-sufficiency, these systems store solar energy in batteries for use anytime, unaffected by grid outages.",
        image: "/images/services/rooftop-offgrid.jpg",
        href: "#off-grid",
      },
      {
        title: "Hybrid Solar System",
        description:
          "Enjoy the best of both worlds with our Hybrid Solar Systems. These setups combine solar power, battery storage, and grid connectivity, ensuring uninterrupted power supply and energy savings, even during outages.",
        image: "/images/services/rooftop-hybrid.jpg",
        href: "#hybrid",
      },
    ],
    guides: [
      {
        id: "on-grid",
        title: "Essential Guide to On-Grid Solar Systems",
        content:
          "On-Grid systems are perfect for homes and businesses connected to the public electricity grid. They generate solar power during the day, reduce your electricity bills, and allow you to earn credits by feeding excess power back into the grid.",
        worksBestTitle: "Where On-Grid Solar Systems Work Best",
        worksBestFor: [
          {
            title: "Homes in Cities and Suburbs",
            desc: "Ideal for residential areas connected to the grid, helping homeowners save on electricity bills.",
          },
          {
            title: "Businesses Seeking Cost Savings",
            desc: "Great for companies looking to cut energy costs with dependable, sustainable power.",
          },
          {
            title: "Schools, Hospitals, and Offices",
            desc: "Perfect for places with steady daytime energy needs, offering cost-effective and eco-friendly solutions.",
          },
        ],
        benefitsTitle: "With on-grid systems, you can:",
        benefits: [
          {
            title: "Lower Electricity Bills",
            desc: "Use daytime solar power to cut costs, with excess energy sent to the grid for credits through net metering.",
          },
          {
            title: "Earn Credits",
            desc: "Surplus energy earns credits to offset nighttime or cloudy-day usage.",
          },
          {
            title: "Low Maintenance",
            desc: "Fewer components mean easier upkeep compared to off-grid systems.",
          },
          {
            title: "Environmental Impact",
            desc: "Reduce your carbon footprint and reliance on fossil fuels.",
          },
        ],
      },
      {
        id: "off-grid",
        title: "Essential Guide to Off-Grid Solar Systems",
        content:
          "Off-grid systems are designed for independent power generation, perfect for locations without reliable access to the main electricity grid. Generate and store your own energy, ensuring power availability day and night.",
        worksBestTitle: "Where Off-Grid Solar Systems Work Best",
        worksBestFor: [
          {
            title: "Remote Homes and Cabins",
            desc: "Ideal for isolated locations where grid access is limited or unavailable, providing complete energy independence.",
          },
          {
            title: "Agricultural and Rural Areas",
            desc: "Great for farms and rural setups needing reliable, grid-free power for equipment and irrigation.",
          },
          {
            title: "Backup Power for Emergency Facilities",
            desc: "Ideal for emergency shelters and disaster response, ensuring reliable power.",
          },
        ],
        benefitsTitle: "With off-grid systems, you can:",
        benefits: [
          {
            title: "Achieve Energy Independence",
            desc: "Produce and store your power without relying on the grid.",
          },
          {
            title: "Ensure Power Reliability",
            desc: "Batteries provide backup power, ensuring availability during nighttime or cloudy days.",
          },
          {
            title: "Reduce Monthly Expenses",
            desc: "Avoid grid connection fees and electricity bills by producing your own power.",
          },
          {
            title: "Lower Environmental Impact",
            desc: "Cut down on fossil fuel use by generating clean, renewable energy on-site.",
          },
        ],
      },
      {
        id: "hybrid",
        title: "Essential Guide to Hybrid Solar Systems",
        content:
          "Hybrid systems combine the best of both on-grid and off-grid systems, offering flexibility and efficiency. They connect to the grid while storing extra energy in batteries, providing backup power for when the grid goes down.",
        worksBestTitle: "Where Hybrid Solar Systems Work Best",
        worksBestFor: [
          {
            title: "Homes with High Energy Usage",
            desc: "Ideal for households with heavy electricity needs, reducing grid dependency while ensuring backup power.",
          },
          {
            title: "Businesses Requiring Uninterrupted Power",
            desc: "Great for companies needing constant power, ensuring operations continue smoothly during outages.",
          },
          {
            title: "Areas with Frequent Power Outages",
            desc: "Perfect for locations prone to blackouts, allowing seamless transitions from grid to battery power.",
          },
        ],
        benefitsTitle: "With hybrid systems, you can:",
        benefits: [
          {
            title: "Enjoy Energy Security",
            desc: "Store excess energy in batteries for backup during grid outages.",
          },
          {
            title: "Reduce Electricity Costs",
            desc: "Use stored energy during peak hours to lower utility bills.",
          },
          {
            title: "Benefit from Flexible Power Options",
            desc: "Draw from solar, battery, or the grid depending on your needs.",
          },
          {
            title: "Support Environmental Sustainability",
            desc: "Lower your carbon footprint by balancing renewable energy with reliable grid access.",
          },
        ],
      },
    ],
  },

  "ground-mount-solar-installation": {
    breadcrumb: "Ground Mount Solar Power",
    heroTitle: "Ground Mount Solar Power Plant Installation",
    heroDescription: "Reliable solar power plant installation services for large-scale sustainable energy",
    image: "/images/services/ground-hero.jpg",
    secondaryImage: "/images/services/ground-secondary.jpg",
    subsidyBody: GROUND_SUBSIDY,
    whyChooseTitle: "Power Your Operations with Ground Mount Solar Power Plant Installation Services",
    whyChooseSubtitle:
      "Step into the future of sustainable energy with cutting-edge solutions tailored for large-scale energy demands.",
    whyChooseHeading: "Why Choose Ground Mount Solar for Your Power Needs?",
    whyChoosePoints: [
      { title: "Significant Energy Savings", desc: "Reduce electricity expenses on a large scale." },
      { title: "Sustainable and Green", desc: "Drastically cut carbon emissions." },
      { title: "Government Support", desc: "Benefit from attractive subsidies and tax incentives." },
      { title: "Scalability", desc: "Ideal for industrial, agricultural, and commercial applications." },
      { title: "Durability", desc: "Built for long-term reliability with low maintenance needs." },
    ],
    solutionsTitle: "Our Ground Mount Solar Solutions",
    solutionsDescription:
      "At Sunlife Traders, we specialize in three key Ground Mount Solar System types to meet your energy requirements: Fixed-Tilt Systems, Single-Axis Tracking Systems, and Double-Axis Tracking Systems. Each option is engineered for maximum efficiency and cost-effectiveness, ensuring your energy goals are met seamlessly.",
    guides: [
      {
        id: "ground-guide",
        title: "Essential Guide to Ground Mount Solar Systems",
        content:
          "Ground-mounted solar systems are the ultimate solution for harnessing large-scale solar energy. Designed to optimize energy generation, they are versatile, efficient, and suitable for both residential and commercial applications.",
        worksBestTitle: "Where Ground Mount Solar Systems Work Best",
        worksBestFor: [
          {
            title: "Residential Properties",
            desc: "Ideal for homeowners with spacious land who want to save on energy bills.",
          },
          {
            title: "Commercial and Industrial Sites",
            desc: "Excellent for large businesses aiming to meet high energy demands sustainably.",
          },
          {
            title: "Agricultural Fields",
            desc: "Perfect for farms needing reliable power for irrigation and equipment.",
          },
        ],
        benefitsTitle: "With ground-mounted systems, you can:",
        benefits: [
          {
            title: "Maximize Energy Output",
            desc: "Flexible installation angles for enhanced sunlight capture.",
          },
          {
            title: "Expand Scalability",
            desc: "Suitable for large installations, accommodating growing energy needs.",
          },
          {
            title: "Reduce Maintenance Hassles",
            desc: "Durable and designed for long-term performance.",
          },
          {
            title: "Eco-Friendly Energy",
            desc: "Transition to clean, renewable solar power and lower your carbon footprint.",
          },
        ],
      },
    ],
  },

  "solar-plant-maintenance": {
    breadcrumb: "Solar Plant Maintenance Services",
    heroTitle: "Solar Plant Maintenance Service",
    heroDescription: "Reliable solar power plant maintenance for optimal performance",
    image: "/images/services/maintenance-hero.jpg",
    secondaryImage: "/images/services/maintenance-secondary.jpg",
    subsidyBody: GROUND_SUBSIDY,
    whyChooseTitle: "Keep Your Solar Plant Running at Its Best with Our Maintenance Services",
    whyChooseSubtitle:
      "Maximize the lifespan and efficiency of your solar energy system with professional maintenance tailored to your needs.",
    whyChooseHeading: "Why Choose Our Solar Plant Maintenance Services?",
    whyChoosePoints: [
      { title: "Maximized Efficiency", desc: "Ensure that your system operates at its highest efficiency level." },
      { title: "Preventive Care", desc: "Identify and fix potential issues before they impact your system." },
      { title: "Cost Savings", desc: "Reduce the need for costly repairs and replacements with regular maintenance." },
      { title: "Expert Support", desc: "Benefit from the knowledge and experience of our qualified technicians." },
      { title: "Eco-Friendly", desc: "Maintain your solar system's eco-friendly benefits with optimized performance." },
    ],
    solutionsTitle: "Our Solar Plant Maintenance",
    solutionsDescription:
      "At Sunlife Traders, we provide expert solar plant maintenance services to ensure your system performs at its best. Our maintenance package includes routine inspections, performance monitoring, cleaning, repairs, and system optimization, all designed to maximize efficiency and extend the life of your solar plant.",
    guides: [
      {
        id: "maintenance-guide",
        title: "The Importance of Solar Plant Maintenance",
        content:
          "Solar plant maintenance is crucial for maximizing the energy output of your system. With regular checks and cleaning, your plant can continue to provide reliable, renewable energy for years to come.",
        worksBestTitle: "Key Services Included in Our Maintenance Package",
        worksBestFor: [
          {
            title: "Routine Inspections",
            desc: "Check and clean solar panels, inverters, and wiring to ensure everything is functioning efficiently.",
          },
          {
            title: "Performance Monitoring",
            desc: "Track the energy output to identify and address any performance issues.",
          },
          {
            title: "Repairs and Replacements",
            desc: "Quickly handle any faulty components to minimize downtime.",
          },
          {
            title: "Cleaning and Upkeep",
            desc: "Ensure your solar panels remain free of debris and dirt for optimal sunlight absorption.",
          },
          {
            title: "System Optimization",
            desc: "Adjust settings and configurations to improve performance and energy savings.",
          },
        ],
        benefitsTitle: "With our maintenance services, you can:",
        benefits: [
          { title: "Increase Energy Efficiency", desc: "Regular servicing ensures optimal power generation." },
          { title: "Reduce Unexpected Costs", desc: "Preventative care minimizes costly repairs." },
          { title: "Ensure Long-Term Reliability", desc: "Keep your solar plant running smoothly for years." },
          { title: "Sustain Clean Energy", desc: "Maintain the eco-friendly benefits of solar power with professional care." },
        ],
      },
    ],
  },

  "solar-power-plant-amc": {
    breadcrumb: "Solar Power Plant AMC",
    heroTitle: "Solar Power Plant AMC Service",
    heroDescription: "Reliable AMC services for uninterrupted solar power performance",
    image: "/images/services/amc-hero.jpg",
    secondaryImage: "/images/services/amc-secondary.jpg",
    subsidyBody: GROUND_SUBSIDY,
    whyChooseTitle: "Maintain Peak Performance with Expert Solar Power Plant AMC Services",
    whyChooseSubtitle:
      "Keep your solar power plant running at its best with customized maintenance solutions designed for large-scale operations.",
    whyChooseHeading: "Why Choose Solar Power Plant AMC for Your Needs?",
    whyChoosePoints: [
      { title: "Maximized Energy Efficiency", desc: "Regular servicing ensures consistent performance." },
      { title: "Prolonged System Life", desc: "Preventive maintenance reduces wear and tear." },
      { title: "Cost Savings", desc: "Avoid expensive downtime and repairs." },
      { title: "Professional Expertise", desc: "Managed by skilled technicians using advanced tools." },
      { title: "Compliance Ready", desc: "Ensures your solar system meets safety and efficiency standards." },
    ],
    solutionsTitle: "Our AMC Solutions",
    solutionsDescription:
      "At Sunlife Traders, we offer three comprehensive AMC packages tailored to your solar power plant's requirements: Basic AMC, Advanced AMC, and Comprehensive AMC. Each plan is designed to provide proactive care, ensuring maximum energy generation and reliability.",
    guides: [
      {
        id: "amc-guide",
        title: "Essential Guide to Solar Power Plant AMC",
        content:
          "Annual Maintenance Contracts are critical for maintaining the efficiency and longevity of your solar power systems. They ensure timely inspections, repairs, and cleaning, making them suitable for both residential and commercial installations.",
        worksBestTitle: "Where Solar Power Plant AMC Works Best",
        worksBestFor: [
          {
            title: "Residential Properties",
            desc: "For homeowners who want hassle-free solar upkeep.",
          },
          {
            title: "Commercial and Industrial Sites",
            desc: "Critical for businesses relying on high energy outputs.",
          },
          {
            title: "Utility-Scale Installations",
            desc: "Ensures smooth operation of large-scale projects.",
          },
        ],
        benefitsTitle: "With AMC services, you can:",
        benefits: [
          { title: "Optimize Performance", desc: "Regular checks enhance energy output." },
          { title: "Reduce Downtime", desc: "Minimize interruptions with proactive monitoring." },
          { title: "Ensure Safety", desc: "Professional inspections ensure compliance with safety standards." },
          { title: "Extend System Life", desc: "Preventative care avoids premature degradation." },
        ],
      },
    ],
  },
};

const OFFERS = [
  { icon: "/images/services/icon-experience.png", label: "6+ Years of Experience" },
  { icon: "/images/services/icon-support.png", label: "Excellent After-Sale Support" },
  { icon: "/images/services/icon-safety.png", label: "Designed to Meet Highest Safety Standards" },
  { icon: "/images/services/icon-finance.png", label: "Flexible Financing Options to Suit Every Budget" },
  { icon: "/images/services/icon-roi.png", label: "Get Your Solar Investment Back in 3 to 4 Years" },
];

const TRUSTED_POINTS: Point[] = [
  { title: "Lower Electricity Bills", desc: "Save on energy costs with solar power." },
  { title: "Eco-Friendly Energy", desc: "Reduce your carbon footprint locally." },
  { title: "Government Incentives", desc: "Access subsidies for solar in Kerala and Tamil Nadu." },
  { title: "Increase Property Value", desc: "Solar homes are more attractive to buyers." },
  { title: "Reliable & Low Maintenance", desc: "Durable solar systems built for our region's climate." },
];

const BILL_OPTIONS = [
  "Less than 1500₹",
  "1500₹ - 2500₹",
  "2500₹ - 4000₹",
  "4000₹ - 8000₹",
  "more than 8000₹",
];

function ServiceLeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const pin = String(data.get("pincode") || "").trim();
    const city = String(data.get("city") || "").trim();
    data.set("city", [city, pin && `PIN ${pin}`].filter(Boolean).join(" · "));
    data.delete("pincode");
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
      <h3 className="display-kicker mb-5">Get a Quote</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Name *</span>
          <input required name="name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">WhatsApp number *</span>
          <input required name="phone" type="tel" className={fieldClass} />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Email</span>
        <input name="email" type="email" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Monthly electricity bill</span>
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
          <span className="mb-2 block font-medium">Pin code</span>
          <input name="pincode" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">City</span>
          <input name="city" className={fieldClass} />
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

function PointList({ items }: { items: Point[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
          <span className="copy text-ink/80">
            <strong className="font-medium text-ink">{item.title}:</strong> {item.desc}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ServiceDetailView({ page }: { page: CmsPage }) {
  const data = SERVICE_DATA[page.slug];

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
      <section className="relative min-h-[min(92vh,880px)] overflow-hidden pt-24 md:pt-28">
        <Image
          src={data.image}
          alt={data.heroTitle}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/48 to-ink/20" />
        <div className="relative mx-auto grid max-w-[1280px] items-end gap-8 px-4 py-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] md:px-6 md:py-16 lg:items-center lg:py-20">
          <div>
            <PageBreadcrumb
              light
              items={[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { label: data.breadcrumb },
              ]}
            />
            <h1 className="display text-white">{data.heroTitle}</h1>
            <p className="copy mt-4 max-w-[42ch] text-white/80">{data.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ArrowButton href="#quote" variant="light">
                Get a Quote
              </ArrowButton>
              <WhatsAppButton variant="onDark">WhatsApp us</WhatsAppButton>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/40 bg-white/95 p-5 shadow-[0_24px_60px_rgba(17,17,17,0.22)] backdrop-blur-md md:p-6">
            <p className="eyebrow text-amber">PM Surya Ghar</p>
            <h2 className="display-kicker mt-2">
              Did you know that the PM-Surya Ghar Solar Project offers up to ₹78,000 in government subsidies?
            </h2>
            <div className="relative mx-auto my-4 h-28 w-28 overflow-hidden rounded-[20px] bg-ink">
              <Image
                src="/images/services/subsidy.png"
                alt="Government solar subsidy"
                fill
                className="object-contain p-2"
                sizes="112px"
              />
            </div>
            <p className="copy text-ink/75">{data.subsidyBody}</p>
            <div className="mt-5">
              <ArrowButton href="/contact">Click here!</ArrowButton>
            </div>
          </div>
        </div>
      </section>

      <Section pad="default">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <Reveal>
            <p className="eyebrow mb-3 text-amber">Why Choose Us</p>
            <h2 className="display-kicker mb-3 max-w-[40ch]">{data.whyChooseTitle}</h2>
            <p className="copy mb-6 max-w-[64ch] text-muted">{data.whyChooseSubtitle}</p>
            <h3 className="ui text-ink">{data.whyChooseHeading}</h3>
            <PointList items={data.whyChoosePoints} />
          </Reveal>
          <Reveal delay={0.12}>
            <div id="quote">
              <ServiceLeadForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section pad="tight">
        <ContactAssist />
      </Section>

      <Section pad="tight">
        <Reveal className="mb-8">
          <h2 className="display-kicker">{data.solutionsTitle}</h2>
          <p className="copy mt-2 max-w-[72ch] text-muted">{data.solutionsDescription}</p>
        </Reveal>

        {data.cards ? (
          <div className="grid gap-4 md:grid-cols-3">
            {data.cards.map((card, i) => (
              <MotionCard key={card.title} i={i} className="overflow-hidden rounded-[24px] bg-soft">
                <div className="relative h-44 w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="p-6">
                  <h3 className="display-kicker">{card.title}</h3>
                  <p className="copy mt-2 text-muted">{card.description}</p>
                  <Link href={card.href} className="ui mt-4 inline-flex text-ink underline underline-offset-4">
                    Want to know more
                  </Link>
                </div>
              </MotionCard>
            ))}
          </div>
        ) : null}

        {data.secondaryImage && !data.cards ? (
          <Reveal className="mt-8">
            <div className="relative h-[220px] overflow-hidden rounded-[24px] md:h-[360px]">
              <Image
                src={data.secondaryImage}
                alt={`${data.heroTitle} in the field`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
            </div>
          </Reveal>
        ) : null}
      </Section>

      {data.guides.map((guide) => (
        <Section pad="tight" key={guide.id} id={guide.id}>
          <Reveal>
            <div className="rounded-[24px] border border-line bg-soft p-6 md:p-8">
              <AccentDot />
              <h2 className="display-kicker">{guide.title}</h2>
              <p className="copy mt-3 max-w-[72ch] text-muted">{guide.content}</p>
              <h3 className="ui mt-6 text-ink">{guide.worksBestTitle}</h3>
              <PointList items={guide.worksBestFor} />
              <h3 className="ui mt-6 text-ink">{guide.benefitsTitle}</h3>
              <PointList items={guide.benefits} />
            </div>
          </Reveal>
        </Section>
      ))}

      <Section pad="tight">
        <Reveal>
          <p className="eyebrow mb-6 text-amber">What We Offer for You</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {OFFERS.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-[20px] border border-line bg-white p-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-ink">
                  <Image src={item.icon} alt="" width={36} height={36} className="h-8 w-8 object-contain" />
                </div>
                <p className="ui text-ink">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section pad="tight">
        <Reveal>
          <div className="rounded-[24px] bg-soft p-6 md:p-8">
            <AccentDot />
            <h2 className="display-kicker">Your Trusted Solar Partner in Kerala and Tamil Nadu</h2>
            <p className="copy mt-3 max-w-[64ch] text-muted">
              At Sunlife Traders, we&apos;re excited to offer our solar solutions in Kerala and Tamil Nadu. We want to
              help you use the sun&apos;s energy easily and confidently.
            </p>
            <h3 className="ui mt-6 text-ink">Why Choose Sunlife Traders in Kerala and Tamil Nadu?</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TRUSTED_POINTS.map((item) => (
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

      <Section pad="tight">
        <SurveyCta />
      </Section>

      <Section pad="tight">
        <Reveal className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-amber">Certified installations</p>
            <h2 className="display-kicker mt-2 max-w-[40ch]">
              We&apos;re certified by trusted organizations, so you can be sure our installations are safe and of high
              quality.
            </h2>
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
    </>
  );
}
