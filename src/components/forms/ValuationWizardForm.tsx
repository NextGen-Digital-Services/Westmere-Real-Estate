"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { addStoredLead } from "@/lib/storage";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

export function ValuationWizardForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Amsterdam");
  const [postalCode, setPostalCode] = useState("");
  const [type, setType] = useState("Canal House");
  const [area, setArea] = useState(250);
  const [condition, setCondition] = useState("Completely Renovated / Mint");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step === 1 && (!address || !postalCode)) return;
    setStep((s) => s + 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    addStoredLead({
      fullName,
      email,
      phone: phone || "+31 00 000 0000",
      enquiryType: "Property Valuation",
      propertyTitle: `${type} at ${address}, ${city}`,
      message: `Area: ${area} m² | Condition: ${condition} | Postal: ${postalCode}`,
      leadSource: "Website Portal",
    });

    setSubmitted(true);
    toast("Valuation Request Received", "Our certified NWWI valuer will deliver your market report.");
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-14 h-14 text-sage mx-auto mb-4" />
        <h3 className="font-serif text-3xl text-charcoal">Valuation Dossier Initiated</h3>
        <p className="mt-3 text-xs sm:text-sm text-warm-grey font-sans max-w-md mx-auto leading-relaxed">
          Thank you, {fullName}. Our accredited appraiser will inspect recent comparable transactions for <strong className="text-charcoal">{address}, {city}</strong> and prepare your preliminary market brief.
        </p>
        <div className="mt-8">
          <Button variant="primary" onClick={() => { setSubmitted(false); setStep(1); }}>Perform Another Valuation</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-border text-xs font-sans">
        <span className={`font-semibold ${step >= 1 ? "text-olive" : "text-stone-border"}`}>1. Location</span>
        <span className="text-stone-border">→</span>
        <span className={`font-semibold ${step >= 2 ? "text-olive" : "text-stone-border"}`}>2. Specifications</span>
        <span className="text-stone-border">→</span>
        <span className={`font-semibold ${step >= 3 ? "text-olive" : "text-stone-border"}`}>3. Contact Protocol</span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Street Address *</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Prinsengracht 500" className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Postal Code (1234 AB) *</label>
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="1016 KL" className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20" />
            </div>
            <div>
              <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Municipality</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20">
                {["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Haarlem", "Leiden", "Delft"].map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
          </div>
          <div className="pt-6 flex justify-end">
            <Button variant="primary" onClick={handleNext} disabled={!address || !postalCode}>Next: Specifications <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Architecture Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20">
              {["Canal House", "Modernist Villa", "Sky Penthouse", "Monumental Apartment", "Townhouse"].map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Estimated Area: {area} m²</label>
            <input type="range" min={50} max={1000} step={10} value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full accent-olive" />
          </div>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Condition</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20">
              {["Completely Renovated / Mint", "High Standard (Turnkey)", "Well-Maintained Vintage", "Requires Modernization"].map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div className="pt-6 flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back</Button>
            <Button variant="primary" onClick={handleNext}>Next: Contact Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Full Name *</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20" />
            </div>
            <div>
              <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full text-xs p-3 border border-stone-border rounded-sm bg-marble/20" />
            </div>
          </div>
          <div className="pt-6 flex justify-between border-t border-stone-border">
            <Button variant="outline" type="button" onClick={() => setStep(2)}><ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back</Button>
            <Button variant="primary" type="submit" disabled={!fullName || !email}>Submit Valuation Dossier</Button>
          </div>
        </form>
      )}
    </div>
  );
}
