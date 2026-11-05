"use client";

import React from "react";
import { Appointment } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";
import { Mail, CheckCircle } from "lucide-react";

interface EmailPreviewModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
}

export function EmailPreviewModal({
  appointment,
  isOpen,
  onClose,
  onSend,
}: EmailPreviewModalProps) {
  if (!appointment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Viewing Confirmation Dispatch" maxWidth="md">
      <div className="space-y-4 text-xs font-sans">
        <div className="p-3 bg-travertine/40 border border-stone-border rounded-sm">
          <p><strong className="text-charcoal">To:</strong> {appointment.clientName} &lt;{appointment.clientEmail}&gt;</p>
          <p><strong className="text-charcoal">From:</strong> Private Advisory &lt;{SITE_CONFIG.contact.email}&gt;</p>
          <p><strong className="text-charcoal">Subject:</strong> Confirmation: Private Viewing at {appointment.propertyTitle}</p>
        </div>

        <div className="p-4 bg-white border border-stone-border rounded-sm font-sans space-y-3 leading-relaxed text-charcoal/90">
          <p>Dear {appointment.clientName},</p>
          <p>
            We are pleased to confirm your private viewing appointment for <strong className="text-charcoal">{appointment.propertyTitle}</strong>.
          </p>
          <div className="p-3 bg-marble/50 border border-stone-border rounded-sm space-y-1">
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.timeSlot} CET</p>
            <p><strong>Assigned Advisor:</strong> {appointment.agentName}</p>
            <p><strong>Contact Desk:</strong> {SITE_CONFIG.contact.phone}</p>
          </div>
          <p>
            Please note that photo identification is required for entry into listed monumental properties.
          </p>
          <p className="pt-2 text-warm-grey">Sincerely,<br />{appointment.agentName} • {SITE_CONFIG.name}</p>
        </div>

        <div className="pt-4 flex justify-end gap-2 border-t border-stone-border">
          <Button size="sm" variant="outline" onClick={onClose}>Dismiss</Button>
          <Button size="sm" variant="primary" onClick={onSend}>
            <Mail className="w-3.5 h-3.5 mr-1" /> Send Confirmation Email
          </Button>
        </div>
      </div>
    </Modal>
  );
}
