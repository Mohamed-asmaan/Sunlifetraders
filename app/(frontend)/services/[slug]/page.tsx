import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/ServiceDetailView";
import PageView from "@/components/PageView";
import { getPage } from "@/lib/cms";
import { pages } from "@/lib/pages";
import { seo } from "@/lib/data";

const SERVICE_SLUGS = [
  "roof-top-solar-plant-installation",
  "ground-mount-solar-installation",
  "solar-plant-maintenance",
  "solar-power-plant-amc",
];

const OTHER_SLUGS = pages
  .map((page) => page.slug)
  .filter((slug) => slug !== "about" && slug !== "services" && !SERVICE_SLUGS.includes(slug));

const allSlugs = [...SERVICE_SLUGS, ...OTHER_SLUGS];

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  return {
    title: page ? `${page.title} | ${seo.title}` : seo.title,
    description: page?.description ?? seo.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!allSlugs.includes(slug)) notFound();
  const page = await getPage(slug);
  if (!page) notFound();

  // Rich layout for service detail pages
  if (SERVICE_SLUGS.includes(slug)) {
    return <ServiceDetailView page={page} />;
  }

  // Fallback card grid for any other slug
  return <PageView page={page} />;
}
