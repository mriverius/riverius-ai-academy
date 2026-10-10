// Mentoría offer (/academy/mentoria): every price, spot count and link lives here, so it changes in one place.
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
    spotsPerMonth: 5, // Shown across /academy/mentoria (hero, price card, closing)
    guarantee: "Si tu agente no queda funcionando, seguimos contigo hasta 4 semanas más, sin costo.",
    // Small print under the guarantee.
    guaranteeDetail:
      "Funcionando quiere decir que hace lo que definimos por escrito antes de empezar. Aplica si asistes a tus sesiones y completas las tareas entre ellas. No incluye los costos de servicios externos (WhatsApp Business, IA, hosting) ni los tiempos de aprobación de plataformas como Meta o Microsoft.",
  },
};

// Tracked links: ?utm_source=web&utm_medium=<page>[&utm_content=<button>].
export const pageName = (pathname: string) => pathname.replace(/\/$/, "").split("/").pop() || "academy";
export const tracked = (url: string, pathname: string, content?: string) =>
  `${url}?utm_source=web&utm_medium=${pageName(pathname)}${content ? `&utm_content=${content}` : ""}`;

export const mentoriaPrice = OFFER.mentoria.price === null ? null : `$${OFFER.mentoria.price}`;
export const mentoriaSpotsShort = `${OFFER.mentoria.spotsPerMonth} cupos por mes.`;
export const mentoriaSpots = `${OFFER.mentoria.spotsPerMonth} cupos por mes, porque cada sesión es privada.`;
