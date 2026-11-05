import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AGENTS } from "@/data/agents";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function AgentsSection() {
  const advisors = AGENTS.slice(0, 4);

  return (
    <section className="py-24 sm:py-28 bg-marble border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            number="07"
            eyebrow="Advisory Desk"
            title="Senior Partners & Advisors"
            description="Our principals combine decades of specialized focus across canal monuments, modern penthouses, and ambassadorial residences."
            className="mb-0 md:mb-0"
          />

          <Link
            href="/team"
            className="mt-6 md:mt-0 text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress inline-flex items-center gap-1.5 shrink-0"
          >
            All 8 Advisors & Specialists <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {advisors.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-charcoal/50"
            >
              <div className="relative h-80 overflow-hidden bg-travertine/40">
                <Image
                  src={agent.photo}
                  alt={`${agent.name} - ${agent.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-eyebrow text-brass block mb-1">
                    {agent.role}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-olive transition-colors">
                    <Link href={`/team/${agent.id}`}>{agent.name}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-warm-grey font-sans line-clamp-2 leading-relaxed">
                    {agent.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-border/60 text-xs font-sans text-warm-grey space-y-1">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brass" /> {agent.phone}
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-brass" /> {agent.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
