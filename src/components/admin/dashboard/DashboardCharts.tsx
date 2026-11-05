"use client";

import React from "react";

export function DashboardCharts() {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const leadCounts = [18, 24, 29, 36, 42, 48];
  const maxLeads = 50;

  const cities = [
    { name: "Amsterdam", count: 8, pct: 33 },
    { name: "Rotterdam", count: 6, pct: 25 },
    { name: "The Hague", count: 4, pct: 17 },
    { name: "Utrecht", count: 3, pct: 13 },
    { name: "Other Municipalities", count: 3, pct: 12 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-8">
      {/* Leads over time bar chart */}
      <div className="lg:col-span-8 bg-white border border-stone-border p-6 rounded-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-border">
          <div>
            <h4 className="font-serif text-lg text-charcoal">Acquisition Enquiries & Leads</h4>
            <p className="text-xs text-warm-grey font-sans">Monthly transaction registrations</p>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-eyebrow text-brass font-medium">
            Past 6 Months
          </span>
        </div>

        <div className="mt-8 flex items-end justify-between h-48 gap-4 px-2">
          {months.map((m, i) => {
            const heightPct = (leadCounts[i] / maxLeads) * 100;
            return (
              <div key={m} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-sans font-medium text-charcoal">
                  {leadCounts[i]}
                </span>
                <div className="w-full bg-travertine rounded-sm h-36 flex items-end">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full bg-olive rounded-sm transition-all duration-500 hover:bg-cypress"
                  />
                </div>
                <span className="text-xs font-sans text-warm-grey">{m}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Listings by city breakdown */}
      <div className="lg:col-span-4 bg-white border border-stone-border p-6 rounded-sm flex flex-col justify-between">
        <div>
          <div className="pb-4 border-b border-stone-border">
            <h4 className="font-serif text-lg text-charcoal">Regional Portfolio Density</h4>
            <p className="text-xs text-warm-grey font-sans">Distribution by Dutch city</p>
          </div>

          <div className="mt-6 space-y-3">
            {cities.map((c) => (
              <div key={c.name} className="text-xs font-sans">
                <div className="flex justify-between text-charcoal mb-1">
                  <span>{c.name}</span>
                  <span className="font-medium text-warm-grey">{c.count} listings ({c.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-travertine rounded-sm overflow-hidden">
                  <div style={{ width: `${c.pct}%` }} className="h-full bg-olive rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 pt-3 border-t border-stone-border text-[11px] text-warm-grey font-sans">
          Amsterdam & Rotterdam comprise 58% of active advisory capital.
        </p>
      </div>
    </div>
  );
}
