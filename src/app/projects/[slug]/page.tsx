import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatEUR } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROJECTS.map((proj) => ({ slug: proj.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | ${project.city}`,
    description: project.description.slice(0, 160),
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="neutral">{project.status}</Badge>
              <span className="text-xs font-sans uppercase tracking-eyebrow text-brass">
                {project.unitsAvailable} of {project.unitsTotal} Residences Available
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal">{project.title}</h1>
            <p className="mt-1 text-sm text-warm-grey font-sans">{project.location}, {project.city}</p>
          </div>

          <div className="lg:text-right">
            <span className="text-[11px] uppercase font-sans tracking-eyebrow text-warm-grey block">
              Acquisition Pricing From
            </span>
            <p className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
              {formatEUR(project.priceFrom)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {project.images.map((img, i) => (
            <div key={i} className="relative h-72 sm:h-96 rounded-sm overflow-hidden border border-stone-border">
              <Image src={img} alt={`${project.title} render ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl text-charcoal">Architectural Vision</h2>
            <p className="text-sm font-sans text-warm-grey leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
            <div className="p-5 bg-white border border-stone-border rounded-sm">
              <h4 className="text-xs font-sans uppercase tracking-eyebrow text-brass mb-3">Project Dossier</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
                <div><span className="text-warm-grey block">Architect:</span><strong className="text-charcoal">{project.architect}</strong></div>
                <div><span className="text-warm-grey block">Delivery:</span><strong className="text-charcoal">{project.completionDate}</strong></div>
                <div><span className="text-warm-grey block">Total Units:</span><strong className="text-charcoal">{project.unitsTotal} Suites</strong></div>
                <div><span className="text-warm-grey block">Status:</span><strong className="text-olive">{project.status}</strong></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-stone-border p-6 rounded-sm flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-xl text-charcoal">Inquire for Unit Allocations</h4>
              <p className="mt-2 text-xs text-warm-grey font-sans leading-relaxed">
                Connect with our development sales desk to inspect floorplans, finish options, and pre-construction pricing.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-stone-border space-y-3">
              <Link href={`/contact?project=${encodeURIComponent(project.title)}`}>
                <Button variant="primary" fullWidth size="lg">Request Unit Prospectus</Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" fullWidth size="md">Back to Projects</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
