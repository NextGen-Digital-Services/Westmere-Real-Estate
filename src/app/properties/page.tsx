import React, { Suspense } from "react";
import { Metadata } from "next";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Complete Property Portfolio",
  description: "Browse all available residential and commercial real estate across prime Dutch municipalities.",
};

export default function PropertiesPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Real Estate Portfolio" }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">
            Netherlands Roster
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1">
            Complete Real Estate Portfolio
          </h1>
          <p className="mt-2 text-sm text-warm-grey font-sans max-w-2xl">
            A verified register of monumental canal residences, contemporary waterfront penthouses, and commercial offices across the Randstad.
          </p>
          <div className="mt-6 h-px w-16 bg-brass" />
        </div>

        <Suspense fallback={<div className="py-20 text-center text-warm-grey">Loading residences...</div>}>
          <ListingExplorer />
        </Suspense>
      </div>
    </div>
  );
}
