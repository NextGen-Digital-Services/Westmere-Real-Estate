"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/config/site";
import { resetDemoData } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { RotateCcw, Save, ShieldAlert, Server, Mail, HardDrive } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [phone, setPhone] = useState(SITE_CONFIG.contact.phone);
  const [email, setEmail] = useState(SITE_CONFIG.contact.email);
  const [hours, setHours] = useState(SITE_CONFIG.openingHours);
  const [retentionMonths, setRetentionMonths] = useState(36);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Settings Committed", "Configuration parameters preserved.");
  };

  const handleResetData = () => {
    if (confirm("Reset demo data to pristine default catalog? All created mock listings and appointments will revert.")) {
      resetDemoData();
      toast("Demo Data Reset Complete", "Default state restored. Reloading...", "info");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl text-charcoal">System Settings & Infrastructure</h1>
        <p className="text-xs text-warm-grey font-sans">Company coordinates, SMTP dispatch UI, AVG/GDPR compliance, and demo data reset.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-stone-border rounded-sm p-6 sm:p-8 space-y-6 text-xs font-sans">
        <h4 className="font-serif text-lg text-charcoal border-b border-stone-border pb-2">Firm Coordinates</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Central Telephone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>
          <div>
            <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Central Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>
        </div>
        <div>
          <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Operating Hours</label>
          <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="sm"><Save className="w-3.5 h-3.5 mr-1" /> Save Coordinates</Button>
        </div>
      </form>

      {/* SMTP & GDPR panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
        <div className="bg-white border border-stone-border p-6 rounded-sm space-y-3">
          <h4 className="font-serif text-base text-charcoal flex items-center gap-2"><Mail className="w-4 h-4 text-brass" /> SMTP Mail Gateway</h4>
          <p className="text-warm-grey text-[11px]">Outbound transaction dispatch configured via TLS port 587.</p>
          <div className="p-3 bg-marble/40 border border-stone-border rounded-sm space-y-1 font-mono text-[11px]">
            <p>Host: mail.vandermeer.estate</p>
            <p>Port: 587 (TLS Active)</p>
            <p>Status: Connected</p>
          </div>
        </div>

        <div className="bg-white border border-stone-border p-6 rounded-sm space-y-3">
          <h4 className="font-serif text-base text-charcoal flex items-center gap-2"><HardDrive className="w-4 h-4 text-brass" /> Backup & Persistence</h4>
          <p className="text-warm-grey text-[11px]">Automated daily snapshot of listings, leads, and calendar slots.</p>
          <div className="p-3 bg-marble/40 border border-stone-border rounded-sm space-y-1 font-mono text-[11px]">
            <p>Storage: Local Storage V1</p>
            <p>Health: Operational</p>
            <p>Integrity: 100%</p>
          </div>
        </div>
      </div>

      {/* Reset Demo Data Action */}
      <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-lg text-charcoal flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-terracotta" /> Reset Interactive Demo Data
          </h4>
          <p className="text-xs text-warm-grey font-sans mt-1">
            Reverts all local database changes (new listings, moved pipeline leads, booked viewings) to initial defaults.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleResetData} className="border-terracotta text-terracotta hover:bg-terracotta/10 shrink-0">
          Restore Pristine Mock Data
        </Button>
      </div>
    </div>
  );
}
