"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Bell, Search, User, Shield, Check } from "lucide-react";
import { AdminUser } from "@/lib/auth";

interface AdminHeaderProps {
  user: AdminUser | null;
  onMobileOpen: () => void;
}

export function AdminHeader({ user, onMobileOpen }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "New viewing inquiry registered", time: "12m ago", unread: true },
    { id: 2, title: "Offer submitted for NL-10007", time: "2h ago", unread: true },
    { id: 3, title: "NWWI appraisal draft completed", time: "5h ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-20 h-14 bg-white border-b border-stone-border px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileOpen}
          className="lg:hidden p-1.5 text-charcoal hover:bg-marble rounded-sm"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative hidden sm:block w-64 md:w-80">
          <input
            type="text"
            placeholder="Search listings, clients, dossiers..."
            className="w-full text-xs font-sans pl-8 pr-3 py-1.5 bg-marble/40 border border-stone-border rounded-sm focus:outline-none focus:border-charcoal"
          />
          <Search className="w-3.5 h-3.5 text-warm-grey absolute left-2.5 top-2.5" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-charcoal hover:bg-marble rounded-sm relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-olive" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-stone-border shadow-none rounded-sm p-3 z-30 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-stone-border text-xs font-sans">
                <span className="font-semibold text-charcoal">Notifications</span>
                <span className="text-[10px] text-brass uppercase">2 New</span>
              </div>
              <div className="divide-y divide-stone-border/50">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2 text-xs font-sans">
                    <p className="text-charcoal font-medium">{n.title}</p>
                    <span className="text-[10px] text-warm-grey">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User profile capsule */}
        <div className="flex items-center gap-2 pl-3 border-l border-stone-border text-xs font-sans">
          <div className="w-7 h-7 rounded-full bg-travertine border border-stone-border flex items-center justify-center text-charcoal font-semibold text-xs">
            {user?.name ? user.name[0] : "A"}
          </div>
          <div className="hidden md:block text-left">
            <span className="font-medium text-charcoal block leading-none">{user?.name || "Administrator"}</span>
            <span className="text-[10px] text-brass uppercase tracking-eyebrow">{user?.role || "Super Admin"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
