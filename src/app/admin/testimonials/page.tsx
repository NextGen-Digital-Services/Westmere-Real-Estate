"use client";

import React, { useState } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { Testimonial } from "@/types";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Plus, Star, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminTestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [showAdd, setShowAdd] = useState(false);
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [propertyType, setPropertyType] = useState("Canal House Acquisition");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !quote) return;
    const item: Testimonial = {
      id: `test-${Date.now()}`,
      author,
      role: role || "Private Investor",
      location: location || "Amsterdam",
      quote,
      rating: 5,
      propertyType,
    };
    setTestimonials([item, ...testimonials]);
    setShowAdd(false);
    setAuthor("");
    setQuote("");
    toast("Testimonial Published", `Citation from ${author} added.`);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    toast("Testimonial Removed", "Deleted from registry.");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Client Endorsements & Testimonials</h1>
          <p className="text-xs text-warm-grey font-sans">Manage client reflections and accredited citations displayed on the portal.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white border border-stone-border rounded-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-sans">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2 text-brass">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-brass stroke-none" />
                ))}
                <span className="text-[10px] uppercase tracking-eyebrow text-warm-grey ml-2">{t.propertyType}</span>
              </div>
              <p className="font-serif text-base text-charcoal italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-2 text-charcoal font-medium">{t.author} <span className="text-warm-grey font-normal">— {t.role}, {t.location}</span></p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <button onClick={() => handleDelete(t.id)} className="p-2 text-warm-grey hover:text-terracotta border border-stone-border rounded-sm">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <form onSubmit={handleAdd} className="bg-white border border-stone-border rounded-sm p-6 max-w-md w-full space-y-3 text-xs font-sans">
            <h3 className="font-serif text-xl text-charcoal">Add Client Testimonial</h3>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Author Name *</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="w-full p-2 border border-stone-border rounded-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Title / Role</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Art Collector" className="w-full p-2 border border-stone-border rounded-sm" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Amsterdam, Singel" className="w-full p-2 border border-stone-border rounded-sm" />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Property Type Context</label>
              <input type="text" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full p-2 border border-stone-border rounded-sm" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Quote *</label>
              <textarea rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} required className="w-full p-2 border border-stone-border rounded-sm" />
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-stone-border">
              <Button size="sm" variant="outline" type="button" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button size="sm" variant="primary" type="submit">Publish</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
