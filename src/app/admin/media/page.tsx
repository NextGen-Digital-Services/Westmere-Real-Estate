"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Search, FileText } from "lucide-react";
import { MediaDetailsPanel, MediaItem } from "@/components/admin/media/MediaDetailsPanel";

const INITIAL_MEDIA: MediaItem[] = [
  { id: "m-1", name: "amsterdam-keizersgracht-exterior.jpg", url: IMAGES.cities.amsterdam, type: "image", size: "2.4 MB", date: "2026-10-14" },
  { id: "m-2", name: "rotterdam-skyline-penthouse.jpg", url: IMAGES.cities.rotterdam, type: "image", size: "3.1 MB", date: "2026-10-12" },
  { id: "m-3", name: "the-hague-binnenhof-mansion.jpg", url: IMAGES.cities.theHague, type: "image", size: "1.9 MB", date: "2026-10-09" },
  { id: "m-4", name: "living-room-marble-interior.jpg", url: IMAGES.interiors.livingModern, type: "image", size: "2.8 MB", date: "2026-10-05" },
  { id: "m-5", name: "chef-kitchen-bespoke.jpg", url: IMAGES.interiors.kitchenMarble, type: "image", size: "2.2 MB", date: "2026-10-01" },
  { id: "m-6", name: "master-bedroom-suite.jpg", url: IMAGES.interiors.masterBedroom, type: "image", size: "2.0 MB", date: "2026-09-28" },
  { id: "m-7", name: "architectural-floorplan-l1.jpg", url: IMAGES.floorplans.standard, type: "image", size: "1.2 MB", date: "2026-09-20" },
  { id: "m-8", name: "rijksmonument-cadastral-dossier.pdf", url: "#", type: "pdf", size: "4.8 MB", date: "2026-09-15" },
];

export default function AdminMediaPage() {
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(media[0]);
  const [newUrl, setNewUrl] = useState("");

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    const item: MediaItem = {
      id: `m-${Date.now()}`,
      name: `media-${Date.now()}.jpg`,
      url: newUrl,
      type: "image",
      size: "2.0 MB",
      date: new Date().toISOString().substring(0, 10),
    };
    setMedia([item, ...media]);
    setNewUrl("");
    toast("Asset Registered", "Added to media library repository.");
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast("Asset URL Copied", "URL copied to clipboard.");
  };

  const filtered = media.filter((m) => {
    if (typeFilter !== "all" && m.type !== typeFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Media Library Repository</h1>
          <p className="text-xs text-warm-grey font-sans">High-resolution architectural photography, floorplans, and cadastral PDFs.</p>
        </div>

        <form onSubmit={handleAddUrl} className="flex gap-2">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Paste Unsplash / CDN Image URL..."
            className="text-xs p-2 bg-white border border-stone-border rounded-sm w-64"
          />
          <Button type="submit" variant="primary" size="sm">Register Asset</Button>
        </form>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files by name..."
            className="w-full text-xs p-2 pl-8 bg-white border border-stone-border rounded-sm"
          />
          <Search className="w-3.5 h-3.5 text-warm-grey absolute left-2.5 top-2.5" />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-xs p-2 bg-white border border-stone-border rounded-sm w-36"
        >
          <option value="all">All File Types</option>
          <option value="image">Images</option>
          <option value="pdf">PDF Dossiers</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className={`bg-white border rounded-sm overflow-hidden cursor-pointer transition-all ${
                selectedMedia?.id === item.id ? "border-olive ring-1 ring-olive" : "border-stone-border hover:border-charcoal/50"
              }`}
            >
              <div className="relative h-28 bg-marble flex items-center justify-center">
                {item.type === "image" ? (
                  <Image src={item.url} alt={item.name} fill sizes="200px" className="object-cover" />
                ) : (
                  <FileText className="w-10 h-10 text-stone-border stroke-[1.2]" />
                )}
              </div>
              <div className="p-2.5 text-[11px] font-sans">
                <p className="truncate font-medium text-charcoal">{item.name}</p>
                <p className="text-warm-grey text-[10px] mt-0.5">{item.size} • {item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedMedia && (
          <div className="lg:col-span-4">
            <MediaDetailsPanel item={selectedMedia} onCopyUrl={copyUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
