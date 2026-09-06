import type { GlobalConfig } from "payload";

const intro = [
  { name: "badge", type: "text" as const },
  { name: "title", type: "text" as const },
  { name: "description", type: "textarea" as const },
];

const card = [
  { name: "title", type: "text" as const, required: true },
  { name: "description", type: "textarea" as const, required: true },
  { name: "image", type: "text" as const, required: true },
  { name: "alt", type: "text" as const },
  { name: "cta", type: "text" as const },
  { name: "href", type: "text" as const },
];

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home page",
  access: { read: () => true },
  fields: [
    {
      name: "heroSlides",
      type: "array",
      fields: [
        { name: "badge", type: "text" },
        { name: "badgeSuffix", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "cta", type: "text" },
        { name: "ctaHref", type: "text" },
        { name: "secondaryCta", type: "text" },
        { name: "secondaryHref", type: "text" },
        { name: "skyImage", type: "text" },
        { name: "houseImage", type: "text" },
        { name: "houseAlt", type: "text" },
      ],
    },
    {
      name: "trust",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
    { type: "group", name: "brandsIntro", fields: intro },
    {
      name: "brands",
      type: "array",
      fields: [{ name: "name", type: "text", required: true }],
    },
    {
      type: "group",
      name: "about",
      fields: [
        ...intro,
        { name: "cta", type: "text" },
        { name: "ctaHref", type: "text" },
        { name: "image", type: "text" },
        { name: "imageAlt", type: "text" },
        { name: "cardDate", type: "text" },
        { name: "cardTitle", type: "text" },
        { name: "cardDescription", type: "textarea" },
      ],
    },
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "value", type: "number", required: true },
        { name: "suffix", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    { type: "group", name: "solutionsIntro", fields: intro },
    { name: "solutions", type: "array", fields: card },
    { type: "group", name: "servicesIntro", fields: intro },
    { name: "services", type: "array", fields: card },
    { type: "group", name: "benefitsIntro", fields: intro },
    {
      name: "benefits",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    { name: "benefitsImage", type: "text" },
    { name: "benefitsImageAlt", type: "text" },
    { type: "group", name: "productsIntro", fields: intro },
    { type: "group", name: "projectsIntro", fields: intro },
    { type: "group", name: "howItWorks", fields: intro },
    {
      name: "steps",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "points", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "quiz",
      fields: [
        ...intro,
        {
          name: "questions",
          type: "array",
          fields: [
            { name: "question", type: "text", required: true },
            { name: "options", type: "textarea" },
            { name: "placeholder", type: "text" },
          ],
        },
      ],
    },
    { type: "group", name: "testimonialsIntro", fields: intro },
    {
      type: "group",
      name: "faqIntro",
      fields: [
        ...intro,
        { name: "helpTitle", type: "text" },
        { name: "helpDescription", type: "textarea" },
      ],
    },
    { type: "group", name: "locationsIntro", fields: intro },
    {
      type: "group",
      name: "lead",
      fields: [...intro, { name: "cta", type: "text" }],
    },
  ],
};
