import Hero from "@/components/home/Hero";
import Brands from "@/components/home/Brands";
import About from "@/components/home/About";
import Solutions from "@/components/home/Solutions";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import Benefits from "@/components/home/Benefits";
import Projects from "@/components/home/Projects";
import HowItWorks from "@/components/home/HowItWorks";
import Quiz from "@/components/home/Quiz";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Locations from "@/components/home/Locations";
import Lead from "@/components/home/Lead";
import { getHomePage, getSite } from "@/lib/cms";

export default async function HomePage() {
  const [home, site] = await Promise.all([getHomePage(), getSite()]);

  return (
    <>
      <Hero hero={home.hero} />
      <Brands intro={home.brandsIntro} items={home.brands} />
      <About about={home.about} stats={home.stats} />
      <Solutions intro={home.solutionsIntro} items={home.solutions} />
      <Services intro={home.servicesIntro} items={home.services} />
      <Benefits
        intro={home.benefitsIntro}
        items={home.benefits}
        image={home.benefitsImage}
        imageAlt={home.benefitsImageAlt}
      />
      <Products intro={home.productsIntro} />
      <Projects intro={home.projectsIntro} items={home.projects} />
      <HowItWorks intro={home.howItWorks} steps={home.steps} />
      <Quiz quiz={home.quiz} />
      <Testimonials intro={home.testimonialsIntro} items={home.testimonials} />
      <FAQ intro={home.faqIntro} items={home.faqs} />
      <Locations intro={home.locationsIntro} offices={site.company.offices} />
      <Lead intro={home.lead} />
    </>
  );
}
