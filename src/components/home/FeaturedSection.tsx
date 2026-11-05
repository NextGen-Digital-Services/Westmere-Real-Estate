import React from "react";
import Link from "next/link";
import { getFeaturedProperties } from "@/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "lucide-react";

export function FeaturedSection() {
  const featured = getFeaturedProperties().slice(0, 6);

  return (
    <section className="py-24 sm:py-28 bg-marble border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            number="01"
            eyebrow="Curated Portfolio"
            title="Featured Netherlands Residences"
            description="A strictly edited selection of prime canal mansions, coastal modernist villas, and landmark architectural developments."
            className="mb-0 md:mb-0"
          />

          <Link
            href="/buy"
            className="mt-6 md:mt-0 text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress inline-flex items-center gap-1.5 shrink-0"
          >
            Explore Complete Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </section>
  );
}
