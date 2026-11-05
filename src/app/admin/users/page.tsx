"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Shield, Plus, Check } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Editor" | "Agent Manager";
  lastLogin: string;
}

const INITIAL_USERS: UserRecord[] = [
  { id: "u-1", name: "Saskia van der Meer", email: "saskia@vandermeer.estate", role: "Super Admin", lastLogin: "Just now" },
  { id: "u-2", name: "Floris van Houten", email: "floris@vandermeer.estate", role: "Admin", lastLogin: "2 hours ago" },
  { id: "u-3", name: "Eveline de Jong", email: "eveline@vandermeer.estate", role: "Agent Manager", lastLogin: "Yesterday" },
  { id: "u-4", name: "Editorial Team", email: "editor@vandermeer.estate", role: "Editor", lastLogin: "3 days ago" },
];

const PERMISSIONS = [
  { module: "Property Inventory (CRUD)", superAdmin: true, admin: true, editor: true, agentMgr: false },
  { module: "Acquisitions CRM & Lead Data", superAdmin: true, admin: true, editor: false, agentMgr: true },
  { module: "Viewing Calendar & Dispatch", superAdmin: true, admin: true, editor: false, agentMgr: true },
  { module: "Media & Cadastral Archives", superAdmin: true, admin: true, editor: true, agentMgr: false },
  { module: "Financial Settings & Reset", superAdmin: true, admin: false, editor: false, agentMgr: false },
];

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Security Roles & Permissions</h1>
          <p className="text-xs text-warm-grey font-sans">Role-based access matrix and internal staff management.</p>
        </div>
      </div>

      <div className="bg-white border border-stone-border rounded-sm overflow-hidden">
        <div className="p-4 bg-marble/30 border-b border-stone-border font-serif text-base text-charcoal">Staff Directory</div>
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-travertine/40 border-b border-stone-border text-warm-grey uppercase text-[10px] tracking-eyebrow">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role Designation</th>
              <th className="p-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-border/60 text-charcoal">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-marble/20">
                <td className="p-3 font-semibold">{u.name}</td>
                <td className="p-3 text-warm-grey">{u.email}</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-travertine font-medium rounded-sm">{u.role}</span></td>
                <td className="p-3 text-warm-grey">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-stone-border rounded-sm p-6 space-y-4">
        <h4 className="font-serif text-xl text-charcoal">Access Control Matrix</h4>
        <div className="border border-stone-border rounded-sm overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-travertine/40 border-b border-stone-border text-warm-grey uppercase text-[10px] tracking-eyebrow">
              <tr>
                <th className="p-3">Management Module</th>
                <th className="p-3 text-center">Super Admin</th>
                <th className="p-3 text-center">Admin</th>
                <th className="p-3 text-center">Editor</th>
                <th className="p-3 text-center">Agent Mgr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border/60">
              {PERMISSIONS.map((p, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium text-charcoal">{p.module}</td>
                  <td className="p-3 text-center">{p.superAdmin ? <Check className="w-4 h-4 text-sage mx-auto" /> : "—"}</td>
                  <td className="p-3 text-center">{p.admin ? <Check className="w-4 h-4 text-sage mx-auto" /> : "—"}</td>
                  <td className="p-3 text-center">{p.editor ? <Check className="w-4 h-4 text-sage mx-auto" /> : "—"}</td>
                  <td className="p-3 text-center">{p.agentMgr ? <Check className="w-4 h-4 text-sage mx-auto" /> : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
