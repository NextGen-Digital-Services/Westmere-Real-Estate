"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { addStoredLead } from "@/lib/storage";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle, ShieldCheck } from "lucide-react";

export function ContactInquiryForm() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Advisory Inquiry");
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
    if (!message) errs.message = "Message required";
    if (!notRobot) errs.robot = "Please verify you are human";
    if (!gdpr) errs.gdpr = "Consent required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    addStoredLead({
      fullName,
      email,
      phone: phone || "+31 00 000 0000",
      enquiryType: "General Advisory",
      message: `[Subject: ${subject}] ${message}`,
      leadSource: "Website Portal",
    });

    setSubmitted(true);
    toast("Advisory Message Dispatched", "Our private office will contact you within one business day.");
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-12 h-12 text-sage mx-auto mb-4" />
        <h3 className="font-serif text-2xl text-charcoal">Communication Dispatched</h3>
        <p className="mt-2 text-xs text-warm-grey font-sans max-w-md mx-auto">
          Thank you, {fullName}. Our advisory desk on the Herengracht has received your message and will respond promptly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-serif text-2xl text-charcoal mb-4">Transmit a Confidential Inquiry</h3>
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
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Phone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
        </div>
        <div>
          <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Nature of Inquiry</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm">
            {["General Advisory Inquiry", "Property Acquisition Mandate", "Stille Verkoop Private Sale", "Certified Valuation Request", "Press & Architectural Inquiry"].map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Message *</label>
        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Please detail your requirements, desired municipality, or specific residence ID..." className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
        {errors.message && <p className="text-[10px] text-terracotta">{errors.message}</p>}
      </div>
      <div className="space-y-2 text-xs font-sans pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={notRobot} onChange={(e) => setNotRobot(e.target.checked)} className="accent-olive" />
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-sage" /> I verify that I am a human applicant</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} className="accent-olive" />
          <span className="text-warm-grey text-[11px]">I consent to confidential data handling under Dutch AVG.</span>
        </label>
      </div>
      <div className="pt-4 border-t border-stone-border flex justify-end">
        <Button type="submit" variant="primary" size="lg">Send Message</Button>
      </div>
    </form>
  );
}
