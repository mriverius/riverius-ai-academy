// Riverius AI Academy: Spanish-first, uses tú (community voice).
// Program details, stats and credentials come from mriverius.com.
import aaisha from "../assets/team/aaisha.jpg";
import mariano from "../assets/team/mariano-rivera.jpg";
import teletica from "../assets/logos/teletica.png";
import fidelitas from "../assets/logos/fidelitas.png";
import upwork from "../assets/logos/upwork.webp";
import { OFFER, pageName, tracked } from "./academy-offer";
export { pageName };
export const academy = {
  name: "Riverius AI Academy",
  description:
    "Construye tu propio agente de IA con una mentoría 1:1, o capacita a tu equipo. Sin programar, en español y con acompañamiento.",
  skool: OFFER.skoolUrl,
  booking: OFFER.calUrl,
  whatsapp: OFFER.whatsappUrl,
  // Header button on every Academy page (the link gets the page's tracking in the layout).
  cta: { label: "Agenda tu llamada gratis", href: OFFER.calUrl },
  // Header: direct links into the home page (the Mentoría), plus Equipos (B2B). Absolute, so they work from every page.
  nav: [
    { label: "Cómo funciona", href: "/academy#como-funciona" },
    { label: "Testimonios", href: "/academy#historias" },
    { label: "Precios", href: "/academy#opciones" },
    { label: "Preguntas", href: "/academy#preguntas" },
    { label: "Equipos", href: "/academy/equipos" },
  ],
  sister: { label: "Riverius AI", href: "/" },
  linkedinCompany: "https://www.linkedin.com/company/riverius-ai",
  social: [
    { label: "YouTube", href: "https://youtube.com/@mriverius", icon: "ph:youtube-logo-light" },
    { label: "Instagram", href: "https://instagram.com/mriverius", icon: "ph:instagram-logo-light" },
    { label: "LinkedIn", href: "https://linkedin.com/in/mriverius", icon: "ph:linkedin-logo-light" },
    { label: "TikTok", href: "https://www.tiktok.com/@mriverius", icon: "ph:tiktok-logo-light" },
  ],
};

// Skool and booking links carry the page (and optionally the button) they were clicked on.
export const skoolLink = (pathname: string, content?: string) => tracked(academy.skool, pathname, content);
export const bookingLink = (pathname: string, content?: string) => tracked(academy.booking, pathname, content);

export const stats = [
  { value: 100, prefix: "+", suffix: "", label: "profesionales formados" },
  { value: 13, prefix: "+", suffix: "", label: "países" },
  { value: 5, decimals: 1, prefix: "", suffix: "", label: "calificación en Skool", stars: true },
];

// Aaisha leads strategy and creativity; Mariano is the main mentor and teaches building and selling.
export const mentors = [
  {
    name: "Aaisha Ali",
    role: "Co-fundadora y mentora de estrategia",
    photo: aaisha,
    bio: "Me dedico a la estrategia y la creatividad: le doy a cada proyecto una dirección clara y una marca propia.",
    credentials: ["Estrategia", "Identidad de marca", "Dirección creativa", "Posicionamiento"],
  },
  {
    name: "Mariano Rivera",
    role: "Co-fundador y mentor principal",
    photo: mariano,
    bio: "Me dedico a esto al cien por ciento: construyo automatizaciones y agentes de IA todos los días.",
    credentials: ["Ingeniero en Sistemas de Computación", "5+ años como ingeniero de software", "Top Rated en Upwork"],
  },
];

export const pressLogos = [
  { name: "Teletica Canal 7", logo: teletica, label: "Teletica" },
  { name: "Universidad Fidélitas", logo: fidelitas },
  { name: "Upwork", logo: upwork },
];


// Automatizar: 6 classes, then the certificate.
// Plain language: every class says what the visitor will see happen, with no technical terms.
export const proClasses = [
  { title: "Tu primera automatización", text: "Llega un mensaje, se responde solo y a ti te llega un aviso al teléfono." },
  { title: "Solicitudes que se atienden solas", text: "Alguien llena un formulario: sus datos quedan guardados en tu hoja de cálculo y le llega una respuesta por correo, sin que tú hagas nada." },
  { title: "Respuestas según cada caso", text: "La IA lee cada mensaje, entiende qué necesita la persona y le responde lo que corresponde a su caso, no una respuesta genérica." },
  { title: "Tu primer asistente de IA", text: "Le pides algo con tus palabras, como \"agenda una reunión con Ana el martes\", y él sabe qué hacer: abrir tu calendario, escribir el correo o buscar el dato." },
  { title: "Tu asistente conoce tu trabajo", text: "Le das acceso a tus documentos y datos para que responda sobre tu trabajo, y armas el plan de lo que vas a automatizar." },
  { title: "Tu asistente en tu teléfono", text: "Le escribes desde tu teléfono, como a un compañero de trabajo, y te responde o hace la tarea desde donde estés." },
];

// /academy: what your agent can do.
export const agentUses = [
  { title: "Ventas y atención a clientes", text: "Responde preguntas, explica tus productos y precios, toma los datos del cliente y te avisa cuando hay una venta.", icon: "ph:storefront-light" },
  { title: "Soporte para tu equipo", text: "Busca en tus manuales y documentos y le responde a tu equipo en segundos, sin que nadie tenga que buscar.", icon: "ph:lifebuoy-light" },
  { title: "Citas y recordatorios", text: "Agenda, confirma y recuerda citas, pagos o entregas, sin que tengas que escribir uno por uno.", icon: "ph:calendar-check-light" },
];

// Why a mentoría: [only tutorials, with the Mentoría].
export const mentoriaContrast: [string, string][] = [
  ["Ejemplos genéricos que no se parecen a tu negocio", "Construimos con tu información, tus procesos y tus clientes"],
  ["Te trabas y nadie te responde", "WhatsApp directo conmigo entre sesiones"],
  ["Empiezas cinco cursos y no terminas ninguno", "Una sesión por semana, con fecha, hasta terminar"],
  ["Nunca sabes si lo estás haciendo bien", "Lo revisamos juntos en cada sesión"],
  ["Te quedas con el agente a medias", "Si no queda funcionando, sigo contigo 4 semanas más, sin costo"],
];

// How it works: from the first call to the certificate.
export const mentoriaSteps = [
  { title: "Llamada inicial · 30 min, gratis", text: "Revisamos tu negocio, elegimos el canal y definimos por escrito qué va a hacer tu agente." },
  { title: "Sesiones 1 a 4 · Construimos tu agente", text: "En la primera sesión ya le escribes y te responde. Después aprende tu negocio y hace las tareas que definimos." },
  { title: "Sesión 5 · Lo publicas", text: "Te enseño a ponerlo en línea, en el canal que elegimos, para que tus clientes o tu equipo puedan usarlo a cualquier hora." },
  { title: "Sesión 6 · Lo afinas con usuarios reales", text: "Revisamos sus conversaciones, lo ajustamos y te quedas con todo documentado para mantenerlo y mejorarlo tú." },
  { title: "30 días de soporte", text: "Si algo falla cuando ya está en uso, lo ajustamos contigo." },
];

// Who it's for. link: optional, appended to the item.
type FitItem = { text: string; link?: { label: string; href: string } };
export const mentoriaFit: { yes: FitItem[]; no: FitItem[] } = {
  yes: [
    { text: "Tus clientes o tu equipo hacen las mismas preguntas o tareas todos los días." },
    { text: "Ya sabes qué quieres que haga tu agente." },
    { text: "Quieres entenderlo y poder mantenerlo tú mismo." },
  ],
  no: [
    { text: "Solo estás explorando.", link: { label: "Empieza gratis en la comunidad.", href: OFFER.skoolUrl } },
    { text: "Quieres que lo hagamos todo por ti, sin involucrarte.", link: { label: "Para eso está Riverius AI.", href: "https://www.riverius.ai/" } },
    { text: "Necesitas capacitar a todo un equipo.", link: { label: "Para eso está Equipos.", href: "/academy/equipos" } },
  ],
};

// Mentoría, plus Premium and Standard as the alternative. Prices and links come from academy-offer.ts.
export const mentoriaPromise = "Tu agente de IA, funcionando en 6 semanas.";
export const tiers = {
  standard: {
    for: "Para probar antes de decidir.",
    includes: [
      "Tu primer agente de IA en 15 minutos, con plantilla lista",
      "Diagnóstico gratis: descubre qué tareas puede hacer un agente por ti",
      "Taller abierto en vivo cada mes: construimos agentes y automatizaciones juntos",
      "Prompts listos para tu negocio",
      "Casos reales de alumnos: una floristería, un call center y más",
    ],
  },
  premium: {
    for: "Para aprender y construir a tu ritmo, con ayuda en grupo.",
    includes: [
      "Todo lo de Standard",
      "Más de 10 lecciones en video, de cero a tu propio agente",
      "Agentes y plantillas ya hechos: los importas y los adaptas a tu negocio",
      "Tú pides, yo construyo: cada mes armo en vivo un agente pedido por la comunidad",
      "2 sesiones en vivo al mes para destrabar tu caso",
      "Grabaciones de todas las sesiones, para avanzar a tu ritmo",
    ],
  },
  mentoria: {
    for: "Para quien ya sabe lo que quiere resolver y busca a alguien que lo guíe paso a paso.",
    includes: [
      "Antes de empezar, definimos por escrito qué hace tu agente y cuándo se considera terminado",
      "Tu agente respondiendo desde la primera sesión",
      "6 sesiones privadas 1:1 de 60 minutos, una por semana",
      "WhatsApp directo durante toda la mentoría",
      "30 días de soporte al terminar",
      "Todo lo de Premium durante la mentoría y el soporte",
      "Al finalizar, tu certificado de Riverius AI Academy para LinkedIn",
    ],
  },
};

// Teams: quotation form options (usted, first contact with organizations).
export const teamsForm = {
  roles: ["Dirección general / Gerencia", "Recursos humanos / Capacitación", "Tecnología / TI", "Jefatura de área", "Coordinación académica", "Otro"],
  orgTypes: ["Empresa", "Institución pública", "Centro educativo", "ONG", "Otro"],
  sizes: ["1-10", "11-25", "26-50", "50+"],
  modes: ["Virtual", "Presencial", "Mixta"],
};

export const teamsSteps = [
  { title: "Nos cuenta su objetivo", text: "Qué quiere lograr su equipo y dónde se pierde más tiempo hoy.", icon: "ph:chat-circle-text-light" },
  { title: "Diseñamos la capacitación", text: "Un programa a la medida de su sector, su nivel y sus herramientas.", icon: "ph:compass-tool-light" },
  { title: "Su equipo aprende haciendo", text: "Talleres prácticos sobre casos reales de su organización, con seguimiento.", icon: "ph:hand-pointing-light" },
];

// Success stories (Wistia videos, from mriverius.com/testimonios).
// metric: optional headline result (e.g. "6 horas menos por semana"). Only real, confirmed numbers; empty is hidden.
export type Story = { wistia: string; youtube?: string; certificate?: string; name: string; role: string; before: string; after: string; metric?: string };
export const stories: Story[] = [
  {
    wistia: "qlse28rrbj",
    metric: "", // TODO
    name: "Alonso Hidalgo",
    role: "Microbiólogo",
    before: "Venía de un mundo de laboratorio, sin ninguna experiencia en automatización ni herramientas de IA.",
    after: "Hoy vende soluciones de IA a sus clientes y desarrolla sus propios agentes para WhatsApp.",
  },
  {
    wistia: "u8rfe4702b",
    metric: "", // TODO
    name: "Andrey Espinoza",
    role: "IT Recruiting Manager",
    before: "Gestionaba el reclutamiento a mano: cada candidato, cada correo y cada seguimiento, uno por uno.",
    after: "Automatizó su flujo de reclutamiento: la IA hace el trabajo repetitivo y él se enfoca en las personas.",
  },
  {
    wistia: "co5vl5xkc9",
    metric: "", // TODO
    name: "Fabián Morales",
    role: "Ingeniero en Telecomunicaciones",
    before: "Conocía la tecnología, pero las tareas operativas del día a día seguían comiéndose sus horas.",
    after: "Sus procesos corren solos con Make.com y n8n, y recuperó horas de trabajo cada semana.",
  },
  {
    wistia: "4dtjtsoyfe",
    metric: "", // TODO
    name: "Bernal Barrantes",
    role: "Fleet Engineer",
    before: "Gestionaba su flota con reportes y seguimientos manuales que le consumían horas cada semana.",
    after: "Su monitoreo y sus reportes corren solos, y él se concentra en optimizar la operación.",
  },
  {
    wistia: "sthpxqj6jk",
    metric: "", // TODO
    name: "Esteban Hidalgo",
    role: "Comunicador y periodista",
    before: "Hacía todas sus campañas de marketing a mano, pieza por pieza.",
    after: "La IA le ayuda a crear historias, generar imágenes y publicarlas en redes sociales.",
  },
];

// Stories shown on /academy (the shared list above stays for other uses).
export const mentoriaStories: Story[] = [
  {
    wistia: "",
    youtube: "dt7cK3FL3hQ",
    certificate: "RAA-01b29ef9-ba42-4dc5-861f-a3e58349a4b3",
    name: "Fabián Morales",
    role: "Ingeniero y dueño de floristería",
    before: "Montó una floristería con su esposa y atendía a mano a cada cliente que llegaba de sus anuncios.",
    after: "Su agente atiende a esos clientes, toma sus encargos y los registra en Google Sheets.",
  },
  {
    wistia: "",
    youtube: "S1ail5OKUL0",
    certificate: "RAA-28ad55a6-a20a-49d8-91e3-27ab276ffe01",
    name: "Junior Owens",
    role: "Ex agente de call center",
    before: "Trabajó 14 años en un call center atendiendo clientes, sin experiencia en programación.",
    after: "Con su agencia, construye agentes de WhatsApp que atienden a los clientes de autolavados.",
  },
  {
    wistia: "",
    youtube: "0AmDTO3CLg8",
    certificate: "RAA-cc854610-812d-44ea-9a30-07170d82f42b",
    name: "Alonso Hidalgo",
    role: "Microbiólogo",
    before: "Trabajaba como microbiólogo en una clínica, sin experiencia en automatización ni en IA.",
    after: "Con su agencia, construye agentes de WhatsApp para clínicas como en la que trabajaba.",
  },
];

export const faqHub = [
  { q: "¿Necesito saber programar?", a: "No. Todo se construye de forma visual, con herramientas como Make y n8n. Si sabes usar el correo y una hoja de cálculo, puedes empezar." },
  { q: "¿La comunidad en Skool es gratis?", a: "Sí. Puedes unirte gratis y crear tu primer agente de IA en 15 minutos. Los programas con acompañamiento 1:1 son aparte." },
  { q: "¿Qué camino es para mí?", a: "Si quieres tu propio agente de IA para tu negocio, la Mentoría 1:1. Si necesitas formar a un equipo, Equipos." },
  { q: "¿Quiénes son los mentores?", a: "Aaisha Ali, que te guía en la estrategia y la creatividad de tu proyecto, y Mariano Rivera, tu mentor principal, que te enseña a construir agentes de IA. Ambos son co-fundadores de Riverius y acompañan cada programa de principio a fin." },
];

// id: anchor for links into the FAQ. links: buttons shown under the answer.
type FaqItem = { q: string; a: string; id?: string; links?: { label: string; href: string }[] };
export const faqMentoria: FaqItem[] = [
  { q: "¿En qué canales puede funcionar mi agente?", a: "En WhatsApp, Telegram, Microsoft Teams o tu sitio web. En la llamada elegimos el mejor para empezar. A veces conviene arrancar en Telegram, que es más rápido de configurar, y después pasar al canal final." },
  { q: "¿Mi agente tiene que ser de ventas?", a: "No. La mayoría de alumnos crea agentes de ventas y atención por WhatsApp, pero también hemos construido agentes de soporte interno y de recordatorios. Antes de empezar revisamos tu caso y definimos el alcance." },
  { q: "¿Necesito saber programar?", a: "No. Todo se construye de forma visual, con herramientas como Make y n8n. Si sabes usar el correo y una hoja de cálculo, puedes empezar." },
  { q: "¿Cuánto tiempo necesito por semana?", a: "En la Mentoría, una sesión privada por semana más el tiempo de práctica. Si una semana se te complica, la sesión se reprograma." },
  { q: "¿Qué necesito tener antes de empezar?", a: "Solo la información de tu negocio: productos, precios y las preguntas que más te hacen. La revisamos juntos en una llamada antes de empezar." },
  { q: "¿Hay costos aparte?", a: "Sí. WhatsApp Business, el servicio de IA y el hosting se pagan directamente a cada proveedor. Antes de empezar te explicamos cuánto vas a pagar según tu caso." },
  { q: "¿Qué pasa si mi agente no queda funcionando?", a: "Seguimos contigo hasta 4 semanas más, sin costo, siempre que hayas asistido a tus sesiones y completado las tareas entre ellas." },
  { q: "¿Qué pasa cuando termino?", a: "Tienes 30 días de soporte. Después, si quieres seguir mejorando tu agente con acompañamiento, puedes quedarte en la comunidad Premium por $37 al mes." },
  { q: "¿Por qué no contratar a alguien que me lo haga?", a: "Puedes, y si lo prefieres, en Riverius AI lo implementamos por ti. En la Mentoría el agente es tuyo: aprendes a mantenerlo y mejorarlo sin depender de nadie." },
  { q: "¿Y si prefiero aprender por mi cuenta?", a: "Para eso está Premium: más de 10 lecciones en video y 2 sesiones grupales al mes, por $37 al mes. Lo encuentras junto a la Mentoría, en las opciones de esta página." },
  { q: "¿Recibo un certificado?", a: "Sí. Al completar el curso en Premium, o al finalizar tu Mentoría, recibes el certificado de Riverius AI Academy para agregarlo a tu perfil de LinkedIn y a tu currículum." },
];

export const faqEquipos = [
  { q: "¿Para qué tipo de organizaciones es?", a: "Empresas, centros educativos, instituciones públicas y ONG que quieren usar IA con criterio y resultados medibles." },
  { q: "¿Es virtual o presencial?", a: "Ambas. Adaptamos la modalidad a su equipo: virtual, presencial o mixta." },
  { q: "¿Cuánto tarda la cotización?", a: "Le respondemos en un día hábil para entender su objetivo y enviarle una propuesta." },
];

