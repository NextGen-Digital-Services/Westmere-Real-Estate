import React from "react";
import Image from "next/image";
import { IMAGES } from "@/data/images";
import { HeroSearchCard } from "./HeroSearchCard";

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-border overflow-hidden">
      {/* Background full-bleed photography with subtle dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.hero.main}
          alt="Amsterdam Canal Houses & Historic Dutch Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.78] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-charcoal/35" />
      </div>

      <div className="relative z-10 max-w-container mx-auto w-full my-auto text-center pt-8 pb-12">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/10 backdrop-blur-none border border-marble/30 rounded-sm text-marble text-[11px] font-sans uppercase tracking-eyebrow mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brass" />
          Distinguished Netherlands Real Estate
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-marble leading-[1.08] tracking-tight max-w-4xl mx-auto drop-shadow-sm">
          Architectural Grandeur on Dutch Soil.
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl font-sans font-light text-marble/90 max-w-2xl mx-auto leading-relaxed">
          From 17th-century canal palaces on the Herengracht to modernist waterfront sky penthouses in Rotterdam.
        </p>

        <div className="mt-12 flex justify-center">
          <HeroSearchCard />
        </div>
      </div>

      <div className="relative z-10 max-w-container mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-marble/80 text-xs font-sans border-t border-marble/20 pt-4 gap-2">
        <span>Amsterdam • Rotterdam • The Hague • Utrecht • Kennemerland</span>
        <span className="text-brass">Private Office Advisory & Acquisitions</span>
      </div>
    </section>
  );
}
