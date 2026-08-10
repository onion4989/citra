import { MobileHero } from "@/components/features/mobile-hero";
import { FooterSection } from "@/components/features/footer-section";
import { IntroductionSection } from "@/components/features/introduction-section";
import { ScrollScrubHero } from "@/components/features/scroll-scrub-hero";
import { WhatsCitraSection } from "@/components/features/whats-citra-section";

export default function Home() {
  return (
    <>
      <MobileHero />
      <ScrollScrubHero />
      <IntroductionSection />
      <WhatsCitraSection />
      <FooterSection />
    </>
  );
}
