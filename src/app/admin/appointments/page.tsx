"use client";

import React, { useState, useEffect } from "react";
import { Appointment } from "@/types";
import { getStoredAppointments, saveStoredAppointments, hasAppointmentConflict } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { EmailPreviewModal } from "@/components/admin/appointments/EmailPreviewModal";
import { CalendarDays, List, CheckCircle, XCircle, AlertTriangle, Mail, Clock } from "lucide-react";

export default function AdminAppointmentsPage() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [emailModalApt, setEmailModalApt] = useState<Appointment | null>(null);

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  const handleStatusChange = (apt: Appointment, newStatus: "Confirmed" | "Cancelled") => {
    setConflictWarning(null);

    if (newStatus === "Confirmed") {
      // OVERLAPPING CONFLICT CHECK FOR SAME AGENT
      const hasConflict = hasAppointmentConflict(apt.agentId, apt.date, apt.timeSlot, apt.id);
      if (hasConflict) {
        setConflictWarning(
          `SCHEDULE CONFLICT: Advisor ${apt.agentName} already has another confirmed appointment on ${apt.date} at ${apt.timeSlot}. Please reschedule to avoid double-booking.`
        );
        toast("Appointment Conflict Detected", "Advisor has an overlapping confirmed slot.", "error");
        return;
      }
    }

    const updated = appointments.map((a) => (a.id === apt.id ? { ...a, status: newStatus } : a));
    setAppointments(updated);
    saveStoredAppointments(updated);
    toast(`Appointment ${newStatus}`, `Viewing on ${apt.date} marked ${newStatus}.`);

    if (newStatus === "Confirmed") {
      setEmailModalApt({ ...apt, status: "Confirmed" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Viewing Schedule & Calendar</h1>
          <p className="text-xs text-warm-grey font-sans">Approve appointments, manage conflict warnings, and preview dispatch notices.</p>
        </div>
        <div className="flex border border-stone-border rounded-sm bg-white p-0.5">
          <button onClick={() => setView("list")} className={`p-1.5 rounded-sm ${view === "list" ? "bg-travertine" : ""}`} title="List View"><List className="w-4 h-4" /></button>
          <button onClick={() => setView("calendar")} className={`p-1.5 rounded-sm ${view === "calendar" ? "bg-travertine" : ""}`} title="Calendar View"><CalendarDays className="w-4 h-4" /></button>
        </div>
      </div>

      {conflictWarning && (
        <div className="p-4 bg-terracotta/15 border border-terracotta/40 rounded-sm flex items-start gap-3 text-xs font-sans text-terracotta animate-fade-in">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong>Conflict Prevention Warning:</strong>
            <p className="mt-0.5 leading-relaxed">{conflictWarning}</p>
          </div>
          <button onClick={() => setConflictWarning(null)} className="text-terracotta font-bold text-sm">×</button>
        </div>
      )}

      {view === "list" ? (
        <div className="bg-white border border-stone-border rounded-sm overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-travertine/40 border-b border-stone-border text-warm-grey uppercase text-[10px] tracking-eyebrow">
              <tr>
                <th className="p-3">Client & Contact</th>
                <th className="p-3">Residence Target</th>
                <th className="p-3">Date & Slot</th>
                <th className="p-3">Assigned Advisor</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border/60 text-charcoal">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-marble/30 transition-colors">
                  <td className="p-3">
                    <p className="font-medium text-charcoal">{apt.clientName}</p>
                    <span className="text-[11px] text-warm-grey">{apt.clientEmail} • {apt.clientPhone}</span>
                  </td>
                  <td className="p-3 font-medium truncate max-w-xs">{apt.propertyTitle}</td>
                  <td className="p-3 whitespace-nowrap"><span className="font-semibold text-charcoal">{apt.date}</span><span className="block text-[11px] text-warm-grey">{apt.timeSlot}</span></td>
                  <td className="p-3 text-olive font-medium">{apt.agentName}</td>
                  <td className="p-3">
                    <Badge variant={apt.status === "Confirmed" ? "available" : apt.status === "Cancelled" ? "sold" : "underOffer"}>{apt.status}</Badge>
                  </td>
                  <td className="p-3 text-right space-x-1 whitespace-nowrap">
                    {apt.status === "Pending" && (
                      <>
                        <button onClick={() => handleStatusChange(apt, "Confirmed")} className="p-1 text-sage hover:bg-sage/10 rounded-sm" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                        <button onClick={() => handleStatusChange(apt, "Cancelled")} className="p-1 text-terracotta hover:bg-terracotta/10 rounded-sm" title="Reject"><XCircle className="w-4 h-4" /></button>
                      </>
                    )}
                    {apt.status === "Confirmed" && (
                      <button onClick={() => setEmailModalApt(apt)} className="p-1 text-brass hover:bg-travertine rounded-sm" title="Preview Confirmation Email"><Mail className="w-4 h-4" /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="p-4 bg-white border border-stone-border rounded-sm text-xs font-sans space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-stone-border/60">
                <span className="font-bold text-olive">{apt.date}</span>
                <span className="text-warm-grey text-[11px]">{apt.timeSlot}</span>
              </div>
              <p className="font-medium text-charcoal">{apt.clientName}</p>
              <p className="text-[11px] text-warm-grey truncate">{apt.propertyTitle}</p>
              <p className="text-[10px] text-brass">Advisor: {apt.agentName}</p>
              <div className="pt-2 flex justify-between items-center border-t border-stone-border/40">
                <Badge variant={apt.status === "Confirmed" ? "available" : "underOffer"}>{apt.status}</Badge>
                {apt.status === "Pending" && (
                  <Button size="sm" variant="primary" onClick={() => handleStatusChange(apt, "Confirmed")}>Approve</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <EmailPreviewModal
        appointment={emailModalApt}
        isOpen={Boolean(emailModalApt)}
        onClose={() => setEmailModalApt(null)}
        onSend={() => {
          setEmailModalApt(null);
          toast("Confirmation Dispatched", "Confirmation email delivered to client.");
        }}
      />
    </div>
  );
}
