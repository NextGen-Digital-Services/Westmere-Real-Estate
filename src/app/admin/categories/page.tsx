"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Plus, Trash2, Edit2, Tag } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  type: "residential" | "commercial" | "special";
  count: number;
  description: string;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: "cat-1", name: "Canal House (Grachtenpand)", type: "residential", count: 8, description: "17th and 18th century monumental water-facing residences." },
  { id: "cat-2", name: "Modernist Villa", type: "residential", count: 6, description: "Contemporary detached architectural villas with private grounds." },
  { id: "cat-3", name: "Sky Penthouse", type: "residential", count: 5, description: "High-floor luxury penthouses commanding panoramic skyline views." },
  { id: "cat-4", name: "Executive Office HQ", type: "commercial", count: 3, description: "Institutional grade commercial and creative technology offices." },
  { id: "cat-5", name: "Rijksmonument Estate", type: "special", count: 4, description: "Nationally listed heritage assets with specialized tax status." },
];

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [catType, setCatType] = useState<"residential" | "commercial" | "special">("residential");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name,
      type: catType,
      count: 0,
      description,
    };
    setCategories([...categories, newCat]);
    setName("");
    setDescription("");
    toast("Category Registered", `${name} added to taxonomy.`);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast("Category Removed", "Item deleted.");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl text-charcoal">Property Categories & Typology</h1>
        <p className="text-xs text-warm-grey font-sans">Manage architectural classifications across residential and commercial sectors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleAdd} className="lg:col-span-5 bg-white border border-stone-border p-6 rounded-sm space-y-4">
          <h3 className="font-serif text-lg text-charcoal flex items-center gap-2">
            <Plus className="w-4 h-4 text-brass" /> Add New Classification
          </h3>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Category Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Waterfront Pavilion" className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Sector</label>
            <select value={catType} onChange={(e) => setCatType(e.target.value as any)} className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm">
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="special">Special Monument</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">Description</label>
            <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Architectural scope..." className="w-full text-xs p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>
          <Button type="submit" variant="primary" fullWidth size="md">Save Category</Button>
        </form>

        <div className="lg:col-span-7 bg-white border border-stone-border rounded-sm overflow-hidden">
          <div className="p-4 bg-marble/30 border-b border-stone-border font-serif text-base text-charcoal">Active Typology Classifications ({categories.length})</div>
          <div className="divide-y divide-stone-border/60">
            {categories.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between hover:bg-marble/20 transition-colors text-xs font-sans">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-charcoal text-sm">{c.name}</span>
                    <span className="text-[10px] uppercase font-sans tracking-eyebrow px-2 py-0.5 bg-travertine text-charcoal rounded-sm">{c.type}</span>
                  </div>
                  <p className="text-warm-grey mt-1">{c.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-brass font-medium">{c.count} Listings</span>
                  <button onClick={() => handleDelete(c.id)} className="p-1 hover:text-terracotta" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
