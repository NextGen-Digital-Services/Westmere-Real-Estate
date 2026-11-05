"use client";

import React, { useState } from "react";
import { formatEUR } from "@/lib/utils";
import { RATES_CONFIG } from "@/config/rates";

export function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [partnerIncome, setPartnerIncome] = useState(65000);
  const [monthlyDebts, setMonthlyDebts] = useState(350);
  const [interestRate, setInterestRate] = useState(RATES_CONFIG.mortgageDefaults.interestRatePercent);
  const [termYears, setTermYears] = useState(30);

  // Netherlands Nibud-style borrowing standard heuristic
  const totalIncome = annualIncome + partnerIncome;
  // Maximum housing ratio typically ~28-33% of gross income minus debt obligations
  const maxMonthlyDebtService = (totalIncome * 0.31) / 12 - monthlyDebts;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;

  // Max borrowing PV calculation
  const maxBorrowing =
    maxMonthlyDebtService > 0 && monthlyRate > 0
      ? (maxMonthlyDebtService * (1 - Math.pow(1 + monthlyRate, -numPayments))) / monthlyRate
      : 0;

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Primary Gross Annual Income: {formatEUR(annualIncome)}
            </label>
            <input
              type="range"
              min={40000}
              max={350000}
              step={5000}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-olive"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Partner Annual Income: {formatEUR(partnerIncome)}
            </label>
            <input
              type="range"
              min={0}
              max={250000}
              step={5000}
              value={partnerIncome}
              onChange={(e) => setPartnerIncome(Number(e.target.value))}
              className="w-full accent-olive"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
              Monthly Debt Obligations (DUO student loans, car lease): {formatEUR(monthlyDebts)}
            </label>
            <input
              type="range"
              min={0}
              max={2500}
              step={50}
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(Number(e.target.value))}
              className="w-full accent-olive"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
                Interest Rate: {interestRate.toFixed(2)}%
              </label>
              <input
                type="number"
                step={0.05}
                min={1}
                max={8}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">
                Mortgage Term
              </label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm"
              >
                {[15, 20, 25, 30].map((t) => (
                  <option key={t} value={t}>{t} Years</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-marble/40 border border-stone-border p-6 rounded-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] uppercase font-sans tracking-eyebrow text-brass">
              Estimated Maximum Borrowing Capacity
            </p>
            <p className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mt-2">
              {formatEUR(Math.round(maxBorrowing))}
            </p>
            <p className="text-xs text-warm-grey font-sans mt-2">
              Based on total household qualifying income of {formatEUR(totalIncome)}
            </p>

            <div className="mt-6 pt-4 border-t border-stone-border/60 space-y-2 text-xs font-sans">
              <div className="flex justify-between">
                <span>Indicative Monthly Payment:</span>
                <span className="font-medium text-charcoal">
                  {formatEUR(Math.round(Math.max(0, maxMonthlyDebtService)))} /mo
                </span>
              </div>
              <div className="flex justify-between">
                <span>Maximum Loan-To-Value (LTV):</span>
                <span className="font-medium text-olive">100% of Market Value</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-warm-grey font-sans border-t border-stone-border/60 pt-3">
            Estimates are for illustration only and do not constitute financial advice. Actual limits depend on Dutch AFM and Nibud mortgage criteria.
          </p>
        </div>
      </div>
    </div>
  );
}
