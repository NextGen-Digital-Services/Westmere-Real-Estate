import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SellPropertyForm } from "@/components/forms/SellPropertyForm";
import { Key, EyeOff, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Sell Your Netherlands Property | Private Mandate",
  description: "Discreet off-market property divestment and marketing for monumental canal houses, penthouses, and estates.",
};

export default function SellPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Sell Your Property" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Private Sales Mandate"
          title="Divesting Netherlands Heritage Real Estate"
          description="A confidential divestment strategy that preserves your privacy while achieving maximum realized value through verified family offices."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="bg-white border border-stone-border p-6 rounded-sm">
            <EyeOff className="w-8 h-8 text-brass mb-4" />
            <h4 className="font-serif text-lg text-charcoal">Confidential Stille Verkoop</h4>
            <p className="mt-2 text-xs text-warm-grey font-sans">No public internet listings or intrusive open house traffic. Marketed discreetly to vetted buyers.</p>
          </div>
          <div className="bg-white border border-stone-border p-6 rounded-sm">
            <Key className="w-8 h-8 text-brass mb-4" />
            <h4 className="font-serif text-lg text-charcoal">Architectural Defense</h4>
            <p className="mt-2 text-xs text-warm-grey font-sans">We articulate the true value of monumental finishes, foundation investments, and energy transitions.</p>
          </div>
          <div className="bg-white border border-stone-border p-6 rounded-sm">
            <Award className="w-8 h-8 text-brass mb-4" />
            <h4 className="font-serif text-lg text-charcoal">Certified Valuation</h4>
            <p className="mt-2 text-xs text-warm-grey font-sans">Grounding your price expectation on accredited NWWI market data and recent notary registrations.</p>
          </div>
        </div>

        <div className="bg-white border border-stone-border rounded-sm p-8 max-w-3xl mx-auto">
          <SellPropertyForm />
        </div>
      </div>
    </div>
  );
}
