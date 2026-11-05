"use client";

import React, { useState } from "react";
import { Lead, LeadStatus } from "@/types";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AGENTS } from "@/data/agents";
import { Mail, Phone, Calendar, Clock, User, Plus, MessageSquare } from "lucide-react";

interface LeadDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: LeadStatus) => void;
  onAssignAgent: (id: string, agentId: string) => void;
  onAddNote: (id: string, noteText: string) => void;
}

const STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Viewing Scheduled",
  "Negotiation",
  "Converted",
  "Lost",
];

export function LeadDrawer({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onAssignAgent,
  onAddNote,
}: LeadDrawerProps) {
  const [noteText, setNoteText] = useState("");

  if (!lead) return null;

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(lead.id, noteText.trim());
    setNoteText("");
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={lead.fullName} subtitle={`Ref: ${lead.id} • ${lead.enquiryType}`}>
      <div className="space-y-6 text-xs font-sans">
        {/* Status selector */}
        <div className="p-4 bg-marble/40 border border-stone-border rounded-sm">
          <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1.5 font-bold">Pipeline Stage</label>
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(lead.id, st)}
                className={`px-2.5 py-1 text-[11px] uppercase tracking-eyebrow rounded-sm border ${
                  lead.status === st ? "bg-olive text-white border-olive font-semibold" : "bg-white text-charcoal border-stone-border hover:bg-travertine/40"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Contact details */}
        <div className="space-y-2 p-4 bg-white border border-stone-border rounded-sm">
          <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brass" /> <a href={`mailto:${lead.email}`} className="text-olive hover:underline">{lead.email}</a></p>
          <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brass" /> <a href={`tel:${lead.phone}`} className="text-charcoal">{lead.phone}</a></p>
          <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-brass" /> Submitted: {lead.createdAt} via {lead.leadSource}</p>
          {lead.preferredDate && (
            <p className="flex items-center gap-2 text-olive font-medium pt-1 border-t border-stone-border/40">
              <Calendar className="w-3.5 h-3.5 text-olive" /> Preferred Slot: {lead.preferredDate} ({lead.preferredTimeSlot || "Any time"})
            </p>
          )}
        </div>

        {/* Interested property */}
        {lead.propertyTitle && (
          <div className="p-4 bg-white border border-stone-border rounded-sm">
            <span className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Interested Residence</span>
            <p className="font-serif text-base text-charcoal">{lead.propertyTitle}</p>
          </div>
        )}

        {/* Message */}
        <div className="p-4 bg-white border border-stone-border rounded-sm">
          <span className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Client Inscription</span>
          <p className="text-warm-grey leading-relaxed">{lead.message}</p>
        </div>

        {/* Assigned Agent */}
        <div>
          <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Assigned Senior Partner</label>
          <select
            value={lead.assignedAgentId || ""}
            onChange={(e) => onAssignAgent(lead.id, e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-stone-border rounded-sm"
          >
            <option value="">Unassigned</option>
            {AGENTS.map((a) => (<option key={a.id} value={a.id}>{a.name} ({a.role})</option>))}
          </select>
        </div>

        {/* Internal Notes with timestamps */}
        <div className="pt-4 border-t border-stone-border">
          <h5 className="font-serif text-base text-charcoal mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brass" /> Internal Fiduciary Notes ({lead.internalNotes?.length || 0})
          </h5>
          <div className="space-y-2 mb-4">
            {lead.internalNotes?.map((note) => (
              <div key={note.id} className="p-2.5 bg-marble/40 border border-stone-border rounded-sm">
                <div className="flex justify-between text-[10px] text-warm-grey mb-1">
                  <strong>{note.author}</strong>
                  <span>{note.createdAt}</span>
                </div>
                <p className="text-xs text-charcoal">{note.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleNoteSubmit} className="flex gap-2">
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add confidential advisor note..."
              className="flex-1 text-xs p-2 bg-white border border-stone-border rounded-sm"
            />
            <Button type="submit" size="sm" variant="primary">Add Note</Button>
          </form>
        </div>
      </div>
    </Drawer>
  );
}
