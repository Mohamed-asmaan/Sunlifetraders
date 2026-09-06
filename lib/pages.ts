import type { CmsPage } from "./types";

export const pages: CmsPage[] = [
  {
    slug: "about",
    badge: "About us",
    title: "About Sunlife Traders",
    description:
      "We design and install rooftop solar — on-grid, off-grid and hybrid — from Pothencode, Thiruvananthapuram, now also serving Tamil Nadu.",
    sections: [
      {
        title: "Who we are",
        description:
          "Sunlife Traders LLP at Pothencode are dealers and installers of solar energy systems. We design and install high-quality rooftop solar to produce one of the greenest energy forms available. We deal in solar panels, geysers, inverters, batteries and more — with service that stays after the install.",
      },
      {
        title: "Our history",
        description:
          "Sunlife Energies was founded in 2018 in Nedumangad, Kerala. In 2022 we became Sunlife Traders LLP and moved to Pothencode, Thiruvananthapuram, to serve a growing base and expand the catalogue.",
      },
      {
        title: "Mission",
        description:
          "Harness the sun for sustainable, cost-effective energy. Promote green power and cut carbon through innovative, high-quality solar products.",
      },
      {
        title: "EVVO certified · 2023–2025",
        description:
          "Certified installer by EVVO. The badge is a guarantee of safety, reliability and efficiency on every rooftop we touch.",
      },
      {
        title: "MNRE registered vendor",
        description:
          "Government-approved solar solutions. Subsidy-ready paperwork, quality you can claim, and a smaller bill on the other side.",
      },
      {
        title: "Where we work",
        description:
          "Kerala and Tamil Nadu. Local crews, local trucks, local warranty response.",
      },
    ],
  },
  {
    slug: "services",
    badge: "Services",
    title: "Explore Sunlife services",
    description:
      "A fixed in-house crew for install, maintain and AMC — plus MNRE subsidy and EMI so the numbers work before the first panel goes up.",
    sections: [
      {
        title: "Government subsidy & financing",
        description:
          "PM Surya Ghar subsidy up to ₹78,000 on MNRE-approved systems. EMI from ₹1,200 per lakh. We handle eligibility and paperwork.",
        href: "/contact",
        cta: "Check eligibility",
      },
      {
        title: "Rooftop solar installation",
        description:
          "On-grid, off-grid and hybrid rooftop systems that cut the EB bill and reduce reliance on the grid.",
        href: "/services/roof-top-solar-plant-installation",
        cta: "Know more",
      },
      {
        title: "Ground mount installation",
        description:
          "Ground-mounted arrays engineered for farms, factories and land-rich sites.",
        href: "/services/ground-mount-solar-installation",
        cta: "Know more",
      },
      {
        title: "Solar plant maintenance",
        description:
          "Panel cleaning, thermal inspection and component servicing so every kilowatt keeps earning.",
        href: "/services/solar-plant-maintenance",
        cta: "Know more",
      },
      {
        title: "Solar power plant AMC",
        description:
          "Annual maintenance contracts with scheduled inspections, preventive repairs and priority response.",
        href: "/services/solar-power-plant-amc",
        cta: "Know more",
      },
    ],
  },
  {
    slug: "roof-top-solar-plant-installation",
    badge: "Services",
    title: "Rooftop solar plant installation",
    description:
      "Reliable rooftop solar for homes and businesses. On-grid, off-grid or hybrid — sized for your bill, built by our own crew.",
    sections: [
      {
        title: "On-grid",
        description:
          "Tied to the public grid. Generate by day, cut the bill, and earn credits by exporting surplus through net-metering.",
      },
      {
        title: "Off-grid",
        description:
          "Independent of the discom. Battery-backed power for sites where the grid is weak or absent.",
      },
      {
        title: "Hybrid",
        description:
          "Solar, storage and the grid together — savings when the sun is up, backup when it is not.",
      },
    ],
  },
  {
    slug: "ground-mount-solar-installation",
    badge: "Services",
    title: "Ground mount solar installation",
    description:
      "Ground-mounted arrays placed for maximum irradiance. Built for farms, factories and open land from 10 kW to 1 MW.",
    sections: [
      {
        title: "Why ground mount",
        description:
          "When the roof is small, shaded or structurally tight, the ground is the better plane. We survey, pile and string for your plot.",
      },
      {
        title: "What we handle",
        description:
          "Soil and wind load, row spacing, cable runs, inverter siting, and the same 25-year monitoring as a rooftop job.",
      },
    ],
  },
  {
    slug: "solar-plant-maintenance",
    badge: "Services",
    title: "Solar plant maintenance",
    description:
      "Cleaning, inspection and servicing so output does not silently drop after year one.",
    sections: [
      {
        title: "What we do",
        description:
          "Panel cleaning, thermal inspection, torque checks, and component servicing. We spot underperformance before you see it on the bill.",
      },
      {
        title: "Who it is for",
        description:
          "Any Sunlife or third-party rooftop or ground plant in Kerala or Tamil Nadu that needs a local crew, not a call-centre.",
      },
    ],
  },
  {
    slug: "solar-power-plant-amc",
    badge: "Services",
    title: "Solar power plant AMC",
    description:
      "Annual maintenance contracts — 1, 3 or 5 year terms — with scheduled inspections, preventive repairs and priority response.",
    sections: [
      {
        title: "What is covered",
        description:
          "Planned visits, cleaning, electrical checks, inverter health, and a named engineer on WhatsApp. No subcontractors.",
      },
      {
        title: "Response",
        description:
          "Local trucks from Pothencode, Kollam and Kanyakumari. Typical on-site window: 48 hours inside our operating arc.",
      },
    ],
  },
];
