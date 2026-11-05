"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Property, ListingType, PropertyType, EnergyLabel, AvailabilityStatus, OwnershipType } from "@/types";
import { getStoredProperties, saveStoredProperties } from "@/lib/storage";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { slugify } from "@/lib/utils";
import { PropertyFormGallery } from "./PropertyFormGallery";
import { PropertyFormSpecs } from "./PropertyFormSpecs";

interface PropertyFormProps {
  initialProperty?: Property;
}

export function PropertyForm({ initialProperty }: PropertyFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initialProperty);

  const [title, setTitle] = useState(initialProperty?.title || "");
  const [price, setPrice] = useState(initialProperty?.price || 1500000);
  const [listingType, setListingType] = useState<ListingType>(initialProperty?.listingType || "buy");
  const [type, setType] = useState<PropertyType>(initialProperty?.type || "Canal House");
  const [city, setCity] = useState(initialProperty?.city || "Amsterdam");
  const [street, setStreet] = useState(initialProperty?.street || "");
  const [postalCode, setPostalCode] = useState(initialProperty?.postalCode || "1016 AA");
  const [livingArea, setLivingArea] = useState(initialProperty?.livingArea || 220);
  const [bedrooms, setBedrooms] = useState(initialProperty?.bedrooms || 4);
  const [energyLabel, setEnergyLabel] = useState<EnergyLabel>(initialProperty?.energyLabel || "A");
  const [availability, setAvailability] = useState<AvailabilityStatus>(initialProperty?.availability || "Available");
  const [agentId, setAgentId] = useState(initialProperty?.agentId || "agent-1");
  const [description, setDescription] = useState(initialProperty?.description || "Exceptional Dutch architectural residence.");
  const [images, setImages] = useState<string[]>(initialProperty?.images || [IMAGES.cities.amsterdam, IMAGES.interiors.livingModern]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = getStoredProperties();
    const slug = initialProperty?.slug || slugify(`${title}-${city}`);

    const propertyData: Property = {
      id: initialProperty?.id || `prop-${Date.now()}`,
      propertyCode: initialProperty?.propertyCode || `NL-${Math.floor(10000 + Math.random() * 90000)}`,
      title,
      slug,
      listingType,
      category: listingType === "commercial" ? "commercial" : "residential",
      type,
      price: Number(price),
      city,
      street,
      postalCode,
      livingArea: Number(livingArea),
      bedrooms: Number(bedrooms),
      bathrooms: initialProperty?.bathrooms || 2,
      energyLabel,
      constructionYear: initialProperty?.constructionYear || 1900,
      description,
      images: images.length > 0 ? images : [IMAGES.cities.amsterdam],
      floorPlans: initialProperty?.floorPlans || [IMAGES.floorplans.standard],
      amenities: initialProperty?.amenities || ["Historic Stucco", "Underfloor Heating", "Wine Vault"],
      availability,
      featured: initialProperty?.featured || false,
      createdAt: initialProperty?.createdAt || new Date().toISOString().substring(0, 10),
      lat: initialProperty?.lat || 52.3676,
      lng: initialProperty?.lng || 4.9041,
      heatingType: "Hybrid Heat Pump",
      outdoorSpace: "Private Canal Courtyard",
      parking: "Permit parking",
      ownershipType: "Freehold (Eigen grond)",
      agentId,
    };

    const updatedList = isEdit
      ? current.map((p) => (p.id === propertyData.id ? propertyData : p))
      : [propertyData, ...current];

    saveStoredProperties(updatedList);
    toast(isEdit ? "Listing Updated" : "Listing Created", `${propertyData.propertyCode} saved.`);
    router.push("/admin/properties");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-stone-border rounded-sm p-6 sm:p-10 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
        <div>
          <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Asking Price (€) *</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
      </div>

      <PropertyFormSpecs
        listingType={listingType} onListingTypeChange={setListingType}
        type={type} onTypeChange={setType}
        availability={availability} onAvailabilityChange={setAvailability}
        city={city} onCityChange={setCity}
        street={street} onStreetChange={setStreet}
        postalCode={postalCode} onPostalCodeChange={setPostalCode}
        livingArea={livingArea} onLivingAreaChange={setLivingArea}
        bedrooms={bedrooms} onBedroomsChange={setBedrooms}
        energyLabel={energyLabel} onEnergyLabelChange={setEnergyLabel}
        agentId={agentId} onAgentIdChange={setAgentId}
      />

      <div>
        <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Architectural Description</label>
        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
      </div>

      <PropertyFormGallery
        images={images}
        newImageUrl={newImageUrl}
        onNewUrlChange={setNewImageUrl}
        onAddImage={() => { if (newImageUrl) { setImages([...images, newImageUrl]); setNewImageUrl(""); } }}
        onRemoveImage={(idx) => setImages(images.filter((_, i) => i !== idx))}
      />

      <div className="pt-6 border-t border-stone-border flex justify-end gap-3">
        <Button variant="outline" size="md" onClick={() => router.push("/admin/properties")}>Cancel</Button>
        <Button variant="primary" size="md" type="submit">{isEdit ? "Update Property" : "Publish Listing"}</Button>
      </div>
    </form>
  );
}
