"use client";

import React from "react";
import { useCounter } from "@/hooks/useCounter";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
}

export function DashboardStatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  trend,
  trendUp = true,
  icon: Icon,
}: StatCardProps) {
  const count = useCounter(value, 1000);

  return (
    <div className="bg-white border border-stone-border p-5 rounded-sm flex items-start justify-between">
      <div>
        <p className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey">{label}</p>
        <p className="font-serif text-3xl font-medium text-charcoal mt-1">
          {prefix}{count.toLocaleString()}{suffix}
        </p>
        {trend && (
          <p className="text-[11px] font-sans mt-2">
            <span className={trendUp ? "text-sage font-medium" : "text-terracotta font-medium"}>
              {trend}
            </span>{" "}
            <span className="text-warm-grey">vs last month</span>
          </p>
        )}
      </div>

      <div className="p-2.5 bg-travertine/60 border border-stone-border rounded-sm text-brass shrink-0">
        <Icon className="w-5 h-5 stroke-[1.5]" />
      </div>
    </div>
  );
}
