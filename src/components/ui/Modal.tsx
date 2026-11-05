"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "lg",
}: ModalProps) {
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

  const maxWidths = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-xl",
    xl: "max-w-2xl",
    "2xl": "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-fade transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative w-full bg-white border border-stone-border rounded-sm shadow-none p-6 sm:p-8 z-10 my-8",
          maxWidths[maxWidth]
        )}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-warm-grey hover:text-charcoal transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <div className="mb-6 pr-8">
            <h3 className="font-serif text-2xl font-normal text-charcoal">{title}</h3>
            {description && (
              <p className="mt-1.5 text-sm text-warm-grey font-sans">{description}</p>
            )}
            <div className="mt-4 h-px w-12 bg-brass" />
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
