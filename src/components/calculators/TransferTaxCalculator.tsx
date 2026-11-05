"use client";

import React, { useState } from "react";
import { formatEUR } from "@/lib/utils";
import { RATES_CONFIG } from "@/config/rates";

export function TransferTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1250000);
  const [buyerType, setBuyerType] = useState<"starter" | "owner" | "investor">("owner");
  const [buyerAge, setBuyerAge] = useState(32);

  const { starterExemptionCap, starterRate, ownerOccupierRate, investorRate } =
    RATES_CONFIG.transferTax;

  let applicableRate = ownerOccupierRate;
  let exemptionApplied = false;

  if (buyerType === "starter") {
    if (buyerAge >= 18 && buyerAge <= 35 && purchasePrice <= starterExemptionCap) {
      applicableRate = starterRate;
      exemptionApplied = true;
    } else {
      applicableRate = ownerOccupierRate;
    }
  } else if (buyerType === "investor") {
    applicableRate = investorRate;
  }

  const calculatedTax = purchasePrice * applicableRate;

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Purchase Price: {formatEUR(purchasePrice)}
            </label>
            <input
              type="range"
              min={200000}
              max={5000000}
              step={25000}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full accent-olive"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Buyer Category
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-sans p-2 border border-stone-border rounded-sm cursor-pointer hover:bg-marble/40">
                <input
                  type="radio"
                  name="buyerType"
                  checked={buyerType === "owner"}
                  onChange={() => setBuyerType("owner")}
                  className="accent-olive"
                />
                <span>Primary Homeowner (Owner-Occupier) — {(ownerOccupierRate * 100).toFixed(1)}%</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-sans p-2 border border-stone-border rounded-sm cursor-pointer hover:bg-marble/40">
                <input
                  type="radio"
                  name="buyerType"
                  checked={buyerType === "starter"}
                  onChange={() => setBuyerType("starter")}
                  className="accent-olive"
                />
                <span>First-time Starter (Aged 18–35, cap {formatEUR(starterExemptionCap)})</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-sans p-2 border border-stone-border rounded-sm cursor-pointer hover:bg-marble/40">
                <input
                  type="radio"
                  name="buyerType"
                  checked={buyerType === "investor"}
                  onChange={() => setBuyerType("investor")}
                  className="accent-olive"
                />
                <span>Investor / Buy-to-Let / Commercial — {(investorRate * 100).toFixed(1)}%</span>
              </label>
            </div>
          </div>

          {buyerType === "starter" && (
            <div>
              <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
                Buyer Age: {buyerAge} years old
              </label>
              <input
                type="range"
                min={18}
                max={50}
                value={buyerAge}
                onChange={(e) => setBuyerAge(Number(e.target.value))}
                className="w-full accent-olive"
              />
            </div>
          )}
        </div>

        <div className="bg-marble/40 border border-stone-border p-6 rounded-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] uppercase font-sans tracking-eyebrow text-brass">
              Estimated Statutory Transfer Tax (Overdrachtsbelasting)
            </p>
            <p className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mt-2">
              {formatEUR(Math.round(calculatedTax))}
            </p>
            <p className="text-xs text-warm-grey font-sans mt-2">
              Statutory Rate: {(applicableRate * 100).toFixed(1)}% of registered deed value
            </p>

            {exemptionApplied && (
              <div className="mt-4 p-3 bg-sage/15 border border-sage/40 rounded-sm text-xs text-sage font-medium">
                Starter Exemption Applied: 0% statutory rate saved {formatEUR(purchasePrice * 0.02)} in transfer tax!
              </div>
            )}
            {!exemptionApplied && buyerType === "starter" && (
              <div className="mt-4 p-3 bg-terracotta/15 border border-terracotta/40 rounded-sm text-xs text-terracotta">
                Exemption Threshold Exceeded: Property price exceeds {formatEUR(starterExemptionCap)} or age limit; standard 2% rate applies.
              </div>
            )}
          </div>

          <p className="mt-6 text-[11px] text-warm-grey font-sans border-t border-stone-border/60 pt-3">
            Transfer tax is settled directly through the civil-law notary upon signing the transfer deed (akte van levering). Estimates are for illustration only.
          </p>
        </div>
      </div>
    </div>
  );
}
