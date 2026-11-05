"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getStoredAuth, AdminUser } from "@/lib/auth";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import Link from "next/link";
import { LayoutDashboard, Building, Kanban, CalendarDays, Sliders } from "lucide-react";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth);
    setLoading(false);

    if (!auth && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-marble flex items-center justify-center text-xs font-sans text-warm-grey">
        Verifying private security credentials...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-marble flex flex-col lg:flex-row pb-14 lg:pb-0">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={user} onMobileOpen={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile bottom quick action bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-border flex items-center justify-around py-2 text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey">
        <Link href="/admin" className={`flex flex-col items-center ${pathname === "/admin" ? "text-olive font-bold" : ""}`}>
          <LayoutDashboard className="w-4 h-4 mb-0.5" /> Dashboard
        </Link>
        <Link href="/admin/properties" className={`flex flex-col items-center ${pathname.startsWith("/admin/properties") ? "text-olive font-bold" : ""}`}>
          <Building className="w-4 h-4 mb-0.5" /> Properties
        </Link>
        <Link href="/admin/leads" className={`flex flex-col items-center ${pathname.startsWith("/admin/leads") ? "text-olive font-bold" : ""}`}>
          <Kanban className="w-4 h-4 mb-0.5" /> Leads
        </Link>
        <Link href="/admin/appointments" className={`flex flex-col items-center ${pathname.startsWith("/admin/appointments") ? "text-olive font-bold" : ""}`}>
          <CalendarDays className="w-4 h-4 mb-0.5" /> Viewings
        </Link>
        <Link href="/admin/settings" className={`flex flex-col items-center ${pathname.startsWith("/admin/settings") ? "text-olive font-bold" : ""}`}>
          <Sliders className="w-4 h-4 mb-0.5" /> Settings
        </Link>
      </div>
    </div>
  );
}
