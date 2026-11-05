"use client";

import React from "react";
import { LayoutGrid, List, Map } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListingHeaderBarProps {
  totalCount: number;
  viewMode: "grid" | "list" | "map";
  onViewModeChange: (mode: "grid" | "list" | "map") => void;
  sortBy: string;
  onSortChange: (sort: "newest" | "price-asc" | "price-desc" | "area-desc") => void;
}

export function ListingHeaderBar({
  totalCount,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}: ListingHeaderBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-stone-border/60 mb-8">
      <div>
        <p className="text-xs font-sans uppercase tracking-eyebrow text-warm-grey">
          Showing <span className="font-semibold text-charcoal">{totalCount}</span> Available Residences
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-sans">
          <label className="text-warm-grey hidden sm:inline">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "newest" | "price-asc" | "price-desc" | "area-desc")}
            className="bg-white border border-stone-border rounded-sm px-2.5 py-1.5 text-xs text-charcoal focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area-desc">Area: Largest First</option>
          </select>
        </div>

        <div className="flex items-center border border-stone-border rounded-sm bg-white p-0.5">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn("p-1.5 rounded-sm transition-colors", viewMode === "grid" ? "bg-travertine text-charcoal" : "text-warm-grey hover:text-charcoal")}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={cn("p-1.5 rounded-sm transition-colors", viewMode === "list" ? "bg-travertine text-charcoal" : "text-warm-grey hover:text-charcoal")}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("map")}
            className={cn("p-1.5 rounded-sm transition-colors", viewMode === "map" ? "bg-travertine text-charcoal" : "text-warm-grey hover:text-charcoal")}
            title="Interactive Map View"
          >
            <Map className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
