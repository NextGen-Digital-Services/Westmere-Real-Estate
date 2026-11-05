import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Check, KeyRound, Building2, Landmark, BadgePercent, Compass, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Advisory Services | Netherlands Real Estate Practice",
  description: "Specialized representation across acquisitions, silent divestment, monumental heritage conservation, NWWI valuation, and corporate relocations.",
};

const ICONS: Record<string, React.ElementType> = {
  KeyRound,
  Building2,
  Landmark,
  BadgePercent,
  Compass,
  Briefcase,
};

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Our Services" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Specialized Practice"
          title="Fiduciary Real Estate Advisory"
          description="A comprehensive suite of advisory capabilities designed to protect client equity and architectural legacy across the Netherlands."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {SERVICES.map((serv) => {
            const Icon = ICONS[serv.icon] || KeyRound;
            return (
              <div
                key={serv.id}
                className="bg-white border border-stone-border rounded-sm p-8 flex flex-col justify-between hover:border-charcoal/50 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-travertine/60 border border-stone-border text-brass flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-eyebrow text-brass block mb-1">
                    {serv.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal mb-3">{serv.title}</h3>
                  <p className="text-xs font-sans text-warm-grey leading-relaxed mb-6">
                    {serv.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-stone-border/60">
                    <p className="text-[11px] uppercase font-sans tracking-eyebrow text-charcoal font-medium mb-2">
                      Key Capabilities:
                    </p>
                    {serv.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-sans text-warm-grey">
                        <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-border">
                  <Link href={`/contact?service=${encodeURIComponent(serv.title)}`}>
                    <Button variant="outline" fullWidth size="sm">Engage Service</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
