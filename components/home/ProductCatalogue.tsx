"use client";

import { useMemo, useState } from "react";
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
  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  return (
    <Section id="products" pad="tight">
      <SectionIntro badge={intro.badge} title={intro.title} description={intro.description} />

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item, i) => (
          <MotionCard
            key={`${item.category}-${item.title}-${item.spec ?? i}`}
            i={i}
            hover={-6}
            amount={0.2}
            className="flex h-full flex-col rounded-2xl border border-line bg-white p-6"
          >
            <p className="eyebrow text-ink/45">{categoryLabel[item.category]}</p>
            <h3 className="display-card mt-3">{item.title}</h3>
            {item.spec ? <p className="ui mt-2 text-ink/55">{item.spec}</p> : null}
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            <Link href="/#franchise" className="ui mt-auto inline-flex items-center gap-1 pt-5 text-ink">
              {item.cta ?? "Get a quote"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M3 6h6M6.5 3.5 9 6 6.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
