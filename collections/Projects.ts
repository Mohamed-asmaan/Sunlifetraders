import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "order", "updatedAt"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "image", type: "text", required: true },
    { name: "alt", type: "text" },
    { name: "meta", type: "text" },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
