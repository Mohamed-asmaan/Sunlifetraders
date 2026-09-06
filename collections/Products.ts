import type { CollectionConfig } from "payload";
import { productCategories } from "@/lib/products";

export { productCategories };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order", "updatedAt"],
    description: "Catalogue shown on the home page. No separate product routes.",
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "spec", type: "text", admin: { description: "Short spec line, e.g. 24V / 250–400 watts" } },
    { name: "description", type: "textarea", required: true },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "pv",
      options: productCategories,
    },
    { name: "image", type: "text" },
    { name: "alt", type: "text" },
    { name: "cta", type: "text", defaultValue: "Get a quote" },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
