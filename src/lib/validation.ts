/** Error message of the "Input / État=Erreur" e-mail field in the Figma frames. */
export const EMAIL_ERROR =
  "Saisissez une adresse complète, par exemple prenom@exemple.fr";

/** Pragmatic e-mail check: something@domain.tld, no spaces. */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
