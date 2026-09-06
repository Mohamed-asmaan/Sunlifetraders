import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { contact, home, site } from "./data";
import { pages as fallbackPages } from "./pages";
import type { CmsPage, ContactContent, HomeContent, Intro, SiteContent } from "./types";

const cms = cache(() => getPayload({ config }));
const CMS_TIMEOUT_MS = 6000;

async function payloadSafe() {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      cms(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("CMS timeout")), CMS_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function text(value: string | null | undefined, fallback: string) {
  return value || fallback;
}

function intro(value: unknown, fallback: Intro): Intro {
  const fields = (value ?? {}) as {
    badge?: string | null;
    title?: string | null;
    description?: string | null;
  };
  return {
    badge: text(fields.badge, fallback.badge),
    title: text(fields.title, fallback.title),
    description: text(fields.description, fallback.description),
  };
}

function many<T, R>(items: T[] | null | undefined, map: (item: T, i: number) => R, fallback: R[]): R[] {
  return items?.length ? items.map(map) : fallback;
}

function imageAt<T extends { image: string }>(fallback: T[], i: number) {
  return (fallback[i] ?? fallback[0]).image;
}

function cards(
  items:
    | {
        title: string;
        description?: string | null;
        image: string;
        alt?: string | null;
        cta?: string | null;
        href?: string | null;
      }[]
    | null
    | undefined,
  fallback: HomeContent["solutions"],
) {
  return many(
    items,
    (doc, i) => ({
      title: doc.title,
      description: doc.description || "",
      image: imageAt(fallback, i),
      alt: doc.alt || "",
      cta: doc.cta || fallback[i]?.cta,
      href: doc.href || fallback[i]?.href,
    }),
    fallback,
  );
}

export const getSite = cache(async (): Promise<SiteContent> => {
  try {
    const payload = await payloadSafe();
    const doc = await payload.findGlobal({ slug: "site" });
    if (!doc?.name) return site;

    return {
      company: {
        name: doc.name,
        shortName: text(doc.shortName, site.company.shortName),
        tagline: text(doc.tagline, site.company.tagline),
        email: text(doc.email, site.company.email),
        consultEmail: text(doc.consultEmail, site.company.consultEmail),
        phone: text(doc.phone, site.company.phone),
        phoneHref: text(doc.phoneHref, site.company.phoneHref),
        whatsappHref: text(doc.whatsappHref, site.company.whatsappHref),
        address: text(doc.address, site.company.address),
        mapsQuery: text(doc.mapsQuery, site.company.mapsQuery),
        footerHeadline: text(doc.footerHeadline, site.company.footerHeadline),
        footerDescription: text(doc.footerDescription, site.company.footerDescription),
        footerCta: text(doc.footerCta, site.company.footerCta),
        certifications: many(doc.certifications, (item) => item.label, site.company.certifications),
        offices: many(
          doc.offices,
          (item) => ({ city: item.city, address: item.address }),
          site.company.offices,
        ),
      },
      navLinks: many(doc.navLinks, (link) => ({ href: link.href, label: link.label }), site.navLinks),
      footerLinks: many(
        doc.footerLinks,
        (link) => ({ href: link.href, label: link.label }),
        site.footerLinks,
      ),
      socials: many(
        doc.socials,
        (item) => ({ href: item.href, label: item.label }),
        site.socials,
      ),
      headerCta: {
        label: text(doc.headerCta?.label, site.headerCta.label),
        href: text(doc.headerCta?.href, site.headerCta.href),
      },
    };
  } catch {
    return site;
  }
});

export const getHomePage = cache(async (): Promise<HomeContent> => {
  try {
    const payload = await payloadSafe();
    const [page, projectDocs, testimonialDocs, faqDocs, productDocs] = await Promise.all([
      payload.findGlobal({ slug: "home" }),
      payload.find({ collection: "projects", limit: 50, sort: "order" }),
      payload.find({ collection: "testimonials", limit: 50, sort: "order" }),
      payload.find({ collection: "faqs", limit: 50, sort: "order" }),
      payload.find({ collection: "products", limit: 100, sort: "order" }),
    ]);

    const slides = page.heroSlides?.length
      ? page.heroSlides.map((slide, i) => {
          const fallback = home.hero.slides[i] ?? home.hero.slides[0];
          return {
            badge: fallback.badge,
            badgeSuffix: fallback.badgeSuffix,
            title: fallback.title,
            description: fallback.description,
            cta: fallback.cta,
            ctaHref: text(slide.ctaHref, fallback.ctaHref),
            secondaryCta: text(slide.secondaryCta, fallback.secondaryCta),
            secondaryHref: text(slide.secondaryHref, fallback.secondaryHref),
            skyImage: fallback.skyImage,
            houseImage: fallback.houseImage,
            houseAlt: fallback.houseAlt,
          };
        })
      : home.hero.slides;

    return {
      hero: {
        slides,
        trust: many(page.trust, (item) => item.label, home.hero.trust),
      },
      brandsIntro: intro(page.brandsIntro, home.brandsIntro),
      brands: many(
        page.brands,
        (item) => {
          const match = home.brands.find((brand) => brand.name === item.name) ?? home.brands[0];
          return { name: item.name, image: match.image };
        },
        home.brands,
      ),
      about: {
        badge: text(page.about?.badge, home.about.badge),
        title: text(page.about?.title, home.about.title),
        description: text(page.about?.description, home.about.description),
        cta: text(page.about?.cta, home.about.cta),
        ctaHref: text(page.about?.ctaHref, home.about.ctaHref),
        image: home.about.image,
        imageAlt: text(page.about?.imageAlt, home.about.imageAlt),
        cardDate: text(page.about?.cardDate, home.about.cardDate),
        cardTitle: text(page.about?.cardTitle, home.about.cardTitle),
        cardDescription: text(page.about?.cardDescription, home.about.cardDescription),
      },
      stats: many(
        page.stats,
        (stat) => ({
          value: stat.value,
          suffix: stat.suffix || "",
          title: stat.title,
          description: stat.description || "",
        }),
        home.stats,
      ),
      solutionsIntro: intro(page.solutionsIntro, home.solutionsIntro),
      solutions: cards(page.solutions, home.solutions),
      servicesIntro: intro(page.servicesIntro, home.servicesIntro),
      services: cards(page.services, home.services),
      benefitsIntro: intro(page.benefitsIntro, home.benefitsIntro),
      benefits: many(
        page.benefits,
        (item) => ({ title: item.title, description: item.description || "" }),
        home.benefits,
      ),
      benefitsImage: home.benefitsImage,
      benefitsImageAlt: text(page.benefitsImageAlt, home.benefitsImageAlt),
      productsIntro: intro(page.productsIntro, home.productsIntro),
      products: many(
        productDocs.docs,
        (doc, i) => ({
          title: doc.title,
          description: doc.description,
          spec: doc.spec || undefined,
          category: (doc.category || home.products[i]?.category || "pv") as HomeContent["products"][number]["category"],
          image: doc.image || imageAt(home.products, i),
          alt: doc.alt || "",
          cta: doc.cta || "Get a quote",
        }),
        home.products,
      ),
      projectsIntro: intro(page.projectsIntro, home.projectsIntro),
      projects: many(
        projectDocs.docs,
        (doc, i) => ({
          title: doc.title,
          description: doc.description,
          image: imageAt(home.projects, i),
          alt: doc.alt || "",
          meta: doc.meta || undefined,
        }),
        home.projects,
      ),
      howItWorks: intro(page.howItWorks, home.howItWorks),
      steps: many(
        page.steps,
        (step) => ({
          number: step.number,
          title: step.title,
          points: String(step.points || "")
            .split("\n")
            .map((point) => point.trim())
            .filter(Boolean),
        }),
        home.steps,
      ),
      quiz: {
        ...intro(page.quiz, home.quiz),
        questions: many(
          page.quiz?.questions,
          (item) => ({
            question: item.question,
            options: String(item.options || "")
              .split("\n")
              .map((option) => option.trim())
              .filter(Boolean),
            placeholder: item.placeholder || undefined,
          }),
          home.quiz.questions,
        ),
      },
      testimonialsIntro: intro(page.testimonialsIntro, home.testimonialsIntro),
      testimonials: many(
        testimonialDocs.docs,
        (doc, i) => ({ name: doc.name, quote: doc.quote, image: imageAt(home.testimonials, i) }),
        home.testimonials,
      ),
      faqIntro: {
        ...intro(page.faqIntro, home.faqIntro),
        helpTitle: text(page.faqIntro?.helpTitle, home.faqIntro.helpTitle),
        helpDescription: text(page.faqIntro?.helpDescription, home.faqIntro.helpDescription),
      },
      faqs: many(
        faqDocs.docs,
        (doc) => ({ question: doc.question, answer: doc.answer }),
        home.faqs,
      ),
      locationsIntro: intro(page.locationsIntro, home.locationsIntro),
      lead: {
        ...intro(page.lead, home.lead),
        cta: text(page.lead?.cta, home.lead.cta),
      },
    };
  } catch {
    return home;
  }
});

export const getContactPage = cache(async (): Promise<ContactContent> => {
  try {
    const payload = await payloadSafe();
    const [page, siteContent] = await Promise.all([
      payload.findGlobal({ slug: "contact" }),
      getSite(),
    ]);

    return {
      badge: text(page.badge, contact.badge),
      title: text(page.title, contact.title),
      description: text(page.description, contact.description),
      mapsQuery: siteContent.company.mapsQuery,
      franchiseBadge: text(page.franchiseBadge, contact.franchiseBadge),
      franchiseTitle: text(page.franchiseTitle, contact.franchiseTitle),
      franchiseDescription: text(page.franchiseDescription, contact.franchiseDescription),
      cards: many(
        page.cards,
        (card) => ({
          title: card.title,
          description: card.description || "",
          href: card.href || "",
          label: card.label || "",
        }),
        contact.cards,
      ),
      propertyTypes: many(page.propertyTypes, (item) => item.label, contact.propertyTypes),
    };
  } catch {
    return contact;
  }
});

export const getPage = cache(async (slug: string): Promise<CmsPage | null> => {
  const fallback = fallbackPages.find((page) => page.slug === slug) ?? null;
  try {
    const payload = await payloadSafe();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const doc = result.docs[0];
    if (!doc) return fallback;

    return {
      slug: doc.slug,
      badge: text(doc.badge, fallback?.badge ?? ""),
      title: doc.title,
      description: text(doc.description, fallback?.description ?? ""),
      sections: many(
        doc.sections,
        (item) => ({
          title: item.title,
          description: item.description || undefined,
          href: item.href || undefined,
          cta: item.cta || undefined,
        }),
        fallback?.sections ?? [],
      ),
    };
  } catch {
    return fallback;
  }
});
