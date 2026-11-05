"use client";

import React, { useState } from "react";
import { Property, Agent } from "@/types";
import { PropertyGallery } from "./PropertyGallery";
import { SpecsTable } from "./SpecsTable";
import { EnergyScale } from "./EnergyScale";
import { FloorPlansViewer } from "./FloorPlansViewer";
import { NearbyFacilities } from "./NearbyFacilities";
import { ScheduleViewingModal } from "./ScheduleViewingModal";
import { RequestInfoModal } from "./RequestInfoModal";
import { StickyMobileBar } from "./StickyMobileBar";
import { PropertyCard } from "./PropertyCard";
import { PropertyDetailsHeader } from "./PropertyDetailsHeader";
import { PropertyAdvisorSidebar } from "./PropertyAdvisorSidebar";
import { useToast } from "@/components/ui/Toast";
import { useFavourites } from "@/hooks/useFavourites";

interface PropertyDetailsClientProps {
  property: Property;
  agent?: Agent;
  similarProperties: Property[];
}

export function PropertyDetailsClient({ property, agent, similarProperties }: PropertyDetailsClientProps) {
  const { toast } = useToast();
  const { isFavourite, toggle } = useFavourites();
  const [viewingOpen, setViewingOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const saved = isFavourite(property.id);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast("Dossier Link Copied", "Direct listing link copied to clipboard.");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="pb-24">
      <PropertyDetailsHeader
        property={property}
        saved={saved}
        copied={copied}
        onToggleSaved={() => toggle(property.id)}
        onShare={handleShare}
        onPrint={() => { if (typeof window !== "undefined") window.print(); }}
      />

      <PropertyGallery images={property.images} title={property.title} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        <div className="lg:col-span-8 space-y-10">
          <div>
            <h3 className="font-serif text-2xl text-charcoal mb-4">Architectural Overview</h3>
            <p className="text-sm font-sans text-warm-grey leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-sans uppercase tracking-eyebrow text-brass mb-3">Key Features & Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans text-charcoal">
              {property.amenities.map((amenity, i) => (
                <div key={i} className="p-2.5 bg-white border border-stone-border rounded-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <SpecsTable property={property} />
          <EnergyScale currentLabel={property.energyLabel} />
          <FloorPlansViewer floorPlans={property.floorPlans} title={property.title} />
          <NearbyFacilities city={property.city} />
        </div>

        <div className="lg:col-span-4">
          <PropertyAdvisorSidebar
            property={property}
            agent={agent}
            onScheduleViewing={() => setViewingOpen(true)}
            onRequestInfo={() => setInfoOpen(true)}
          />
        </div>
      </div>

      {similarProperties.length > 0 && (
        <div className="mt-20 pt-12 border-t border-stone-border">
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-8">Complementary Dutch Residences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

      <ScheduleViewingModal isOpen={viewingOpen} onClose={() => setViewingOpen(false)} property={property} />
      <RequestInfoModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} property={property} />
      <StickyMobileBar property={property} onScheduleViewing={() => setViewingOpen(true)} onRequestInfo={() => setInfoOpen(true)} />
    </div>
  );
}
