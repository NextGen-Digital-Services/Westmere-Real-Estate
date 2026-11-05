"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LOCATIONS, LocationCity } from "@/data/locations";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Plus, Star, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";

export default function AdminLocationsPage() {
  const { toast } = useToast();
  const [locations, setLocations] = useState<LocationCity[]>(LOCATIONS);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleToggleFeatured = (id: string) => {
    setLocations((prev) =>
      prev.map((l) => (l.id === id ? { ...l, featured: !l.featured } : l))
    );
    toast("Location Updated", "Featured visibility toggled.");
  };

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newCity: LocationCity = {
      id: `loc-${Date.now()}`,
      name,
      slug: slugify(name),
      count: 0,
      image: imageUrl || "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
      tagline: tagline || "Dutch Municipality Enclave",
      description: "Prime residential and commercial district.",
      featured: false,
    };
    setLocations([newCity, ...locations]);
    setName("");
    setTagline("");
    setImageUrl("");
    toast("Municipality Registered", `${name} added to coverage.`);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-serif text-3xl text-charcoal">Dutch Municipalities & Locations</h1>
        <p className="text-xs text-warm-grey font-sans">Manage municipal hubs, featured regional spotlights, and photography.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleAddCity} className="lg:col-span-4 bg-white border border-stone-border p-6 rounded-sm space-y-4">
          <h3 className="font-serif text-lg text-charcoal">Add Dutch Municipality</h3>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">City Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Amstelveen" className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Tagline</label>
            <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Green Suburban Estates" className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Image URL</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>
          <Button type="submit" variant="primary" fullWidth size="md"><Plus className="w-3.5 h-3.5 mr-1.5" /> Register Location</Button>
        </form>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locations.map((loc) => (
            <div key={loc.id} className="bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between">
              <div className="relative h-36">
                <Image src={loc.image} alt={loc.name} fill sizes="300px" className="object-cover" />
                <button
                  onClick={() => handleToggleFeatured(loc.id)}
                  className={`absolute top-2 right-2 p-1.5 rounded-sm border ${
                    loc.featured ? "bg-brass text-white border-brass" : "bg-white/90 text-charcoal border-stone-border"
                  }`}
                  title={loc.featured ? "Featured on Home" : "Make Featured"}
                >
                  <Star className={`w-3.5 h-3.5 ${loc.featured ? "fill-white" : ""}`} />
                </button>
              </div>
              <div className="p-4 flex items-center justify-between text-xs font-sans">
                <div>
                  <h4 className="font-serif text-lg text-charcoal">{loc.name}</h4>
                  <p className="text-[10px] text-warm-grey uppercase tracking-eyebrow">{loc.tagline}</p>
                </div>
                <span className="font-medium text-brass">{loc.count} Properties</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
