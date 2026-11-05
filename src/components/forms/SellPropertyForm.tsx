"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { addStoredLead } from "@/lib/storage";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle, ShieldCheck } from "lucide-react";

export function SellPropertyForm() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Canal House");
  const [sellingTimeline, setSellingTimeline] = useState("Within 3 months");
  const [privacyPreference, setPrivacyPreference] = useState("Confidential Off-Market");
  const [message, setMessage] = useState("");
  const [notRobot, setNotRobot] = useState(false);
  const [gdpr, setGdpr] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!fullName) errs.fullName = "Required";
    if (!email || !email.includes("@")) errs.email = "Valid email required";
    if (!phone) errs.phone = "Phone required";
    if (!propertyAddress) errs.address = "Address required";
    if (!notRobot) errs.robot = "Please verify you are human";
    if (!gdpr) errs.gdpr = "Consent required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addStoredLead({
      fullName,
      email,
      phone,
      enquiryType: "Sell Your Property",
      propertyTitle: `${propertyType} at ${propertyAddress}`,
      message: `Timeline: ${sellingTimeline} | Strategy: ${privacyPreference}. Notes: ${message}`,
      leadSource: "Website Portal",
    });

    setSubmitted(true);
    toast("Selling Mandate Inquiry Logged", "Our managing partner will connect with you confidentially.");
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-12 h-12 text-sage mx-auto mb-3" />
        <h3 className="font-serif text-2xl text-charcoal">Private Mandate Inquired</h3>
        <p className="mt-2 text-xs text-warm-grey font-sans max-w-md mx-auto">
          Thank you, {fullName}. Our senior partner will contact you under non-disclosure to evaluate {propertyAddress}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-serif text-2xl text-charcoal mb-4">Request a Confidential Consultation</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Full Name *</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          {errors.fullName && <p className="text-[10px] text-terracotta">{errors.fullName}</p>}
        </div>
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Email *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          {errors.email && <p className="text-[10px] text-terracotta">{errors.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Phone *</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          {errors.phone && <p className="text-[10px] text-terracotta">{errors.phone}</p>}
        </div>
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Property Address & Municipality *</label>
          <input type="text" placeholder="e.g. Keizersgracht 400, Amsterdam" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          {errors.address && <p className="text-[10px] text-terracotta">{errors.address}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Property Type</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm">
            {["Canal House", "Villa", "Penthouse", "Apartment", "Commercial Office"].map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Strategy</label>
          <select value={privacyPreference} onChange={(e) => setPrivacyPreference(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm">
            {["Confidential Off-Market", "Select Curated Marketing", "Full Public Portal Campaign"].map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Target Horizon</label>
          <select value={sellingTimeline} onChange={(e) => setSellingTimeline(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm">
            {["Immediately", "Within 3 months", "3-6 months", "Exploratory Advice"].map((h) => (<option key={h} value={h}>{h}</option>))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Confidential Notes</label>
        <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Estimated m², special architectural features, Erfpacht status..." className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
      </div>
      <div className="space-y-2 text-xs font-sans pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={notRobot} onChange={(e) => setNotRobot(e.target.checked)} className="accent-olive" />
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-sage" /> I verify that I am an authorized owner or fiduciary</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} className="accent-olive" />
          <span className="text-warm-grey text-[11px]">I consent to strict non-disclosure data handling under Dutch AVG.</span>
        </label>
      </div>
      <div className="pt-4 border-t border-stone-border flex justify-end">
        <Button type="submit" variant="primary" size="lg">Submit Confidential Mandate</Button>
      </div>
    </form>
  );
}
