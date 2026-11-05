"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: "md" | "lg" | "xl";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = "right",
  width = "lg",
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widths = {
    md: "max-w-md",
    lg: "max-w-xl",
    xl: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-charcoal/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={cn("fixed inset-y-0 flex max-w-full", position === "right" ? "right-0" : "left-0")}>
        <div
          className={cn(
            "w-screen bg-white border-l border-stone-border shadow-none flex flex-col h-full",
            widths[width]
          )}
        >
          <div className="p-6 border-b border-stone-border flex items-center justify-between bg-marble/40">
            <div>
              {title && <h3 className="font-serif text-xl text-charcoal">{title}</h3>}
              {subtitle && <p className="text-xs text-warm-grey mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-warm-grey hover:text-charcoal transition-colors rounded-sm"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
