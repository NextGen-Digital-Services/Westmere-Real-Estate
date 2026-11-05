"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";

const CATEGORIES = ["All Disciplines", "Legal & Tax", "Architecture", "Market Insights", "Living in NL"];

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState("All Disciplines");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return ARTICLES.filter((art) => {
      if (selectedCat !== "All Disciplines" && art.category !== selectedCat) return false;
      if (search && !art.title.toLowerCase().includes(search.toLowerCase()) && !art.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedCat, search]);

  const featured = ARTICLES[0];

  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Market Journal" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Market Intelligence"
          title="The Netherlands Real Estate Journal"
          description="Authoritative legal analyses, architectural case studies, and municipal fiscal guidelines."
        />

        {/* Featured article showcase */}
        {selectedCat === "All Disciplines" && !search && (
          <div className="mb-14 bg-white border border-stone-border rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            <div className="lg:col-span-7 relative h-72 lg:h-[400px] overflow-hidden">
              <Image src={featured.coverImage} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-eyebrow text-brass block mb-2">{featured.category} • Featured Brief</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal group-hover:text-olive transition-colors leading-snug">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="mt-4 text-xs font-sans text-warm-grey leading-relaxed">{featured.excerpt}</p>
              </div>
              <div className="pt-6 border-t border-stone-border flex items-center justify-between text-xs font-sans text-warm-grey">
                <span>By {featured.author}</span>
                <Link href={`/blog/${featured.slug}`} className="text-olive uppercase tracking-eyebrow font-semibold hover:text-cypress">Read Analysis →</Link>
              </div>
            </div>
          </div>
        )}

        {/* Search and category filtering */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-border">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-eyebrow rounded-sm border transition-colors ${
                  selectedCat === cat ? "bg-olive text-white border-olive font-semibold" : "bg-white text-charcoal border-stone-border hover:bg-travertine/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full text-xs font-sans pl-8 pr-3 py-1.5 bg-white border border-stone-border rounded-sm focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-warm-grey absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <article key={art.id} className="group bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between hover:border-charcoal/50 transition-all">
              <div className="relative h-52 overflow-hidden">
                <Image src={art.coverImage} alt={art.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-white text-charcoal text-[10px] font-sans uppercase tracking-eyebrow rounded-sm border border-stone-border">
                  {art.category}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-warm-grey mb-2 font-sans">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-brass" /> {art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-brass" /> {art.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-olive transition-colors leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-warm-grey font-sans line-clamp-2 leading-relaxed">{art.excerpt}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-border/60 flex items-center justify-between text-xs font-sans">
                  <span className="text-warm-grey">By {art.author}</span>
                  <Link href={`/blog/${art.slug}`} className="text-olive uppercase tracking-eyebrow text-[11px] font-semibold hover:text-cypress">Read →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
