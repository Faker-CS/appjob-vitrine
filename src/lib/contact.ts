export type ContactRole = "candidate" | "recruiter" | "other";

/** Subjects of the contact form. The first one is the option shown in Figma. */
export const CONTACT_SUBJECTS = [
  { value: "application", label: "Question sur l'application" },
  { value: "candidates", label: "Question sur l'espace candidats" },
  { value: "recruiters", label: "Question sur l'espace recruteurs" },
  { value: "press", label: "Presse et partenariats" },
  { value: "other", label: "Autre demande" },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["value"];

export type ContactMessage = {
  name: string;
  email: string;
  role: ContactRole;
  subject: ContactSubject;
  message: string;
  /** The visitor ticked the consent box of the form. */
  consent: true;
};

/**
 * Sends a message from the /contact form.
 *
 * TODO(backend): there is no backend yet, so this resolves locally without
 * sending anything. Wire it to the contact endpoint (a route handler such as
 * `POST /api/contact` that forwards to bonjour@appjob.fr or to the support
 * tool), and throw on a non-2xx response so the form shows its error message.
 */
export async function sendContactMessage(message: ContactMessage): Promise<void> {
  void message;
}
