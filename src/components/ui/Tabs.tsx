import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "underline" | "pill";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "underline",
}: TabsProps) {
  if (variant === "pill") {
    return (
      <div className={cn("inline-flex bg-travertine/70 p-1 rounded-sm border border-stone-border", className)}>
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "px-4 py-2 text-xs font-sans uppercase tracking-eyebrow font-medium transition-all rounded-sm",
                isActive
                  ? "bg-white text-charcoal shadow-none border border-stone-border"
                  : "text-warm-grey hover:text-charcoal"
              )}
            >
              {t.label}
              {typeof t.count === "number" && (
                <span className="ml-2 text-[10px] text-warm-grey">({t.count})</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("border-b border-stone-border flex space-x-6 overflow-x-auto", className)}>
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "pb-3 text-xs font-sans uppercase tracking-eyebrow font-medium transition-colors relative whitespace-nowrap",
              isActive ? "text-olive font-semibold" : "text-warm-grey hover:text-charcoal"
            )}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span className="ml-2 text-[10px] text-warm-grey">({t.count})</span>
            )}
            {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-olive" />}
          </button>
        );
      })}
    </div>
  );
}
