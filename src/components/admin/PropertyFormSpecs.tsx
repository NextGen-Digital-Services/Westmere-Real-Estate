"use client";

import React from "react";
import { ListingType, PropertyType, EnergyLabel, AvailabilityStatus } from "@/types";
import { AGENTS } from "@/data/agents";

interface PropertyFormSpecsProps {
  listingType: ListingType;
  onListingTypeChange: (val: ListingType) => void;
  type: PropertyType;
  onTypeChange: (val: PropertyType) => void;
  availability: AvailabilityStatus;
  onAvailabilityChange: (val: AvailabilityStatus) => void;
  city: string;
  onCityChange: (val: string) => void;
  street: string;
  onStreetChange: (val: string) => void;
  postalCode: string;
  onPostalCodeChange: (val: string) => void;
  livingArea: number;
  onLivingAreaChange: (val: number) => void;
  bedrooms: number;
  onBedroomsChange: (val: number) => void;
  energyLabel: EnergyLabel;
  onEnergyLabelChange: (val: EnergyLabel) => void;
  agentId: string;
  onAgentIdChange: (val: string) => void;
}

export function PropertyFormSpecs({
  listingType, onListingTypeChange,
  type, onTypeChange,
  availability, onAvailabilityChange,
  city, onCityChange,
  street, onStreetChange,
  postalCode, onPostalCodeChange,
  livingArea, onLivingAreaChange,
  bedrooms, onBedroomsChange,
  energyLabel, onEnergyLabelChange,
  agentId, onAgentIdChange,
}: PropertyFormSpecsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Listing Type</label>
          <select value={listingType} onChange={(e) => onListingTypeChange(e.target.value as ListingType)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm">
            <option value="buy">Acquisition (Buy)</option>
            <option value="rent">Lease (Rent)</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Type</label>
          <select value={type} onChange={(e) => onTypeChange(e.target.value as PropertyType)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm">
            {["Canal House", "Villa", "Penthouse", "Apartment", "House", "Office"].map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Status</label>
          <select value={availability} onChange={(e) => onAvailabilityChange(e.target.value as AvailabilityStatus)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm">
            {["Available", "Under Offer", "Sold", "Rented"].map((a) => (<option key={a} value={a}>{a}</option>))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Municipality</label>
          <input type="text" value={city} onChange={(e) => onCityChange(e.target.value)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Street</label>
          <input type="text" value={street} onChange={(e) => onStreetChange(e.target.value)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Postal Code</label>
          <input type="text" value={postalCode} onChange={(e) => onPostalCodeChange(e.target.value)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Area (m²)</label>
          <input type="number" value={livingArea} onChange={(e) => onLivingAreaChange(Number(e.target.value))} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Bedrooms</label>
          <input type="number" value={bedrooms} onChange={(e) => onBedroomsChange(Number(e.target.value))} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Energy Rating</label>
          <select value={energyLabel} onChange={(e) => onEnergyLabelChange(e.target.value as EnergyLabel)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm">
            {["A++++", "A+++", "A++", "A+", "A", "B", "C", "D"].map((l) => (<option key={l} value={l}>{l}</option>))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Advisor</label>
          <select value={agentId} onChange={(e) => onAgentIdChange(e.target.value)} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm">
            {AGENTS.map((a) => (<option key={a.id} value={a.id}>{a.name}</option>))}
          </select>
        </div>
      </div>
    </div>
  );
}
