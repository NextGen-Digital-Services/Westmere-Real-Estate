import React from "react";
import { Metadata } from "next";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: "Admin Management Suite | Van der Meer & Co.",
  description: "Internal administrative terminal for properties, CRM pipelines, and calendar bookings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
