import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageView from "@/components/PageView";
import { getPage } from "@/lib/cms";
import { pages } from "@/lib/pages";
import { seo } from "@/lib/data";

const serviceSlugs = pages
  .map((page) => page.slug)
  .filter((slug) => slug !== "about" && slug !== "services");

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  return {
    title: page ? `${page.title} | ${seo.title}` : seo.title,
    description: page?.description ?? seo.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!serviceSlugs.includes(slug)) notFound();
  const page = await getPage(slug);
  if (!page) notFound();
  return <PageView page={page} />;
}
