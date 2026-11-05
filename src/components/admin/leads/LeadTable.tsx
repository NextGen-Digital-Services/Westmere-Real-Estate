"use client";

import React from "react";
import { Lead } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface LeadTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function LeadTable({ leads, onSelectLead }: LeadTableProps) {
  return (
    <div className="bg-white border border-stone-border rounded-sm overflow-x-auto">
      <table className="w-full text-left text-xs font-sans">
        <thead className="bg-travertine/40 border-b border-stone-border text-warm-grey uppercase text-[10px] tracking-eyebrow">
          <tr>
            <th className="p-3">Client</th>
            <th className="p-3">Enquiry Type</th>
            <th className="p-3">Interested Property</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-right">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-border/60 text-charcoal">
          {leads.map((l) => (
            <tr key={l.id} className="hover:bg-marble/30 transition-colors">
              <td className="p-3 font-medium">
                {l.fullName}
                <span className="block text-[11px] text-warm-grey">{l.email}</span>
              </td>
              <td className="p-3">{l.enquiryType}</td>
              <td className="p-3 truncate max-w-xs">{l.propertyTitle || "—"}</td>
              <td className="p-3"><Badge variant="neutral">{l.status}</Badge></td>
              <td className="p-3 text-warm-grey">{l.createdAt}</td>
              <td className="p-3 text-right">
                <Button size="sm" variant="outline" onClick={() => onSelectLead(l)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
