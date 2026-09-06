import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageView from "@/components/PageView";
import { getPage } from "@/lib/cms";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: `Services | ${seo.title}`,
  description: "Rooftop and ground-mount install, maintenance and AMC from Sunlife Traders LLP.",
};

export default async function ServicesPage() {
  const page = await getPage("services");
  if (!page) notFound();
  return <PageView page={page} />;
}
