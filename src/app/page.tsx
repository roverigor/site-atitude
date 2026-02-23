import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { CoursesGrid } from "@/components/home/CoursesGrid";
import { Timeline } from "@/components/home/Timeline";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FAQ } from "@/components/home/FAQ";
import { CTAFinal } from "@/components/home/CTAFinal";
import { OrganizationSchema, FAQSchema } from "@/components/seo/JsonLd";
import { faqs } from "@/data/faq";

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <FAQSchema items={faqs} />
      <Hero />
      <StatsSection />
      <CoursesGrid />
      <Timeline />
      <TestimonialsCarousel />
      <FAQ />
      <CTAFinal />
    </>
  );
}
