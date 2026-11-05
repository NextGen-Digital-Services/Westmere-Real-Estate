import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROPERTIES, getPropertyBySlug } from "@/data/properties";
import { AGENTS } from "@/data/agents";
import { PropertyDetailsClient } from "@/components/property/PropertyDetailsClient";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROPERTIES.map((prop) => ({ slug: prop.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: "Residence Not Found" };

  return {
    title: `${property.title} | ${property.city}`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} — ${property.city}, The Netherlands`,
      description: property.description.slice(0, 160),
      images: [{ url: property.images[0] }],
    },
  };
}

export default function PropertyDetailPage({ params }: PageProps) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const agent = AGENTS.find((a) => a.id === property.agentId);
  const similarProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.city === property.city || p.type === property.type)
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE_CONFIG.url}/properties/${property.slug}`,
    image: property.images,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: property.availability === "Available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.street,
      postalCode: property.postalCode,
      addressLocality: property.city,
      addressCountry: "NL",
    },
  };

  return (
    <div className="py-10 bg-marble min-h-screen">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Breadcrumbs
          items={[
            { label: "Portfolio", href: "/buy" },
            { label: property.city, href: `/buy?city=${encodeURIComponent(property.city)}` },
            { label: property.title },
          ]}
          className="mb-6"
        />

        <PropertyDetailsClient
          property={property}
          agent={agent}
          similarProperties={similarProperties}
        />
      </div>
    </div>
  );
}
