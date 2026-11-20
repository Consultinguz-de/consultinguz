"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsultation } from "@/components/providers/consultation-provider";
import { useI18n, type LanguageCode } from "@/components/providers/translation-provider";

const LINKS = [
  { href: "/services/employers", key: "nav_employers" },
  { href: "/services/jobseekers", key: "nav_jobseekers" },
  { href: "/about/mission", key: "nav_about" },
  { href: "/contact", key: "nav_contact" },
] as const;

const LANGUAGES: LanguageCode[] = ["de", "uz"];

function Logo({ onClick }: { onClick?: () => void }) {
  const { t } = useI18n();
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={t("nav_home_aria")}
      className="flex items-center gap-2.5"
    >
      <Image src="/consulting-logo.png" alt="" width={32} height={32} priority />
      <span className="display text-xl tracking-normal normal-case">consultinguz</span>
    </Link>
  );
}

function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("lang_switch")} className="flex border">
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={cn(
            "label grid h-11 w-11 place-content-center transition-colors not-first:border-l",
            lang === code ? "bg-foreground text-background" : "hover:bg-accent"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const { open: openConsultation } = useConsultation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="label border-b-[3px] border-transparent py-1 transition-colors hover:border-foreground aria-[current=page]:border-accent"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <Button onClick={openConsultation} className="hidden sm:inline-flex">
            {t("nav_cta")}
            <ArrowRight aria-hidden />
          </Button>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={t("nav_menu")}
                className="lg:hidden"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content
                aria-describedby={undefined}
                className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 flex flex-col overflow-auto bg-background duration-150"
              >
                <div className="container-x flex h-16 shrink-0 items-center justify-between border-b">
                  <Dialog.Title className="sr-only">{t("nav_menu")}</Dialog.Title>
                  <Logo onClick={closeMenu} />
                  <Dialog.Close asChild>
                    <Button variant="outline" size="icon" aria-label={t("nav_close")}>
                      <X className="size-5" aria-hidden />
                    </Button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Main" className="container-x flex-1">
                  <ul>
                    {LINKS.map((link) => (
                      <li key={link.href} className="border-b">
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          aria-current={pathname === link.href ? "page" : undefined}
                          className="display flex items-center justify-between gap-4 py-5 text-[clamp(1.75rem,9vw,3.5rem)] aria-[current=page]:[&>span]:bg-accent"
                        >
                          <span className="px-1">{t(link.key)}</span>
                          <ArrowRight className="size-6 shrink-0" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="container-x flex items-center gap-3 py-5">
                  <LanguageToggle />
                  <Button
                    className="flex-1 justify-between"
                    onClick={() => {
                      closeMenu();
                      openConsultation();
                    }}
                  >
                    {t("nav_cta")}
                    <ArrowRight aria-hidden />
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
