import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | Market Journal`,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 2);

  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Journal", href: "/blog" }, { label: article.category, href: "/blog" }, { label: article.title }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">{article.category}</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-2 mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-xs font-sans text-warm-grey border-b border-stone-border pb-6">
            <span className="font-medium text-charcoal">Authored by {article.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brass" /> {article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brass" /> {article.readTime}</span>
          </div>
        </div>

        <div className="relative h-[380px] sm:h-[480px] w-full rounded-sm overflow-hidden border border-stone-border mb-10">
          <Image src={article.coverImage} alt={article.title} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
        </div>

        <div className="bg-white border border-stone-border rounded-sm p-8 sm:p-12 space-y-6 text-sm sm:text-base font-sans text-charcoal/90 leading-relaxed">
          <p className="font-serif text-xl sm:text-2xl text-charcoal italic border-l-2 border-brass pl-6 my-6 text-warm-grey">
            &ldquo;{article.excerpt}&rdquo;
          </p>
          <p>{article.content}</p>
          <p>
            When assessing acquisitions or disposals within this regulatory framework, retaining specialized counsel familiar with both municipal heritage departments and the civil-law notary process remains essential.
          </p>

          <div className="pt-8 border-t border-stone-border flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-marble/60 border border-stone-border text-xs font-sans rounded-sm text-warm-grey">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-border">
            <h3 className="font-serif text-2xl text-charcoal mb-6">Related Journal Analyses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <div key={rel.id} className="p-6 bg-white border border-stone-border rounded-sm">
                  <span className="text-[10px] uppercase font-sans tracking-eyebrow text-brass block mb-1">{rel.category}</span>
                  <h4 className="font-serif text-lg text-charcoal hover:text-olive">
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="mt-2 text-xs text-warm-grey font-sans line-clamp-2">{rel.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button variant="outline"><ArrowLeft className="w-3.5 h-3.5 mr-2" /> Return to Market Journal</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
