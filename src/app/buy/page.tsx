import React, { Suspense } from "react";
import { Metadata } from "next";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Buy Prime Netherlands Residences | Acquisitions",
  description: "Acquire exceptional canal mansions, architectural modernist villas, and luxury residences across Amsterdam, The Hague, Rotterdam, and Utrecht.",
};

export default function BuyPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Acquisitions (Buy)" }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">
            Property Acquisitions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1">
            Residences for Purchase
          </h1>
          <p className="mt-2 text-sm text-warm-grey font-sans max-w-2xl">
            Prime residential freehold and municipal leasehold estates, each comprehensively vetted for cadastral boundaries and monumental status.
          </p>
          <div className="mt-6 h-px w-16 bg-brass" />
        </div>

        <Suspense fallback={<div className="py-20 text-center text-warm-grey">Loading residences...</div>}>
          <ListingExplorer initialListingType="buy" />
        </Suspense>
      </div>
    </div>
  );
}
