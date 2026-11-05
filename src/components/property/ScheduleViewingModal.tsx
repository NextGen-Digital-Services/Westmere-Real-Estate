"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { addStoredLead } from "@/lib/storage";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle, ShieldCheck } from "lucide-react";

interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

const TIME_SLOTS = [
  "09:30 - 10:30",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "16:00 - 17:00",
];

export function ScheduleViewingModal({ isOpen, onClose, property }: ScheduleViewingModalProps) {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [notRobot, setNotRobot] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent spam drop

    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    if (!email.trim() || !email.includes("@")) errs.email = "Valid email is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    if (!date) errs.date = "Please select a date.";
    if (!notRobot) errs.robot = "Please verify you are not an automated bot.";
    if (!gdprConsent) errs.gdpr = "You must accept the data processing terms.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addStoredLead({
      fullName,
      email,
      phone,
      enquiryType: "Schedule a Viewing",
      propertyId: property.propertyCode,
      propertyTitle: property.title,
      preferredDate: date,
      preferredTimeSlot: timeSlot,
      message: message || "Private viewing appointment requested.",
      leadSource: "Website Portal",
      assignedAgentId: property.agentId,
    });

    setSubmitted(true);
    toast("Viewing Request Submitted", "Our senior advisor will confirm your private slot shortly.");
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Schedule a Private Viewing" maxWidth="lg">
      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-sage mx-auto mb-4" />
          <h4 className="font-serif text-2xl text-charcoal">Viewing Request Received</h4>
          <p className="mt-2 text-sm text-warm-grey font-sans max-w-md mx-auto">
            Thank you, {fullName}. Your request for <span className="font-medium text-charcoal">{property.title}</span> on {date} at {timeSlot} has been registered with our advisory desk.
          </p>
          <div className="mt-6">
            <Button variant="primary" size="md" onClick={handleReset}>Close Window</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="b_hp_field" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Residence</label>
            <p className="text-xs font-serif text-charcoal bg-travertine/40 p-2.5 border border-stone-border rounded-sm">{property.title} ({property.city})</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Full Name *</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" placeholder="e.g. Willem van Dijk" />
              {errors.fullName && <p className="text-[10px] text-terracotta mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Email Address *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" placeholder="client@domain.com" />
              {errors.email && <p className="text-[10px] text-terracotta mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Phone Number *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" placeholder="+31 6 1234 5678" />
              {errors.phone && <p className="text-[10px] text-terracotta mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Preferred Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none" />
              {errors.date && <p className="text-[10px] text-terracotta mt-1">{errors.date}</p>}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Available Time Slot</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full text-xs font-sans p-2.5 bg-marble/20 border border-stone-border rounded-sm focus:outline-none">
              {TIME_SLOTS.map((ts) => (<option key={ts} value={ts}>{ts} CET</option>))}
            </select>
          </div>
          <div className="pt-2 space-y-2 text-xs font-sans">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={notRobot} onChange={(e) => setNotRobot(e.target.checked)} className="accent-olive" />
              <span className="flex items-center gap-1 text-charcoal"><ShieldCheck className="w-3.5 h-3.5 text-sage" /> I verify that I am a human applicant</span>
            </label>
            {errors.robot && <p className="text-[10px] text-terracotta">{errors.robot}</p>}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} className="accent-olive" />
              <span className="text-warm-grey text-[11px]">I consent to the confidential processing of my details under GDPR / AVG.</span>
            </label>
            {errors.gdpr && <p className="text-[10px] text-terracotta">{errors.gdpr}</p>}
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-stone-border">
            <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
            <Button variant="primary" size="md" type="submit">Confirm Viewing Request</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
