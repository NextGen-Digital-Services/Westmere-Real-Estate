"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Property } from "@/types";
import { getStoredProperties } from "@/lib/storage";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const all = getStoredProperties();
    const found = all.find((p) => p.id === id || p.propertyCode === id);
    setProperty(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="text-xs font-sans text-warm-grey">Retrieving property dossier...</div>;
  }

  if (!property) {
    return <div className="text-xs font-sans text-terracotta">Listing ID {id} not found in database.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Properties", href: "/admin/properties" },
          { label: `Edit ${property.propertyCode}` },
        ]}
      />

      <div>
        <h1 className="font-serif text-3xl text-charcoal">Edit Property Record</h1>
        <p className="text-xs text-warm-grey font-sans">
          Modifying dossier for <span className="font-semibold text-charcoal">{property.title}</span> ({property.propertyCode})
        </p>
      </div>

      <PropertyForm initialProperty={property} />
    </div>
  );
}
