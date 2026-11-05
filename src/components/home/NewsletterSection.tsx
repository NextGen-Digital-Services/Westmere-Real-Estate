"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle, Mail } from "lucide-react";

export function NewsletterSection() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please confirm GDPR consent to receive quarterly market briefs.");
      return;
    }

    setError("");
    setSubmitted(true);
    toast("Private Dispatch Subscription Confirmed", "You will receive our quarterly Netherlands market report.");
  };

  return (
    <section className="py-24 sm:py-28 bg-travertine/40 border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <SectionHeader
          number="10"
          eyebrow="Private Intelligence"
          title="The Quarterly Dutch Dispatch"
          description="A quarterly journal detailing off-market transaction trends, WOZ tax policy shifts, and monumental architecture preservation in the Netherlands."
          align="center"
        />

        {submitted ? (
          <div className="bg-white border border-stone-border p-8 rounded-sm text-center">
            <CheckCircle className="w-10 h-10 text-sage mx-auto mb-3" />
            <h4 className="font-serif text-2xl text-charcoal">Subscription Confirmed</h4>
            <p className="mt-2 text-xs text-warm-grey font-sans">
              We have enrolled <span className="font-medium text-charcoal">{email}</span> in our private quarterly dispatch. You can revoke consent at any time.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 text-left max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter executive email address..."
                  className="w-full text-xs font-sans p-3 bg-white border border-stone-border rounded-sm focus:outline-none focus:border-charcoal text-charcoal"
                />
              </div>
              <Button type="submit" variant="primary" size="md" className="shrink-0">
                <Mail className="w-3.5 h-3.5 mr-1.5" /> Subscribe
              </Button>
            </div>

            <div className="mt-4">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs font-sans text-warm-grey">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 accent-olive shrink-0"
                />
                <span className="text-[11px] leading-relaxed">
                  I consent to {`Van der Meer & Co.`} processing my email for quarterly real-estate commentary in accordance with Dutch GDPR regulations. No third-party syndication.
                </span>
              </label>
            </div>

            {error && <p className="text-xs text-terracotta mt-2 font-sans">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
