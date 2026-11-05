import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy | Dutch Telecommunications Act",
  description: "Explanation of essential and analytical cookies used on the portal under the Netherlands Telecommunicatiewet.",
};

export default function CookiesPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} className="mb-6" />

        <div className="mb-8">
          <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">Digital Privacy</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mt-1 mb-3">Cookie & Tracking Policy</h1>
          <p className="text-xs font-sans text-warm-grey">Governing Framework: Dutch Telecommunicatiewet & ePrivacy Directive</p>
          <div className="mt-4 h-px w-12 bg-brass" />
        </div>

        <div className="bg-white border border-stone-border rounded-sm p-8 sm:p-12 space-y-6 text-xs sm:text-sm font-sans text-charcoal/90 leading-relaxed">
          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">1. Nature of Cookies Deployed</h3>
            <p>
              {SITE_CONFIG.name} utilizes small cryptographic tokens placed within your browser memory to retain session integrity and maintain your saved property shortlists across browsing intervals.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">2. Category Matrix</h3>
            <div className="border border-stone-border rounded-sm overflow-hidden mt-3">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-marble/60 border-b border-stone-border text-charcoal font-semibold">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Retention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-border/60 text-warm-grey">
                  <tr>
                    <td className="p-3 font-medium text-charcoal">Strictly Necessary</td>
                    <td className="p-3">Session security and local storage favourites state.</td>
                    <td className="p-3">Persistent (Local)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-charcoal">Analytical</td>
                    <td className="p-3">Aggregated municipal search density metrics (anonymized IP).</td>
                    <td className="p-3">12 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="font-serif text-lg text-charcoal mb-2">3. Managing and Withdrawing Consent</h3>
            <p>
              You can adjust or revoke your cookie choices at any time via the cookie settings trigger located in the portal footer or by clearing your browser local storage cache.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
