"use client";

import React from "react";
import Link from "next/link";
import { X, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal text-marble flex flex-col justify-between p-6 sm:p-10 animate-fade-in overflow-y-auto">
      <div>
        <div className="flex items-center justify-between border-b border-marble/15 pb-6">
          <Link href="/" onClick={onClose} className="font-serif text-lg tracking-widest text-marble">
            {SITE_CONFIG.name}
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-marble/80 hover:text-marble border border-marble/20 rounded-sm"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-serif text-2xl sm:text-3xl font-normal text-marble/90 hover:text-brass transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sell"
            onClick={onClose}
            className="font-serif text-2xl text-marble/90 hover:text-brass transition-colors py-1"
          >
            Sell Your Property
          </Link>
          <Link
            href="/team"
            onClick={onClose}
            className="font-serif text-2xl text-marble/90 hover:text-brass transition-colors py-1"
          >
            Advisors & Team
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="font-serif text-2xl text-marble/90 hover:text-brass transition-colors py-1"
          >
            Contact Desk
          </Link>
        </nav>
      </div>

      <div className="mt-10 pt-6 border-t border-marble/15">
        <div className="space-y-2 text-xs font-sans text-marble/70 mb-6">
          <p className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-brass" /> {SITE_CONFIG.contact.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-brass" /> {SITE_CONFIG.contact.email}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brass" /> {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}
          </p>
        </div>

        <Link href="/contact?type=viewing" onClick={onClose} className="block w-full">
          <Button variant="brass" fullWidth size="lg">
            Schedule Private Viewing
          </Button>
        </Link>
      </div>
    </div>
  );
}
