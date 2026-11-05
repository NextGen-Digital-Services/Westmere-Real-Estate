import React from "react";
import { EnergyLabel } from "@/types";
import { cn } from "@/lib/utils";

interface EnergyScaleProps {
  currentLabel: EnergyLabel;
  className?: string;
}

const SCALE: { label: EnergyLabel; color: string; width: string }[] = [
  { label: "A++++", color: "bg-[#2E6B38]", width: "w-24" },
  { label: "A+++", color: "bg-[#387C3E]", width: "w-28" },
  { label: "A++", color: "bg-[#48924A]", width: "w-32" },
  { label: "A+", color: "bg-[#5EAA58]", width: "w-36" },
  { label: "A", color: "bg-[#78BD64]", width: "w-40" },
  { label: "B", color: "bg-[#A7CD55]", width: "w-44" },
  { label: "C", color: "bg-[#D8D44A]", width: "w-48" },
  { label: "D", color: "bg-[#E5B53B]", width: "w-52" },
  { label: "E", color: "bg-[#E2872D]", width: "w-56" },
  { label: "F", color: "bg-[#DB5B28]", width: "w-60" },
  { label: "G", color: "bg-[#C93325]", width: "w-64" },
];

export function EnergyScale({ currentLabel, className }: EnergyScaleProps) {
  return (
    <div className={cn("p-6 bg-white border border-stone-border rounded-sm", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-stone-border pb-3">
        <div>
          <h4 className="font-serif text-lg text-charcoal">Energy Efficiency Rating</h4>
          <p className="text-xs text-warm-grey font-sans">
            Netherlands EPA Certified Assessment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-warm-grey">Certified:</span>
          <span className="px-3 py-1 bg-olive text-white font-sans font-bold text-sm rounded-sm">
            {currentLabel}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 pt-2">
        {SCALE.map((item) => {
          const isMatch = item.label === currentLabel;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className={cn(
                  "h-6 flex items-center justify-between px-2.5 text-white font-sans text-xs font-bold rounded-sm transition-all",
                  item.color,
                  item.width,
                  isMatch && "ring-2 ring-charcoal ring-offset-2 scale-105 z-10 font-extrabold"
                )}
              >
                <span>{item.label}</span>
                {isMatch && <span className="text-[10px] tracking-wide uppercase">Current</span>}
              </div>
              {isMatch && (
                <span className="text-xs font-sans text-charcoal font-medium">
                  Verified Energy Label for this residence
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
