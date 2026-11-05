import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export function ArticlesSection() {
  const articles = ARTICLES.slice(0, 3);

  return (
    <section className="py-24 sm:py-28 bg-marble border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            number="09"
            eyebrow="Market Journal"
            title="Insights & Legal Perspectives"
            description="Authoritative analyses on Dutch transfer tax legislation, monumental conservation, and property valuation mechanics."
            className="mb-0 md:mb-0"
          />

          <Link
            href="/blog"
            className="mt-6 md:mt-0 text-xs font-sans uppercase tracking-eyebrow text-olive font-semibold hover:text-cypress inline-flex items-center gap-1.5 shrink-0"
          >
            Visit Journal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group bg-white border border-stone-border rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-charcoal/50"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-charcoal text-[10px] font-sans uppercase tracking-eyebrow rounded-sm border border-stone-border">
                  {art.category}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-sans text-warm-grey mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brass" /> {art.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brass" /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-charcoal group-hover:text-olive transition-colors leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="mt-2.5 text-xs text-warm-grey font-sans line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-border/60 flex items-center justify-between text-xs font-sans">
                  <span className="text-warm-grey">By {art.author}</span>
                  <Link
                    href={`/blog/${art.slug}`}
                    className="text-olive uppercase tracking-eyebrow text-[11px] font-semibold hover:text-cypress"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
