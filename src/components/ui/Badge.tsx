import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "available" | "underOffer" | "sold" | "rented" | "neutral" | "brass" | "energy";
}

export function Badge({ children, className, variant = "neutral", ...props }: BadgeProps) {
  const base = "inline-flex items-center px-2.5 py-0.5 text-[11px] font-sans uppercase tracking-eyebrow font-medium rounded-sm border";

  const variants = {
    available: "bg-sage/15 text-sage border-sage/30",
    underOffer: "bg-brass/15 text-brass border-brass/30",
    sold: "bg-terracotta/15 text-terracotta border-terracotta/30",
    rented: "bg-charcoal/10 text-charcoal border-stone-border",
    neutral: "bg-travertine/60 text-charcoal border-stone-border",
    brass: "bg-brass text-white border-brass",
    energy: "bg-olive text-marble border-olive",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
