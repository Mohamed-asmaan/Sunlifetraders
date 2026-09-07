import type { ContactContent, HomeContent, SiteContent } from "./types";

const sky = "/images/hero/sky.png";

const brand = {
  waaree: { name: "Waaree", image: "/images/logos/waaree.png" },
  adani: { name: "Adani Solar", image: "/images/logos/adani.png" },
  vikram: { name: "Vikram Solar", image: "/images/logos/vikram.png" },
  rayzon: { name: "Rayzon Solar", image: "/images/logos/rayzon.png" },
  growatt: { name: "Growatt", image: "/images/logos/growatt.png" },
  evvo: { name: "EVVO Solar", image: "/images/logos/evvo.png" },
};

export const seo = {
  title: "Sunlife Traders LLP | Solar That Cuts Your EB Bill by 70-90%",
  description:
    "Engineering-led rooftop solar in Kerala & Tamil Nadu. Subsidy up to ₹78,000, EMI from ₹1,200/lakh. KSEB/TANGEDCO handled.",
};

export const site: SiteContent = {
  company: {
    name: "Sunlife Traders LLP",
    shortName: "Sunlife",
    tagline:
      "Sustainable, cost-effective solar energy for South Indian homes and businesses. Reducing bills, reducing carbon, one rooftop at a time.",
    email: "sunlifetradersllp@gmail.com",
    consultEmail: "sales.sunlifetradersllp@gmail.com",
    phone: "+91 70102 83437",
    phoneHref: "tel:+917010283437",
    whatsappHref:
      "https://wa.me/917010283437?text=Hi%20Sunlife%2C%20I%27m%20interested%20in%20a%20solar%20assessment.",
    address: "Palamoodu, Pothencode, Thiruvananthapuram, 695584",
    mapsQuery: "Palamoodu, Pothencode, Thiruvananthapuram, 695584",
    certifications: ["MNRE Empaneled", "KSEB Approved", "TANGEDCO Approved", "Waaree Partner"],
    offices: [
      {
        city: "Thiruvananthapuram, Kerala",
        address: "Palamoodu, Pothencode, Thiruvananthapuram, 695584",
      },
      {
        city: "Kanyakumari (Karankodu), Tamil Nadu",
        address: "Nullivilai, Karankodu, Kanyakumari, 629809",
      },
      {
        city: "Kanyakumari (Thiruvithancode), Tamil Nadu",
        address: "6/146 New Street, Thiruvithancode, Kanyakumari, 629174",
      },
      {
        city: "Kollam, Kerala",
        address: "Venga, Sasthamcotta, Kollam, 690521",
      },
    ],
    footerHeadline: "Sustainable solar energy for South Indian homes",
    footerDescription:
      "Powering homes and businesses with clean rooftop solar. Cut your EB bill, lock in 25-year output, and skip the discom paperwork.",
    footerCta: "Get a free proposal",
  },
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/franchise", label: "Franchise" },
    { href: "/calculator", label: "Calculator" },
    { href: "/contact", label: "Contact" },
  ],
  footerLinks: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/franchise", label: "Franchise" },
    { href: "/calculator", label: "Calculator" },
  ],
  headerCta: { href: "/contact", label: "Get Consultation" },
  socials: [
    { href: "https://wa.me/917010283437", label: "WhatsApp" },
    { href: "mailto:sunlifetradersllp@gmail.com", label: "Email" },
    { href: "https://sunlifetraders.com", label: "Website" },
  ],
};

export const home: HomeContent = {
  hero: {
    trust: ["MNRE Empaneled", "KSEB Approved", "TANGEDCO Approved", "Waaree Partner"],
    slides: [
      {
        badge: "For Kerala Homes",
        badgeSuffix: "Cut EB bills 70–90%",
        title: "Own the power on your roof.",
        description: "Cut your monthly EB bill by 70–90%.",
        cta: "Run Savings Calculation",
        ctaHref: "/#quiz",
        secondaryCta: "WhatsApp Survey",
        secondaryHref: site.company.whatsappHref,
        skyImage: sky,
        houseImage: "/images/hero/home.svg",
        houseAlt: "Kerala home with rooftop solar panels",
      },
      {
        badge: "For EV Owners",
        badgeSuffix: "Home + car, one roof",
        title: "Solar and EV. Zero fuel.",
        description: "Power your home and car from one rooftop.",
        cta: "Run Savings Calculation",
        ctaHref: "/#quiz",
        secondaryCta: "WhatsApp Survey",
        secondaryHref: site.company.whatsappHref,
        skyImage: sky,
        houseImage: "/images/hero/ev.svg",
        houseAlt: "Home with rooftop solar and an electric vehicle",
      },
      {
        badge: "For Factories",
        badgeSuffix: "Up to 60% tariff cut",
        title: "Turn your roof into an asset.",
        description: "Slash commercial tariffs by up to 60%.",
        cta: "Run Savings Calculation",
        ctaHref: "/#quiz",
        secondaryCta: "WhatsApp Survey",
        secondaryHref: site.company.whatsappHref,
        skyImage: sky,
        houseImage: "/images/hero/commercial.svg",
        houseAlt: "Commercial rooftop solar installation",
      },
      {
        badge: "Engineering-Led",
        badgeSuffix: "25-year output lock",
        title: "Designed like infrastructure.",
        description: "LiDAR scans, torqued mounts, 25-year output.",
        cta: "Run Savings Calculation",
        ctaHref: "/#quiz",
        secondaryCta: "WhatsApp Survey",
        secondaryHref: site.company.whatsappHref,
        skyImage: sky,
        houseImage: "/images/hero/engineering.svg",
        houseAlt: "Engineered solar array with precision mounting",
      },
    ],
  },
  brandsIntro: {
    badge: "Partners",
    title: "Trusted manufacturer partners",
    description: "Tier-1 modules and inverters only. Real warranties, real support.",
  },
  brands: [brand.evvo, brand.waaree, brand.adani, brand.rayzon, brand.vikram, brand.growatt],
  about: {
    badge: "About",
    title: "Engineers first. Salespeople second.",
    description:
      "Our in-house team manages structural sign-off, technical approvals and subsidy paperwork, so you never open a KSEB portal or chase a discom form.",
    cta: "Talk to an engineer",
    ctaHref: "/contact",
    image: "/images/about/install.png",
    imageAlt: "Workers install solar panels on a modern house roof.",
    cardDate: "DOC-03 / REV 2026.07",
    cardTitle: "Technical Standards",
    cardDescription:
      "MNRE / IEC 61215 / IEC 61730 design basis. 150 km/hr wind survival. 25-year linear module warranty. KSEB · TANGEDCO · DISCOM · PM Surya handled end-to-end.",
  },
  stats: [
    {
      value: 500,
      suffix: "+",
      title: "Systems monitored",
      description: "Live generation on Solarman, with 99.6% monitoring uptime across South India.",
    },
    {
      value: 48,
      suffix: " hr",
      title: "Site survey turnaround",
      description: "LiDAR shading analysis and a senior engineer on-site within two days.",
    },
    {
      value: 25,
      suffix: " Years",
      title: "Performance warranty",
      description: "High-quality Tier-1 panels designed for long-term, bankable energy production.",
    },
  ],
  solutionsIntro: {
    badge: "Buyer Segments",
    title: "Four kinds of buyer. One engineering team.",
    description:
      "Every profile below routes to the same in-house engineering crew, with the same LiDAR-based design, same MNRE-grade paperwork, same 25-year monitoring.",
  },
  solutions: [
    {
      title: "My bill is ₹5,000+",
      description:
        "Watch your bill drop from ₹6,000 to ₹150 like our Pothencode customer. Full ROI calculator and before/after comparisons.",
      image: "/images/buyers/bill.jpg",
      alt: "Homeowner checking a high electricity bill",
      cta: "See the math",
    },
    {
      title: "I own or plan an EV",
      description:
        "An EV doubles your home's load. Solar isn't optional any more. Size the roof right, once.",
      image: "/images/buyers/ev.jpg",
      alt: "Home with rooftop solar and an electric car",
      cta: "Plan for EV load",
    },
    {
      title: "I'm building a new home",
      description:
        "LiDAR shading analysis, structural integration and cable routing designed into your plan, before the roof goes on.",
      image: "/images/buyers/newhome.jpg",
      alt: "Engineers reviewing plans on a new home site",
      cta: "Plan-ahead consult",
    },
    {
      title: "I run a business",
      description:
        "Peak-shaving, accelerated depreciation and tax incentives. Turn your factory roof into a 15-year asset.",
      image: "/images/buyers/commercial.jpg",
      alt: "Commercial solar array at sunset",
      cta: "Commercial ROI",
    },
  ],
  servicesIntro: {
    badge: "Services",
    title: "Four disciplines. One in-house crew.",
    description:
      "From your first site survey to the twenty-fifth year of generation: design, install, monitor and maintain, all handled by Sunlife's engineering team. No sub-contractors.",
  },
  services: [
    {
      title: "Rooftop Solar Installation",
      description:
        "On-grid rooftop systems that harness sunlight, slash your EB bill and cut reliance on the grid. Residential · Commercial · 1–100 kW.",
      image: "/images/solutions/install.png",
      alt: "Rooftop installation illustration",
      href: "/services/roof-top-solar-plant-installation",
      cta: "Know more",
    },
    {
      title: "Ground Mount Installation",
      description:
        "Ground-mounted arrays engineered for maximum irradiance. Ideal for farms, factories and land-rich properties. 10 kW–1 MW.",
      image: "/images/solutions/home.png",
      alt: "Ground mount illustration",
      href: "/services/ground-mount-solar-installation",
      cta: "Know more",
    },
    {
      title: "Solar Plant Maintenance",
      description:
        "Panel cleaning, thermal inspection and component servicing that keeps every kilowatt earning at peak efficiency.",
      image: "/images/solutions/sustain.png",
      alt: "Maintenance illustration",
      href: "/services/solar-plant-maintenance",
      cta: "Know more",
    },
    {
      title: "Solar Power Plant AMC",
      description:
        "Annual Maintenance Contracts with scheduled inspections, preventive repairs and priority response. 1 / 3 / 5 year terms.",
      image: "/images/solutions/monitoring.png",
      alt: "AMC illustration",
      href: "/services/solar-power-plant-amc",
      cta: "Know more",
    },
  ],
  benefitsIntro: {
    badge: "Engineering",
    title: "Designed like infrastructure, not a gadget.",
    description: "Six engineering standards we will not skip — on any roof, in any district.",
  },
  benefits: [
    {
      title: "LiDAR shading analysis",
      description:
        "3D roof scans model every shadow across the year, so panels sit where they earn most.",
    },
    {
      title: "25-year performance monitoring",
      description:
        "Live generation on the Solarman app, so we spot underperformance before you do.",
    },
    {
      title: "Certified structural safety",
      description:
        "Every mount engineered for Kerala/TN wind loads and cyclone codes. Signed off, not guessed.",
    },
    {
      title: "On-grid · Off-grid · Hybrid",
      description:
        "Right topology for your usage, with battery backup where power cuts are a real risk.",
    },
    {
      title: "Approvals, handled",
      description:
        "KSEB / TANGEDCO net-metering, MNRE subsidy, discom paperwork. We run it end-to-end.",
    },
    {
      title: "Tier-1 modules only",
      description: "Waaree, Vikram, and equivalent. Never grey-market panels. Real warranties, real support.",
    },
  ],
  benefitsImage: "/images/benefits/photo.png",
  benefitsImageAlt: "Woman with tablet on a solar panel rooftop — placeholder.",
  productsIntro: {
    badge: "Product Catalogue",
    title: "Only components we'd put on our own roof.",
    description:
      "Located in Pothencode, Thiruvananthapuram, now also serving Tamil Nadu. We stock a curated catalogue of on-grid and off-grid solar hardware, every unit warranty-backed and MNRE-approved.",
  },
  products: [
    {
      slug: "poly-crystalline-12v",
      title: "Poly Crystalline",
      spec: "12V / 50–150 watts",
      description: "BIS, ALMM, DCR certified panel, ideal for efficient energy generation.",
      category: "pv",
      image: "/images/products/poly-crystalline-12v.png",
      alt: "Poly crystalline solar panel",
      cta: "Get a quote",
    },
    {
      slug: "poly-crystalline-24v",
      title: "Poly Crystalline",
      spec: "24V / 160–335 watts",
      description: "High-performance 24V panel for reliable power, certified and durable.",
      category: "pv",
      image: "/images/products/poly-crystalline-24v.png",
      alt: "24V poly crystalline solar panel",
      cta: "Get a quote",
    },
    {
      slug: "monoperc-panel",
      title: "Monoperc Panel",
      spec: "24V / 250–400 watts",
      description: "Advanced Monoperc design for superior energy output and efficiency.",
      category: "pv",
      image: "/images/products/monoperc-panel.png",
      alt: "Monoperc solar panel",
      cta: "Get a quote",
    },
    {
      slug: "monoperc-half-cut",
      title: "Monoperc Half Cut (mono facial)",
      spec: "445–500 watts",
      description: "Half-cut cell technology for enhanced efficiency and energy yield.",
      category: "pv",
      image: "/images/products/monoperc-half-cut.png",
      alt: "Monoperc half-cut panel",
      cta: "Get a quote",
    },
    {
      slug: "monoperc-bifacial",
      title: "Monoperc Half-cut Bifacial",
      spec: "500–550 watts",
      description: "Bifacial solar panel maximizes power output from both sides.",
      category: "pv",
      image: "/images/products/monoperc-bifacial.png",
      alt: "Bifacial monoperc panel",
      cta: "Get a quote",
    },
    {
      slug: "monoperc-bifacial-topcon",
      title: "Monoperc Half-cut Bifacial Topcon",
      spec: "550–600 watts",
      description: "Topcon bifacial panel, designed for high efficiency in all conditions.",
      category: "pv",
      image: "/images/products/monoperc-bifacial-topcon.png",
      alt: "Topcon bifacial panel",
      cta: "Get a quote",
    },
    {
      slug: "power-one-5kw-inverter",
      title: "Ongrid Inverter Power-One 5 kW",
      spec: "Input voltage 12V",
      description: "Reliable 5 kW inverter with 12V input for efficient residential solar conversion.",
      category: "inverter",
      image: "/images/products/power-one-5kw-inverter.png",
      alt: "Power-One 5 kW inverter",
      cta: "Get a quote",
    },
    {
      slug: "sofar-3-3kw-inverter",
      title: "Inverter Ongrid Sofar 3.3 TL kW",
      spec: "Input voltage 24V",
      description: "Efficient 3.3 kW inverter with 24V input and advanced solar energy management.",
      category: "inverter",
      image: "/images/products/sofar-3-3kw-inverter.png",
      alt: "Sofar 3.3 kW inverter",
      cta: "Get a quote",
    },
    {
      slug: "sofar-5kw-inverter",
      title: "Inverter Ongrid Sofar 5 kW",
      spec: "Input voltage 24V",
      description: "High-performance 5 kW inverter with 24V input for seamless solar-to-grid power.",
      category: "inverter",
      image: "/images/products/sofar-5kw-inverter.png",
      alt: "Sofar 5 kW inverter",
      cta: "Get a quote",
    },
    {
      slug: "deye-hybrid-inverter",
      title: "DEYE Hybrid Inverter",
      spec: "Hybrid system compatibility",
      description: "Advanced hybrid inverter for optimal solar and grid energy management.",
      category: "inverter",
      image: "/images/products/deye-hybrid-inverter.png",
      alt: "DEYE hybrid inverter",
      cta: "Get a quote",
    },
    {
      slug: "evvo-inverter",
      title: "EVVO Inverter",
      spec: "2 kW to 250 kW · 10-year warranty",
      description: "Versatile EVVO inverter from 2 kW to 250 kW with a 10-year warranty.",
      category: "inverter",
      image: "/images/products/evvo-inverter.png",
      alt: "EVVO inverter",
      cta: "Get a quote",
    },
    {
      slug: "bis-10kw-inverter",
      title: "BIS Certified Inverter 10 kW",
      spec: "10 kW output capacity",
      description: "Reliable 10 kW BIS certified inverter for efficient large-scale solar management.",
      category: "inverter",
      image: "/images/products/bis-10kw-inverter.png",
      alt: "BIS 10 kW inverter",
      cta: "Get a quote",
    },
    {
      slug: "3kw-grid-tie-plant",
      title: "3 kW Grid-tie Power Plant",
      spec: "Mono PERC Half-Cut",
      description: "Mono PERC Half-Cut rooftop plant for enhanced efficiency and energy yield.",
      category: "rooftop",
      image: "/images/products/3kw-grid-tie-plant.png",
      alt: "3 kW rooftop solar plant",
      cta: "Get a quote",
    },
    {
      slug: "8kw-ongrid-plant",
      title: "8 kW On-grid Power Plant",
      spec: "Mono PERC Half-Cut",
      description: "8 kW on-grid solar power plant with Mono PERC Half-Cut modules.",
      category: "rooftop",
      image: "/images/products/8kw-ongrid-plant.png",
      alt: "8 kW rooftop solar plant",
      cta: "Get a quote",
    },
    {
      slug: "10kw-ongrid-poly",
      title: "10 kW On-grid Power Plant",
      spec: "Poly",
      description: "10 kW on-grid solar supply and installation with poly modules.",
      category: "rooftop",
      image: "/images/products/10kw-ongrid-poly.png",
      alt: "10 kW poly rooftop plant",
      cta: "Get a quote",
    },
    {
      slug: "6kw-grid-connected-plant",
      title: "6 kW Grid-connected Power Plant",
      spec: "Mono PERC Half-Cut",
      description: "6 kW grid-connected rooftop plant with Mono PERC Half-Cut technology.",
      category: "rooftop",
      image: "/images/products/6kw-grid-connected-plant.png",
      alt: "6 kW rooftop solar plant",
      cta: "Get a quote",
    },
    {
      slug: "10kw-ongrid-mono",
      title: "10 kW On-grid Power Plant",
      spec: "Mono PERC Half-Cut",
      description: "Mono PERC Half-Cut technology for superior efficiency and energy output.",
      category: "rooftop",
      image: "/images/products/10kw-ongrid-mono.png",
      alt: "10 kW mono rooftop plant",
      cta: "Get a quote",
    },
    {
      slug: "3kw-ongrid-poly",
      title: "3 kW On-grid Power Plant",
      spec: "Poly",
      description: "3 kW on-grid solar supply and installation with poly modules.",
      category: "rooftop",
      image: "/images/products/3kw-ongrid-poly.png",
      alt: "3 kW poly rooftop plant",
      cta: "Get a quote",
    },
    {
      slug: "5kw-ongrid-mono",
      title: "5 kW On-grid Power Plant",
      spec: "Mono PERC Half-Cut",
      description: "5 kW on-grid rooftop plant with high-efficiency Mono PERC Half-Cut modules.",
      category: "rooftop",
      image: "/images/products/5kw-ongrid-mono.png",
      alt: "5 kW mono rooftop plant",
      cta: "Get a quote",
    },
    {
      slug: "5kw-grid-connected-poly",
      title: "5 kW Grid-connected Roof System",
      spec: "Poly",
      description: "5 kW grid-connected rooftop system with poly modules.",
      category: "rooftop",
      image: "/images/products/5kw-grid-connected-poly.png",
      alt: "5 kW poly rooftop system",
      cta: "Get a quote",
    },
    {
      slug: "8kw-grid-connected-poly",
      title: "8 kW Grid-connected Roof System",
      spec: "Poly",
      description: "8 kW grid-connected rooftop system with poly modules.",
      category: "rooftop",
      image: "/images/products/8kw-grid-connected-poly.png",
      alt: "8 kW poly rooftop system",
      cta: "Get a quote",
    },
    {
      slug: "6kw-ongrid-poly",
      title: "6 kW On-grid Power Plant",
      spec: "Poly",
      description: "6 kW on-grid solar supply and installation with poly modules.",
      category: "rooftop",
      image: "/images/products/6kw-ongrid-poly.png",
      alt: "6 kW poly rooftop plant",
      cta: "Get a quote",
    },
    {
      slug: "basic-rooftop-structures",
      title: "Basic Roof Top Structures",
      spec: "Residential & commercial",
      description: "Standard rooftop mounting structures engineered for Kerala and Tamil Nadu wind loads.",
      category: "structure",
      image: "/images/products/basic-rooftop-structures.png",
      alt: "Rooftop solar structure",
      cta: "Get a quote",
    },
    {
      slug: "sheet-rooftop-structures",
      title: "Sheet Roof Top Structures",
      spec: "Metal sheet roofs",
      description: "Mounting systems designed for sheet roofs without compromising waterproofing.",
      category: "structure",
      image: "/images/products/sheet-rooftop-structures.png",
      alt: "Sheet rooftop structure",
      cta: "Get a quote",
    },
    {
      slug: "solar-walkways",
      title: "Walkways",
      spec: "Service access",
      description: "Safe walkways for inspection and maintenance across the array.",
      category: "structure",
      image: "/images/products/solar-walkways.jpeg",
      alt: "Solar walkway structure",
      cta: "Get a quote",
    },
    {
      slug: "aluminium-structures",
      title: "Aluminium Structures",
      spec: "Lightweight, corrosion-resistant",
      description: "Aluminium mounting for coastal and high-humidity sites.",
      category: "structure",
      image: "/images/products/aluminium-structures.png",
      alt: "Aluminium solar structure",
      cta: "Get a quote",
    },
    {
      slug: "clamps-nuts-bolts",
      title: "Clamps, Nut & Bolts",
      spec: "Hardware kit",
      description: "Certified clamps, nuts and bolts for a complete structural assembly.",
      category: "structure",
      image: "/images/products/clamps-nuts-bolts.png",
      alt: "Solar clamps and hardware",
      cta: "Get a quote",
    },
    {
      slug: "acdb",
      title: "ACDB",
      spec: "AC distribution",
      description: "AC distribution box for safe, compliant rooftop interconnection.",
      category: "bos",
      image: "/images/products/acdb.png",
      alt: "AC distribution box",
      cta: "Get a quote",
    },
    {
      slug: "dcdb",
      title: "DCDB",
      spec: "DC distribution",
      description: "DC distribution box with isolation and protection on the array side.",
      category: "bos",
      image: "/images/products/dcdb.png",
      alt: "DC distribution box",
      cta: "Get a quote",
    },
    {
      slug: "mc4-connectors",
      title: "MC4 Connectors",
      spec: "Array cabling",
      description: "Weather-sealed MC4 connectors for reliable string connections.",
      category: "bos",
      image: "/images/products/mc4-connectors.png",
      alt: "MC4 connectors",
      cta: "Get a quote",
    },
    {
      slug: "solar-cables",
      title: "Cables",
      spec: "DC / AC solar cable",
      description: "UV-rated solar cables sized for your string and inverter load.",
      category: "bos",
      image: "/images/products/solar-cables.png",
      alt: "Solar cables",
      cta: "Get a quote",
    },
    {
      slug: "earthing-materials",
      title: "Earthing Materials",
      spec: "Safety kit",
      description: "Earthing pits, strips and clamps for a code-compliant ground path.",
      category: "bos",
      image: "/images/products/earthing-materials.png",
      alt: "Earthing materials",
      cta: "Get a quote",
    },
    {
      slug: "lightning-arrestor",
      title: "Lightning Arrestor",
      spec: "Surge protection",
      description: "Lightning arrestors to protect the array and inverter from surge events.",
      category: "bos",
      image: "/images/products/lightning-arrestor.png",
      alt: "Lightning arrestor",
      cta: "Get a quote",
    },
    {
      slug: "net-metering-meter",
      title: "Meters",
      spec: "Net-metering approved",
      description: "Bidirectional smart meters approved for KSEB and TANGEDCO net-metering.",
      category: "bos",
      image: "/images/products/net-metering-meter.png",
      alt: "Net metering meter",
      cta: "Get a quote",
    },
    {
      slug: "solar-water-heater",
      title: "Solar Water Heater",
      spec: "Residential & commercial",
      description: "Solar water heating for homes and businesses — cut the geyser load on the same roof.",
      category: "heater",
      image: "/images/products/solar-water-heater.png",
      alt: "Solar water heater",
      cta: "Get a quote",
    },
  ],
  projectsIntro: {
    badge: "Field Data",
    title: "Real roofs. Real bills. Real drops.",
    description:
      "Every number below is from an EB bill on a Sunlife-installed system. Names shown with permission. 4.8/5 from 200+ Google reviews.",
  },
  projects: [
    {
      title: "Pothencode, Thiruvananthapuram · 5 kW · ₹6,000 → ₹150",
      description:
        "“The team handled every approval. My first bill after installation was under ₹200. Two years on, still the same.” — Govind · Homeowner",
      image: "/images/projects/residential.jpg",
      alt: "Residential rooftop solar",
    },
    {
      title: "Nagercoil, Kanyakumari · 8 kW · ₹11,200 → ₹380",
      description:
        "“Professional survey, clean install, and the Solarman app lets me watch every unit generated. Worth every rupee.” — Avinesh Vasudevan · Homeowner",
      image: "/images/projects/commercial.jpg",
      alt: "Commercial solar installation",
    },
    {
      title: "Sasthamcotta, Kollam · 6 kW · ₹7,800 → ₹210",
      description:
        "“They spoke plainly about subsidy, EMI and payback. No pressure. Delivered exactly what they promised.” — Simith T V · Homeowner",
      image: "/images/projects/home.jpg",
      alt: "Home solar panel setup",
    },
    {
      title: "Thiruvithancode, Kanyakumari · 10 kW · ₹14,500 → ₹420",
      description:
        "“Sized for our EV before we bought it. Solar plus car: total electricity spend is under ₹500 a month now.” — R. Kumar · Homeowner",
      image: "/images/projects/inspection.jpg",
      alt: "Solar system inspection",
    },
  ],
  howItWorks: {
    badge: "How It Works",
    title: "From deposit to first generated unit.",
    description:
      "Every project moves through a fixed, auditable pipeline. You see the current stage timestamped on WhatsApp. Typical install window: 3–5 days.",
  },
  steps: [
    {
      number: "01",
      title: "Booked",
      points: ["Deposit paid", "Project opened on WhatsApp", "Survey slot locked"],
    },
    {
      number: "02",
      title: "Site Survey",
      points: ["LiDAR scan + shading", "Structural check", "Load profile captured"],
    },
    {
      number: "03",
      title: "Design Approved",
      points: ["Signed structural plan", "Fixed quote with subsidy & EMI", "MNRE paperwork started"],
    },
    {
      number: "04",
      title: "Installed",
      points: ["In-house crew only", "3–5 day rooftop build", "Quality inspection included"],
    },
    {
      number: "05",
      title: "Grid Connected",
      points: ["KSEB / TANGEDCO meter", "Net-metering live", "Monitoring app handed over"],
    },
    {
      number: "06",
      title: "Active",
      points: ["Generating + monitored", "25-year performance watch", "Local crew on 48-hr response"],
    },
  ],
  quiz: {
    badge: "30-Second Savings Quiz",
    title: "See what solar would save your home.",
    description:
      "Answer 4 quick questions. We share an engineering-backed estimate on WhatsApp, with no phone calls until you ask for one.",
    questions: [
      {
        question: "What's your average monthly EB bill?",
        options: ["₹2,000 - ₹5,000", "₹5,000 - ₹10,000", "₹10,000 - ₹20,000", "₹20,000+"],
      },
      {
        question: "Do you own or plan to own an EV?",
        options: ["Yes, I own one", "Planning within 2 years", "Not yet"],
      },
      {
        question: "Which pincode is the roof in?",
        options: [],
        placeholder: "e.g. 695584",
      },
      {
        question: "Where should we send your report?",
        options: [],
        placeholder: "WhatsApp number",
      },
    ],
  },
  testimonialsIntro: {
    badge: "Testimonials",
    title: "Trusted solar for Kerala & Tamil Nadu homes",
    description: "Named reviews from Sunlife-installed rooftops. 4.8/5 from 200+ Google reviews.",
  },
  testimonials: [
    {
      name: "Govind · Homeowner",
      quote:
        "The team handled every approval. My first bill after installation was under ₹200. Two years on, still the same.",
      image: "/images/reviews/daniel.png",
    },
    {
      name: "Avinesh Vasudevan · Homeowner",
      quote:
        "Professional survey, clean install, and the Solarman app lets me watch every unit generated. Worth every rupee.",
      image: "/images/reviews/michael.png",
    },
    {
      name: "Simith T V · Homeowner",
      quote:
        "They spoke plainly about subsidy, EMI and payback. No pressure. Delivered exactly what they promised.",
      image: "/images/reviews/emily.png",
    },
    {
      name: "R. Kumar · Homeowner",
      quote:
        "Sized for our EV before we bought it. Solar plus car: total electricity spend is under ₹500 a month now.",
      image: "/images/reviews/ethan.png",
    },
  ],
  faqIntro: {
    badge: "FAQ",
    title: "Questions? Answered.",
    description: "Still unsure? WhatsApp a senior engineer. No scripted call center.",
    helpTitle: "Need a senior engineer?",
    helpDescription:
      "Take the 30-second savings quiz or WhatsApp us. A site visit, LiDAR survey, and a fixed quote with subsidy and EMI typically follow within days.",
  },
  faqs: [
    {
      question: "Why choose Sunlife over a local installer?",
      answer:
        "We're MNRE-empaneled and KSEB/TANGEDCO-approved with 500+ installations across South India. Every job includes LiDAR-based design, structural sign-off and 25-year performance monitoring, not just panels-on-a-roof.",
    },
    {
      question: "How much can I really save?",
      answer:
        "Most residential customers see a 70-90% bill reduction. A ₹6,000 monthly bill typically becomes ₹150-₹400 depending on load profile. Our quiz gives you a specific number for your address.",
    },
    {
      question: "What system types do you install?",
      answer:
        "On-grid (net-metering, most common), off-grid (with battery, for weak-grid areas), and hybrid (grid + battery). We recommend the right topology after a site visit, with no upsell.",
    },
    {
      question: "How do I get started?",
      answer:
        "Take the 30-second savings quiz or WhatsApp us. A senior engineer visits, does the LiDAR survey, presents a fixed quote with subsidy and EMI worked in. Install typically completes in 3-5 days.",
    },
    {
      question: "What happens if something breaks?",
      answer:
        "Modules carry a 25-year performance warranty; inverters 5-10 years. Our Solarman monitoring flags issues remotely and local crews respond within 48 hours across our operating districts.",
    },
  ],
  locationsIntro: {
    badge: "Service Hubs",
    title: "Four service hubs across Kerala & Tamil Nadu",
    description:
      "Local crews, local trucks, local warranty response. If your roof is within our operating arc, an engineer can be on-site within 48 hours.",
  },
  lead: {
    badge: "Free solar proposal",
    title: "Cut your EB bill with a fixed quote",
    description:
      "Share your name and WhatsApp number. A senior engineer will send a tailored proposal within 2 working hours.",
    cta: "Send my details",
  },
};

export const contact: ContactContent = {
  badge: "Contact us",
  title: "Cut your EB bill with a fixed quote",
  description:
    "Share your name and WhatsApp number. A senior engineer will send a tailored proposal within 2 working hours.",
  mapsQuery: site.company.mapsQuery,
  propertyTypes: ["Residential rooftop", "New home / under construction", "Commercial / factory", "Franchise enquiry"],
  cards: [
    {
      title: "WhatsApp an engineer",
      description: "A senior engineer replies with system size, subsidy and EMI — no call centre script.",
      href: site.company.whatsappHref,
      label: "+91 70102 83437",
    },
    {
      title: "Project & sales",
      description: "Send details about your roof or factory and receive a custom quote.",
      href: "mailto:sales.sunlifetradersllp@gmail.com",
      label: "sales.sunlifetradersllp@gmail.com",
    },
    {
      title: "One-tap call",
      description: "Speak with the Pothencode desk for surveys, AMC and franchise.",
      href: "tel:+917010283437",
      label: "+91 70102 83437",
    },
  ],
  franchiseBadge: "Sunlife Network",
  franchiseTitle: "Become a Sunlife franchise partner",
  franchiseDescription:
    "Get protected territory, engineering support, and MNRE paperwork handled. Register your interest and our partner team will call you back.",
};
