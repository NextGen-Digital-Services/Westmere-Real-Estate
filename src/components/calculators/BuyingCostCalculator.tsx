"use client";

import React, { useState } from "react";
import { formatEUR } from "@/lib/utils";
import { RATES_CONFIG } from "@/config/rates";

export function BuyingCostCalculator() {
  const [price, setPrice] = useState(1750000);
  const [notary, setNotary] = useState(RATES_CONFIG.closingCosts.notaryFee);
  const [cadastral, setCadastral] = useState(RATES_CONFIG.closingCosts.cadastralFee);
  const [valuation, setValuation] = useState(RATES_CONFIG.closingCosts.valuationFee);
  const [advisory, setAdvisory] = useState(RATES_CONFIG.closingCosts.mortgageAdvisoryFee);
  const [survey, setSurvey] = useState(RATES_CONFIG.closingCosts.structuralSurveyFee);
  const [isOwnerOccupier, setIsOwnerOccupier] = useState(true);

  const transferTaxRate = isOwnerOccupier
    ? RATES_CONFIG.transferTax.ownerOccupierRate
    : RATES_CONFIG.transferTax.investorRate;

  const transferTax = price * transferTaxRate;
  const totalAncillary = notary + cadastral + valuation + advisory + survey;
  const grandTotal = price + transferTax + totalAncillary;

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Agreed Purchase Price: {formatEUR(price)}
            </label>
            <input
              type="range"
              min={300000}
              max={6000000}
              step={25000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-olive"
            />
          </div>

          <div className="flex gap-4 text-xs font-sans">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="taxStatus"
                checked={isOwnerOccupier}
                onChange={() => setIsOwnerOccupier(true)}
                className="accent-olive"
              />
              <span>Primary Home (2% Transfer Tax)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="taxStatus"
                checked={!isOwnerOccupier}
                onChange={() => setIsOwnerOccupier(false)}
                className="accent-olive"
              />
              <span>Investor / Commercial (10.4%)</span>
            </label>
          </div>

          <div className="pt-2 border-t border-stone-border/60">
            <p className="text-[11px] uppercase font-sans tracking-eyebrow text-warm-grey mb-2">
              Editable Closing Expenses (Kosten Koper)
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <div>
                <label className="text-warm-grey text-[10px] uppercase">Civil Notary Deed</label>
                <input type="number" value={notary} onChange={(e) => setNotary(Number(e.target.value))} className="w-full p-1.5 border border-stone-border rounded-sm" />
              </div>
              <div>
                <label className="text-warm-grey text-[10px] uppercase">Kadaster Registry</label>
                <input type="number" value={cadastral} onChange={(e) => setCadastral(Number(e.target.value))} className="w-full p-1.5 border border-stone-border rounded-sm" />
              </div>
              <div>
                <label className="text-warm-grey text-[10px] uppercase">NWWI Appraisal</label>
                <input type="number" value={valuation} onChange={(e) => setValuation(Number(e.target.value))} className="w-full p-1.5 border border-stone-border rounded-sm" />
              </div>
              <div>
                <label className="text-warm-grey text-[10px] uppercase">Mortgage Advisor</label>
                <input type="number" value={advisory} onChange={(e) => setAdvisory(Number(e.target.value))} className="w-full p-1.5 border border-stone-border rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-marble/40 border border-stone-border p-6 rounded-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] uppercase font-sans tracking-eyebrow text-brass">
              Estimated Total Capital Required
            </p>
            <p className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mt-2">
              {formatEUR(Math.round(grandTotal))}
            </p>
            <div className="mt-4 pt-4 border-t border-stone-border/60 space-y-2 text-xs font-sans">
              <div className="flex justify-between">
                <span>Purchase Price:</span>
                <span className="font-medium text-charcoal">{formatEUR(price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer Tax ({(transferTaxRate * 100).toFixed(1)}%):</span>
                <span className="font-medium text-terracotta">{formatEUR(Math.round(transferTax))}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Closing Fees:</span>
                <span className="font-medium text-charcoal">{formatEUR(totalAncillary)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-border pt-2 text-sm font-semibold">
                <span>Effective Additional Costs (k.k.):</span>
                <span className="text-olive">{formatEUR(Math.round(transferTax + totalAncillary))} ({(((transferTax + totalAncillary) / price) * 100).toFixed(2)}%)</span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-warm-grey font-sans border-t border-stone-border/60 pt-3">
            Estimates are for illustration only and do not constitute financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
