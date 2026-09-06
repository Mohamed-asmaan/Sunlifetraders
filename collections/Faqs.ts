import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    group: "Website",
    useAsTitle: "question",
    defaultColumns: ["question", "order", "updatedAt"],
  },
  access: { read: () => true },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
