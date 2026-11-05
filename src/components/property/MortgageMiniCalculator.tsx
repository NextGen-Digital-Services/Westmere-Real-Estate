"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import { RATES_CONFIG } from "@/config/rates";

interface MortgageMiniCalculatorProps {
  propertyPrice: number;
}

export function MortgageMiniCalculator({ propertyPrice }: MortgageMiniCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(RATES_CONFIG.mortgageDefaults.interestRatePercent);
  const termYears = 30;

  const loanAmount = propertyPrice * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;

  // Annuity payment formula
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-border">
        <h4 className="font-serif text-lg text-charcoal flex items-center gap-2">
          <Calculator className="w-4 h-4 text-brass" />
          Financing Estimate (Annuity)
        </h4>
        <span className="text-[11px] font-sans uppercase tracking-eyebrow text-brass">
          30-Yr Fixed
        </span>
      </div>

      <div className="my-4 p-4 bg-marble/40 border border-stone-border/60 rounded-sm text-center">
        <p className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey">
          Estimated Monthly Gross Repayment
        </p>
        <p className="font-serif text-3xl font-medium text-charcoal mt-1">
          {formatEUR(Math.round(monthlyPayment))}
          <span className="text-xs font-sans text-warm-grey font-normal"> / month</span>
        </p>
        <p className="text-[10px] text-warm-grey font-sans mt-1">
          Loan: {formatEUR(Math.round(loanAmount))} ({100 - downPaymentPercent}% LTV)
        </p>
      </div>

      <div className="space-y-3 text-xs font-sans">
        <div>
          <div className="flex justify-between text-warm-grey mb-1">
            <span>Down Payment: {downPaymentPercent}%</span>
            <span>{formatEUR(Math.round(propertyPrice * (downPaymentPercent / 100)))}</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-olive h-1 bg-stone-border rounded-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-warm-grey mb-1">
            <span>Interest Rate:</span>
            <span>{interestRate.toFixed(2)}%</span>
          </div>
          <input
            type="range"
            min={1.5}
            max={7.0}
            step={0.05}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-olive h-1 bg-stone-border rounded-none cursor-pointer"
          />
        </div>
      </div>

      <p className="mt-4 text-[10px] text-warm-grey font-sans leading-tight">
        Estimates are for illustration only and do not constitute financial advice. Dutch tax deduction (hypotheekrenteaftrek) may further reduce net costs.
      </p>

      <div className="mt-4 pt-3 border-t border-stone-border">
        <Link
          href={`/tools?price=${propertyPrice}`}
          className="text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress inline-flex items-center gap-1.5"
        >
          Open Full Mortgage & Tax Suite <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
