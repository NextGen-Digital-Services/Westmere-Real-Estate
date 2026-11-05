import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 text-[11px] sm:text-[12px] font-sans uppercase tracking-eyebrow mb-3",
          align === "center" && "justify-center",
          dark ? "text-brass" : "text-brass"
        )}
      >
        {number && <span className="font-medium">{number}</span>}
        {number && eyebrow && <span className="h-px w-6 bg-brass" />}
        {eyebrow && <span>{eyebrow}</span>}
      </div>

      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight",
          dark ? "text-marble" : "text-charcoal"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg font-sans font-normal leading-relaxed max-w-2xl",
            dark ? "text-marble/80" : "text-warm-grey"
          )}
        >
          {description}
        </p>
      )}

      <div
        className={cn(
          "mt-6 h-px w-16 bg-brass/50",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
