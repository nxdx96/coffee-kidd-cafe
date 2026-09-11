/**
 * Form endpoints — where the mailing-list and contact forms submit.
 *
 * Set these to your form-service URLs (see SETUP.md). Until then they're
 * undefined and the forms stay inert (no action, no submit) — the design is
 * unchanged, nothing breaks.
 *
 * PUBLIC_ prefix so the values are readable client-side (the enhancement script
 * reads them from the rendered `data-endpoint` attribute).
 *
 * Both forms work with any service that accepts a POST of the form fields and
 * returns 2xx (e.g. Formspree, Web3Forms, Formcarry, Buttondown embed).
 */
export const forms = {
  mailing: (import.meta.env.PUBLIC_MAILING_ENDPOINT as string | undefined) || undefined,
  contact: (import.meta.env.PUBLIC_CONTACT_ENDPOINT as string | undefined) || undefined,
};
