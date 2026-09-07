import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutView from "@/components/AboutView";
import { getPage } from "@/lib/cms";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: `About Sunlife Traders | ${seo.title}`,
  description:
    "About Sunlife Traders LLP — rooftop solar installers in Kerala & Tamil Nadu since 2018. EVVO certified, MNRE registered, 500+ systems installed.",
  openGraph: {
    title: "About Sunlife Traders LLP",
    description:
      "EVVO certified and MNRE registered solar installers from Pothencode, Thiruvananthapuram. Serving Kerala and Tamil Nadu since 2018.",
    type: "website",
  },
};

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) notFound();
  return <AboutView page={page} />;
}
