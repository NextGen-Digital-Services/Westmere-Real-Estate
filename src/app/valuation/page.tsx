import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ValuationWizardForm } from "@/components/forms/ValuationWizardForm";

export const metadata: Metadata = {
  title: "Property Valuation | Certified NWWI Appraisal",
  description: "Request an accredited market valuation for your canal mansion, penthouse, or Dutch estate according to NWWI guidelines.",
};

export default function ValuationPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Breadcrumbs items={[{ label: "Property Valuation" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Accredited Appraisals"
          title="Certified Property Valuation"
          description="Evaluate the market value, WOZ benchmark, and yield potential of your residence in accordance with NWWI standards."
        />

        <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-10">
          <ValuationWizardForm />
        </div>
      </div>
    </div>
  );
}
