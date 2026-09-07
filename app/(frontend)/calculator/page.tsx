import type { Metadata } from "next";
import RoiCalculator from "@/components/roi/RoiCalculator";
import ArrowButton from "@/components/ArrowButton";
import { Section, SectionIntro } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { seo, site } from "@/lib/data";

export const metadata: Metadata = {
  title: `Solar Savings Calculator | ${seo.title}`,
  description:
    "Calculate your rooftop solar savings live. See payback years, PM Surya Ghar subsidy, EMI and 25-year net gain — for Kerala and Tamil Nadu tariffs.",
  openGraph: {
    title: `Solar Savings Calculator | ${seo.title}`,
    description:
      "Live solar ROI calculator. Sized from your state tariff, peak sun hours and PM Surya Ghar subsidy. See your bill before and after solar.",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <>
      {/* Header */}
      <Section pad="contact">
        <SectionIntro
          as="h1"
          inView={false}
          badge="Live Calculator"
          title="Your solar savings, calculated."
          description="Move the slider to your monthly EB bill. Payback, subsidy and 25-year net gain update instantly — sized from actual state tariffs and peak sun hours."
          delay={0.2}
          descriptionClass="copy mt-5 max-w-[52ch] text-muted"
        />

        {/* Trust */}
        <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-2">
          {[
            "Kerala & Tamil Nadu tariffs",
            "PM Surya Ghar subsidy included",
            "EV load sizing",
            "7-year EMI option",
            "25-year projection",
          ].map((t) => (
            <span
              key={t}
              className="ui inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1 text-[12px] text-ink/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {t}
            </span>
          ))}
        </Reveal>
      </Section>

      {/* Calculator */}
      <div className="mx-auto max-w-[1280px] px-4 pb-8 md:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-line shadow-sm">
            <RoiCalculator />
          </div>
        </Reveal>
      </div>

      {/* Explainer */}
      <Section pad="tight">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "How it works",
                desc: "We use your state's current tariff per unit and the annual peak sun hours for your region. The system size is derived from your bill, and the payback period is calculated net of PM Surya Ghar subsidy.",
              },
              {
                title: "What's the subsidy?",
                desc: "The PM Surya Ghar scheme offers up to ₹78,000 for residential systems on MNRE-approved panels. We handle the eligibility check and paperwork — you don't need to interact with any portal.",
              },
              {
                title: "How accurate is it?",
                desc: "The calculator uses published tariff rates and MNRE sun-hour tables. The actual figure depends on your roof orientation, shading and load profile, which a site survey refines. It's typically accurate within 10%.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[20px] bg-soft p-5">
                <h3 className="display-kicker text-ink">{item.title}</h3>
                <p className="copy mt-2 text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-10 rounded-[24px] bg-ink p-6 text-white md:p-8">
          <p className="eyebrow text-white/50">Ready to go further?</p>
          <h2 className="display-kicker mt-2 text-white">
            Lock in your numbers with a free site survey
          </h2>
          <p className="copy mt-2 max-w-[50ch] text-white/70">
            Share your WhatsApp number and pincode. A senior engineer will send a full proposal — system size, subsidy,
            EMI and install timeline — within 2 working hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ArrowButton href="/contact" variant="light">Get a free proposal</ArrowButton>
            <a
              href={site.company.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="ui inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-[9px] text-white transition hover:bg-white/20"
            >
              WhatsApp an engineer
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
