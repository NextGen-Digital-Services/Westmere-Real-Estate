import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AGENTS } from "@/data/agents";
import { PROPERTIES } from "@/data/properties";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, Award, Globe, ShieldCheck } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const agent = AGENTS.find((a) => a.id === params.slug);
  if (!agent) return { title: "Advisor Not Found" };
  return {
    title: `${agent.name} | ${agent.role}`,
    description: agent.bio,
  };
}

export default function AgentDetailPage({ params }: PageProps) {
  const agent = AGENTS.find((a) => a.id === params.slug);
  if (!agent) notFound();

  const assignedProps = PROPERTIES.filter((p) => p.agentId === agent.id);

  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Team", href: "/team" }, { label: agent.name }]} className="mb-6" />

        <div className="bg-white border border-stone-border rounded-sm p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 relative h-96 w-full rounded-sm overflow-hidden border border-stone-border">
              <Image src={agent.photo} alt={agent.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
            </div>

            <div className="md:col-span-8 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">{agent.role}</span>
                <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1 mb-4">{agent.name}</h1>
                <p className="text-sm font-sans text-warm-grey leading-relaxed">{agent.bio}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 p-4 bg-marble/40 border border-stone-border rounded-sm text-xs font-sans">
                  <div><span className="text-warm-grey block">Experience</span><strong className="text-charcoal">{agent.experienceYears} Years</strong></div>
                  <div><span className="text-warm-grey block">Languages</span><strong className="text-charcoal">{agent.languages.join(", ")}</strong></div>
                  <div><span className="text-warm-grey block">Client Rating</span><strong className="text-olive">{agent.rating} / 5.0</strong></div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-border flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-sans text-warm-grey space-y-1">
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brass" /> {agent.phone}</p>
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brass" /> {agent.email}</p>
                </div>
                <Link href={`/contact?agent=${encodeURIComponent(agent.name)}`}>
                  <Button variant="primary">Schedule Private Consultation</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {assignedProps.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl text-charcoal mb-6">Exclusive Instructions Represented by {agent.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedProps.map((p) => (<PropertyCard key={p.id} property={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
