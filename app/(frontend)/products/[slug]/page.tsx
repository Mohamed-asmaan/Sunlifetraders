import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/cms";
import { home, site, seo } from "@/lib/data";
import { productCategories } from "@/lib/products";
import ArrowButton from "@/components/ArrowButton";
import { Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard, Reveal } from "@/components/motion/Reveal";

const categoryLabel = Object.fromEntries(
  productCategories.map((item) => [item.value, item.label]),
) as Record<string, string>;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: seo.title };
  return {
    title: `${product.title} | ${seo.title}`,
    description: `${product.spec ? product.spec + " — " : ""}${product.description} | Sunlife Traders LLP`,
    openGraph: {
      title: `${product.title} | ${seo.title}`,
      description: product.description,
      type: "website",
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  // Related products: same category, excluding current
  const all = await getProducts();
  const related = all.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1280px] px-4 pt-24 pb-0 md:px-6 md:pt-32">
        <nav className="eyebrow flex items-center gap-1.5 text-ink/45" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-ink transition">Products</Link>
          <span>/</span>
          <span className="text-ink/80">{product.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <Section pad="contact">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          {/* Image */}
          <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-soft">
            <Image
              src={product.image}
              alt={product.alt || product.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
            />
          </Reveal>

          {/* Info */}
          <div>
            <SectionIntro
              as="h1"
              inView={false}
              badge={categoryLabel[product.category] ?? "Product"}
              title={product.title}
              description={product.description}
              delay={0.2}
              descriptionClass="copy mt-5 max-w-[48ch] text-muted"
            />

            {product.spec ? (
              <Reveal delay={0.25} className="mt-4">
                <div className="inline-flex items-center gap-2 rounded-xl bg-amber-light border border-amber/20 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-amber shrink-0" />
                  <span className="ui text-ink/80">{product.spec}</span>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.35} className="mt-8 flex flex-wrap gap-3">
              <ArrowButton href="/contact">{product.cta ?? "Get a quote"}</ArrowButton>
              <Link
                href={site.company.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="ui inline-flex items-center gap-2 rounded-xl border border-line bg-soft px-4 py-[9px] text-ink transition hover:bg-white"
              >
                WhatsApp enquiry
              </Link>
            </Reveal>

            {/* Trust badges */}
            <Reveal delay={0.45} className="mt-8 flex flex-wrap gap-2">
              {["MNRE Approved", "Warranty Backed", "In-stock Kerala & TN", "Expert Install"].map((t) => (
                <span
                  key={t}
                  className="ui inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[12px] text-ink/60"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  {t}
                </span>
              ))}
            </Reveal>

            {/* Subsidy reminder */}
            <Reveal delay={0.5} className="mt-6">
              <div className="rounded-[18px] border border-amber/20 bg-amber-light p-4">
                <p className="ui text-amber">PM Surya Ghar subsidy</p>
                <p className="copy mt-1 text-ink/80">
                  Up to ₹78,000 in government subsidies on MNRE-approved systems. EMI from ₹1,200 per lakh.{" "}
                  <Link href="/contact" className="underline underline-offset-4">
                    Check eligibility →
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Why buy from Sunlife */}
      <Section pad="tight">
        <Reveal>
          <div className="rounded-[24px] bg-ink p-6 text-white md:p-8">
            <p className="eyebrow text-white/50">Why buy from Sunlife Traders</p>
            <h2 className="display-kicker mt-2 text-white">Expert supply, expert install — one team.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "MNRE & EVVO certified", desc: "Every product meets government and safety standards." },
                { title: "Tier-1 brands only", desc: "Waaree, Adani, EVVO, Growatt — real warranties." },
                { title: "Subsidy handled", desc: "We manage KSEB/TANGEDCO and PM Surya Ghar paperwork." },
                { title: "In-house install crew", desc: "No subcontractors. Same team, same standards." },
                { title: "25-year monitoring", desc: "Live generation on Solarman after every install." },
                { title: "4 service depots", desc: "Thiruvananthapuram, Kanyakumari (×2), Kollam." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl bg-white/10 p-4">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                  <div>
                    <p className="ui text-white">{item.title}</p>
                    <p className="copy mt-1 text-white/65">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Related products */}
        {related.length > 0 ? (
          <div className="mt-14">
            <h2 className="display-kicker mb-6 text-ink">
              More in{" "}
              <span className="text-ink/50">{categoryLabel[product.category]}</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, i) => (
                <MotionCard
                  key={item.slug}
                  i={i}
                  hover={-6}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
                >
                  <div className="relative aspect-[4/3] w-full bg-soft">
                    <Image
                      src={item.image}
                      alt={item.alt || item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                  <h3 className="display-kicker">{item.title}</h3>
                  {item.spec ? <p className="ui mt-1 text-ink/55">{item.spec}</p> : null}
                  <p className="copy mt-2 text-muted">{item.description}</p>
                  <Link
                    href={`/products/${item.slug}`}
                    className="ui mt-auto inline-flex items-center gap-1 pt-5 text-ink"
                  >
                    View details
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M3 6h6M6.5 3.5 9 6 6.5 8.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>
        ) : null}

        {/* Bottom CTA */}
        <Reveal className="mt-12 flex flex-wrap gap-3">
          <ArrowButton href="/contact">Get a free quote</ArrowButton>
          <Link
            href="/products"
            className="ui inline-flex items-center gap-2 rounded-xl border border-line bg-soft px-4 py-[9px] text-ink transition hover:bg-white"
          >
            ← All products
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
