import type { Metadata } from "next";
import ProductCatalogue from "@/components/home/ProductCatalogue";
import { getHomePage } from "@/lib/cms";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: `Products | ${seo.title}`,
  description: "PV modules, inverters, rooftop plants, structures, BOS and solar water heaters from Sunlife Traders LLP.",
};

export default async function ProductsPage() {
  const home = await getHomePage();
  return (
    <div className="pt-16 md:pt-20">
      <ProductCatalogue intro={home.productsIntro} items={home.products} />
    </div>
  );
}
