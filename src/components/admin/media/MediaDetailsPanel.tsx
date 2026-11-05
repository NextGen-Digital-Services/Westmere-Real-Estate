"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Copy, FileText } from "lucide-react";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "pdf" | "video";
  size: string;
  date: string;
}

interface MediaDetailsPanelProps {
  item: MediaItem;
  onCopyUrl: (url: string) => void;
}

export function MediaDetailsPanel({ item, onCopyUrl }: MediaDetailsPanelProps) {
  return (
    <div className="bg-white border border-stone-border p-6 rounded-sm space-y-4 text-xs font-sans">
      <h4 className="font-serif text-lg text-charcoal">Asset Metadata</h4>
      <div className="relative h-44 w-full rounded-sm overflow-hidden border border-stone-border bg-marble">
        {item.type === "image" ? (
          <Image src={item.url} alt={item.name} fill sizes="300px" className="object-cover" />
        ) : (
          <div className="h-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-brass" />
          </div>
        )}
      </div>
      <div className="space-y-1.5 pt-2">
        <p><strong className="text-charcoal">Filename:</strong> {item.name}</p>
        <p><strong className="text-charcoal">Type:</strong> {item.type.toUpperCase()}</p>
        <p><strong className="text-charcoal">Size:</strong> {item.size}</p>
        <p><strong className="text-charcoal">Registered:</strong> {item.date}</p>
      </div>
      <div className="pt-3 border-t border-stone-border flex gap-2">
        <Button size="sm" variant="outline" fullWidth onClick={() => onCopyUrl(item.url)}>
          <Copy className="w-3.5 h-3.5 mr-1" /> Copy URL
        </Button>
      </div>
    </div>
  );
}
