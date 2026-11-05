"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import {
  LayoutDashboard,
  Building,
  Tag,
  MapPin,
  Kanban,
  Users2,
  FolderGit2,
  CalendarDays,
  Image as ImageIcon,
  MessageSquareQuote,
  Newspaper,
  FileCode2,
  SearchCheck,
  Shield,
  BarChart3,
  Sliders,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { setStoredAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    setStoredAuth(null);
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/properties", label: "Properties", icon: Building },
    { href: "/admin/categories", label: "Categories", icon: Tag },
    { href: "/admin/locations", label: "Locations", icon: MapPin },
    { href: "/admin/leads", label: "Leads & CRM", icon: Kanban },
    { href: "/admin/agents", label: "Advisors", icon: Users2 },
    { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { href: "/admin/blog", label: "Journal & SEO", icon: Newspaper },
    { href: "/admin/pages", label: "Pages CMS", icon: FileCode2 },
    { href: "/admin/seo", label: "SEO Config", icon: SearchCheck },
    { href: "/admin/users", label: "Users & Roles", icon: Shield },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Sliders },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-stone-border justify-between select-none">
      <div>
        <div className="p-4 border-b border-stone-border flex items-center justify-between">
          <Link href="/admin" className="truncate">
            <span className="font-serif text-base tracking-widest text-charcoal font-semibold block truncate">
              {collapsed ? "VDM" : SITE_CONFIG.name}
            </span>
            {!collapsed && <span className="text-[9px] uppercase tracking-eyebrow text-warm-grey">Admin Management Suite</span>}
          </Link>
          <button onClick={onToggle} className="hidden lg:block p-1 text-warm-grey hover:text-charcoal border border-stone-border rounded-sm">
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3 py-2 text-xs font-sans rounded-sm transition-colors ${
                  active ? "bg-olive text-white font-medium" : "text-charcoal/80 hover:bg-marble hover:text-charcoal"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0 stroke-[1.8]" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-stone-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-xs font-sans text-warm-grey hover:text-charcoal rounded-sm hover:bg-marble transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-brass" />
          {!collapsed && <span>View Public Portal</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-sans text-terracotta hover:bg-terracotta/10 rounded-sm transition-colors text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`hidden lg:block shrink-0 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <div className={`fixed top-0 bottom-0 z-30 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
          {sidebarContent}
        </div>
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-charcoal/50" onClick={onMobileClose} />
          <div className="relative w-64 max-w-[80vw] h-full z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
