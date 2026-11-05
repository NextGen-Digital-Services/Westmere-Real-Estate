import React from "react";
import { Property } from "@/types";
import { formatEUR, formatArea } from "@/lib/utils";

interface SpecsTableProps {
  property: Property;
}

export function SpecsTable({ property }: SpecsTableProps) {
  const specs = [
    { label: "Property Code", value: property.propertyCode },
    { label: "Category / Type", value: `${property.category} • ${property.type}` },
    { label: "Living Area", value: formatArea(property.livingArea) },
    { label: "Plot Area", value: property.plotArea ? formatArea(property.plotArea) : "Not applicable (Apartment)" },
    { label: "Bedrooms / Bathrooms", value: `${property.bedrooms} Beds • ${property.bathrooms} Baths` },
    { label: "Construction Year", value: `${property.constructionYear}` },
    { label: "Energy Rating", value: `Label ${property.energyLabel}` },
    { label: "Ownership Structure", value: property.ownershipType },
    { label: "WOZ Municipal Value", value: property.wozValue ? formatEUR(property.wozValue) : "Confidential / Pending" },
    { label: "VvE Service Charges", value: property.vveContributionMonthly ? `${formatEUR(property.vveContributionMonthly)} / month` : "None (Individual Freehold)" },
    { label: "Heating & Climate", value: property.heatingType },
    { label: "Outdoor Amenity", value: property.outdoorSpace },
    { label: "Parking Provisions", value: property.parking },
    { label: "Statutory Transfer Tax", value: property.transferTaxNote || "2% Owner-Occupier / 10.4% Investor" },
  ];

  return (
    <div className="bg-white border border-stone-border rounded-sm overflow-hidden">
      <div className="p-5 border-b border-stone-border bg-marble/30">
        <h4 className="font-serif text-lg text-charcoal">Netherlands Statutory Specifications</h4>
        <p className="text-xs text-warm-grey font-sans">Cadastral and technical property dossier</p>
      </div>
      <div className="divide-y divide-stone-border/60">
        {specs.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-5 text-xs font-sans hover:bg-travertine/20 transition-colors"
          >
            <span className="text-warm-grey uppercase tracking-wider text-[11px] font-medium">
              {item.label}
            </span>
            <span className="text-charcoal font-medium mt-1 sm:mt-0 sm:text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
