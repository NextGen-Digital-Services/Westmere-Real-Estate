import React, { Suspense } from "react";
import { Metadata } from "next";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Prime Residential Leasing | Rent Netherlands",
  description: "Curated collection of high-specification furnished and unfurnished residences for diplomatic, corporate, and private lease.",
};

export default function RentPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Residential Leasing" }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">
            Residential Leasing
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1">
            Properties for Lease
          </h1>
          <p className="mt-2 text-sm text-warm-grey font-sans max-w-2xl">
            Distinguished apartments and penthouses suited for diplomatic missions, corporate headquarters leadership, and long-term private residencies.
          </p>
          <div className="mt-6 h-px w-16 bg-brass" />
        </div>

        <Suspense fallback={<div className="py-20 text-center text-warm-grey">Loading residences...</div>}>
          <ListingExplorer initialListingType="rent" />
        </Suspense>
      </div>
    </div>
  );
}
