import { Property, Lead, Appointment } from "@/types";
import { PROPERTIES } from "@/data/properties";
import { INITIAL_LEADS } from "@/data/leads";
import { INITIAL_APPOINTMENTS } from "@/data/appointments";

const KEYS = {
  PROPERTIES: "vdm_properties_v1",
  LEADS: "vdm_leads_v1",
  APPOINTMENTS: "vdm_appointments_v1",
  FAVOURITES: "vdm_favourites_v1",
  AUTH: "vdm_admin_auth_v1",
  COOKIE_CONSENT: "vdm_cookie_consent_v1",
};

function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save to localStorage [${key}]:`, err);
  }
}

// Property storage methods
export const getStoredProperties = (): Property[] =>
  getStorageItem<Property[]>(KEYS.PROPERTIES, PROPERTIES);

export const saveStoredProperties = (props: Property[]): void =>
  setStorageItem(KEYS.PROPERTIES, props);

// Leads storage methods
export const getStoredLeads = (): Lead[] =>
  getStorageItem<Lead[]>(KEYS.LEADS, INITIAL_LEADS);

export const saveStoredLeads = (leads: Lead[]): void =>
  setStorageItem(KEYS.LEADS, leads);

export const addStoredLead = (lead: Omit<Lead, "id" | "createdAt" | "status" | "internalNotes">): Lead => {
  const current = getStoredLeads();
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    internalNotes: [],
  };
  saveStoredLeads([newLead, ...current]);
  return newLead;
};

// Appointments storage methods
export const getStoredAppointments = (): Appointment[] =>
  getStorageItem<Appointment[]>(KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);

export const saveStoredAppointments = (apts: Appointment[]): void =>
  setStorageItem(KEYS.APPOINTMENTS, apts);

// Check agent appointment conflicts
export const hasAppointmentConflict = (
  agentId: string,
  date: string,
  timeSlot: string,
  excludeId?: string
): boolean => {
  const apts = getStoredAppointments();
  return apts.some(
    (a) =>
      a.id !== excludeId &&
      a.agentId === agentId &&
      a.date === date &&
      a.timeSlot === timeSlot &&
      a.status === "Confirmed"
  );
};

// Favourites storage methods
export const getStoredFavourites = (): string[] =>
  getStorageItem<string[]>(KEYS.FAVOURITES, []);

export const toggleStoredFavourite = (propertyId: string): string[] => {
  const current = getStoredFavourites();
  const exists = current.includes(propertyId);
  const updated = exists ? current.filter((id) => id !== propertyId) : [...current, propertyId];
  setStorageItem(KEYS.FAVOURITES, updated);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("vdm_favourites_updated"));
  }
  return updated;
};

// Cookie consent
export interface CookieConsentState {
  consented: boolean;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const getStoredConsent = (): CookieConsentState | null =>
  getStorageItem<CookieConsentState | null>(KEYS.COOKIE_CONSENT, null);

export const saveStoredConsent = (consent: CookieConsentState): void =>
  setStorageItem(KEYS.COOKIE_CONSENT, consent);

// Reset demo data
export const resetDemoData = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEYS.PROPERTIES);
  window.localStorage.removeItem(KEYS.LEADS);
  window.localStorage.removeItem(KEYS.APPOINTMENTS);
  window.localStorage.removeItem(KEYS.FAVOURITES);
};
