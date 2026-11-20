"use client";

import { createContext, useContext, useMemo, useState } from "react";

import ContactForm from "@/components/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/components/providers/translation-provider";

type ConsultationContextValue = { open: () => void; close: () => void };

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => ({ open: () => setIsOpen(true), close: () => setIsOpen(false) }), []);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent closeLabel={t("nav_close")}>
          <DialogHeader>
            <DialogTitle>{t("modal_title")}</DialogTitle>
            <DialogDescription>{t("modal_desc")}</DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <ContactForm compact />
          </div>
        </DialogContent>
      </Dialog>
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error("useConsultation must be used within ConsultationProvider");
  return ctx;
}
