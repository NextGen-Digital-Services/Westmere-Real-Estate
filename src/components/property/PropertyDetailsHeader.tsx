"use client";

import React from "react";
import { Property } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatEUR, formatArea } from "@/lib/utils";
import { Share2, Printer, Heart, Check } from "lucide-react";

interface PropertyDetailsHeaderProps {
  property: Property;
  saved: boolean;
  copied: boolean;
  onToggleSaved: () => void;
  onShare: () => void;
  onPrint: () => void;
}

export function PropertyDetailsHeader({
  property,
  saved,
  copied,
  onToggleSaved,
  onShare,
  onPrint,
}: PropertyDetailsHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-border">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="neutral">{property.availability}</Badge>
          <Badge variant="energy">Energy {property.energyLabel}</Badge>
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">
            Ref: {property.propertyCode}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal">{property.title}</h1>
        <p className="mt-2 text-sm text-warm-grey font-sans">
          {property.street}, {property.postalCode} {property.city}, The Netherlands
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:text-right">
        <div>
          <p className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
            {formatEUR(property.price)}
            {property.listingType === "rent" && <span className="text-sm font-sans text-warm-grey font-normal"> /mo</span>}
          </p>
          <p className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mt-0.5">
            {property.ownershipType} • {formatArea(property.livingArea)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSaved}
            className={`p-2.5 rounded-sm border transition-colors ${saved ? "bg-olive text-white border-olive" : "bg-white text-charcoal border-stone-border hover:bg-marble"}`}
            title="Save Residence"
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
          </button>
          <button onClick={onShare} className="p-2.5 rounded-sm border border-stone-border bg-white hover:bg-marble text-charcoal" title="Copy Link">
            {copied ? <Check className="w-4 h-4 text-sage" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button onClick={onPrint} className="p-2.5 rounded-sm border border-stone-border bg-white hover:bg-marble text-charcoal hidden sm:block" title="Print Dossier">
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
