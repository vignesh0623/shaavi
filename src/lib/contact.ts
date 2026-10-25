/** What the Contact Us form sends. */
export type ContactMessage = {
  firstName: string;
  surname: string;
  email: string;
  /** Years, or empty when not given. */
  age: string;
  /** Mobile number with its dialling code (e.g. "+44 7700 900123"), or empty. */
  phone: string;
  message: string;
  /** The visitor would also like the reply on WhatsApp. */
  whatsapp: boolean;
};

/**
 * Delivers a Contact Us message. Email isn't set up yet, so nothing is sent:
 * the form behaves as it will once it is, and in development the message is
 * logged instead. To send it, post it here to a route handler (or call a
 * server action) that emails the team; a rejected promise shows the form's
 * error message.
 */
export async function sendContactMessage(message: ContactMessage): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.info("Contact message (email not set up yet, so not sent):", message);
  }
}
