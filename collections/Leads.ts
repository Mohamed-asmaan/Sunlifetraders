import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    group: "Inbox",
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "source", "createdAt"],
    description: "Public form, quiz, and franchise submissions.",
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text" },
    { name: "email", type: "email" },
    { name: "city", type: "text" },
    { name: "source", type: "text" },
    { name: "propertyType", type: "text" },
    { name: "message", type: "textarea" },
  ],
};
