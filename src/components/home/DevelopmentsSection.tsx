import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatEUR } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function DevelopmentsSection() {
  const projects = PROJECTS.slice(0, 3);

  return (
    <section className="py-24 sm:py-28 bg-white border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            number="04"
            eyebrow="Architectural Projects"
            title="New Development Projects"
            description="Pioneering residential masterplans engineered with modern carbon-neutral technologies, private moorings, and iconic Dutch architects."
            className="mb-0 md:mb-0"
          />

          <Link
            href="/projects"
            className="mt-6 md:mt-0 text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress inline-flex items-center gap-1.5 shrink-0"
          >
            All Development Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="group bg-marble/20 border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-charcoal/40"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={proj.coverImage}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="neutral">{proj.status}</Badge>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-warm-grey mb-1">
                    <span>{proj.location}</span>
                    <span className="text-brass uppercase font-sans text-[10px] tracking-eyebrow">
                      {proj.completionDate}
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
                    View Units ({proj.unitsAvailable} Left) →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
