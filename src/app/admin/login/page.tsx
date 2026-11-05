"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { verifyDemoCredentials, setStoredAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Lock, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState(SITE_CONFIG.demoCredentials.email);
  const [password, setPassword] = useState(SITE_CONFIG.demoCredentials.password);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (verifyDemoCredentials(email, password)) {
      setStoredAuth({
        email,
        name: "Saskia van der Meer",
        role: "Super Admin",
      });
      toast("Authentication Successful", "Welcome to the Administrative Suite.");
      router.push("/admin");
    } else {
      setError("Invalid administrative credentials. Use the demo credentials shown below.");
    }
  };

  const handleFillDemo = () => {
    setEmail(SITE_CONFIG.demoCredentials.email);
    setPassword(SITE_CONFIG.demoCredentials.password);
    setError("");
  };

  return (
    <div className="min-h-screen bg-marble flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white border border-stone-border rounded-sm p-8 sm:p-10 shadow-none">
        <div className="text-center mb-8">
          <span className="font-serif text-xl tracking-[0.15em] text-charcoal font-semibold block">
            {SITE_CONFIG.name}
          </span>
          <span className="text-[10px] uppercase font-sans tracking-widest text-warm-grey block mt-1">
            Private Administrative Suite
          </span>
          <div className="mt-4 h-px w-10 bg-brass mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">
              Administrator Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs font-sans p-3 bg-marble/20 border border-stone-border rounded-sm focus:outline-none focus:border-charcoal"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-sans uppercase tracking-eyebrow text-warm-grey block mb-1">
              Security Passkey
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs font-sans p-3 bg-marble/20 border border-stone-border rounded-sm focus:outline-none focus:border-charcoal"
              required
            />
          </div>

          {error && <p className="text-xs text-terracotta font-sans">{error}</p>}

          <Button type="submit" variant="primary" fullWidth size="lg">
            <Lock className="w-3.5 h-3.5 mr-2" /> Authenticate Access
          </Button>
        </form>

        {/* Clear Demo Credentials box as mandated by prompt */}
        <div className="mt-6 p-4 bg-travertine/40 border border-stone-border rounded-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-sans uppercase tracking-eyebrow text-brass font-bold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> Demo Credentials:
            </span>
            <button
              onClick={handleFillDemo}
              className="text-[10px] uppercase tracking-eyebrow text-olive hover:underline"
            >
              Autofill
            </button>
          </div>
          <div className="text-xs font-sans text-charcoal space-y-0.5">
            <p>Email: <code className="bg-white px-1.5 py-0.5 border border-stone-border rounded-sm">{SITE_CONFIG.demoCredentials.email}</code></p>
            <p>Password: <code className="bg-white px-1.5 py-0.5 border border-stone-border rounded-sm">{SITE_CONFIG.demoCredentials.password}</code></p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs font-sans uppercase tracking-eyebrow text-warm-grey hover:text-charcoal">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
