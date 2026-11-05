import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatEUR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "New Development Projects | Architectural Masterplans",
  description: "Curated collection of new-build residential projects and architectural developments across the Netherlands.",
};

export default function ProjectsPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Development Projects" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Architectural Masterplans"
          title="New Development Projects"
          description="Visionary low-carbon and waterfront residential masterplans designed by leading Dutch architectural studios."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="group bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between hover:border-charcoal/50 transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={proj.coverImage}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="neutral">{proj.status}</Badge>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-warm-grey mb-1 font-sans">
                    <span>{proj.location}</span>
                    <span className="text-brass uppercase tracking-eyebrow text-[10px] font-medium">
                      Est. {proj.completionDate}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-olive transition-colors">
                    <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                  </h3>

                  <p className="mt-2 text-xs text-warm-grey font-sans line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-eyebrow text-warm-grey block">
                      Prices From
                    </span>
                    <span className="font-serif text-xl font-medium text-charcoal">
                      {formatEUR(proj.priceFrom)}
                    </span>
                  </div>

                  <Link
                    href={`/projects/${proj.slug}`}
                    className="text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress"
                  >
                    View Units ({proj.unitsAvailable} Available) →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
