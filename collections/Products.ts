import type { CollectionConfig } from "payload";
import { productCategories } from "@/lib/products";

export { productCategories };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "order", "updatedAt"],
    description: "Product catalogue. Each product has its own /products/[slug] detail page.",
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL slug, e.g. waaree-bifacial-540w. Auto-generated from title if blank." },
    },
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
