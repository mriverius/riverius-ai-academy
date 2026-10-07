// Automatizar offer: every price, spot count and link lives here, so it changes in one place.
// Tier names must match Skool exactly: Standard (free) and Premium (paid). Mentoría lives outside Skool.
export const OFFER = {
  skoolUrl: "https://www.skool.com/riverius-academy",
  calUrl: "https://cal.com/mriverius/diagnostico",
  whatsappUrl: "https://wa.me/50685973818",

  premium: {
    monthly: 37,
    yearly: 370, // shown as "2 meses gratis"
    checkoutUrl: null as string | null, // TODO: direct link to Skool's plans page. If null, the button goes to skoolUrl
    guarantee: null as string | null, // TODO: Skool's exact guarantee wording. If null, the guarantee is hidden
  },

  mentoria: {
    price: 397 as number | null, // USD. If null, shows "Consulta el precio" and the button goes to Cal.com
    checkoutUrl: null as string | null, // TODO: direct payment link. If null, the main button goes to Cal.com
    spotsThisMonth: null as number | null, // TODO: spots available. If null, the spots line is hidden
    monthLabel: null as string | null, // TODO: e.g. "noviembre". If null, says "este mes"
    upgradeCredit: false, // TODO: true only once the Premium-to-Mentoría discount is confirmed
    guarantee: "Si al terminar no tienes tus 6 automatizaciones funcionando, seguimos trabajando contigo sin costo hasta que lo estén.",
    guaranteeTerms: "Aplica si asistes a tus sesiones y completas las tareas entre clases.",
  },
};

// Tracked links: ?utm_source=web&utm_medium=<page>[&utm_content=<button>].
export const pageName = (pathname: string) => pathname.replace(/\/$/, "").split("/").pop() || "academy";
export const tracked = (url: string, pathname: string, content?: string) =>
  `${url}?utm_source=web&utm_medium=${pageName(pathname)}${content ? `&utm_content=${content}` : ""}`;

export const mentoriaPrice = OFFER.mentoria.price === null ? null : `$${OFFER.mentoria.price}`;
export const mentoriaSpots = OFFER.mentoria.spotsThisMonth
  ? `Solo ${OFFER.mentoria.spotsThisMonth} cupos ${OFFER.mentoria.monthLabel ? `en ${OFFER.mentoria.monthLabel}` : "este mes"}, porque cada alumno lleva sesiones privadas.`
  : null;
