/** Anchor of the notification form on /telecharger, targeted by its call-to-action block. */
export const NOTIFY_FORM_ID = "etre-prevenu";

export type LaunchRole = "candidate" | "recruiter";

export type LaunchSubscription = {
  email: string;
  role: LaunchRole;
  /** The visitor ticked the consent box of the form. */
  consent: true;
};

/**
 * Registers an e-mail address to be notified when AppJob is released
 * (form of the /telecharger page).
 *
 * TODO(backend): there is no backend yet, so this resolves locally without
 * sending anything. Wire it to the launch-list endpoint (a route handler such
 * as `POST /api/launch-subscriptions`, or the e-mailing provider's API), store
 * the consent with its date, and throw on a non-2xx response so the form shows
 * its error message.
 */
export async function subscribeToLaunch(
  subscription: LaunchSubscription,
): Promise<void> {
  void subscription;
}
