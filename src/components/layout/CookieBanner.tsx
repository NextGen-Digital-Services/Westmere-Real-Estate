"use client";

import React, { useState, useEffect } from "react";
import { getStoredConsent, saveStoredConsent, CookieConsentState } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    saveStoredConsent({
      consented: true,
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    saveStoredConsent({
      consented: true,
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveStoredConsent({
      consented: true,
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    });
    setModalOpen(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-border p-4 sm:p-6 shadow-none">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <h4 className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">
              Privacy & Cookie Notice (GDPR / AVG Compliance)
            </h4>
            <p className="mt-1 text-xs text-warm-grey leading-relaxed">
              We respect your privacy under the Dutch Personal Data Protection Act (AVG/GDPR). We deploy strictly necessary cookies for security, alongside optional analytical preferences to refine your property browsing experience.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button size="sm" variant="ghost" onClick={() => setModalOpen(true)}>
              Preferences
            </Button>
            <Button size="sm" variant="outline" onClick={handleRejectNonEssential}>
              Decline Optional
            </Button>
            <Button size="sm" variant="primary" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Cookie Preferences"
        description="Select the categories of cookies you consent to store in accordance with Dutch AVG regulations."
      >
        <div className="space-y-4 py-2">
          <div className="p-3 bg-travertine/40 border border-stone-border rounded-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">Strictly Essential Cookies</p>
              <p className="text-xs text-warm-grey">Required for portal security and saved property states.</p>
            </div>
            <span className="text-[11px] font-sans uppercase text-olive font-bold">Always Active</span>
          </div>

          <div className="p-3 bg-white border border-stone-border rounded-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">Analytics & Performance</p>
              <p className="text-xs text-warm-grey">Helps assess municipal demand and portal usage trends.</p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-4 h-4 accent-olive cursor-pointer"
            />
          </div>

          <div className="p-3 bg-white border border-stone-border rounded-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal">Personalized Recommendations</p>
              <p className="text-xs text-warm-grey">Adapts real-estate listings based on prior viewing history.</p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="w-4 h-4 accent-olive cursor-pointer"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-stone-border">
            <Button size="sm" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleSavePreferences}>
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
