"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { formatEUR, slugify } from "@/lib/utils";
import { Plus, Trash2, Edit2, FolderGit2 } from "lucide-react";

export default function AdminProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Amsterdam");
  const [unitsTotal, setUnitsTotal] = useState(20);
  const [unitsAvailable, setUnitsAvailable] = useState(8);
  const [priceFrom, setPriceFrom] = useState(950000);
  const [completionDate, setCompletionDate] = useState("Q2 2028");
  const [architect, setArchitect] = useState("MVRDV Architects");

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title,
      slug: slugify(title),
      city,
      location: `${city} Central`,
      status: "Presale",
      unitsTotal: Number(unitsTotal),
      unitsAvailable: Number(unitsAvailable),
      completionDate,
      priceFrom: Number(priceFrom),
      coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"],
      description: "Exclusive residential masterplan with low-carbon credentials.",
      architect,
    };

    setProjects([newProj, ...projects]);
    setShowModal(false);
    setTitle("");
    toast("Project Created", `${title} added to development masterplans.`);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast("Project Removed", "Record removed from registry.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">New Development Masterplans</h1>
          <p className="text-xs text-warm-grey font-sans">Manage multi-unit residential developments, architectural deliveries, and allocations.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Development Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-44">
              <Image src={proj.coverImage} alt={proj.title} fill sizes="350px" className="object-cover" />
              <div className="absolute top-2 left-2"><Badge variant="neutral">{proj.status}</Badge></div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-eyebrow text-brass">{proj.location} • {proj.completionDate}</span>
                <h4 className="font-serif text-xl text-charcoal mt-0.5">{proj.title}</h4>
                <p className="text-xs text-warm-grey mt-1 font-sans">{proj.architect}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-border flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-[10px] uppercase text-warm-grey block">From</span>
                  <span className="font-medium text-charcoal">{formatEUR(proj.priceFrom)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brass">{proj.unitsAvailable}/{proj.unitsTotal} Available</span>
                  <button onClick={() => handleDelete(proj.id)} className="p-1 hover:text-terracotta"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <form onSubmit={handleAddProject} className="bg-white border border-stone-border rounded-sm p-6 max-w-md w-full space-y-3 text-xs font-sans">
            <h3 className="font-serif text-xl text-charcoal">Create Development Project</h3>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Project Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-stone-border rounded-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border border-stone-border rounded-sm" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Architect</label>
                <input type="text" value={architect} onChange={(e) => setArchitect(e.target.value)} className="w-full p-2 border border-stone-border rounded-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Total Units</label>
                <input type="number" value={unitsTotal} onChange={(e) => setUnitsTotal(Number(e.target.value))} className="w-full p-2 border border-stone-border rounded-sm" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Available</label>
                <input type="number" value={unitsAvailable} onChange={(e) => setUnitsAvailable(Number(e.target.value))} className="w-full p-2 border border-stone-border rounded-sm" />
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-stone-border">
              <Button size="sm" variant="outline" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button size="sm" variant="primary" type="submit">Publish Masterplan</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
