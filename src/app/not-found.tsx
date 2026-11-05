import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-marble">
      <div className="max-w-md w-full text-center bg-white border border-stone-border p-10 rounded-sm">
        <span className="text-xs font-sans uppercase tracking-eyebrow text-brass font-medium">
          Error 404 — Page Not Found
        </span>
        <h1 className="font-serif text-4xl text-charcoal mt-3 mb-4">
          Unlisted Residence
        </h1>
        <div className="h-px w-12 bg-brass mx-auto mb-6" />
        <p className="text-xs font-sans text-warm-grey leading-relaxed mb-8">
          The requested portfolio dossier or page cannot be located on our registry. The listing may have settled privately off-market or relocated.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="md">Return to Frontispiece</Button>
          </Link>
          <Link href="/buy">
            <Button variant="outline" size="md">Browse Portfolio</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
