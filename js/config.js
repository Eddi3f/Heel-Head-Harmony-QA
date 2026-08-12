/* =========================================================================
   Heel Head Harmony — site configuration
   -------------------------------------------------------------------------
   1) GOOGLE SHEET — the content Pamela edits (testimonials, treatments,
      research). See docs/GOOGLE-SHEETS.md.
   2) CONTACT FORM — the Cloudflare Worker that emails the enquiry.
      See docs/CONTACT-FORM.md.
   ========================================================================= */
window.HHH_CONFIG = {
  enabled: true,

  /* --- Google Sheet (content) --- */
  sheetId: "1lQuqegWwdnNEIRqsin308kmXVpjQmvIiKovVTBXTUjU",
  tabs: {
    testimonials: "Testimonials",
	about: "About"
    treatments:   "Treatments",
    research:     "Research"
  },

  /* --- Contact form (email) --- */
  formEndpoint: "https://hhh-contact.efulwood.workers.dev"
};
