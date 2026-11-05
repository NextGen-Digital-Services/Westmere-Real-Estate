"use client";

import { SITE_CONFIG } from "@/config/site";

const AUTH_KEY = "vdm_admin_auth_v1";

export interface AdminUser {
  email: string;
  name: string;
  role: "Super Admin" | "Admin" | "Editor" | "Agent Manager";
}

export const getStoredAuth = (): AdminUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredAuth = (user: AdminUser | null): void => {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(AUTH_KEY);
  }
  window.dispatchEvent(new Event("vdm_auth_changed"));
};

export const verifyDemoCredentials = (email: string, pass: string): boolean => {
  return (
    email.trim().toLowerCase() === SITE_CONFIG.demoCredentials.email.toLowerCase() &&
    pass.trim() === SITE_CONFIG.demoCredentials.password
  );
};
