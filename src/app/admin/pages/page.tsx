"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { SITE_CONFIG } from "@/config/site";
import { FileCode2, Save, Eye } from "lucide-react";

interface PageBlock {
  id: string;
  pageName: string;
  section: string;
  content: string;
  lastUpdated: string;
}

const INITIAL_BLOCKS: PageBlock[] = [
  { id: "p-1", pageName: "Homepage", section: "Hero Headline", content: "Architectural Grandeur on Dutch Soil.", lastUpdated: "2026-10-20" },
  { id: "p-2", pageName: "Homepage", section: "Hero Subline", content: "From 17th-century canal palaces on the Herengracht to modernist waterfront sky penthouses in Rotterdam.", lastUpdated: "2026-10-18" },
  { id: "p-3", pageName: "About Us", section: "Philosophy Manifesto", content: "Founded on Amsterdam's historic Herengracht, Van der Meer & Co. was established to represent properties that embody rare historical character, architectural significance, or forward-thinking sustainability.", lastUpdated: "2026-09-14" },
  { id: "p-4", pageName: "Sell Your Property", section: "Process Intro", content: "A confidential divestment strategy that preserves your privacy while achieving maximum realized value through verified family offices.", lastUpdated: "2026-10-02" },
];

export default function AdminPagesCMS() {
  const { toast } = useToast();
  const [blocks, setBlocks] = useState<PageBlock[]>(INITIAL_BLOCKS);
  const [selectedBlock, setSelectedBlock] = useState<PageBlock>(blocks[0]);
  const [editedContent, setEditedContent] = useState(blocks[0].content);

  const handleSelect = (b: PageBlock) => {
    setSelectedBlock(b);
    setEditedContent(b.content);
  };

  const handleSave = () => {
    const updated = blocks.map((b) =>
      b.id === selectedBlock.id ? { ...b, content: editedContent, lastUpdated: new Date().toISOString().substring(0, 10) } : b
    );
    setBlocks(updated);
    toast("Page Block Updated", `${selectedBlock.pageName} - ${selectedBlock.section} saved.`);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-serif text-3xl text-charcoal">Dynamic Pages & Block CMS</h1>
        <p className="text-xs text-warm-grey font-sans">Modify frontispiece editorial headlines, philosophy sections, and static texts with live preview.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white border border-stone-border rounded-sm overflow-hidden">
          <div className="p-4 bg-marble/30 border-b border-stone-border font-serif text-base text-charcoal">Editable Page Blocks</div>
          <div className="divide-y divide-stone-border/60">
            {blocks.map((b) => (
              <div
                key={b.id}
                onClick={() => handleSelect(b)}
                className={`p-4 cursor-pointer text-xs font-sans transition-colors ${
                  selectedBlock.id === b.id ? "bg-travertine/40 border-l-2 border-olive font-medium" : "hover:bg-marble/20"
                }`}
              >
                <div className="flex justify-between text-[10px] text-warm-grey uppercase tracking-eyebrow mb-1">
                  <span>{b.pageName}</span>
                  <span>{b.lastUpdated}</span>
                </div>
                <p className="font-semibold text-charcoal">{b.section}</p>
                <p className="text-warm-grey line-clamp-1 mt-1">{b.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-stone-border rounded-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-border">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-eyebrow text-brass">{selectedBlock.pageName}</span>
              <h3 className="font-serif text-xl text-charcoal">{selectedBlock.section}</h3>
            </div>
            <Button size="sm" variant="primary" onClick={handleSave}>
              <Save className="w-3.5 h-3.5 mr-1" /> Commit Changes
            </Button>
          </div>

          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1.5">Editorial Content</label>
            <textarea
              rows={6}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full text-xs font-sans p-3 bg-marble/20 border border-stone-border rounded-sm focus:outline-none"
            />
          </div>

          <div className="p-4 bg-marble/40 border border-stone-border rounded-sm">
            <span className="text-[10px] uppercase tracking-eyebrow text-brass font-bold flex items-center gap-1 mb-2">
              <Eye className="w-3.5 h-3.5" /> Live Render Preview:
            </span>
            <p className="font-serif text-lg text-charcoal italic">{editedContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
