"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (title: string, description?: string, type: ToastType = "success") => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      setTimeout(() => removeToast(id), 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-white border border-stone-border p-4 shadow-none flex items-start gap-3 rounded-sm animate-fade-in"
          >
            {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />}
            {t.type === "error" && <AlertCircle className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />}
            {t.type === "info" && <Info className="w-5 h-5 text-brass shrink-0 mt-0.5" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal">{t.title}</p>
              {t.description && <p className="text-xs text-warm-grey mt-0.5">{t.description}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-warm-grey hover:text-charcoal p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      toast: (title: string, description?: string) => {
        console.log(`[Toast] ${title}: ${description}`);
      },
    };
  }
  return context;
}
