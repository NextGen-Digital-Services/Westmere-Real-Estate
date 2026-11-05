"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "@/types";
import { getStoredProperties } from "@/lib/storage";
import { useFavourites } from "@/hooks/useFavourites";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";

export default function FavouritesPage() {
  const { favourites } = useFavourites();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const all = getStoredProperties();
    setProperties(all.filter((p) => favourites.includes(p.id)));
  }, [favourites]);

  return (
    <div className="py-12 sm:py-16 bg-marble min-h-[75vh]">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Saved Residences" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Private Shortlist"
          title="Saved Netherlands Residences"
          description="Your personal collection of bookmarked canal mansions, contemporary lofts, and suburban estates, saved across sessions."
        />

        {properties.length === 0 ? (
          <div className="bg-white border border-stone-border rounded-sm p-12 text-center max-w-lg mx-auto my-12">
            <Heart className="w-10 h-10 text-stone-border mx-auto mb-4 stroke-[1.2]" />
            <h3 className="font-serif text-2xl text-charcoal">Your Shortlist is Empty</h3>
            <p className="mt-2 text-xs text-warm-grey font-sans leading-relaxed">
              Click the heart icon on any residence to store it in your private shortlist for swift comparison and viewing scheduling.
            </p>
            <div className="mt-6">
              <Link href="/buy">
                <Button variant="primary" size="md">Browse Acquisitions</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-10">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
