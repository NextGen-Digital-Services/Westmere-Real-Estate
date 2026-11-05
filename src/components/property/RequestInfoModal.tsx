"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { addStoredLead } from "@/lib/storage";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle, ShieldCheck } from "lucide-react";

interface RequestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function RequestInfoModal({ isOpen, onClose, property }: RequestInfoModalProps) {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Please provide the full cadastral dossier and recent VvE/deed documentation for this residence.");
  const [honeypot, setHoneypot] = useState("");
  const [notRobot, setNotRobot] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    if (!email.trim() || !email.includes("@")) errs.email = "Valid email is required.";
    if (!notRobot) errs.robot = "Please verify you are not an automated bot.";
    if (!gdprConsent) errs.gdpr = "You must accept the privacy policy.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addStoredLead({
      fullName,
      email,
      phone: phone || "+31 00 000 0000",
      enquiryType: "Property Information Request",
      propertyId: property.propertyCode,
      propertyTitle: property.title,
      message,
      leadSource: "Website Portal",
      assignedAgentId: property.agentId,
    });

    setSubmitted(true);
    toast("Information Dossier Requested", "The complete sales prospectus has been dispatched to your email.");
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Request Property Prospectus" maxWidth="md">
      {submitted ? (
        <div className="text-center py-6">
          <CheckCircle className="w-12 h-12 text-sage mx-auto mb-3" />
          <h4 className="font-serif text-xl text-charcoal">Dossier Request Received</h4>
          <p className="mt-2 text-xs text-warm-grey font-sans">
            Our private office has forwarded the brochure, floorplans, and cadastral extracts for {property.title} to {email}.
          </p>
          <div className="mt-6">
            <Button variant="primary" size="sm" onClick={handleReset}>Close</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="b_hp_req" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Full Name *</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" placeholder="Your Name" />
            {errors.fullName && <p className="text-[10px] text-terracotta mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Email Address *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" placeholder="email@address.com" />
            {errors.email && <p className="text-[10px] text-terracotta mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Phone (Optional)</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" placeholder="+31 6 ..." />
          </div>
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Specific Inquiries</label>
            <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" />
          </div>
          <div className="space-y-2 text-xs font-sans">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={notRobot} onChange={(e) => setNotRobot(e.target.checked)} className="accent-olive" />
              <span className="flex items-center gap-1 text-charcoal"><ShieldCheck className="w-3.5 h-3.5 text-sage" /> I am a real prospective buyer</span>
            </label>
            {errors.robot && <p className="text-[10px] text-terracotta">{errors.robot}</p>}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} className="accent-olive" />
              <span className="text-warm-grey text-[11px]">I consent to GDPR processing.</span>
            </label>
            {errors.gdpr && <p className="text-[10px] text-terracotta">{errors.gdpr}</p>}
          </div>
          <div className="pt-3 flex justify-end gap-2 border-t border-stone-border">
            <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Submit Request</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
