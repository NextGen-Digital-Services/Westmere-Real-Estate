"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, Users, ArrowUpRight, Globe } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState("30d");

  const sources = [
    { source: "Direct & Private Office Referrals", sessions: "14,820", share: "42%" },
    { source: "Google Organic (Netherlands)", sessions: "9,640", share: "27%" },
    { source: "Diplomatic & Expat Portals", sessions: "6,210", share: "18%" },
    { source: "Financial Times / Architectural Digests", sessions: "4,530", share: "13%" },
  ];

  const topPages = [
    { path: "/properties/keizersgracht-monumental-canal-mansion-amsterdam", views: "6,410", avgTime: "4m 12s" },
    { path: "/properties/zalmhaven-sky-penthouse-rotterdam", views: "5,820", avgTime: "3m 45s" },
    { path: "/tools", views: "4,190", avgTime: "5m 20s" },
    { path: "/properties/wassenaar-royal-woodland-estate", views: "3,840", avgTime: "3m 10s" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Portal Traffic & Inquiry Analytics</h1>
          <p className="text-xs text-warm-grey font-sans">Acquisition traffic density, top performing listings, and referral origins.</p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="text-xs font-sans p-2 bg-white border border-stone-border rounded-sm w-36"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last Quarter</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-border p-6 rounded-sm">
          <span className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey">Total Unique Visitors</span>
          <p className="font-serif text-3xl font-medium text-charcoal mt-1">35,200</p>
          <span className="text-xs text-sage font-medium mt-2 inline-block">+14.2% vs previous period</span>
        </div>
        <div className="bg-white border border-stone-border p-6 rounded-sm">
          <span className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey">Dossier Downloads</span>
          <p className="font-serif text-3xl font-medium text-charcoal mt-1">1,840</p>
          <span className="text-xs text-sage font-medium mt-2 inline-block">+8.6% conversion</span>
        </div>
        <div className="bg-white border border-stone-border p-6 rounded-sm">
          <span className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey">Private Viewing Requests</span>
          <p className="font-serif text-3xl font-medium text-charcoal mt-1">128</p>
          <span className="text-xs text-olive font-medium mt-2 inline-block">High Intent Qualified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-stone-border rounded-sm p-6">
          <h4 className="font-serif text-lg text-charcoal mb-4">Traffic Referral Channels</h4>
          <div className="divide-y divide-stone-border/60 text-xs font-sans">
            {sources.map((s, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal">{s.source}</p>
                  <span className="text-warm-grey text-[11px]">{s.sessions} sessions</span>
                </div>
                <span className="font-bold text-olive">{s.share}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-border rounded-sm p-6">
          <h4 className="font-serif text-lg text-charcoal mb-4">Top Viewed Property Dossiers</h4>
          <div className="divide-y divide-stone-border/60 text-xs font-sans">
            {topPages.map((p, i) => (
              <div key={i} className="py-3">
                <p className="font-medium text-charcoal truncate">{p.path}</p>
                <div className="flex justify-between text-[11px] text-warm-grey mt-1">
                  <span>{p.views} views</span>
                  <span>Avg Duration: {p.avgTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
