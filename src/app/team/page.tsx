import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AGENTS } from "@/data/agents";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Mail, Phone, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Advisory Partners & Specialists | Our Team",
  description: "Meet the senior partners and real-estate advisors of Van der Meer & Co. across Amsterdam, Rotterdam, and The Hague.",
};

export default function TeamPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Advisory Partners" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Advisory Desk"
          title="Senior Partners & Regional Specialists"
          description="Each partner maintains dedicated focus within specific architectural domains and Dutch municipalities."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 my-12">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between hover:border-charcoal/50 transition-all"
            >
              <div className="relative h-80 bg-travertine/40 overflow-hidden">
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
                  <p className="mt-2 text-xs text-warm-grey font-sans line-clamp-3 leading-relaxed">
                    {agent.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-border/60 text-xs font-sans text-warm-grey space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-brass pb-1 border-b border-stone-border/40">
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {agent.experienceYears} Years Focus</span>
                    <span>{agent.activeListingsCount} Active Listings</span>
                  </div>
                  <p className="flex items-center gap-2 pt-1"><Phone className="w-3.5 h-3.5 text-brass" /> {agent.phone}</p>
                  <p className="flex items-center gap-2 truncate"><Mail className="w-3.5 h-3.5 text-brass" /> {agent.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
