import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { PillarsStrip } from "@/components/home/PillarsStrip";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { Timeline } from "@/components/home/Timeline";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FAQ } from "@/components/home/FAQ";
import { CTAFinal } from "@/components/home/CTAFinal";
import { OrganizationSchema, FAQSchema } from "@/components/seo/JsonLd";
import { faqs } from "@/data/faq";
import { getFeaturedTestimonials } from "@/lib/testimonials";

export default function Home() {
  const testimonials = getFeaturedTestimonials();

  return (
    <>
      <OrganizationSchema />
      <FAQSchema items={faqs} />
      <Hero />
      <BrandMarquee />
      <PillarsStrip />
      <StatsSection />
      <AboutSection />
      <Timeline />
      <TestimonialsCarousel testimonials={testimonials} />
      <FAQ />
      <CTAFinal />
    </>
  );
}
