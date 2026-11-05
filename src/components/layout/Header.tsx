"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useFavourites } from "@/hooks/useFavourites";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count: favouritesCount } = useFavourites();

  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  const navLinks = [
    { href: "/buy", label: "Buy" },
    { href: "/rent", label: "Rent" },
    { href: "/commercial", label: "Commercial" },
    { href: "/projects", label: "Projects" },
    { href: "/valuation", label: "Valuation" },
    { href: "/services", label: "Services" },
    { href: "/tools", label: "Calculators" },
    { href: "/blog", label: "Journal" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-none border-stone-border py-3 shadow-none"
            : "bg-marble/90 border-transparent py-5"
        )}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-lg sm:text-xl tracking-[0.14em] font-normal text-charcoal group-hover:text-olive transition-colors">
              {SITE_CONFIG.name}
            </span>
            <span className="font-sans text-[9px] uppercase tracking-widest text-warm-grey">
              Netherlands Real Estate
            </span>
          </Link>

          <nav className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs font-sans uppercase tracking-eyebrow transition-colors relative py-1",
                    active
                      ? "text-olive font-semibold"
                      : "text-charcoal/80 hover:text-olive"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-olive" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-xs font-sans text-warm-grey space-x-1 border-r border-stone-border pr-4">
              <span className="font-semibold text-charcoal">EN</span>
              <span className="text-stone-border">/</span>
              <span className="text-warm-grey/60 cursor-not-allowed" title="Dutch language edition coming soon">NL</span>
              <span className="text-stone-border">/</span>
              <span className="text-warm-grey/60 cursor-not-allowed" title="German language edition coming soon">DE</span>
            </div>

            <Link
              href="/favourites"
              className="relative p-2 text-charcoal hover:text-olive transition-colors"
              aria-label="View saved residences"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {favouritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-olive text-white text-[10px] font-sans flex items-center justify-center font-bold">
                  {favouritesCount}
                </span>
              )}
            </Link>

            <Link href="/contact?type=viewing" className="hidden md:inline-flex">
              <Button size="sm" variant="primary">
                Book a Viewing
              </Button>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 text-charcoal hover:text-olive"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
