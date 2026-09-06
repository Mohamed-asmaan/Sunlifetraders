import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    description: "About, services and other site pages. Header and footer links use the slug.",
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "badge", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "href", type: "text" },
        { name: "cta", type: "text" },
      ],
    },
  ],
};
