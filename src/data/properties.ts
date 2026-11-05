import { Property } from "@/types";
import { PROPERTIES_PART_1 } from "./properties-part1";
import { PROPERTIES_PART_2 } from "./properties-part2";

export const PROPERTIES: Property[] = [
  ...PROPERTIES_PART_1,
  ...PROPERTIES_PART_2,
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id || p.propertyCode === id);
}

export function getFeaturedProperties(): Property[] {
  return PROPERTIES.filter((p) => p.featured);
}

export function getRecentProperties(count = 6): Property[] {
  return [...PROPERTIES]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}
