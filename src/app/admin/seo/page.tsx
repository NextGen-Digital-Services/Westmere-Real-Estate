"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { SearchCheck, Globe, Save } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface SeoPageConfig {
  path: string;
  page: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

const INITIAL_PAGES: SeoPageConfig[] = [
  { path: "/", page: "Homepage", metaTitle: "VAN DER MEER & CO. | Distinguished Netherlands Properties", metaDescription: "Specialists in prime residential and commercial real estate across Amsterdam, Rotterdam, The Hague, and premier Dutch municipalities.", ogImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200" },
  { path: "/buy", page: "Acquisitions (Buy)", metaTitle: "Buy Prime Netherlands Residences | Van der Meer & Co.", metaDescription: "Explore our verified collection of 17th-century canal mansions, contemporary lofts, and suburban estates.", ogImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200" },
  { path: "/tools", page: "Mortgage & Tools", metaTitle: "Mortgage & Netherlands Tax Estimators | Van der Meer & Co.", metaDescription: "Calculate Dutch mortgage repayments, Overdrachtsbelasting transfer tax, and total Kosten Koper closing fees.", ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" },
];

export default function AdminSeoPage() {
  const { toast } = useToast();
  const [pages, setPages] = useState<SeoPageConfig[]>(INITIAL_PAGES);
  const [selected, setSelected] = useState<SeoPageConfig>(pages[0]);

  const handleUpdate = (field: keyof SeoPageConfig, value: string) => {
    setSelected({ ...selected, [field]: value });
  };

  const handleSave = () => {
    setPages(pages.map((p) => (p.path === selected.path ? selected : p)));
    toast("SEO Metadata Saved", `Metadata for ${selected.page} updated.`);
  };

  const titleLength = selected.metaTitle.length;
  const descLength = selected.metaDescription.length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl text-charcoal">Search Engine Optimization (SEO) Suite</h1>
        <p className="text-xs text-warm-grey font-sans">Fine-tune canonical metadata, character counts, and Google SERP snippets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-white border border-stone-border rounded-sm overflow-hidden">
          <div className="p-3 bg-marble/30 border-b border-stone-border font-serif text-sm">Indexed Routes</div>
          <div className="divide-y divide-stone-border/60">
            {pages.map((p) => (
              <div
                key={p.path}
                onClick={() => setSelected(p)}
                className={`p-3 text-xs font-sans cursor-pointer ${
                  selected.path === p.path ? "bg-travertine/40 border-l-2 border-olive font-semibold" : "hover:bg-marble/20"
                }`}
              >
                <p className="text-charcoal">{p.page}</p>
                <span className="text-[10px] text-warm-grey font-mono">{p.path}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white border border-stone-border rounded-sm p-6 space-y-6 text-xs font-sans">
          <div className="flex justify-between items-center pb-3 border-b border-stone-border">
            <h4 className="font-serif text-lg text-charcoal">{selected.page} Metadata</h4>
            <Button size="sm" variant="primary" onClick={handleSave}>
              <Save className="w-3.5 h-3.5 mr-1" /> Save Configuration
            </Button>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey font-bold">Meta Title Tag</label>
              <span className={`text-[10px] ${titleLength > 60 ? "text-terracotta" : "text-sage"}`}>{titleLength} / 60 characters</span>
            </div>
            <input type="text" value={selected.metaTitle} onChange={(e) => handleUpdate("metaTitle", e.target.value)} className="w-full p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] uppercase tracking-eyebrow text-warm-grey font-bold">Meta Description</label>
              <span className={`text-[10px] ${descLength > 160 ? "text-terracotta" : "text-sage"}`}>{descLength} / 160 characters</span>
            </div>
            <textarea rows={3} value={selected.metaDescription} onChange={(e) => handleUpdate("metaDescription", e.target.value)} className="w-full p-2.5 bg-marble/20 border border-stone-border rounded-sm" />
          </div>

          {/* Google SERP Preview Box */}
          <div className="p-4 bg-marble/50 border border-stone-border rounded-sm">
            <span className="text-[10px] uppercase tracking-eyebrow text-brass font-bold block mb-2">Google SERP Snippet Preview</span>
            <div className="bg-white p-4 border border-stone-border/60 rounded-sm">
              <span className="text-xs text-[#202124] block truncate">{SITE_CONFIG.url}{selected.path}</span>
              <h5 className="text-base text-[#1a0dab] font-sans hover:underline cursor-pointer truncate mt-0.5">{selected.metaTitle}</h5>
              <p className="text-xs text-[#4d5156] mt-1 leading-snug line-clamp-2">{selected.metaDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
