import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE_CONFIG } from "@/config/site";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactInquiryForm } from "@/components/forms/ContactInquiryForm";

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 bg-marble">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact Us" }]} className="mb-6" />

        <SectionHeader
          number="01"
          eyebrow="Advisory Desk"
          title="Direct Inquiries & Private Office"
          description="Schedule a private confidential consultation at our Herengracht headquarters or request regional property dossiers."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-border rounded-sm p-8 space-y-6">
              <h3 className="font-serif text-2xl text-charcoal">Amsterdam Headquarters</h3>
              <div className="space-y-4 text-xs font-sans text-warm-grey">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">{SITE_CONFIG.address.street}</strong>
                    <span>{SITE_CONFIG.address.postalCode} {SITE_CONFIG.address.city}, The Netherlands</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brass shrink-0" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brass shrink-0" />
                  <span>{SITE_CONFIG.contact.email}</span>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-stone-border/60">
                  <Clock className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block">Advisory Hours</strong>
                    <span>{SITE_CONFIG.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-travertine/40 border border-stone-border p-6 rounded-sm text-xs font-sans text-warm-grey">
              <p className="font-medium text-charcoal mb-1">Corporate Registrations</p>
              <p>Chamber of Commerce (KvK): {SITE_CONFIG.contact.kvk}</p>
              <p>VAT ID: {SITE_CONFIG.contact.vat}</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-stone-border rounded-sm p-8 sm:p-10">
            <ContactInquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
