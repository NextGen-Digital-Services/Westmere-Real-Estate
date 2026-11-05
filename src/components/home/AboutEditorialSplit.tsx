import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/images";
import { SITE_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function AboutEditorialSplit() {
  return (
    <section className="py-24 sm:py-32 bg-white border-b border-stone-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] sm:h-[560px] w-full rounded-sm overflow-hidden border border-stone-border">
              <Image
                src={IMAGES.hero.about}
                alt="Herengracht Canal House Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-56 p-6 bg-marble border border-stone-border rounded-sm shadow-none">
              <p className="text-[10px] font-sans uppercase tracking-eyebrow text-brass mb-1">
                Headquarters
              </p>
              <p className="font-serif text-lg text-charcoal">{SITE_CONFIG.address.street}</p>
              <p className="text-xs text-warm-grey font-sans">{SITE_CONFIG.address.city}, The Netherlands</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <div className="flex items-center gap-3 text-xs font-sans uppercase tracking-eyebrow text-brass mb-3">
              <span>06</span>
              <span className="h-px w-6 bg-brass" />
              <span>Heritage & Discretion</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.15]">
              Guiding the Custodians of Dutch Architecture.
            </h2>

            <div className="mt-6 h-px w-16 bg-brass" />

            <div className="mt-8 space-y-4 text-xs sm:text-sm font-sans text-warm-grey leading-relaxed">
              <p>
                Founded on Amsterdam’s historic Herengracht, {SITE_CONFIG.name} was established to represent properties that embody rare historical character, architectural significance, or forward-thinking sustainability.
              </p>
              <p>
                The Dutch property landscape possesses unique nuances: centuries-old timber foundations, complex municipal Erfpacht ground leases, strict monument protection laws, and an active international market. We bridge these factors with clarity and uncompromising privacy.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button variant="primary" size="lg">Read Our Philosophy</Button>
              </Link>
              <Link href="/team">
                <Button variant="outline" size="lg">Meet Our Advisors</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
