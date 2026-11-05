import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-2 pt-8", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 border border-stone-border bg-white text-charcoal hover:bg-travertine/40 disabled:opacity-40 disabled:pointer-events-none rounded-sm transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1 text-xs font-sans">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-sm transition-colors",
              currentPage === page
                ? "bg-olive text-marble font-medium border border-olive"
                : "border border-stone-border bg-white text-charcoal hover:bg-travertine/40"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 border border-stone-border bg-white text-charcoal hover:bg-travertine/40 disabled:opacity-40 disabled:pointer-events-none rounded-sm transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
