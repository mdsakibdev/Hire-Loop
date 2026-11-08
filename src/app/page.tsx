import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturesSection } from "@/components/home/features-section";
import { PricingSection } from "@/components/home/pricing-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#050505] font-sans text-white">
      <HeroBanner />
      <FeaturesSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
