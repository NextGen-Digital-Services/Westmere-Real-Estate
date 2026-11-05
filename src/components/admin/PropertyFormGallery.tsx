"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Trash2, ImagePlus } from "lucide-react";

interface PropertyFormGalleryProps {
  images: string[];
  newImageUrl: string;
  onNewUrlChange: (url: string) => void;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export function PropertyFormGallery({
  images,
  newImageUrl,
  onNewUrlChange,
  onAddImage,
  onRemoveImage,
}: PropertyFormGalleryProps) {
  return (
    <div>
      <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-2">
        Photo Gallery URLs ({images.length} images)
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="url"
          value={newImageUrl}
          onChange={(e) => onNewUrlChange(e.target.value)}
          placeholder="Paste Unsplash or HTTPS image URL..."
          className="flex-1 text-xs p-2 bg-marble/20 border border-stone-border rounded-sm"
        />
        <Button type="button" variant="outline" size="sm" onClick={onAddImage}>
          <ImagePlus className="w-3.5 h-3.5 mr-1" /> Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-20 h-16 rounded-sm overflow-hidden border border-stone-border group">
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => onRemoveImage(idx)}
              className="absolute inset-0 bg-charcoal/60 text-marble flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4 text-terracotta" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
