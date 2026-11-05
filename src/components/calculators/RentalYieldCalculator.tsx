"use client";

import React, { useState } from "react";
import { formatEUR } from "@/lib/utils";

export function RentalYieldCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1450000);
  const [monthlyRent, setMonthlyRent] = useState(6200);
  const [annualMaintenance, setAnnualMaintenance] = useState(4500);
  const [annualVve, setAnnualVve] = useState(3600);
  const [annualPropertyTax, setAnnualPropertyTax] = useState(1200);

  const annualGrossRent = monthlyRent * 12;
  const totalAnnualCosts = annualMaintenance + annualVve + annualPropertyTax;
  const annualNetRent = annualGrossRent - totalAnnualCosts;

  const grossYield = purchasePrice > 0 ? (annualGrossRent / purchasePrice) * 100 : 0;
  const netYield = purchasePrice > 0 ? (annualNetRent / purchasePrice) * 100 : 0;

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Acquisition Value: {formatEUR(purchasePrice)}
            </label>
            <input
              type="range"
              min={300000}
              max={5000000}
              step={25000}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full accent-olive"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Monthly Rental Income: {formatEUR(monthlyRent)}
            </label>
            <input
              type="range"
              min={1500}
              max={25000}
              step={100}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full accent-olive"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
                Maint. / Year
              </label>
              <input
                type="number"
                value={annualMaintenance}
                onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
                className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
                VvE / Year
              </label>
              <input
                type="number"
                value={annualVve}
                onChange={(e) => setAnnualVve(Number(e.target.value))}
                className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
                Tax / Year
              </label>
              <input
                type="number"
                value={annualPropertyTax}
                onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-marble/40 border border-stone-border p-6 rounded-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] uppercase font-sans tracking-eyebrow text-brass">
              Projected Investment Return
            </p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="p-3 bg-white border border-stone-border rounded-sm">
                <span className="text-[10px] font-sans uppercase text-warm-grey">Gross Yield</span>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-olive mt-1">
                  {grossYield.toFixed(2)}%
                </p>
                <p className="text-[10px] text-warm-grey mt-1">{formatEUR(annualGrossRent)} /yr</p>
              </div>

              <div className="p-3 bg-white border border-stone-border rounded-sm">
                <span className="text-[10px] font-sans uppercase text-warm-grey">Net Yield</span>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
                  {netYield.toFixed(2)}%
                </p>
                <p className="text-[10px] text-warm-grey mt-1">{formatEUR(annualNetRent)} /yr</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-border/60 text-xs font-sans space-y-1.5">
              <div className="flex justify-between">
                <span>Annual Operating Costs:</span>
                <span className="font-medium text-terracotta">{formatEUR(totalAnnualCosts)}</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-warm-grey font-sans border-t border-stone-border/60 pt-3">
            Estimates are for illustration only and do not constitute financial advice. Box 3 wealth taxes and local municipal regulations may apply.
          </p>
        </div>
      </div>
    </div>
  );
}
