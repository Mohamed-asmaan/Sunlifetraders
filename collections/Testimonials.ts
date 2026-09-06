import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    group: "Website",
    useAsTitle: "name",
    defaultColumns: ["name", "order", "updatedAt"],
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "quote", type: "textarea", required: true },
    { name: "image", type: "text", required: true },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
