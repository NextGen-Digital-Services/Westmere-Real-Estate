import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark" | "ghost" | "brass";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      type = "button",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans uppercase font-medium tracking-eyebrow transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal disabled:opacity-50 disabled:pointer-events-none rounded-sm select-none";

    const variants = {
      primary:
        "bg-olive text-marble hover:bg-cypress border border-olive active:bg-charcoal",
      secondary:
        "bg-travertine text-charcoal hover:bg-stone-border/50 border border-stone-border",
      outline:
        "bg-transparent text-charcoal hover:bg-travertine/60 border border-stone-border hover:border-charcoal",
      dark:
        "bg-cypress text-marble hover:bg-charcoal border border-cypress",
      ghost:
        "bg-transparent text-charcoal hover:text-olive hover:bg-travertine/40 border border-transparent",
      brass:
        "bg-brass text-white hover:bg-brass/90 border border-brass",
    };

    const sizes = {
      sm: "text-[11px] px-3.5 py-1.5 h-8",
      md: "text-[12px] px-5 py-2.5 h-10",
      lg: "text-[13px] px-7 py-3.5 h-12",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
