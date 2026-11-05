"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Property } from "@/types";
import { getStoredProperties, saveStoredProperties } from "@/lib/storage";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Plus, Search, Trash2, Square } from "lucide-react";
import { PropertyTableRow } from "@/components/admin/properties/PropertyTableRow";
import { DeleteConfirmModal } from "@/components/admin/properties/DeleteConfirmModal";

export default function AdminPropertiesPage() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setProperties(getStoredProperties());
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (cityFilter !== "All" && p.city !== cityFilter) return false;
      if (search) {
        const query = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(query) ||
          p.propertyCode.toLowerCase().includes(query) ||
          p.street.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [properties, search, cityFilter]);

  const handleDelete = (id: string) => {
    const updated = properties.filter((p) => p.id !== id);
    setProperties(updated);
    saveStoredProperties(updated);
    setDeleteConfirmId(null);
    toast("Property Removed", "Listing removed from local database.");
  };

  const handleDuplicate = (prop: Property) => {
    const copy: Property = {
      ...prop,
      id: `prop-${Date.now()}`,
      propertyCode: `NL-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `${prop.title} (Copy)`,
      slug: `${prop.slug}-copy-${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 10),
    };
    const updated = [copy, ...properties];
    setProperties(updated);
    saveStoredProperties(updated);
    toast("Listing Duplicated", `Created ${copy.propertyCode}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Property Dossier Management</h1>
          <p className="text-xs text-warm-grey font-sans">Full CRUD control, image galleries, and Netherlands cadastral specs.</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => {
              const updated = properties.filter((p) => !selectedIds.includes(p.id));
              setProperties(updated);
              saveStoredProperties(updated);
              setSelectedIds([]);
              toast("Bulk Action Completed", `Deleted ${selectedIds.length} properties.`);
            }} className="text-terracotta border-terracotta/40">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete ({selectedIds.length})
            </Button>
          )}
          <Link href="/admin/properties/new">
            <Button variant="primary" size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> New Listing</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 border border-stone-border rounded-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, property code (NL-...), or street..."
            className="w-full text-xs font-sans pl-8 pr-3 py-2 bg-marble/20 border border-stone-border rounded-sm focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-warm-grey absolute left-2.5 top-2.5" />
        </div>
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="text-xs font-sans p-2 bg-marble/20 border border-stone-border rounded-sm sm:w-44"
        >
          {["All", "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Haarlem"].map((c) => (
            <option key={c} value={c}>{c === "All" ? "All Municipalities" : c}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-stone-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-travertine/40 border-b border-stone-border text-warm-grey uppercase text-[10px] tracking-eyebrow">
              <tr>
                <th className="p-3 w-8"><Square className="w-3.5 h-3.5" /></th>
                <th className="p-3">Ref & Title</th>
                <th className="p-3">Municipality</th>
                <th className="p-3">Area / Beds</th>
                <th className="p-3">Asking Price</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border/60 text-charcoal">
              {filtered.map((p) => (
                <PropertyTableRow
                  key={p.id}
                  property={p}
                  isSelected={selectedIds.includes(p.id)}
                  onToggleSelect={(id) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])}
                  onDuplicate={handleDuplicate}
                  onDeleteRequest={setDeleteConfirmId}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal id={deleteConfirmId} onCancel={() => setDeleteConfirmId(null)} onConfirm={handleDelete} />
    </div>
  );
}
