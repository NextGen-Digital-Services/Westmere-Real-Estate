"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatEUR, formatArea } from "@/lib/utils";
import { Edit3, Trash2, Copy, CheckSquare, Square } from "lucide-react";

interface PropertyTableRowProps {
  property: Property;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onDuplicate: (prop: Property) => void;
  onDeleteRequest: (id: string) => void;
}

export function PropertyTableRow({
  property,
  isSelected,
  onToggleSelect,
  onDuplicate,
  onDeleteRequest,
}: PropertyTableRowProps) {
  return (
    <tr className="hover:bg-marble/30 transition-colors">
      <td className="p-3">
        <button onClick={() => onToggleSelect(property.id)}>
          {isSelected ? <CheckSquare className="w-4 h-4 text-olive" /> : <Square className="w-4 h-4 text-stone-border" />}
        </button>
      </td>
      <td className="p-3 flex items-center gap-3">
        <div className="relative w-12 h-10 rounded-sm overflow-hidden border border-stone-border shrink-0">
          <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <span className="font-mono text-[10px] text-brass uppercase block">{property.propertyCode}</span>
          <Link href={`/properties/${property.slug}`} target="_blank" className="font-serif text-sm font-medium hover:text-olive truncate block max-w-xs">{property.title}</Link>
        </div>
      </td>
      <td className="p-3">{property.city}</td>
      <td className="p-3">{formatArea(property.livingArea)} • {property.bedrooms} Beds</td>
      <td className="p-3 font-medium">{formatEUR(property.price)}</td>
      <td className="p-3"><Badge variant="neutral">{property.availability}</Badge></td>
      <td className="p-3 text-right space-x-1">
        <button onClick={() => onDuplicate(property)} className="p-1 hover:text-olive" title="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
        <Link href={`/admin/properties/${property.id}/edit`} className="p-1 hover:text-olive inline-block" title="Edit"><Edit3 className="w-3.5 h-3.5" /></Link>
        <button onClick={() => onDeleteRequest(property.id)} className="p-1 hover:text-terracotta" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
      </td>
    </tr>
  );
}
