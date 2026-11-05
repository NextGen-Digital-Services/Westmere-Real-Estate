"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { TransferTaxCalculator } from "@/components/calculators/TransferTaxCalculator";
import { RentalYieldCalculator } from "@/components/calculators/RentalYieldCalculator";
import { BuyingCostCalculator } from "@/components/calculators/BuyingCostCalculator";

function ToolsContent() {
  const searchParams = useSearchParams();
  const initialPrice = Number(searchParams.get("price")) || 1850000;
  const [activeTab, setActiveTab] = useState("mortgage");

  const tabs: TabItem[] = [
    { id: "mortgage", label: "1. Mortgage & Repayment" },
    { id: "affordability", label: "2. Maximum Borrowing" },
    { id: "transferTax", label: "3. Overdrachtsbelasting Tax" },
    { id: "rentalYield", label: "4. Rental Yields" },
    { id: "buyingCosts", label: "5. Total Acquisition Costs" },
  ];

  return (
    <>
      <div className="mb-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div>
        {activeTab === "mortgage" && <MortgageCalculator initialPrice={initialPrice} />}
        {activeTab === "affordability" && <AffordabilityCalculator />}
        {activeTab === "transferTax" && <TransferTaxCalculator />}
        {activeTab === "rentalYield" && <RentalYieldCalculator />}
        {activeTab === "buyingCosts" && <BuyingCostCalculator />}
      </div>
    </>
  );
}

export default function ToolsPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Financial Calculators & Fiscal Suite" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Financial Suite"
          title="Mortgage & Netherlands Tax Estimators"
          description="Interactive modeling tools for Dutch mortgage repayments, statutory transfer taxes (Overdrachtsbelasting), and total Kosten Koper capital requirements."
        />

        <Suspense fallback={<div className="py-12 text-center text-xs font-sans text-warm-grey">Initializing financial suite...</div>}>
          <ToolsContent />
        </Suspense>
      </div>
    </div>
  );
}
