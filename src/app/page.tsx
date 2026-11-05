import React from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { RecentSection } from "@/components/home/RecentSection";
import { CityTilesSection } from "@/components/home/CityTilesSection";
import { DevelopmentsSection } from "@/components/home/DevelopmentsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { AboutEditorialSplit } from "@/components/home/AboutEditorialSplit";
import { AgentsSection } from "@/components/home/AgentsSection";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SITE_CONFIG } from "@/config/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      postalCode: SITE_CONFIG.address.postalCode,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: "NL",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero />
      <FeaturedSection />
      <RecentSection />
      <CityTilesSection />
      <DevelopmentsSection />
      <WhyChooseUs />
      <AboutEditorialSplit />
      <AgentsSection />
      <TestimonialsSlider />
      <ArticlesSection />
      <NewsletterSection />
    </>
  );
}
