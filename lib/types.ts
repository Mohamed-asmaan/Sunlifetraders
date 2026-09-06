export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  label: string;
};

export type Office = {
  city: string;
  address: string;
};

export type Company = {
  name: string;
  shortName: string;
  tagline: string;
  email: string;
  consultEmail: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  address: string;
  mapsQuery: string;
  certifications: string[];
  offices: Office[];
  footerHeadline: string;
  footerDescription: string;
  footerCta: string;
};

export type SiteContent = {
  company: Company;
  navLinks: NavLink[];
  footerLinks: NavLink[];
  socials: SocialLink[];
  headerCta: NavLink;
};

export type CmsPageSection = {
  title: string;
  description?: string;
  href?: string;
  cta?: string;
};

export type CmsPage = {
  slug: string;
  badge: string;
  title: string;
  description: string;
  sections: CmsPageSection[];
};

export type BrandLogo = {
  name: string;
  image: string;
};

export type HeroSlide = {
  badge: string;
  badgeSuffix: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  secondaryCta: string;
  secondaryHref: string;
  skyImage: string;
  houseImage: string;
  houseAlt: string;
};

export type HeroContent = {
  slides: HeroSlide[];
  trust: string[];
};

export type AboutContent = {
  badge: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  cardDate: string;
  cardTitle: string;
  cardDescription: string;
};

export type Stat = {
  value: number;
  suffix: string;
  title: string;
  description: string;
};

export type Intro = {
  badge: string;
  title: string;
  description: string;
};

export type Solution = {
  title: string;
  description: string;
  image: string;
  alt: string;
  cta?: string;
  href?: string;
};

export type Benefit = {
  title: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  alt: string;
  meta?: string;
};

export type ProductCategory = "pv" | "inverter" | "rooftop" | "structure" | "bos" | "heater";

export type Product = {
  title: string;
  description: string;
  spec?: string;
  category: ProductCategory;
  image: string;
  alt: string;
  cta?: string;
};

export type Step = {
  number: string;
  title: string;
  points: string[];
};

export type Testimonial = {
  name: string;
  quote: string;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type FaqIntro = Intro & {
  helpTitle: string;
  helpDescription: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  placeholder?: string;
};

export type QuizContent = {
  badge: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export type ContactCard = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export type HomeContent = {
  hero: HeroContent;
  brands: BrandLogo[];
  brandsIntro: Intro;
  about: AboutContent;
  stats: Stat[];
  solutionsIntro: Intro;
  solutions: Solution[];
  servicesIntro: Intro;
  services: Solution[];
  benefitsIntro: Intro;
  benefits: Benefit[];
  benefitsImage: string;
  benefitsImageAlt: string;
  productsIntro: Intro;
  products: Product[];
  projectsIntro: Intro;
  projects: Project[];
  howItWorks: Intro;
  steps: Step[];
  quiz: QuizContent;
  testimonialsIntro: Intro;
  testimonials: Testimonial[];
  faqIntro: FaqIntro;
  faqs: Faq[];
  locationsIntro: Intro;
  lead: Intro & { cta: string };
};

export type ContactContent = {
  badge: string;
  title: string;
  description: string;
  mapsQuery: string;
  cards: ContactCard[];
  propertyTypes: string[];
  franchiseBadge: string;
  franchiseTitle: string;
  franchiseDescription: string;
};
