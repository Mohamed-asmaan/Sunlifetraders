import Link from "next/link";
import { AccentDot, Section, SectionIntro } from "@/components/ui/Section";
import { MotionCard } from "@/components/motion/Reveal";
import type { CmsPage } from "@/lib/types";

export default function PageView({ page }: { page: CmsPage }) {
  return (
    <Section pad="contact">
      <SectionIntro
        as="h1"
        inView={false}
        badge={page.badge}
        title={page.title}
        description={page.description}
        delay={0.2}
        descriptionClass="copy mt-5 max-w-[52ch] text-muted"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {page.sections.map((section, i) => (
          <MotionCard key={section.title} i={i} className="rounded-[24px] bg-soft p-6">
            <AccentDot />
            <h2 className="display-kicker">{section.title}</h2>
            {section.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.description}</p>
            ) : null}
            {section.href && section.cta ? (
              <Link href={section.href} className="ui mt-4 inline-flex text-ink underline underline-offset-4">
                {section.cta}
              </Link>
            ) : null}
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
