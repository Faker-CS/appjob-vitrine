"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { EASE } from "@/components/motion/reveal";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import {
  CONTACT_SUBJECTS,
  sendContactMessage,
  type ContactRole,
  type ContactSubject,
} from "@/lib/contact";
import { ROUTES } from "@/lib/navigation";
import { EMAIL_ERROR, isEmail } from "@/lib/validation";
import { ConsentCheckbox, INLINE_LINK } from "./content-consent-checkbox";

const ROLES: { value: ContactRole; label: string }[] = [
  { value: "candidate", label: "Candidat·e" },
  { value: "recruiter", label: "Recruteur·se" },
  { value: "other", label: "Autre" },
];

type Values = {
  name: string;
  email: string;
  role: ContactRole;
  subject: ContactSubject;
  message: string;
  consent: boolean;
};

const EMPTY: Values = {
  name: "",
  email: "",
  role: "candidate",
  subject: CONTACT_SUBJECTS[0].value,
  message: "",
  consent: false,
};

/** Validated fields, in their order in the form (used to focus the first error). */
const VALIDATED = ["name", "email", "message", "consent"] as const;
type ValidatedField = (typeof VALIDATED)[number];
type Errors = Partial<Record<ValidatedField, string>>;

function validateField(field: ValidatedField, values: Values): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim() ? undefined : "Indiquez votre nom et votre prénom.";
    case "email":
      return isEmail(values.email) ? undefined : EMAIL_ERROR;
    case "message":
      return values.message.trim()
        ? undefined
        : "Écrivez votre message avant de l'envoyer.";
    case "consent":
      return values.consent
        ? undefined
        : "Cochez cette case pour que nous puissions vous répondre.";
  }
}

type Status = "idle" | "sending" | "sent" | "failed";

/** Contact form with client-side validation (on blur and on submit). */
export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState({ name: "", email: "" });

  /** Updates a value; a field already in error is re-checked as it changes. */
  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    const validated = VALIDATED.find((name) => name === field);
    if (validated && errors[validated]) {
      setErrors((current) => ({
        ...current,
        [validated]: validateField(validated, next),
      }));
    }
  };

  const check = (field: ValidatedField) =>
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const next: Errors = {};
    for (const field of VALIDATED) next[field] = validateField(field, values);
    setErrors(next);

    const firstInvalid = VALIDATED.find((field) => next[field]);
    if (firstInvalid) {
      setStatus("idle");
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    const name = values.name.trim();
    const email = values.email.trim();
    try {
      await sendContactMessage({
        name,
        email,
        role: values.role,
        subject: values.subject,
        message: values.message.trim(),
        consent: true,
      });
      setSent({ name, email });
      setValues(EMPTY);
      setErrors({});
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const sending = status === "sending";

  return (
    <div className="flex flex-col gap-4">
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-label="Formulaire de contact"
        className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6 md:gap-5 md:p-12"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            id="contact-name"
            label="Nom et prénom"
            name="name"
            autoComplete="name"
            placeholder="Inès Bouzid"
            required
            value={values.name}
            error={errors.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => check("name")}
          />
          <TextField
            id="contact-email"
            label="Adresse e-mail"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="prenom@exemple.fr"
            required
            value={values.email}
            error={errors.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => check("email")}
          />
        </div>

        {/* Vous êtes: segmented control */}
        <div
          role="radiogroup"
          aria-labelledby="contact-role-label"
          className="flex flex-col gap-2"
        >
          <p
            id="contact-role-label"
            className="font-display text-label-sm leading-[1.2] text-ink"
          >
            Vous êtes
          </p>
          <div className="flex gap-1 rounded-full bg-surface-2 p-1 md:self-start">
            {ROLES.map((role) => {
              const selected = values.role === role.value;
              return (
                <label
                  key={role.value}
                  className={cn(
                    "relative flex h-10 cursor-pointer items-center justify-center rounded-full px-2 font-display text-label-sm",
                    "transition-colors duration-200 ease-out-soft max-md:flex-1 md:px-4.5",
                    "has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-primary",
                    selected ? "text-ink" : "text-fg-secondary hover:text-ink",
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={selected}
                    onChange={() => update("role", role.value)}
                    className="sr-only"
                  />
                  {selected && (
                    <motion.span
                      layoutId="contact-role-thumb"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-surface shadow-sm"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                  <span className="relative">{role.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <SelectField
          id="contact-subject"
          label="Sujet"
          name="subject"
          value={values.subject}
          onChange={(event) =>
            update("subject", event.target.value as ContactSubject)
          }
        >
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </SelectField>

        <div className="flex flex-col gap-2">
          <TextAreaField
            id="contact-message"
            label="Message"
            name="message"
            rows={5}
            required
            value={values.message}
            error={errors.message}
            aria-describedby={
              errors.message
                ? "contact-message-error contact-message-hint"
                : "contact-message-hint"
            }
            onChange={(event) => update("message", event.target.value)}
            onBlur={() => check("message")}
          />
          <p
            id="contact-message-hint"
            className="text-caption text-fg-tertiary max-md:hidden"
          >
            Pas de mot de passe ni de données bancaires dans ce formulaire.
          </p>
        </div>

        <ConsentCheckbox
          id="contact-consent"
          checked={values.consent}
          error={errors.consent}
          onChange={(checked) => update("consent", checked)}
        >
          J&apos;accepte que mes informations soient utilisées pour répondre à
          ma demande.{" "}
          <Link href={ROUTES.privacy} className={INLINE_LINK}>
            En savoir plus
          </Link>
        </ConsentCheckbox>

        <div className="flex items-center justify-between gap-4">
          {/* Mobile frame: large full-width button; desktop: medium one. */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            arrow
            fullWidth="always"
            disabled={sending}
            className="md:hidden"
          >
            Envoyer le message
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            arrow
            disabled={sending}
            className="max-md:hidden"
          >
            Envoyer le message
          </Button>
          <p className="text-small text-fg-secondary max-md:hidden">
            Réponse sous 2 jours ouvrés
          </p>
        </div>
      </form>

      {status === "sent" && (
        <Alert type="success" role="status">
          Message envoyé. Merci {sent.name}, nous vous répondons à {sent.email}{" "}
          sous deux jours ouvrés.
        </Alert>
      )}
      {status === "failed" && (
        <Alert type="warning" role="alert">
          L&apos;envoi n&apos;a pas abouti. Réessayez dans un instant ou
          écrivez-nous à bonjour@appjob.fr.
        </Alert>
      )}
    </div>
  );
}
