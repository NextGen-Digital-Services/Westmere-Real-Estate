"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredProperties, getStoredLeads, getStoredAppointments } from "@/lib/storage";
import { AGENTS } from "@/data/agents";
import { DashboardStatCard } from "@/components/admin/dashboard/DashboardStatCard";
import { DashboardCharts } from "@/components/admin/dashboard/DashboardCharts";
import { Badge } from "@/components/ui/Badge";
import { formatEUR } from "@/lib/utils";
import { Building, Kanban, CalendarDays, CheckCircle2, TrendingUp, Users, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState(getStoredProperties());
  const [leads, setLeads] = useState(getStoredLeads());
  const [appointments, setAppointments] = useState(getStoredAppointments());

  useEffect(() => {
    setProperties(getStoredProperties());
    setLeads(getStoredLeads());
    setAppointments(getStoredAppointments());
  }, []);

  const totalProps = properties.length;
  const activeProps = properties.filter((p) => p.availability === "Available").length;
  const soldProps = properties.filter((p) => p.availability === "Sold").length;
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const upcomingApts = appointments.filter((a) => a.status === "Confirmed").length;

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-sans uppercase tracking-eyebrow text-brass font-bold">
          Overview & Performance
        </span>
        <h1 className="font-serif text-3xl text-charcoal mt-1">Private Practice Dashboard</h1>
        <p className="text-xs text-warm-grey font-sans">Live portfolio metrics, active buyer pipelines, and calendar bookings.</p>
      </div>

      {/* 8 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatCard label="Total Properties" value={totalProps} icon={Building} trend="+2 this month" trendUp={true} />
        <DashboardStatCard label="Active Listings" value={activeProps} icon={TrendingUp} trend="Available" trendUp={true} />
        <DashboardStatCard label="Sold / Closed" value={soldProps} icon={CheckCircle2} trend="Settled" trendUp={true} />
        <DashboardStatCard label="Total CRM Leads" value={totalLeads} icon={Kanban} trend="+18% YoY" trendUp={true} />
        <DashboardStatCard label="New Enquiries" value={newLeads} icon={Users} trend="Unassigned" trendUp={true} />
        <DashboardStatCard label="Confirmed Viewings" value={upcomingApts} icon={CalendarDays} trend="Next 14 Days" trendUp={true} />
        <DashboardStatCard label="Conversion Rate" value={14} suffix="%" icon={TrendingUp} trend="+2.4% vs benchmark" trendUp={true} />
        <DashboardStatCard label="Avg Listing Value" value={2350} prefix="€" suffix="k" icon={Building} trend="Prime Randstad" trendUp={true} />
      </div>

      <DashboardCharts />

      {/* Recent Leads & Upcoming Viewings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-stone-border rounded-sm p-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-border">
            <h4 className="font-serif text-lg text-charcoal">Recent Acquisition Inquiries</h4>
            <Link href="/admin/leads" className="text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:underline">
              View All Pipeline →
            </Link>
          </div>
          <div className="divide-y divide-stone-border/60">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between text-xs font-sans">
                <div>
                  <p className="font-medium text-charcoal">{lead.fullName}</p>
                  <p className="text-warm-grey text-[11px] truncate max-w-xs">{lead.propertyTitle || lead.enquiryType}</p>
                </div>
                <div className="text-right">
                  <Badge variant="neutral">{lead.status}</Badge>
                  <p className="text-[10px] text-warm-grey mt-1">{lead.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-stone-border rounded-sm p-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-border">
            <h4 className="font-serif text-lg text-charcoal">Upcoming Private Viewings</h4>
            <Link href="/admin/appointments" className="text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:underline">
              Calendar →
            </Link>
          </div>
          <div className="divide-y divide-stone-border/60">
            {appointments.slice(0, 4).map((apt) => (
              <div key={apt.id} className="py-3 text-xs font-sans">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-charcoal">{apt.clientName}</span>
                  <span className="text-[10px] font-bold text-olive">{apt.date} • {apt.timeSlot}</span>
                </div>
                <p className="text-[11px] text-warm-grey truncate">{apt.propertyTitle}</p>
                <p className="text-[10px] text-brass mt-0.5">Advisor: {apt.agentName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
