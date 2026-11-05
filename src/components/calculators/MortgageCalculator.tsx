"use client";

import React, { useState, useMemo } from "react";
import { formatEUR } from "@/lib/utils";
import { RATES_CONFIG } from "@/config/rates";
import { AmortizationTable } from "./AmortizationTable";

export function MortgageCalculator({ initialPrice = 1850000 }: { initialPrice?: number }) {
  const [price, setPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.1));
  const [rate, setRate] = useState(RATES_CONFIG.mortgageDefaults.interestRatePercent);
  const [termYears, setTermYears] = useState(30);
  const [type, setType] = useState<"annuity" | "linear">("annuity");

  const loanAmount = Math.max(0, price - downPayment);
  const monthlyRate = rate / 100 / 12;
  const totalMonths = termYears * 12;

  const { initialMonthlyPayment, totalInterest, totalCost, schedule } = useMemo(() => {
    let balance = loanAmount;
    let totInt = 0;
    const yearlySchedule = [];

    if (type === "annuity") {
      const pmt = monthlyRate > 0
        ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
        : loanAmount / totalMonths;

      for (let y = 1; y <= termYears; y++) {
        let yrPrincipal = 0;
        let yrInterest = 0;
        for (let m = 0; m < 12; m++) {
          const interestMonth = balance * monthlyRate;
          const principalMonth = pmt - interestMonth;
          yrInterest += interestMonth;
          yrPrincipal += principalMonth;
          balance = Math.max(0, balance - principalMonth);
        }
        totInt += yrInterest;
        yearlySchedule.push({ year: y, principalPaid: yrPrincipal, interestPaid: yrInterest, remainingBalance: balance });
      }
      return { initialMonthlyPayment: pmt, totalInterest: totInt, totalCost: loanAmount + totInt, schedule: yearlySchedule };
    } else {
      const fixedPrincipalMonth = loanAmount / totalMonths;
      const initialPayment = fixedPrincipalMonth + balance * monthlyRate;
      for (let y = 1; y <= termYears; y++) {
        let yrPrincipal = 0;
        let yrInterest = 0;
        for (let m = 0; m < 12; m++) {
          const interestMonth = balance * monthlyRate;
          yrInterest += interestMonth;
          yrPrincipal += fixedPrincipalMonth;
          balance = Math.max(0, balance - fixedPrincipalMonth);
        }
        totInt += yrInterest;
        yearlySchedule.push({ year: y, principalPaid: yrPrincipal, interestPaid: yrInterest, remainingBalance: balance });
      }
      return { initialMonthlyPayment: initialPayment, totalInterest: totInt, totalCost: loanAmount + totInt, schedule: yearlySchedule };
    }
  }, [loanAmount, monthlyRate, totalMonths, termYears, type]);

  const principalRatio = totalCost > 0 ? (loanAmount / totalCost) * 100 : 50;

  return (
    <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">Purchase Price: {formatEUR(price)}</label>
            <input type="range" min={300000} max={6000000} step={25000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-olive" />
          </div>
          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">Down Payment: {formatEUR(downPayment)} ({Math.round((downPayment / price) * 100)}%)</label>
            <input type="range" min={0} max={price * 0.5} step={10000} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-olive" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">Interest Rate: {rate.toFixed(2)}%</label>
              <input type="number" step={0.05} min={0.5} max={10} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">Term: {termYears} Years</label>
              <select value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} className="w-full text-xs p-2 bg-marble/20 border border-stone-border rounded-sm">
                {[10, 15, 20, 25, 30].map((y) => (<option key={y} value={y}>{y} Years</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase font-sans tracking-eyebrow text-warm-grey mb-1">Repayment Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setType("annuity")} className={`p-2 text-xs uppercase font-sans border rounded-sm ${type === "annuity" ? "bg-olive text-white border-olive font-medium" : "bg-white text-charcoal border-stone-border"}`}>Annuity (Equal Monthly)</button>
              <button type="button" onClick={() => setType("linear")} className={`p-2 text-xs uppercase font-sans border rounded-sm ${type === "linear" ? "bg-olive text-white border-olive font-medium" : "bg-white text-charcoal border-stone-border"}`}>Linear (Equal Principal)</button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 bg-marble/30 border border-stone-border p-5 rounded-sm flex flex-col justify-between">
          <div>
            <p className="text-[11px] uppercase font-sans tracking-eyebrow text-brass">Initial Monthly Payment</p>
            <p className="font-serif text-3xl font-medium text-charcoal mt-1">{formatEUR(Math.round(initialMonthlyPayment))}</p>
            <div className="my-4 py-3 border-y border-stone-border/60 space-y-2 text-xs font-sans">
              <div className="flex justify-between"><span>Borrowing:</span><span className="font-medium text-charcoal">{formatEUR(loanAmount)}</span></div>
              <div className="flex justify-between"><span>Total Interest:</span><span className="font-medium text-terracotta">{formatEUR(Math.round(totalInterest))}</span></div>
              <div className="flex justify-between border-t border-stone-border/40 pt-1"><span>Total Cost:</span><span className="font-medium text-charcoal">{formatEUR(Math.round(totalCost))}</span></div>
            </div>
          </div>
          <div className="text-center">
            <svg viewBox="0 0 36 36" className="w-24 h-24 mx-auto">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#D8CDB8" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3E4A2F" strokeWidth="3" strokeDasharray={`${principalRatio}, 100`} />
            </svg>
            <p className="text-[10px] text-warm-grey mt-2">Olive: Principal ({Math.round(principalRatio)}%) | Stone: Interest</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-warm-grey font-sans border-t border-stone-border/50 pt-3">Estimates are for illustration only and do not constitute financial advice.</p>
      <AmortizationTable schedule={schedule} />
    </div>
  );
}
