"use client";

import React from "react";
import { Property } from "@/types";
import { formatEUR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface StickyMobileBarProps {
  property: Property;
  onScheduleViewing: () => void;
  onRequestInfo: () => void;
}

export function StickyMobileBar({
  property,
  onScheduleViewing,
  onRequestInfo,
}: StickyMobileBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-stone-border p-3.5 flex items-center justify-between gap-3 shadow-none">
      <div className="min-w-0">
        <p className="font-serif text-lg font-medium text-charcoal truncate">
          {formatEUR(property.price)}
          {property.listingType === "rent" && <span className="text-xs font-sans text-warm-grey">/mo</span>}
        </p>
        <p className="text-[10px] text-warm-grey uppercase tracking-eyebrow truncate">
          {property.street}, {property.city}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button size="sm" variant="outline" onClick={onRequestInfo}>
          Inquire
        </Button>
        <Button size="sm" variant="primary" onClick={onScheduleViewing}>
          View
        </Button>
      </div>
    </div>
  );
}
