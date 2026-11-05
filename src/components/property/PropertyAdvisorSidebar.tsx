"use client";

import React from "react";
import Image from "next/image";
import { Property, Agent } from "@/types";
import { Button } from "@/components/ui/Button";
import { MortgageMiniCalculator } from "./MortgageMiniCalculator";
import { Calendar, FileText, Phone, Mail } from "lucide-react";

interface PropertyAdvisorSidebarProps {
  property: Property;
  agent?: Agent;
  onScheduleViewing: () => void;
  onRequestInfo: () => void;
}

export function PropertyAdvisorSidebar({
  property,
  agent,
  onScheduleViewing,
  onRequestInfo,
}: PropertyAdvisorSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-border rounded-sm p-6 space-y-4">
        <h4 className="font-serif text-xl text-charcoal">Private Advisory Services</h4>
        <p className="text-xs text-warm-grey font-sans">
          Connect with our dedicated transaction team to arrange an in-person viewing or review title deeds.
        </p>
        <Button variant="primary" fullWidth size="lg" onClick={onScheduleViewing}>
          <Calendar className="w-4 h-4 mr-2" /> Schedule Viewing
        </Button>
        <Button variant="outline" fullWidth size="md" onClick={onRequestInfo}>
          <FileText className="w-4 h-4 mr-2" /> Request Prospectus
        </Button>
      </div>

      {agent && (
        <div className="bg-white border border-stone-border rounded-sm p-6">
          <span className="text-[10px] font-sans uppercase tracking-eyebrow text-brass block mb-3">Assigned Advisor</span>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-sm overflow-hidden border border-stone-border shrink-0">
              <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
            </div>
            <div>
              <h5 className="font-serif text-lg text-charcoal">{agent.name}</h5>
              <p className="text-xs text-warm-grey font-sans">{agent.role}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-border/60 text-xs font-sans text-warm-grey space-y-2">
            <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brass" /> {agent.phone}</p>
            <p className="flex items-center gap-2 truncate"><Mail className="w-3.5 h-3.5 text-brass" /> {agent.email}</p>
          </div>
        </div>
      )}

      {property.listingType === "buy" && (
        <MortgageMiniCalculator propertyPrice={property.price} />
      )}
    </div>
  );
}
