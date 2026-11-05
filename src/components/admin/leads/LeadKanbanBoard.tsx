"use client";

import React from "react";
import { Lead, LeadStatus } from "@/types";

interface LeadKanbanBoardProps {
  stages: LeadStatus[];
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function LeadKanbanBoard({ stages, leads, onSelectLead }: LeadKanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6">
      {stages.map((stage) => {
        const stageLeads = leads.filter((l) => l.status === stage);
        return (
          <div key={stage} className="w-72 shrink-0 bg-travertine/40 border border-stone-border rounded-sm flex flex-col max-h-[70vh]">
            <div className="p-3 border-b border-stone-border bg-white flex items-center justify-between font-serif text-sm text-charcoal">
              <span>{stage}</span>
              <span className="text-xs font-sans font-bold text-warm-grey bg-marble px-2 py-0.5 rounded-sm border border-stone-border">
                {stageLeads.length}
              </span>
            </div>
            <div className="p-2 space-y-2 overflow-y-auto flex-1">
              {stageLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="p-3 bg-white border border-stone-border rounded-sm hover:border-charcoal cursor-pointer text-xs font-sans space-y-1"
                >
                  <p className="font-semibold text-charcoal">{lead.fullName}</p>
                  <p className="text-[11px] text-warm-grey truncate">{lead.propertyTitle || lead.enquiryType}</p>
                  <div className="flex justify-between items-center text-[10px] text-brass pt-1 border-t border-stone-border/40">
                    <span>{lead.leadSource}</span>
                    <span>{lead.createdAt.substring(0, 10)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
