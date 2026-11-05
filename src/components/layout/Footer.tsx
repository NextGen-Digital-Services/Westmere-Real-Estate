import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { LOCATIONS } from "@/data/locations";

export function Footer() {
  const cities = LOCATIONS.slice(0, 6);

  return (
    <footer className="bg-cypress text-marble border-t border-stone-border/20 pt-16 pb-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-marble/10">
          <div>
            <span className="font-serif text-xl tracking-[0.15em] block text-marble">
              {SITE_CONFIG.name}
            </span>
            <p className="mt-4 text-xs font-sans text-marble/70 leading-relaxed max-w-sm">
              Distinguished Netherlands real estate advisory specializing in monumental canal mansions, architectural waterfront penthouses, and private estates across the Randstad.
            </p>
            <div className="mt-6 text-[11px] font-sans text-marble/60 space-y-1">
              <p>KvK Chamber of Commerce: {SITE_CONFIG.contact.kvk}</p>
              <p>VAT ID: {SITE_CONFIG.contact.vat}</p>
              <p className="text-brass pt-1">Timezone: Europe/Amsterdam</p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-eyebrow text-brass mb-4">
              Real Estate Portfolio
            </h4>
            <ul className="space-y-2 text-xs font-sans text-marble/80">
              <li><Link href="/buy" className="hover:text-marble transition-colors">Acquisitions (Buy)</Link></li>
              <li><Link href="/rent" className="hover:text-marble transition-colors">Residential Leasing</Link></li>
              <li><Link href="/commercial" className="hover:text-marble transition-colors">Commercial & Offices</Link></li>
              <li><Link href="/projects" className="hover:text-marble transition-colors">New Developments</Link></li>
              <li><Link href="/valuation" className="hover:text-marble transition-colors">Valuation & Appraisals</Link></li>
              <li><Link href="/sell" className="hover:text-marble transition-colors">Sell Your Property</Link></li>
              <li><Link href="/tools" className="hover:text-marble transition-colors">Mortgage & Tax Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-eyebrow text-brass mb-4">
              Prime Dutch Municipalities
            </h4>
            <ul className="space-y-2 text-xs font-sans text-marble/80">
              {cities.map((city) => (
                <li key={city.id}>
                  <Link href={`/buy?city=${encodeURIComponent(city.name)}`} className="hover:text-marble transition-colors flex items-center justify-between">
                    <span>{city.name}</span>
                    <span className="text-[10px] text-marble/50">({city.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-eyebrow text-brass mb-4">
              Private Advisory Desk
            </h4>
            <div className="text-xs font-sans text-marble/80 space-y-2">
              <p>{SITE_CONFIG.address.street}</p>
              <p>{SITE_CONFIG.address.postalCode} {SITE_CONFIG.address.city}</p>
              <p className="pt-2">Tel: {SITE_CONFIG.contact.phone}</p>
              <p>Email: {SITE_CONFIG.contact.email}</p>
              <p className="text-[11px] text-marble/60 pt-2 leading-tight">
                {SITE_CONFIG.openingHours}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-marble/60 gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.legalName}. {SITE_CONFIG.tagline}</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-marble">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-marble">Cookie Policy</Link>
            <Link href="/terms" className="hover:text-marble">Terms of Service</Link>
            <Link href="/admin/login" className="hover:text-brass text-brass/80">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
