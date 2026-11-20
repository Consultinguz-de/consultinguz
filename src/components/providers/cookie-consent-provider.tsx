"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/components/providers/translation-provider";

const STORAGE_KEY = "cookie-consent";
const CURRENT_VERSION = 1;

type ConsentState = {
  version: typeof CURRENT_VERSION;
  essential: true;
  functional: boolean;
  marketing: boolean;
  timestamp: number;
};

type CookieConsentContextValue = {
  consent: ConsentState | null;
  mounted: boolean;
  openModal: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CURRENT_VERSION) return null;
    return {
      version: CURRENT_VERSION,
      essential: true,
      functional: !!parsed.functional,
      marketing: !!parsed.marketing,
      timestamp: typeof parsed.timestamp === "number" ? parsed.timestamp : Date.now(),
    };
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // storage unavailable — silently ignore
  }
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Opt-in: non-essential categories start unticked (pre-ticked boxes are not valid consent).
  const [functional, setFunctional] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setMounted(true);
    if (!stored) {
      setIsOpen(true);
    } else {
      setFunctional(stored.functional);
      setMarketing(stored.marketing);
    }
  }, []);

  const persist = useCallback((next: { functional: boolean; marketing: boolean }) => {
    const record: ConsentState = {
      version: CURRENT_VERSION,
      essential: true,
      functional: next.functional,
      marketing: next.marketing,
      timestamp: Date.now(),
    };
    writeConsent(record);
    setConsent(record);
  }, []);

  const acceptAll = useCallback(() => {
    setFunctional(true);
    setMarketing(true);
    persist({ functional: true, marketing: true });
    setIsOpen(false);
  }, [persist]);

  const saveCurrent = useCallback(() => {
    persist({ functional, marketing });
    setIsOpen(false);
  }, [functional, marketing, persist]);

  const openModal = useCallback(() => {
    if (consent) {
      setFunctional(consent.functional);
      setMarketing(consent.marketing);
    }
    setIsOpen(true);
  }, [consent]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setIsOpen(true);
        return;
      }
      // Closing without explicit choice = essential-only (do not coerce user).
      if (!consent) {
        persist({ functional: false, marketing: false });
      }
      setIsOpen(false);
    },
    [consent, persist]
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({ consent, mounted, openModal }),
    [consent, mounted, openModal]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent closeLabel={t("nav_close")}>
          <DialogHeader>
            <DialogTitle>{t("cookie_modal_title")}</DialogTitle>
            <DialogDescription>{t("cookie_modal_subtitle")}</DialogDescription>
          </DialogHeader>
          <div className="mt-6 border-t">
            <CategoryRow
              id="cookie-essential"
              label={t("cookie_essential_label")}
              description={t("cookie_essential_desc")}
              checked
              disabled
              onCheckedChange={() => {}}
            />
            <CategoryRow
              id="cookie-functional"
              label={t("cookie_functional_label")}
              description={t("cookie_functional_desc")}
              checked={functional}
              onCheckedChange={setFunctional}
            />
            <CategoryRow
              id="cookie-marketing"
              label={t("cookie_marketing_label")}
              description={t("cookie_marketing_desc")}
              checked={marketing}
              onCheckedChange={setMarketing}
            />
          </div>
          {/* Equal visual weight for both choices: consent must not be nudged. */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button type="button" variant="outline" onClick={saveCurrent}>
              {t("cookie_save_settings")}
            </Button>
            <Button type="button" variant="outline" onClick={acceptAll}>
              {t("cookie_accept_all")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CookieConsentContext.Provider>
  );
}

function CategoryRow({
  id,
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 border-b py-4">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className="mt-0.5"
      />
      <div className="min-w-0">
        <label htmlFor={id} className="label cursor-pointer select-none">
          {label}
        </label>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
