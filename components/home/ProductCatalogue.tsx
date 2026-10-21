"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard } from "@/components/motion/Reveal";
import { productCategories } from "@/lib/products";
import type { Intro, Product, ProductCategory } from "@/lib/types";

const filters: { label: string; value: "all" | ProductCategory }[] = [
  { label: "All", value: "all" },
  ...productCategories.map((item) => ({ label: item.label, value: item.value })),
];

const categoryLabel = Object.fromEntries(productCategories.map((item) => [item.value, item.label])) as Record<
  ProductCategory,
  string
>;

export default function ProductCatalogue({ intro, items }: { intro: Intro; items: Product[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter !== "all" && item.category !== filter) return false;
      if (!needle) return true;
      const haystack = [
        item.title,
        item.spec ?? "",
        item.description,
        item.slug,
        categoryLabel[item.category],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [filter, items, query]);

  return (
    <Section id="products" pad="tight">
      <SectionIntro badge={intro.badge} title={intro.title} description={intro.description} />

      <div className="mt-8 flex flex-col gap-4">
        <label className="relative block max-w-xl">
          <span className="sr-only">Search products</span>
          <svg
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink/40"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.7" />
            <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search panels, inverters, 5 kW, Sofar…"
            className="w-full rounded-full border border-line bg-white py-3 pr-4 pl-11 text-[16px] text-ink outline-none placeholder:text-ink/40 focus:border-amber"
          />
        </label>

        <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={`ui shrink-0 rounded-full px-3 py-1.5 ${
              filter === item.value ? "bg-ink text-white" : "bg-soft text-ink/60"
            }`}
          >
            {item.label}
          </button>
        ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-[17px] text-muted">
          No products match “{query.trim()}”. Try another name, wattage, or brand.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item, i) => (
          <MotionCard
            key={`${item.category}-${item.slug ?? i}`}
            i={i}
            hover={-6}
            amount={0.2}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
          >
            <div className="relative aspect-[4/3] w-full bg-soft">
              <Image
                src={item.image}
                alt={item.alt || item.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
            <p className="eyebrow text-ink/45">{categoryLabel[item.category]}</p>
            <h3 className="display-card mt-3">{item.title}</h3>
            {item.spec ? <p className="ui mt-2 text-ink/55">{item.spec}</p> : null}
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            <Link
              href={item.slug ? `/products/${item.slug}` : "/contact"}
              className="ui mt-auto inline-flex items-center gap-1 pt-5 text-ink"
            >
              {item.cta ?? "Get a quote"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M3 6h6M6.5 3.5 9 6 6.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            </div>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
