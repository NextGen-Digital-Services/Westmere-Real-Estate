"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, BedDouble, Bath, Square, MapPin } from "lucide-react";
import { Property } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatEUR, formatArea } from "@/lib/utils";
import { useFavourites } from "@/hooks/useFavourites";

interface PropertyCardProps {
  property: Property;
  viewMode?: "grid" | "list";
}

export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  const { isFavourite, toggle } = useFavourites();
  const saved = isFavourite(property.id);

  const statusVariant = {
    Available: "available",
    "Under Offer": "underOffer",
    Sold: "sold",
    Rented: "rented",
  }[property.availability] as "available" | "underOffer" | "sold" | "rented";

  return (
    <article
      className={`group bg-white border border-stone-border rounded-sm overflow-hidden flex transition-all duration-300 hover:border-charcoal/40 ${
        viewMode === "list" ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-2/5 h-64 md:h-auto" : "h-64 sm:h-72"}`}>
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant={statusVariant}>{property.availability}</Badge>
          <Badge variant="energy">{property.energyLabel}</Badge>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-sm border transition-colors z-10 ${
            saved
              ? "bg-olive text-white border-olive"
              : "bg-white/90 text-charcoal border-stone-border hover:bg-white"
          }`}
          aria-label={saved ? "Remove from saved residences" : "Save residence"}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
        </button>
      </div>

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-xs text-warm-grey mb-1.5 font-sans">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brass" />
              {property.street}, {property.city}
            </span>
            <span className="uppercase text-[11px] tracking-eyebrow text-brass font-medium">
              {property.type}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-charcoal line-clamp-1 group-hover:text-olive transition-colors">
            <Link href={`/properties/${property.slug}`}>{property.title}</Link>
          </h3>

          <p className="mt-2 text-xs text-warm-grey line-clamp-2 font-sans leading-relaxed">
            {property.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-border/60">
          <div className="flex items-center justify-between mb-4 text-xs font-sans text-warm-grey">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5" title="Bedrooms">
                <BedDouble className="w-4 h-4 text-stone-border stroke-[1.8]" />
                <span className="font-medium text-charcoal">{property.bedrooms}</span> Bed
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5" title="Bathrooms">
                <Bath className="w-4 h-4 text-stone-border stroke-[1.8]" />
                <span className="font-medium text-charcoal">{property.bathrooms}</span> Bath
              </span>
            )}
            <span className="flex items-center gap-1.5" title="Living Area">
              <Square className="w-4 h-4 text-stone-border stroke-[1.8]" />
              <span className="font-medium text-charcoal">{formatArea(property.livingArea)}</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                {formatEUR(property.price)}
                {property.listingType === "rent" && <span className="text-xs font-sans text-warm-grey font-normal"> /mo</span>}
              </p>
              <p className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey">
                {property.ownershipType.includes("Freehold") ? "Freehold (Eigen grond)" : "k.k. (Kosten Koper)"}
              </p>
            </div>

            <Link
              href={`/properties/${property.slug}`}
              className="text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress inline-flex items-center gap-1 group/link"
            >
              Explore
              <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
