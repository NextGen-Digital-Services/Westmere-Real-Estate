"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import { formatEUR } from "@/lib/utils";
import { MapPin, X, Navigation } from "lucide-react";

interface PropertyMapProps {
  properties: Property[];
}

export function PropertyMap({ properties }: PropertyMapProps) {
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    properties[0] || null
  );

  // Netherlands bounding box: lat ~ 50.75 to 53.5, lng ~ 3.3 to 7.2
  const minLat = 50.7;
  const maxLat = 53.4;
  const minLng = 3.3;
  const maxLng = 7.1;

  const getCoordinates = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="relative w-full h-[600px] bg-travertine/60 border border-stone-border rounded-sm overflow-hidden flex flex-col md:flex-row">
      <div className="relative flex-1 bg-[#E4DDD0] overflow-hidden p-4">
        {/* Stylized cartographic background lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#23221F_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="absolute top-4 left-4 z-10 bg-white/95 px-3 py-1.5 border border-stone-border rounded-sm text-[11px] font-sans uppercase tracking-eyebrow text-charcoal flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-olive" />
          Interactive Netherlands Municipal Map
        </div>

        {properties.map((prop) => {
          const { x, y } = getCoordinates(prop.lat, prop.lng);
          const isSelected = activeProperty?.id === prop.id;

          return (
            <button
              key={prop.id}
              onClick={() => setActiveProperty(prop)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-20 group focus:outline-none ${
                isSelected ? "scale-125 z-30" : "hover:scale-110"
              }`}
              title={`${prop.title} - ${formatEUR(prop.price)}`}
            >
              <div
                className={`px-2 py-1 text-[11px] font-sans font-semibold rounded-sm border whitespace-nowrap shadow-none flex items-center gap-1 ${
                  isSelected
                    ? "bg-olive text-white border-cypress"
                    : "bg-white text-charcoal border-stone-border group-hover:border-charcoal"
                }`}
              >
                <MapPin className="w-3 h-3 text-brass shrink-0" />
                <span>{formatEUR(prop.price)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {activeProperty && (
        <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-stone-border p-5 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-sans tracking-eyebrow text-brass font-medium">
                {activeProperty.city}
              </span>
              <button
                onClick={() => setActiveProperty(null)}
                className="text-warm-grey hover:text-charcoal p-1"
                aria-label="Close card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-44 w-full mb-3 rounded-sm overflow-hidden border border-stone-border/40">
              <Image
                src={activeProperty.images[0]}
                alt={activeProperty.title}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>

            <h4 className="font-serif text-lg text-charcoal line-clamp-1">
              {activeProperty.title}
            </h4>
            <p className="text-xs text-warm-grey font-sans mt-1">
              {activeProperty.street}, {activeProperty.postalCode}
            </p>
            <p className="mt-2 text-xs text-warm-grey font-sans line-clamp-2">
              {activeProperty.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-border flex items-center justify-between">
            <div>
              <p className="font-serif text-lg font-normal text-charcoal">
                {formatEUR(activeProperty.price)}
              </p>
              <p className="text-[10px] text-warm-grey font-sans uppercase">
                {activeProperty.livingArea} m² • {activeProperty.bedrooms} Beds
              </p>
            </div>
            <Link
              href={`/properties/${activeProperty.slug}`}
              className="text-xs font-sans uppercase tracking-eyebrow bg-olive text-marble px-3 py-1.5 rounded-sm hover:bg-cypress transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
