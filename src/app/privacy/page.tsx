import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Statement & GDPR Policy | Netherlands AVG",
  description: "Privacy policy and personal data protection principles under the Dutch AVG and EU General Data Protection Regulation.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Privacy Statement" }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">Compliance & Protection</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1 mb-3">Privacy Statement (AVG / GDPR)</h1>
          <p className="text-xs font-sans text-warm-grey">Last reviewed: October 2026 • Governing Law: The Netherlands</p>
          <div className="mt-4 h-px w-12 bg-brass" />
        </div>

        <div className="bg-white border border-stone-border rounded-sm p-8 sm:p-12 space-y-6 text-xs sm:text-sm font-sans text-charcoal/90 leading-relaxed">
          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">1. Data Controller Identification</h3>
            <p>
              This privacy statement applies to all processing activities conducted by {SITE_CONFIG.legalName}, established at {SITE_CONFIG.address.street}, {SITE_CONFIG.address.postalCode} {SITE_CONFIG.address.city}, registered at the Netherlands Chamber of Commerce (Kamer van Koophandel) under KvK number {SITE_CONFIG.contact.kvk}.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">2. Categories of Processed Personal Data</h3>
            <p>
              In providing real-estate advisory, certified NWWI valuations, and viewing arrangements, we collect:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-warm-grey">
              <li>Contact coordinates: Full legal name, residential address, telephone number, and encrypted email.</li>
              <li>Real-estate specifications: Ownership records, municipal cadastral extracts, and search criteria.</li>
              <li>Financial suitability verification: Proof of funds or mortgage pre-approvals required for high-value viewings.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">3. Statutory Legal Grounds for Processing</h3>
            <p>
              Data is processed strictly in compliance with Article 6 of the General Data Protection Regulation (GDPR) and the Dutch Implementation Act (UAVG): (a) Performance of contractual mandates, (b) Compliance with statutory Dutch anti-money laundering regulations (Wwft), and (c) Legitimate commercial interest in facilitating confidential property transactions.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">4. Your Statutory Rights</h3>
            <p>
              Under Articles 15 to 22 of the GDPR, you retain the unreserved right to inspect, rectify, restrict, or request permanent deletion of your stored records. Requests may be directed to our data protection officer at <span className="text-olive">{SITE_CONFIG.contact.email}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
