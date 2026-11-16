"use client";

import { useCallback, useSyncExternalStore } from "react";

export type CookieConsent = "accepted" | "refused";
/** `pending` = not known yet (server render), `unset` = no choice stored. */
export type CookieConsentState = CookieConsent | "unset" | "pending";

const STORAGE_KEY = "appjob-cookie-consent";
const CHANGE_EVENT = "appjob:cookie-consent";

function read(): CookieConsentState {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "refused" ? value : "unset";
  } catch {
    return "unset";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Visitor's choice for the audience-measurement tracker, shared between the
 * cookie banner and the cookie settings page (persisted in localStorage).
 */
export function useCookieConsent() {
  const consent = useSyncExternalStore<CookieConsentState>(
    subscribe,
    read,
    () => "pending",
  );

  const setConsent = useCallback((value: CookieConsent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page only.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { consent, setConsent };
}
