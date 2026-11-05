"use client";

import React, { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types";
import { getStoredLeads, saveStoredLeads } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { LeadDrawer } from "@/components/admin/leads/LeadDrawer";
import { LeadKanbanBoard } from "@/components/admin/leads/LeadKanbanBoard";
import { LeadTable } from "@/components/admin/leads/LeadTable";
import { useToast } from "@/components/ui/Toast";
import { Kanban, Table, Download, Search } from "lucide-react";

const PIPELINE_STAGES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Viewing Scheduled",
  "Negotiation",
  "Converted",
  "Lost",
];

export default function AdminLeadsPage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    setLeads(getStoredLeads());
  }, []);

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    saveStoredLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    toast("Pipeline Stage Updated", `Lead shifted to ${newStatus}`);
  };

  const handleAssignAgent = (id: string, agentId: string) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, assignedAgentId: agentId } : l));
    setLeads(updated);
    saveStoredLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, assignedAgentId: agentId });
    }
    toast("Advisor Assigned", "Lead dossier reassigned.");
  };

  const handleAddNote = (id: string, text: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      author: "Saskia van der Meer",
      text,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };
    const updated = leads.map((l) =>
      l.id === id ? { ...l, internalNotes: [...(l.internalNotes || []), newNote] } : l
    );
    setLeads(updated);
    saveStoredLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, internalNotes: [...(selectedLead.internalNotes || []), newNote] });
    }
    toast("Internal Note Recorded", "Timestamped note saved.");
  };

  const handleExportCSV = () => {
    const headers = "ID,Full Name,Email,Phone,Type,Status,Property,Date\n";
    const rows = leads.map((l) => `"${l.id}","${l.fullName}","${l.email}","${l.phone}","${l.enquiryType}","${l.status}","${l.propertyTitle || ''}","${l.createdAt}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vdm-leads-${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    toast("CSV Export Dispatched", `${leads.length} records exported.`);
  };

  const filtered = leads.filter((l) =>
    l.fullName.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    (l.propertyTitle && l.propertyTitle.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Acquisitions CRM & Lead Pipeline</h1>
          <p className="text-xs text-warm-grey font-sans">Manage private viewing inquiries, valuations, and client status progression.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
          </Button>
          <div className="flex border border-stone-border rounded-sm bg-white p-0.5">
            <button onClick={() => setView("kanban")} className={`p-1.5 rounded-sm ${view === "kanban" ? "bg-travertine" : ""}`} title="Kanban"><Kanban className="w-4 h-4" /></button>
            <button onClick={() => setView("table")} className={`p-1.5 rounded-sm ${view === "table" ? "bg-travertine" : ""}`} title="Table"><Table className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="relative max-w-sm">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads by name, email, residence..." className="w-full text-xs font-sans pl-8 pr-3 py-2 bg-white border border-stone-border rounded-sm focus:outline-none" />
        <Search className="w-3.5 h-3.5 text-warm-grey absolute left-2.5 top-2.5" />
      </div>

      {view === "kanban" ? (
        <LeadKanbanBoard stages={PIPELINE_STAGES} leads={filtered} onSelectLead={setSelectedLead} />
      ) : (
        <LeadTable leads={filtered} onSelectLead={setSelectedLead} />
      )}

      <LeadDrawer
        lead={selectedLead}
        isOpen={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        onStatusChange={handleStatusChange}
        onAssignAgent={handleAssignAgent}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
