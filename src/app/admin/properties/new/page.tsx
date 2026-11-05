import React from "react";
import Link from "next/link";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function NewPropertyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Properties", href: "/admin/properties" },
          { label: "Create New Listing" },
        ]}
      />

      <div>
        <h1 className="font-serif text-3xl text-charcoal">Create New Property Listing</h1>
        <p className="text-xs text-warm-grey font-sans">
          Register a prime Dutch residence with full cadastral, architectural, and energy specifications.
        </p>
      </div>

      <PropertyForm />
    </div>
  );
}
