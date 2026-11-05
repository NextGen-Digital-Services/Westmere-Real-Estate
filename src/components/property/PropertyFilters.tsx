"use client";

import React, { useState } from "react";
import { Filter, RotateCcw, ChevronDown } from "lucide-react";
import { FilterState } from "@/types";
import { Button } from "@/components/ui/Button";

interface PropertyFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

const CITIES = ["All Cities", "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Haarlem", "Leiden", "Delft", "Groningen", "Maastricht", "Breda", "Almere"];
const TYPES = ["All Types", "Apartment", "House", "Villa", "Canal House", "Penthouse", "Office"];
const BEDROOMS = ["Any", "1", "2", "3", "4", "5+"];
const ENERGY_LABELS = ["Any", "A++++", "A+++", "A++", "A+", "A", "B", "C", "D"];
const STATUSES = ["All", "Available", "Under Offer", "Sold", "Rented"];

export function PropertyFilters({ filters, onChange, onReset }: PropertyFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const update = (key: keyof FilterState, val: unknown) => {
    onChange({ ...filters, [key]: val });
  };

  return (
    <div className="bg-white border border-stone-border rounded-sm p-4 sm:p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1.5">
            Municipality
          </label>
          <select
            value={filters.city || "All Cities"}
            onChange={(e) => update("city", e.target.value === "All Cities" ? "" : e.target.value)}
            className="w-full bg-marble/40 border border-stone-border rounded-sm px-3 py-2 text-xs font-sans text-charcoal focus:outline-none focus:border-charcoal"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1.5">
            Property Type
          </label>
          <select
            value={filters.propertyType || "All Types"}
            onChange={(e) => update("propertyType", e.target.value === "All Types" ? "" : e.target.value)}
            className="w-full bg-marble/40 border border-stone-border rounded-sm px-3 py-2 text-xs font-sans text-charcoal focus:outline-none focus:border-charcoal"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1.5">
            Max Price (€)
          </label>
          <select
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", Number(e.target.value))}
            className="w-full bg-marble/40 border border-stone-border rounded-sm px-3 py-2 text-xs font-sans text-charcoal focus:outline-none focus:border-charcoal"
          >
            <option value={10000000}>No Maximum</option>
            <option value={1500000}>Up to € 1.500.000</option>
            <option value={2500000}>Up to € 2.500.000</option>
            <option value={3500000}>Up to € 3.500.000</option>
            <option value={5000000}>Up to € 5.000.000</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <Button
            variant="outline"
            size="md"
            className="flex-1 text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            {expanded ? "Fewer Filters" : "More Filters"}
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={onReset}
            className="p-2 border border-stone-border"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4 text-warm-grey" />
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4 border-t border-stone-border/60">
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1.5">
              Bedrooms
            </label>
            <select
              value={filters.bedrooms || "Any"}
              onChange={(e) => update("bedrooms", e.target.value === "Any" ? "" : e.target.value)}
              className="w-full bg-marble/40 border border-stone-border rounded-sm px-3 py-2 text-xs font-sans text-charcoal focus:outline-none"
            >
              {BEDROOMS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1.5">
              Energy Rating
            </label>
            <select
              value={filters.energyLabel || "Any"}
              onChange={(e) => update("energyLabel", e.target.value === "Any" ? "" : e.target.value)}
              className="w-full bg-marble/40 border border-stone-border rounded-sm px-3 py-2 text-xs font-sans text-charcoal focus:outline-none"
            >
              {ENERGY_LABELS.map((el) => (
                <option key={el} value={el}>{el}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1.5">
              Availability
            </label>
            <select
              value={filters.availability || "All"}
              onChange={(e) => update("availability", e.target.value === "All" ? "" : e.target.value)}
              className="w-full bg-marble/40 border border-stone-border rounded-sm px-3 py-2 text-xs font-sans text-charcoal focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
