"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/\+/g, "")}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20property%20listing.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-olive hover:bg-cypress text-marble px-4 py-2.5 rounded-sm border border-olive shadow-none transition-all duration-200 group text-xs font-sans uppercase tracking-eyebrow"
      aria-label="Direct WhatsApp Concierge"
    >
      <MessageSquare className="w-4 h-4 text-brass group-hover:scale-105 transition-transform" />
      <span className="hidden sm:inline font-medium">WhatsApp Concierge</span>
    </a>
  );
}
