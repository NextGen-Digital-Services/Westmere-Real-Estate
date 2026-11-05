import React, { Suspense } from "react";
import { Metadata } from "next";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Commercial & Office Capital Assets | Netherlands",
  description: "BREEAM-certified commercial offices, creative headquarters, and institutional commercial spaces across Amsterdam Zuidas and the Randstad.",
};

export default function CommercialPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Commercial Portfolio" }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">
            Commercial & Institutional
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1">
            Commercial Real Estate & Offices
          </h1>
          <p className="mt-2 text-sm text-warm-grey font-sans max-w-2xl">
            Prime office assets, technology hubs, and monumental commercial conversions situated along major Dutch transport corridors.
          </p>
          <div className="mt-6 h-px w-16 bg-brass" />
        </div>

        <Suspense fallback={<div className="py-20 text-center text-warm-grey">Loading assets...</div>}>
          <ListingExplorer initialListingType="commercial" />
        </Suspense>
      </div>
    </div>
  );
}
