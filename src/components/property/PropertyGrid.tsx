"use client";

import React from "react";
import { Property } from "@/types";
import { PropertyCard } from "./PropertyCard";
import { Home } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
  viewMode?: "grid" | "list";
  emptyMessage?: string;
}

export function PropertyGrid({
  properties,
  viewMode = "grid",
  emptyMessage = "No properties match your active search criteria.",
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="py-20 text-center bg-white border border-stone-border rounded-sm p-8 max-w-xl mx-auto">
        <Home className="w-10 h-10 text-stone-border mx-auto mb-4 stroke-[1.2]" />
        <h3 className="font-serif text-2xl text-charcoal">No Residences Found</h3>
        <p className="mt-2 text-sm text-warm-grey font-sans">{emptyMessage}</p>
        <p className="mt-4 text-xs font-sans text-brass">
          Try clearing selected filters or broadening price and municipal boundaries.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          : "flex flex-col space-y-6"
      }
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} viewMode={viewMode} />
      ))}
    </div>
  );
}
