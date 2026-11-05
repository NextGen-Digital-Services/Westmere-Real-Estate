"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, Download, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FloorPlansViewerProps {
  floorPlans: string[];
  title: string;
}

export function FloorPlansViewer({ floorPlans, title }: FloorPlansViewerProps) {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  if (!floorPlans || floorPlans.length === 0) return null;

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-border gap-3">
        <div>
          <h4 className="font-serif text-lg text-charcoal flex items-center gap-2">
            <Layers className="w-4 h-4 text-brass" />
            Architectural Floor Plans & Layout
          </h4>
          <p className="text-xs text-warm-grey font-sans">
            Scale-accurate interior blueprint and spatial configuration
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoomed(!zoomed)}
            className="text-xs"
          >
            <ZoomIn className="w-3.5 h-3.5 mr-1" />
            {zoomed ? "Reset Scale" : "Zoom Layout"}
          </Button>
          <a
            href={floorPlans[selectedPlan]}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-xs font-sans uppercase tracking-eyebrow border border-stone-border px-3 py-1.5 rounded-sm hover:bg-travertine/40 text-charcoal inline-flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Blueprint
          </a>
        </div>
      </div>

      <div className="relative mt-6 h-80 sm:h-[450px] w-full bg-marble/40 border border-stone-border/40 rounded-sm overflow-hidden flex items-center justify-center">
        <div
          className={`relative w-full h-full transition-transform duration-300 ${
            zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => setZoomed(!zoomed)}
        >
          <Image
            src={floorPlans[selectedPlan]}
            alt={`${title} - Architectural Floorplan Level ${selectedPlan + 1}`}
            fill
            className="object-contain p-4"
          />
        </div>
      </div>

      {floorPlans.length > 1 && (
        <div className="flex gap-2 mt-4">
          {floorPlans.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedPlan(i)}
              className={`text-xs font-sans uppercase tracking-eyebrow px-3 py-1.5 rounded-sm border ${
                selectedPlan === i
                  ? "bg-olive text-white border-olive"
                  : "bg-white text-charcoal border-stone-border hover:bg-travertine/40"
              }`}
            >
              Floor Level {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
