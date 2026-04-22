import { Hero } from "@/components/home/Hero";
import { ValueStrip } from "@/components/home/ValueStrip";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { BestsellerGrid } from "@/components/home/BestsellerGrid";
import { AIBanner } from "@/components/home/AIBanner";
import { ProductMarquee } from "@/components/home/ProductMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <CategoryShowcase />
      <BestsellerGrid />
      <AIBanner />
      <ProductMarquee />
      <Testimonials />
      <Newsletter />
    </>
  );
}
