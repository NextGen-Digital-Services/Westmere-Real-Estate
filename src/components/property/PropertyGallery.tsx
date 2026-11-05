"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 my-8">
        <div
          onClick={() => openLightbox(0)}
          className="relative md:col-span-2 h-[340px] md:h-[480px] rounded-sm overflow-hidden border border-stone-border cursor-pointer group"
        >
          <Image
            src={images[0]}
            alt={`${title} - Primary Exterior`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-charcoal text-xs font-sans uppercase tracking-eyebrow px-3 py-1.5 rounded-sm transition-opacity flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> Expand Gallery
            </span>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-3 sm:gap-4 h-[340px] md:h-[480px]">
          {images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i + 1)}
              className="relative rounded-sm overflow-hidden border border-stone-border cursor-pointer group"
            >
              <Image
                src={img}
                alt={`${title} - Gallery Detail ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
              {i === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center text-marble font-serif text-lg">
                  +{images.length - 5} More
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between text-marble border-b border-marble/20 pb-4">
            <p className="text-xs font-sans tracking-wide">
              {lightboxIndex + 1} of {images.length} — {title}
            </p>
            <button
              onClick={closeLightbox}
              className="p-2 text-marble hover:text-brass"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4">
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-6 z-10 p-3 bg-white/10 hover:bg-white/25 text-marble rounded-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-5xl h-[70vh]">
              <Image
                src={images[lightboxIndex]}
                alt={`${title} - Preview`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-6 z-10 p-3 bg-white/10 hover:bg-white/25 text-marble rounded-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative w-16 h-12 rounded-sm overflow-hidden border ${
                  lightboxIndex === i ? "border-brass ring-1 ring-brass" : "border-marble/30 opacity-60"
                }`}
              >
                <Image src={img} alt="Thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
