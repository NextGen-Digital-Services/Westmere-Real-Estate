"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ARTICLES } from "@/data/articles";
import { Article } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { Plus, Trash2, Edit3, Calendar, Clock, Newspaper } from "lucide-react";
import { slugify } from "@/lib/utils";

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Article["category"]>("Legal & Tax");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newArt: Article = {
      id: `art-${Date.now()}`,
      title,
      slug: slugify(title),
      excerpt,
      content,
      category,
      author: "Saskia van der Meer",
      date: new Date().toLocaleDateString("nl-NL").replace(/\//g, "-"),
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80",
      tags: [category, "Netherlands Real Estate"],
    };

    setArticles([newArt, ...articles]);
    setShowAdd(false);
    setTitle("");
    setExcerpt("");
    setContent("");
    toast("Article Published", `${title} added to journal.`);
  };

  const handleDelete = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
    toast("Article Removed", "Removed from journal.");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Journal & Editorial CMS</h1>
          <p className="text-xs text-warm-grey font-sans">Publish and edit legal guides, architectural analyses, and market briefs.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Draft New Article
        </Button>
      </div>

      <div className="bg-white border border-stone-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-travertine/40 border-b border-stone-border text-warm-grey uppercase text-[10px] tracking-eyebrow">
              <tr>
                <th className="p-3">Title & Category</th>
                <th className="p-3">Author</th>
                <th className="p-3">Date</th>
                <th className="p-3">Reading Time</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border/60 text-charcoal">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-marble/30 transition-colors">
                  <td className="p-3 flex items-center gap-3">
                    <div className="relative w-12 h-10 rounded-sm overflow-hidden border border-stone-border shrink-0">
                      <Image src={art.coverImage} alt={art.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-sans tracking-eyebrow text-brass block">{art.category}</span>
                      <p className="font-serif text-sm font-medium truncate max-w-md">{art.title}</p>
                    </div>
                  </td>
                  <td className="p-3">{art.author}</td>
                  <td className="p-3 text-warm-grey">{art.date}</td>
                  <td className="p-3 text-warm-grey">{art.readTime}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleDelete(art.id)} className="p-1 hover:text-terracotta"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-charcoal/50 flex items-center justify-center p-4">
          <form onSubmit={handleAdd} className="bg-white border border-stone-border rounded-sm p-6 max-w-lg w-full space-y-3 text-xs font-sans">
            <h3 className="font-serif text-xl text-charcoal">Publish Journal Article</h3>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Headline *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-stone-border rounded-sm" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full p-2 border border-stone-border rounded-sm">
                {["Legal & Tax", "Architecture", "Market Insights", "Living in NL"].map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Excerpt *</label>
              <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required className="w-full p-2 border border-stone-border rounded-sm" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey block mb-1">Full Article Body *</label>
              <textarea rows={5} value={content} onChange={(e) => setContent(e.target.value)} required className="w-full p-2 border border-stone-border rounded-sm" />
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-stone-border">
              <Button size="sm" variant="outline" type="button" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button size="sm" variant="primary" type="submit">Publish to Journal</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
