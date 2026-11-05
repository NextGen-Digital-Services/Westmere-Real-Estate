import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | General Brokerage Conditions",
  description: "General terms of service and brokerage engagement conditions governing real estate advisory.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">Legal Foundation</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1 mb-3">General Terms of Engagement</h1>
          <p className="text-xs font-sans text-warm-grey">Governing Law: Dutch Civil Code (Burgerlijk Wetboek) • Jurisdiction: Amsterdam</p>
          <div className="mt-4 h-px w-12 bg-brass" />
        </div>

        <div className="bg-white border border-stone-border rounded-sm p-8 sm:p-12 space-y-6 text-xs sm:text-sm font-sans text-charcoal/90 leading-relaxed">
          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">1. Scope of Engagement</h3>
            <p>
              These conditions govern all brokerage mandates, valuation instructions, and acquisition consultations conducted by {SITE_CONFIG.legalName}. Specific written mandate agreements prevail in the event of direct conflict.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">2. Property Information Disclaimers</h3>
            <p>
              All listed living areas (m²), land plots, construction years, and WOZ estimates are compiled with utmost care from municipal archives and cadastral records. Measurements are conducted in accordance with NEN 2580 industry standards. Prospective purchasers are encouraged to perform independent structural and foundation surveys prior to executing binding purchase contracts (koopakte).
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">3. Statutory Consumer Protections</h3>
            <p>
              Private buyers of residential property in the Netherlands enjoy the statutory 3-day cooling-off period (wettelijke bedenktijd) pursuant to Book 7, Section 2 of the Dutch Civil Code.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">4. Applicable Jurisdiction</h3>
            <p>
              All advisory disputes are exclusively governed by the laws of the Netherlands and submitted to the competent civil court in Amsterdam.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
