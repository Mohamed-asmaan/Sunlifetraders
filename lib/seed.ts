import type { Payload } from "payload";
import { contact, home, site } from "./data";
import { pages } from "./pages";

let seeded = false;

async function resetCollection(
  payload: Payload,
  slug: "solutions" | "projects" | "testimonials" | "faqs" | "products" | "pages",
) {
  const existing = await payload.find({ collection: slug, limit: 500 });
  for (const doc of existing.docs) {
    await payload.delete({ collection: slug, id: doc.id });
  }
}

export async function seed(payload: Payload) {
  if (seeded) return;
  seeded = true;

  const siteDoc = await payload.findGlobal({ slug: "site" });
  if (siteDoc?.name === "Sunlife Traders LLP") {
    const products = await payload.find({ collection: "products", limit: 1 }).catch(() => ({ totalDocs: 0 }));
    const existingPages = await payload.find({ collection: "pages", limit: 1 }).catch(() => ({ totalDocs: 0 }));
    const users = await payload.find({ collection: "users", limit: 1 });
    if (users.totalDocs === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@sunlifetraders.com",
          password: "SunlifeAdmin2026!",
          name: "Sunlife Admin",
        },
      });
      payload.logger.info("Created Payload admin admin@sunlifetraders.com");
    }

    const officeCities = (siteDoc.offices ?? []).map((office) => office.city);
    if (officeCities.length < site.company.offices.length || !officeCities.includes("Chennai, Tamil Nadu")) {
      await payload.updateGlobal({
        slug: "site",
        data: { offices: site.company.offices },
      });
    }
    const navHrefs = (siteDoc.navLinks ?? []).map((link) => link.href);
    if (
      !navHrefs.includes("/products") ||
      !navHrefs.includes("/services") ||
      !navHrefs.includes("/franchise") ||
      !navHrefs.includes("/calculator")
    ) {
      await payload.updateGlobal({
        slug: "site",
        data: {
          navLinks: site.navLinks,
          footerLinks: site.footerLinks,
          headerCta: site.headerCta,
        },
      });
    }
    if (products.totalDocs < 15) {
      await resetCollection(payload, "products");
      for (const [order, item] of home.products.entries()) {
        await payload.create({ collection: "products", data: { ...item, order } });
      }
    }
    if (existingPages.totalDocs < pages.length) {
      await resetCollection(payload, "pages");
      for (const page of pages) {
        await payload.create({ collection: "pages", data: page });
      }
    }
    return;
  }

  await payload.updateGlobal({
    slug: "site",
    data: {
      name: site.company.name,
      shortName: site.company.shortName,
      tagline: site.company.tagline,
      email: site.company.email,
      consultEmail: site.company.consultEmail,
      phone: site.company.phone,
      phoneHref: site.company.phoneHref,
      whatsappHref: site.company.whatsappHref,
      address: site.company.address,
      mapsQuery: site.company.mapsQuery,
      footerHeadline: site.company.footerHeadline,
      footerDescription: site.company.footerDescription,
      footerCta: site.company.footerCta,
      certifications: site.company.certifications.map((label) => ({ label })),
      offices: site.company.offices,
      navLinks: site.navLinks,
      footerLinks: site.footerLinks,
      headerCta: site.headerCta,
      socials: site.socials,
    },
  });

  const { products, projects, testimonials, faqs, steps, quiz, hero, brands, ...globals } = home;

  await payload.updateGlobal({
    slug: "home",
    data: {
      heroSlides: hero.slides,
      trust: hero.trust.map((label) => ({ label })),
      brands: brands.map((item) => ({ name: item.name })),
      brandsIntro: globals.brandsIntro,
      about: globals.about,
      stats: globals.stats,
      solutionsIntro: globals.solutionsIntro,
      solutions: globals.solutions,
      servicesIntro: globals.servicesIntro,
      services: globals.services,
      benefitsIntro: globals.benefitsIntro,
      benefits: globals.benefits,
      benefitsImage: globals.benefitsImage,
      benefitsImageAlt: globals.benefitsImageAlt,
      productsIntro: globals.productsIntro,
      projectsIntro: globals.projectsIntro,
      howItWorks: globals.howItWorks,
      steps: steps.map((step) => ({ ...step, points: step.points.join("\n") })),
      quiz: {
        badge: quiz.badge,
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions.map((item) => ({
          question: item.question,
          options: item.options.join("\n"),
          placeholder: item.placeholder,
        })),
      },
      testimonialsIntro: globals.testimonialsIntro,
      faqIntro: globals.faqIntro,
      locationsIntro: globals.locationsIntro,
      lead: globals.lead,
    },
  });

  await payload.updateGlobal({
    slug: "contact",
    data: {
      badge: contact.badge,
      title: contact.title,
      description: contact.description,
      franchiseBadge: contact.franchiseBadge,
      franchiseTitle: contact.franchiseTitle,
      franchiseDescription: contact.franchiseDescription,
      cards: contact.cards,
      propertyTypes: contact.propertyTypes.map((label) => ({ label })),
    },
  });

  await resetCollection(payload, "solutions");
  await resetCollection(payload, "projects");
  await resetCollection(payload, "testimonials");
  await resetCollection(payload, "faqs");
  await resetCollection(payload, "products");
  await resetCollection(payload, "pages");

  for (const [order, item] of projects.entries()) {
    await payload.create({ collection: "projects", data: { ...item, order } });
  }
  for (const [order, item] of testimonials.entries()) {
    await payload.create({ collection: "testimonials", data: { ...item, order } });
  }
  for (const [order, item] of faqs.entries()) {
    await payload.create({ collection: "faqs", data: { ...item, order } });
  }
  for (const [order, item] of products.entries()) {
    await payload.create({ collection: "products", data: { ...item, order } });
  }
  for (const page of pages) {
    await payload.create({ collection: "pages", data: page });
  }
}
