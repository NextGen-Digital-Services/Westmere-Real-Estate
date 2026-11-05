import React from "react";
import { Landmark, Shield, FileCheck, Compass, Scale, EyeOff } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WhyChooseUs() {
  const points = [
    {
      icon: EyeOff,
      title: "Discreet Off-Market Representation",
      description: "A substantial portion of high-value Dutch estates trade privately without public advertising or portal listings.",
    },
    {
      icon: Landmark,
      title: "Rijksmonument Stewardship",
      description: "Deep technical command of municipal conservation law, timber piling audits, and monumental tax subsidies.",
    },
    {
      icon: FileCheck,
      title: "Rigorous Technical Due Diligence",
      description: "Every residence is evaluated for ground lease terms (Erfpacht), VvE reserve adequacy, and EPA energy certifications.",
    },
    {
      icon: Scale,
      title: "Bilateral Fiscal & Notary Liaison",
      description: "Direct coordination with civil-law notaries, tax counsel, and NWWI appraisers to ensure seamless closing.",
    },
    {
      icon: Compass,
      title: "Comprehensive English & Dutch Service",
      description: "Serving local homeowners and international executives relocating across the Randstad with equal fluency.",
    },
    {
      icon: Shield,
      title: "Fiduciary Integrity",
      description: "Acting with uncompromising confidentiality and client loyalty across negotiations, inspections, and settlement.",
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-marble border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          eyebrow="Our Practice"
          title="The Standard of Advisory"
          description="A disciplined real-estate practice focused on architectural integrity, legal clarity, and client discretion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="bg-white border border-stone-border p-8 rounded-sm hover:border-charcoal/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-sm bg-travertine/60 border border-stone-border text-brass flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">{pt.title}</h3>
                <p className="text-xs font-sans text-warm-grey leading-relaxed">{pt.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
