"use client";

import React, { useState } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const item = TESTIMONIALS[current];

  return (
    <section className="py-24 sm:py-28 bg-white border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="08"
          eyebrow="Client Experiences"
          title="Reflections on Our Representation"
          description="Observations from private collectors, international executives, and family offices we have had the privilege to serve."
        />

        <div className="relative max-w-4xl mx-auto bg-marble/40 border border-stone-border rounded-sm p-8 sm:p-14">
          <Quote className="w-10 h-10 text-brass/40 mb-6 stroke-[1.2]" />

          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal font-normal leading-relaxed italic">
            &ldquo;{item.quote}&rdquo;
          </p>

          <div className="mt-8 pt-6 border-t border-stone-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-serif text-lg text-charcoal">{item.author}</p>
              <p className="text-xs text-warm-grey font-sans">{item.role} • {item.location}</p>
              <p className="text-[11px] font-sans text-brass uppercase tracking-eyebrow mt-1">
                {item.propertyType}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex text-brass gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brass stroke-none" />
                ))}
              </div>

              <div className="flex items-center gap-2 border-l border-stone-border pl-4">
                <button
                  onClick={prev}
                  className="p-2 border border-stone-border rounded-sm bg-white hover:bg-travertine/40 text-charcoal transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="p-2 border border-stone-border rounded-sm bg-white hover:bg-travertine/40 text-charcoal transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
