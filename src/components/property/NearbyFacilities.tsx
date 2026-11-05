import React from "react";
import { Train, GraduationCap, ShoppingBag, Plane, Coffee, Shield } from "lucide-react";

interface NearbyFacilitiesProps {
  city: string;
}

export function NearbyFacilities({ city }: NearbyFacilitiesProps) {
  const facilities = [
    { icon: Train, name: "NS Central Station & Metro", distance: "450 meters (6 min walk)", type: "Transit" },
    { icon: GraduationCap, name: "International School & British School", distance: "1.4 km (5 min drive)", type: "Education" },
    { icon: ShoppingBag, name: "Organic Market & Albert Heijn XL", distance: "280 meters (3 min walk)", type: "Retail" },
    { icon: Coffee, name: "Canal-side Cafés & Michelin Dining", distance: "150 meters (2 min walk)", type: "Gastronomy" },
    { icon: Plane, name: "Amsterdam Schiphol Airport (AMS)", distance: "18 km (20 min direct train)", type: "Airport" },
    { icon: Shield, name: "Municipal Police & First Aid Clinic", distance: "800 meters (10 min walk)", type: "Emergency" },
  ];

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6">
      <div className="border-b border-stone-border pb-3 mb-4">
        <h4 className="font-serif text-lg text-charcoal">Location Infrastructure & Vicinity</h4>
        <p className="text-xs text-warm-grey font-sans">
          Proximity to transit links, elite schools, and cultural districts in {city}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {facilities.map((fac, idx) => {
          const Icon = fac.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-marble/30 border border-stone-border/60 rounded-sm"
            >
              <div className="p-2 bg-white border border-stone-border rounded-sm text-brass shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-sans font-medium text-charcoal truncate">{fac.name}</p>
                <p className="text-[11px] text-warm-grey font-sans">{fac.distance}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
