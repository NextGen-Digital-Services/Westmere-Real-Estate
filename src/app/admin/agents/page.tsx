"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AGENTS } from "@/data/agents";
import { Agent } from "@/types";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Plus, Edit2, Trash2, Phone, Mail, Award, Key } from "lucide-react";

/**
 * ARCHITECTURE NOTE:
 * Designed with a role-based structure allowing individual agent authentication
 * and sub-portal views to be introduced cleanly without altering data structures.
 */
export default function AdminAgentsPage() {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name,
      role: role || "Senior Advisor",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      bio: "Specializing in prime residential acquisitions and monumental estates.",
      email,
      phone: phone || "+31 20 894 3200",
      languages: ["Dutch", "English"],
      assignedPropertyIds: [],
      experienceYears: 10,
      rating: 4.9,
      activeListingsCount: 0,
    };

    setAgents([newAgent, ...agents]);
    setShowAddModal(false);
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
    toast("Advisor Enrolled", `${name} profile created.`);
  };

  const handleDelete = (id: string) => {
    setAgents(agents.filter((a) => a.id !== id));
    toast("Advisor Removed", "Record deleted from registry.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Senior Partners & Advisors</h1>
          <p className="text-xs text-warm-grey font-sans">Manage advisory team credentials, performance statistics, and portfolio assignments.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Advisor Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between p-5">
            <div>
              <div className="relative h-44 w-full rounded-sm overflow-hidden border border-stone-border mb-3">
                <Image src={agent.photo} alt={agent.name} fill sizes="250px" className="object-cover object-top" />
              </div>
              <span className="text-[10px] font-sans uppercase tracking-eyebrow text-brass block">{agent.role}</span>
              <h4 className="font-serif text-lg text-charcoal mt-0.5">{agent.name}</h4>
              <p className="text-xs text-warm-grey mt-2 line-clamp-2">{agent.bio}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-border text-xs font-sans text-warm-grey space-y-1">
              <div className="flex justify-between text-[11px] text-charcoal pb-1 border-b border-stone-border/40">
                <span>{agent.experienceYears} Years Exp.</span>
                <span className="text-olive font-medium">{agent.activeListingsCount} Active Listings</span>
              </div>
              <p className="truncate pt-1">{agent.email}</p>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => handleDelete(agent.id)} className="p-1 text-warm-grey hover:text-terracotta"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <form onSubmit={handleAddAgent} className="bg-white border border-stone-border rounded-sm p-6 max-w-md w-full space-y-3">
            <h3 className="font-serif text-xl text-charcoal">Enroll New Advisor</h3>
            <div>
              <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Full Legal Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full text-xs p-2 border border-stone-border rounded-sm" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Role Title</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Director, Canal Heritage" className="w-full text-xs p-2 border border-stone-border rounded-sm" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full text-xs p-2 border border-stone-border rounded-sm" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block mb-1">Direct Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+31 20 ..." className="w-full text-xs p-2 border border-stone-border rounded-sm" />
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-stone-border">
              <Button size="sm" variant="outline" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button size="sm" variant="primary" type="submit">Save Profile</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
