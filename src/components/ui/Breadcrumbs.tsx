import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  dark?: boolean;
}

export function Breadcrumbs({ items, className, dark = false }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-xs font-sans tracking-wide", className)}
    >
      <Link
        href="/"
        className={cn(
          "transition-colors",
          dark ? "text-marble/70 hover:text-marble" : "text-warm-grey hover:text-charcoal"
        )}
      >
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight
              className={cn("w-3.5 h-3.5 shrink-0", dark ? "text-marble/40" : "text-stone-border")}
            />
            {isLast || !item.href ? (
              <span
                className={cn("font-medium truncate", dark ? "text-marble" : "text-charcoal")}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors truncate",
                  dark ? "text-marble/70 hover:text-marble" : "text-warm-grey hover:text-charcoal"
                )}
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
