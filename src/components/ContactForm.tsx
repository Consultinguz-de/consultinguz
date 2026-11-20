"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, fieldClass } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useI18n, type MessageKey } from "@/components/providers/translation-provider";

const EMPTY = { role: "", name: "", email: "", phone: "", message: "" };
type Field = keyof typeof EMPTY;

/**
 * The one lead form of the site, posting to /api/contact.
 * Full: role, name, email (required), phone, message (required).
 * Compact (consultation modal): role, name, phone (required).
 */
export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const uid = useId();
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, MessageKey>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (field: Field, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: typeof errors = {};
    const phoneDigits = data.phone.replace(/\D/g, "").length;
    if (data.name.trim().length < 2) next.name = "error_name";
    if (compact ? phoneDigits < 7 : data.phone && phoneDigits < 7) next.phone = "error_phone";
    if (!compact) {
      if (!/.+@.+\..+/.test(data.email)) next.email = "error_email";
      if (data.message.trim().length < 10) next.message = "error_message";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      // Empty strings become undefined so the API sees absent fields.
      const body = Object.fromEntries(Object.entries(data).filter(([, value]) => value));
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      setData(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const field = (name: Field, label: string, optional = false) => {
    const id = `${uid}-${name}`;
    const error = errors[name];
    return {
      id,
      error,
      label: (
        <Label htmlFor={id}>
          {label}
          {optional && (
            <span className="font-normal tracking-normal text-muted-foreground normal-case">
              ({t("form_optional")})
            </span>
          )}
        </Label>
      ),
      props: {
        id,
        name,
        value: data[name],
        "aria-invalid": !!error,
        "aria-describedby": error ? `${id}-error` : undefined,
      },
      message: error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {t(error)}
        </p>
      ),
    };
  };

  const role = field("role", t("form_role_label"), true);
  const name = field("name", t("form_name"));
  const email = field("email", t("form_email"));
  const phone = field("phone", t("form_phone"), !compact);
  const message = field("message", t("form_message"));

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-2">
        {role.label}
        <select
          {...role.props}
          onChange={(e) => set("role", e.target.value)}
          className={cn(fieldClass, "min-h-12")}
        >
          <option value="">{t("form_role_select")}</option>
          <option value="employer">{t("form_role_employer")}</option>
          <option value="jobseeker">{t("form_role_jobseeker")}</option>
        </select>
      </div>

      <div className="grid gap-2">
        {name.label}
        <Input
          {...name.props}
          onChange={(e) => set("name", e.target.value)}
          autoComplete="name"
          required
        />
        {name.message}
      </div>

      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
        {!compact && (
          <div className="grid content-start gap-2">
            {email.label}
            <Input
              {...email.props}
              onChange={(e) => set("email", e.target.value)}
              type="email"
              autoComplete="email"
              required
            />
            {email.message}
          </div>
        )}
        <div className="grid content-start gap-2">
          {phone.label}
          <Input
            {...phone.props}
            onChange={(e) => set("phone", e.target.value)}
            type="tel"
            autoComplete="tel"
            required={compact}
          />
          {phone.message}
        </div>
      </div>

      {!compact && (
        <div className="grid gap-2">
          {message.label}
          <textarea
            {...message.props}
            onChange={(e) => set("message", e.target.value)}
            rows={5}
            required
            className={cn(fieldClass, "resize-y")}
          />
          {message.message}
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"} className="justify-between">
        {status === "sending" ? t("form_sending") : t("form_submit")}
        <ArrowRight aria-hidden />
      </Button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="border border-foreground bg-accent p-4 font-medium">{t("form_success")}</p>
        )}
        {status === "error" && (
          <p className="border-2 border-destructive p-4 font-medium text-destructive">
            {t("form_error")}
          </p>
        )}
      </div>
    </form>
  );
}
