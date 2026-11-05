"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CITIES = ["All Municipalities", "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Haarlem", "Leiden", "Delft", "Groningen", "Maastricht", "Breda", "Almere"];
const TYPES = ["All Property Types", "Canal House", "Penthouse", "Villa", "Apartment", "House", "Office"];

export function HeroSearchCard() {
  const router = useRouter();
  const [tab, setTab] = useState<"buy" | "rent" | "commercial">("buy");
  const [city, setCity] = useState("All Municipalities");
  const [type, setType] = useState("All Property Types");
  const [maxPrice, setMaxPrice] = useState("all");
  const [bedrooms, setBedrooms] = useState("any");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city !== "All Municipalities") params.set("city", city);
    if (type !== "All Property Types") params.set("type", type);
    if (maxPrice !== "all") params.set("maxPrice", maxPrice);
    if (bedrooms !== "any") params.set("bedrooms", bedrooms);

    const basePath = tab === "buy" ? "/buy" : tab === "rent" ? "/rent" : "/commercial";
    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  return (
    <div className="w-full max-w-4xl bg-white border border-stone-border rounded-sm shadow-none overflow-hidden">
      <div className="flex border-b border-stone-border bg-marble/40">
        <button
          type="button"
          onClick={() => setTab("buy")}
          className={`flex-1 py-3.5 text-xs font-sans uppercase tracking-eyebrow font-medium transition-colors ${
            tab === "buy" ? "bg-white text-olive border-b-2 border-olive font-semibold" : "text-warm-grey hover:text-charcoal"
          }`}
        >
          Acquisitions (Buy)
        </button>
        <button
          type="button"
          onClick={() => setTab("rent")}
          className={`flex-1 py-3.5 text-xs font-sans uppercase tracking-eyebrow font-medium transition-colors ${
            tab === "rent" ? "bg-white text-olive border-b-2 border-olive font-semibold" : "text-warm-grey hover:text-charcoal"
          }`}
        >
          Residential Leasing
        </button>
        <button
          type="button"
          onClick={() => setTab("commercial")}
          className={`flex-1 py-3.5 text-xs font-sans uppercase tracking-eyebrow font-medium transition-colors ${
            tab === "commercial" ? "bg-white text-olive border-b-2 border-olive font-semibold" : "text-warm-grey hover:text-charcoal"
          }`}
        >
          Commercial & Offices
        </button>
      </div>

      <form onSubmit={handleSearch} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <div>
          <label className="block text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Municipality</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-marble/30 border border-stone-border rounded-sm px-2.5 py-2 text-xs font-sans text-charcoal focus:outline-none"
          >
            {CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Architecture</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-marble/30 border border-stone-border rounded-sm px-2.5 py-2 text-xs font-sans text-charcoal focus:outline-none"
          >
            {TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Maximum Price</label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-marble/30 border border-stone-border rounded-sm px-2.5 py-2 text-xs font-sans text-charcoal focus:outline-none"
          >
            <option value="all">Any Price</option>
            <option value="1500000">Up to € 1.500.000</option>
            <option value="2500000">Up to € 2.500.000</option>
            <option value="3500000">Up to € 3.500.000</option>
            <option value="5000000">Up to € 5.000.000</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-sans uppercase tracking-eyebrow text-warm-grey mb-1">Bedrooms</label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-marble/30 border border-stone-border rounded-sm px-2.5 py-2 text-xs font-sans text-charcoal focus:outline-none"
          >
            <option value="any">Any Number</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        <div>
          <Button type="submit" variant="primary" fullWidth size="md" className="h-10 text-xs">
            <Search className="w-3.5 h-3.5 mr-1.5" /> Search
          </Button>
        </div>
      </form>
    </div>
  );
}
