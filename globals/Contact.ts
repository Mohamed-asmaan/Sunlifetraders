import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact page",
  access: { read: () => true },
  fields: [
    { name: "badge", type: "text" },
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "franchiseBadge", type: "text" },
    { name: "franchiseTitle", type: "text" },
    { name: "franchiseDescription", type: "textarea" },
    {
      name: "cards",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "href", type: "text" },
        { name: "label", type: "text" },
      ],
    },
    {
      name: "propertyTypes",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
  ],
};
