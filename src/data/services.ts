export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    title: "Prime Property Acquisition",
    subtitle: "Discreet Search & Acquisition Mandate",
    description: "Representation exclusively for discerning buyers. We uncover off-market listings across Amsterdam, Rotterdam, and The Hague, conduct rigorous foundation and legal audits, and negotiate firmly on your behalf.",
    benefits: ["Off-Market Canal & Estate Inventory", "Structural & Foundation Due Diligence", "Bilingual Civil Notary Liaison", "Purchase Price Valuation Defense"],
    icon: "KeyRound",
  },
  {
    id: "serv-2",
    title: "Private Divestment & Sales",
    subtitle: "Confidential Representation",
    description: "Selling architectural masterpieces without sacrificing privacy. Our confidential sales protocol matches your estate with vetted national and international principals without invasive public open viewings.",
    benefits: ["Targeted Family Office Outreach", "Architectural Grade Editorial Photography", "Qualified Financial Pre-Screening", "Maximized Realized Value"],
    icon: "Building2",
  },
  {
    id: "serv-3",
    title: "Rijksmonument Advisory",
    subtitle: "Monumental Law & Conservation",
    description: "Specialist guidance for listed historic canal houses and estates. We manage municipal restoration permits, Heritage Agency subsidies (woonhuissubsidie), and structural preservation strategies.",
    benefits: ["Municipal Preservation Permits", "Woonhuissubsidie Grant Applications", "Heritage Architect Coordination", "Specialized Tax Deduction Modeling"],
    icon: "Landmark",
  },
  {
    id: "serv-4",
    title: "Certified NWWI Property Valuation",
    subtitle: "Accredited Dutch Appraisals",
    description: "Official valuation reports validated by the Netherlands Property Value Institute (NWWI). Essential for Dutch mortgages, estate distributions, and municipal WOZ value challenges.",
    benefits: ["Official NWWI Certification", "Bank Mortgage Acceptance", "WOZ Dispute Documentation", "Comprehensive Market Comparables"],
    icon: "BadgePercent",
  },
  {
    id: "serv-5",
    title: "Executive Expat Relocation",
    subtitle: "Seamless Randstad Transition",
    description: "Tailored concierge service for multinational leadership and diplomatic personnel moving to the Netherlands. Covering neighborhood selection, international schools, and lease contracts.",
    benefits: ["Diplomatic Standard Leases", "School Proximity Analysis", "Municipal BSN & Bank Setup Advice", "Temporary to Permanent Housing"],
    icon: "Compass",
  },
  {
    id: "serv-6",
    title: "Commercial Capital Advisory",
    subtitle: "Randstad Offices & Portfolios",
    description: "Advising institutional funds, private syndicates, and corporate occupiers on prime office acquisitions, leasehold conversions, and BREEAM-certified environmental retrofits.",
    benefits: ["Triple Net Lease Optimization", "Erfpacht Leasehold Restructuring", "BREEAM Certification Strategies", "Portfolio Yield Analytics"],
    icon: "Briefcase",
  },
];
