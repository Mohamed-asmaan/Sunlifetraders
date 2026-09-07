import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesView from "@/components/ServicesView";
import { getPage } from "@/lib/cms";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: `Solar Services | ${seo.title}`,
  description:
    "Rooftop installation, ground mount, solar plant maintenance and AMC from Sunlife Traders LLP. MNRE subsidy up to ₹78,000. EMI from ₹1,200/lakh.",
  openGraph: {
    title: "Solar Services | Sunlife Traders LLP",
    description:
      "Rooftop and ground-mount installation, maintenance and AMC from Pothencode. MNRE certified, KSEB/TANGEDCO approved.",
    type: "website",
  },
};

export default async function ServicesPage() {
  const page = await getPage("services");
  if (!page) notFound();
  return <ServicesView page={page} />;
}
