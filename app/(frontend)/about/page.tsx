import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageView from "@/components/PageView";
import { getPage } from "@/lib/cms";
import { seo } from "@/lib/data";

export const metadata: Metadata = {
  title: `About | ${seo.title}`,
  description: "About Sunlife Traders LLP — rooftop solar from Pothencode, serving Kerala and Tamil Nadu.",
};

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) notFound();
  return <PageView page={page} />;
}
