"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Property, FilterState } from "@/types";
import { getStoredProperties } from "@/lib/storage";
import { PropertyFilters } from "./PropertyFilters";
import { FilterChips } from "./FilterChips";
import { ListingHeaderBar } from "./ListingHeaderBar";
import { PropertyGrid } from "./PropertyGrid";
import { PropertyMap } from "./PropertyMap";
import { Pagination } from "@/components/ui/Pagination";

interface ListingExplorerProps {
  initialListingType?: "buy" | "rent" | "commercial";
}

const ITEMS_PER_PAGE = 9;

export function ListingExplorer({ initialListingType }: ListingExplorerProps) {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const defaultFilters: FilterState = {
    city: searchParams.get("city") || "",
    propertyType: searchParams.get("type") || "",
    listingType: initialListingType || searchParams.get("listingType") || "",
    minPrice: 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000000,
    minArea: 0,
    maxArea: 5000,
    bedrooms: searchParams.get("bedrooms") || "",
    energyLabel: "",
    availability: "",
    sortBy: "newest",
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  useEffect(() => {
    setProperties(getStoredProperties());
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filters.listingType && p.listingType !== filters.listingType) return false;
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.propertyType && p.type !== filters.propertyType) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.bedrooms) {
        const minBeds = parseInt(filters.bedrooms);
        if (p.bedrooms < minBeds) return false;
      }
      if (filters.energyLabel && p.energyLabel !== filters.energyLabel) return false;
      if (filters.availability && p.availability !== filters.availability) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.price - b.price;
      if (filters.sortBy === "price-desc") return b.price - a.price;
      if (filters.sortBy === "area-desc") return b.livingArea - a.livingArea;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleChipRemove = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: key === "maxPrice" ? 10000000 : "" }));
  };

  return (
    <div>
      <PropertyFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={() => setFilters(defaultFilters)}
      />
      <FilterChips
        filters={filters}
        onRemove={handleChipRemove}
        onClearAll={() => setFilters(defaultFilters)}
      />
      <ListingHeaderBar
        totalCount={filteredProperties.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={filters.sortBy || "newest"}
        onSortChange={(sort) => setFilters((prev) => ({ ...prev, sortBy: sort }))}
      />
      {viewMode === "map" ? (
        <PropertyMap properties={filteredProperties} />
      ) : (
        <>
          <PropertyGrid properties={paginatedProperties} viewMode={viewMode} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
