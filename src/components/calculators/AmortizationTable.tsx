"use client";

import React, { useState } from "react";
import { formatEUR } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export function AmortizationTable({ schedule }: { schedule: AmortizationYear[] }) {
  const [expanded, setExpanded] = useState(false);
  const displayedRows = expanded ? schedule : schedule.slice(0, 5);

  return (
    <div className="mt-8 border border-stone-border rounded-sm bg-white overflow-hidden">
      <div className="p-4 bg-marble/30 border-b border-stone-border flex items-center justify-between">
        <h5 className="font-serif text-base text-charcoal">Year-by-Year Amortization Schedule</h5>
        <span className="text-[11px] font-sans text-warm-grey uppercase tracking-eyebrow">
          {schedule.length} Year Horizon
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-sans text-left">
          <thead className="bg-travertine/40 border-b border-stone-border text-warm-grey uppercase text-[10px] tracking-eyebrow">
            <tr>
              <th className="py-2.5 px-4">Year</th>
              <th className="py-2.5 px-4">Principal Repaid</th>
              <th className="py-2.5 px-4">Interest Paid</th>
              <th className="py-2.5 px-4 text-right">Remaining Debt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-border/50 text-charcoal">
            {displayedRows.map((row) => (
              <tr key={row.year} className="hover:bg-marble/40 transition-colors">
                <td className="py-2.5 px-4 font-medium">Year {row.year}</td>
                <td className="py-2.5 px-4 text-sage">{formatEUR(Math.round(row.principalPaid))}</td>
                <td className="py-2.5 px-4 text-terracotta">{formatEUR(Math.round(row.interestPaid))}</td>
                <td className="py-2.5 px-4 text-right font-medium">{formatEUR(Math.round(row.remainingBalance))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 5 && (
        <div className="p-3 bg-travertine/20 border-t border-stone-border text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress inline-flex items-center gap-1"
          >
            {expanded ? (
              <>Show Fewer Years <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Expand Full {schedule.length}-Year Schedule ({schedule.length - 5} more) <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
