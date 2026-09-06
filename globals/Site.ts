import type { GlobalConfig } from "payload";

export const Site: GlobalConfig = {
  slug: "site",
  label: "Site settings",
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "shortName", type: "text" },
    { name: "tagline", type: "textarea" },
    { name: "email", type: "email" },
    { name: "consultEmail", type: "email" },
    { name: "phone", type: "text" },
    { name: "phoneHref", type: "text" },
    { name: "whatsappHref", type: "text" },
    { name: "address", type: "text" },
    { name: "mapsQuery", type: "text" },
    { name: "footerHeadline", type: "text" },
    { name: "footerDescription", type: "textarea" },
    { name: "footerCta", type: "text" },
    {
      name: "certifications",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "offices",
      type: "array",
      fields: [
        { name: "city", type: "text", required: true },
        { name: "address", type: "text", required: true },
      ],
    },
    {
      name: "navLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "footerLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      type: "group",
      name: "headerCta",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};
