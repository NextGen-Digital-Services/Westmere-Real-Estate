export type ListingType = "buy" | "rent" | "commercial";
export type PropertyCategory = "residential" | "commercial" | "new_development";
export type PropertyType = "Apartment" | "House" | "Villa" | "Canal House" | "Penthouse" | "Office" | "Monument";
export type EnergyLabel = "A++++" | "A+++" | "A++" | "A+" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type AvailabilityStatus = "Available" | "Under Offer" | "Sold" | "Rented";
export type OwnershipType = "Freehold (Eigen grond)" | "Leasehold (Erfpacht)" | "Right of Superficies (Opstal)";

export interface Property {
  id: string;
  propertyCode: string;
  title: string;
  slug: string;
  listingType: ListingType;
  category: PropertyCategory;
  type: PropertyType;
  price: number;
  monthlyRent?: number;
  city: string;
  street: string;
  postalCode: string;
  livingArea: number; // m²
  plotArea?: number; // m²
  bedrooms: number;
  bathrooms: number;
  energyLabel: EnergyLabel;
  constructionYear: number;
  description: string;
  images: string[];
  videoPlaceholderUrl?: string;
  floorPlans: string[];
  amenities: string[];
  availability: AvailabilityStatus;
  featured: boolean;
  createdAt: string;
  lat: number;
  lng: number;
  wozValue?: number;
  vveContributionMonthly?: number;
  heatingType: string;
  outdoorSpace: string;
  parking: string;
  ownershipType: OwnershipType;
  transferTaxNote?: string;
  agentId: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  email: string;
  phone: string;
  languages: string[];
  assignedPropertyIds: string[];
  experienceYears: number;
  rating: number;
  activeListingsCount: number;
}
