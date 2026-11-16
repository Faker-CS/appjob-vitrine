"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { ROUTES } from "@/lib/navigation";
import {
  NOTIFY_FORM_ID,
  subscribeToLaunch,
  type LaunchRole,
} from "@/lib/notify";
import { EMAIL_ERROR, isEmail } from "@/lib/validation";
import { ConsentCheckbox, INLINE_LINK } from "./content-consent-checkbox";

const CONSENT_ERROR = "Cochez cette case pour recevoir l'e-mail de sortie.";

type Errors = { email?: string; consent?: string };
type Status = "idle" | "sending" | "sent" | "failed";

/** "Formulaire alerte": e-mail + role, to be told when the app is released. */
export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<LaunchRole>("candidate");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  const emailError = (value: string) => (isEmail(value) ? undefined : EMAIL_ERROR);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const next: Errors = {
      email: emailError(email),
      consent: consent ? undefined : CONSENT_ERROR,
    };
    setErrors(next);
    if (next.email || next.consent) {
      setStatus("idle");
      document
        .getElementById(next.email ? "notify-email" : "notify-consent")
        ?.focus();
      return;
    }

    setStatus("sending");
    const address = email.trim();
    try {
      await subscribeToLaunch({ email: address, role, consent: true });
      setSentTo(address);
      setEmail("");
      setConsent(false);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form
      id={NOTIFY_FORM_ID}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="notify-title"
      className="flex scroll-mt-28 flex-col gap-4 rounded-lg border border-line bg-surface p-6 md:p-8"
    >
      <h2 id="notify-title" className="font-display text-h4 text-ink">
        Être prévenu·e de la sortie
      </h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="min-w-0 flex-1">
          <TextField
            id="notify-email"
            label="Adresse e-mail"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="prenom@exemple.fr"
            required
            value={email}
            error={errors.email}
            onChange={(event) => {
              const { value } = event.target;
              setEmail(value);
              if (errors.email) {
                setErrors((current) => ({ ...current, email: emailError(value) }));
              }
            }}
            onBlur={() => {
              if (email.trim()) {
                setErrors((current) => ({ ...current, email: emailError(email) }));
              }
            }}
          />
        </div>
        <div className="md:w-45 md:shrink-0">
          <SelectField
            id="notify-role"
            label="Vous êtes"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value as LaunchRole)}
          >
            <option value="candidate">Candidat·e</option>
            <option value="recruiter">Recruteur·se</option>
          </SelectField>
        </div>
      </div>

      <ConsentCheckbox
        id="notify-consent"
        checked={consent}
        error={errors.consent}
        onChange={(checked) => {
          setConsent(checked);
          setErrors((current) => ({
            ...current,
            consent: checked ? undefined : current.consent,
          }));
        }}
      >
        J&apos;accepte de recevoir un e-mail à la sortie d&apos;AppJob. Pas
        d&apos;autre message, désinscription en un clic.{" "}
        <Link href={ROUTES.privacy} className={INLINE_LINK}>
          Politique de confidentialité
        </Link>
      </ConsentCheckbox>

      <Button
        type="submit"
        variant="primary"
        size="md"
        arrow
        fullWidth="mobile"
        disabled={status === "sending"}
        className="self-start"
      >
        Me prévenir
      </Button>

      {status === "sent" && (
        <Alert type="success" role="status">
          C&apos;est noté. Nous vous écrirons à {sentTo} le jour de la sortie
          d&apos;AppJob.
        </Alert>
      )}
      {status === "failed" && (
        <Alert type="warning" role="alert">
          L&apos;inscription n&apos;a pas abouti. Réessayez dans un instant.
        </Alert>
      )}
    </form>
  );
}
