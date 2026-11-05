export * from "./property";
export * from "./admin";

export interface FilterState {
  city: string;
  propertyType: string;
  listingType: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  bedrooms: string;
  energyLabel: string;
  availability: string;
  searchQuery?: string;
  sortBy?: "newest" | "price-asc" | "price-desc" | "area-desc";
}
