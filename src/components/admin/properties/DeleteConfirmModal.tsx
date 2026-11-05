"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface DeleteConfirmModalProps {
  id: string | null;
  onCancel: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteConfirmModal({ id, onCancel, onConfirm }: DeleteConfirmModalProps) {
  if (!id) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
      <div className="bg-white border border-stone-border rounded-sm p-6 max-w-md w-full">
        <h3 className="font-serif text-xl text-charcoal">Confirm Permanent Deletion</h3>
        <p className="mt-2 text-xs font-sans text-warm-grey">
          This will remove the residence from the active catalog and localStorage state.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button size="sm" variant="primary" onClick={() => onConfirm(id)}>Confirm Delete</Button>
        </div>
      </div>
    </div>
  );
}
