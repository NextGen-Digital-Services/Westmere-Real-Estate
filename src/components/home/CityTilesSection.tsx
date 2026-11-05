import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LOCATIONS } from "@/data/locations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "lucide-react";

export function CityTilesSection() {
  const featuredCities = LOCATIONS.filter((c) => c.featured);

  return (
    <section className="py-24 sm:py-28 bg-travertine/40 border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          eyebrow="Key Locations"
          title="Prestigious Dutch Municipalities"
          description="Explore prime residential enclaves across the Netherlands, each celebrated for distinct architectural heritage and quality of life."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCities.map((city) => (
            <Link
              key={city.id}
              href={`/buy?city=${encodeURIComponent(city.name)}`}
              className="group relative h-80 rounded-sm overflow-hidden border border-stone-border bg-white flex flex-col justify-end p-6 transition-all duration-300 hover:border-charcoal/60"
            >
              <Image
                src={city.image}
                alt={`${city.name} Netherlands Architecture`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

              <div className="relative z-10 text-marble flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-eyebrow text-brass block mb-1">
                    {city.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-normal group-hover:text-brass transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs font-sans text-marble/70 mt-1">
                    {city.count} {city.count === 1 ? "Residence" : "Residences"} in Portfolio
                  </p>
                </div>

                <div className="w-8 h-8 rounded-sm bg-white/10 group-hover:bg-brass text-marble flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
