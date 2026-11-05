export type LeadStatus = "New" | "Contacted" | "Qualified" | "Viewing Scheduled" | "Negotiation" | "Converted" | "Lost";

export type EnquiryType =
  | "Schedule a Viewing"
  | "Property Information Request"
  | "Sell Your Property"
  | "Property Valuation"
  | "General Advisory";

export interface InternalNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType;
  status: LeadStatus;
  propertyId?: string;
  propertyTitle?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  message: string;
  leadSource: "Website Portal" | "Referral" | "Direct Phone" | "Private Office";
  assignedAgentId?: string;
  createdAt: string;
  internalNotes: InternalNote[];
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  agentId: string;
  agentName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 - 11:00"
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  notes?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  city: string;
  location: string;
  status: "Under Construction" | "Presale" | "Completed" | "Planning";
  unitsTotal: number;
  unitsAvailable: number;
  completionDate: string;
  priceFrom: number;
  coverImage: string;
  images: string[];
  description: string;
  architect: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  role: string;
  quote: string;
  rating: number;
  propertyType: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "Market Insights" | "Legal & Tax" | "Architecture" | "Living in NL";
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}
