import type { Metadata } from "next";
import ProductCatalogue from "@/components/home/ProductCatalogue";
import { getProducts } from "@/lib/cms";
import { home, seo } from "@/lib/data";

export const metadata: Metadata = {
  title: `Products | ${seo.title}`,
  description:
    "PV modules, inverters, rooftop plants, structures, BOS and solar water heaters from Sunlife Traders LLP. MNRE-approved, warranty-backed.",
  openGraph: {
    title: `Products | ${seo.title}`,
    description:
      "MNRE-approved solar products: PV panels, inverters, rooftop plants, structures, BOS and water heaters.",
    type: "website",
  },
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="pt-16 md:pt-20">
      <ProductCatalogue intro={home.productsIntro} items={products} />
    </div>
  );
}
