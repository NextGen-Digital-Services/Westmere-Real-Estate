"use client";

import React from "react";
import { X } from "lucide-react";
import { FilterState } from "@/types";

interface FilterChipsProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState) => void;
  onClearAll: () => void;
}

export function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
  const activeChips: { key: keyof FilterState; label: string }[] = [];

  if (filters.city) activeChips.push({ key: "city", label: `City: ${filters.city}` });
  if (filters.propertyType) activeChips.push({ key: "propertyType", label: `Type: ${filters.propertyType}` });
  if (filters.minPrice > 0) activeChips.push({ key: "minPrice", label: `Min: €${filters.minPrice.toLocaleString()}` });
  if (filters.maxPrice < 10000000) activeChips.push({ key: "maxPrice", label: `Max: €${filters.maxPrice.toLocaleString()}` });
  if (filters.minArea > 0) activeChips.push({ key: "minArea", label: `Min: ${filters.minArea} m²` });
  if (filters.bedrooms) activeChips.push({ key: "bedrooms", label: `${filters.bedrooms}+ Beds` });
  if (filters.energyLabel) activeChips.push({ key: "energyLabel", label: `Label: ${filters.energyLabel}` });
  if (filters.availability) activeChips.push({ key: "availability", label: `Status: ${filters.availability}` });

  if (activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      <span className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey">
        Active Filters:
      </span>
      {activeChips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-border text-charcoal text-xs rounded-sm"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.key)}
            className="hover:text-terracotta"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs font-sans text-olive hover:text-cypress underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
}
