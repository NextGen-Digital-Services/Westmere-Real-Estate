import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/images";
import { SITE_CONFIG } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Our Practice | Heritage & Philosophy",
  description: "Specialists in prime Netherlands real estate, monumental conservation, and private acquisitions across the Randstad.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About Us" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Our Heritage"
          title="The Standard of Netherlands Real Estate"
          description={`Established on Amsterdam's Herengracht, ${SITE_CONFIG.name} provides discreet advisory for historic canal mansions, modernist estates, and commercial flagships.`}
        />

        <div className="relative h-[400px] sm:h-[500px] w-full rounded-sm overflow-hidden border border-stone-border mb-16">
          <Image
            src={IMAGES.hero.about}
            alt="Historic Herengracht Amsterdam"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5 bg-white border border-stone-border p-8 rounded-sm">
            <h3 className="font-serif text-2xl text-charcoal mb-4">Advisory Principles</h3>
            <div className="space-y-4 text-xs font-sans text-warm-grey leading-relaxed">
              <p>
                <strong className="text-charcoal block mb-0.5">Stewardship of Protected Heritage:</strong>
                Understanding the responsibility of listed Rijksmonumenten and navigating municipal building guidelines.
              </p>
              <p>
                <strong className="text-charcoal block mb-0.5">Absolute Discretion:</strong>
                Fostering private transactions through trusted family offices and verified principal buyers.
              </p>
              <p>
                <strong className="text-charcoal block mb-0.5">Technical & Legal Rigor:</strong>
                Evaluating groundwater levels, wooden foundation piling health, Erfpacht lease terms, and VvE reserves.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm font-sans text-warm-grey leading-relaxed">
            <h3 className="font-serif text-3xl text-charcoal">
              Representing Architectural Eminence Since Inception.
            </h3>
            <p>
              Dutch real estate represents an intricate dialogue between centuries of civic engineering and visionary contemporary design. From the 17th-century brick facades of the Amsterdam canal belt to the striking vertical glass towers of Rotterdam, our practice is rooted in reverence for structural craftsmanship.
            </p>
            <p>
              We operate exclusively with senior advisors who understand the technicalities of Dutch property transactions: civil notary escrow protocols, municipal right-of-first-refusal clauses, and certified NWWI property valuations.
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/team"><Button variant="primary">Meet Our Partners</Button></Link>
              <Link href="/contact"><Button variant="outline">Contact Our Desk</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
