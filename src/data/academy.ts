// Riverius AI Academy: Spanish-first, uses tú (community voice).
// Program details, stats and credentials come from mriverius.com.
import type { ImageMetadata } from "astro";
import aaisha from "../assets/team/aaisha.jpg";
import mariano from "../assets/team/mariano-rivera.jpg";
import teletica from "../assets/logos/teletica.png";
import fidelitas from "../assets/logos/fidelitas.png";
import upwork from "../assets/logos/upwork.webp";
export const academy = {
  name: "Riverius AI Academy",
  description:
    "Aprende IA sin ser técnico. Crea agentes de IA y automatizaciones sin programar, con acompañamiento 1:1 y una comunidad en Skool.",
  email: "hola@riverius.ai",
  skool: "https://www.skool.com/riverius-academy",
  booking: "https://cal.com/mriverius/programa-agentes-ia-riverius-academy",
  whatsapp: "https://wa.me/50685973818",
  cta: { label: "Únete gratis", href: "https://www.skool.com/riverius-academy" },
  nav: [
    { label: "Profesionales", href: "/academy/profesional" },
    { label: "Emprendedores", href: "/academy/emprendedor" },
    { label: "Equipos", href: "/academy/equipos" },
    { label: "Historias", href: "/academy#historias" },
  ],
  sister: { label: "Riverius AI", href: "/" },
  social: [
    { label: "YouTube", href: "https://youtube.com/@mriverius", icon: "ph:youtube-logo-light" },
    { label: "Instagram", href: "https://instagram.com/mriverius", icon: "ph:instagram-logo-light" },
    { label: "LinkedIn", href: "https://linkedin.com/in/mriverius", icon: "ph:linkedin-logo-light" },
  ],
};

export const stats = [
  { value: 100, prefix: "+", suffix: "", label: "profesionales formados" },
  { value: 13, prefix: "+", suffix: "", label: "países" },
  { value: 1, prefix: "#", suffix: "", label: "comunidad de IA de Costa Rica" },
  { value: 5, prefix: "", suffix: "", label: "reseñas de 5 estrellas en Skool", stars: true },
];

// The three paths. The hub sends each visitor to the page made for them.
export const avatars = [
  {
    slug: "profesional",
    href: "/academy/profesional",
    who: "Soy profesional",
    title: "Construye tu oficina automática",
    text: "Automatiza reportes, correos y tareas repetitivas de tu trabajo con agentes de IA. Dos niveles y tu certificado.",
    fit: ["Trabajas con correos, datos y documentos", "Quieres recuperar horas de tu semana"],
    icon: "ph:briefcase-light",
    cta: "Ver el programa",
  },
  {
    slug: "emprendedor",
    href: "/academy/emprendedor",
    who: "Soy emprendedor",
    title: "Aprende IA y conviértela en negocio",
    text: "Una ruta clara: primero dominas los agentes de IA, después aprendes a venderlos a clientes reales.",
    fit: ["Quieres ofrecer soluciones de IA", "Tienes o quieres un negocio propio"],
    icon: "ph:rocket-launch-light",
    cta: "Ver la ruta",
  },
  {
    slug: "equipos",
    href: "/academy/equipos",
    who: "Lidero un equipo",
    title: "Capacitación en IA para su organización",
    text: "Talleres y programas a la medida para empresas, centros educativos e instituciones públicas.",
    fit: ["Necesita formar a varias personas", "Busca resultados medibles en su equipo"],
    icon: "ph:users-three-light",
    cta: "Solicitar cotización",
  },
];

export const mentors = [
  {
    // TODO: replace with Aaisha's own bio.
    name: "Aaisha",
    role: "Co-fundadora y mentora",
    photo: aaisha,
    bio: "Acompaña a estudiantes y equipos para que avancen con claridad y conviertan lo aprendido en hábitos de trabajo.",
    credentials: [] as string[],
  },
  {
    name: "Mariano Rivera",
    role: "Co-fundador y mentor",
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


export const path = [
  {
    level: "Fundamentos",
    weeks: "6 semanas",
    title: "Crea tus primeros agentes de IA",
    text: "Entiende cómo piensa un agente y construye tus primeros flujos en n8n, con su interfaz visual de arrastrar y soltar.",
    topics: ["Qué es un agente de IA", "Tus primeros flujos en n8n", "Correo, hojas y formularios"],
  },
  {
    level: "Agentes avanzados",
    weeks: "6 semanas",
    title: "Agentes que escuchan y ven",
    text: "Suma reconocimiento de audio e imágenes, memoria y herramientas para que tus agentes resuelvan tareas completas.",
    topics: ["Reconocimiento de audio", "Análisis de imágenes", "Memoria y herramientas"],
  },
  {
    level: "Sistemas en producción",
    weeks: "6 semanas",
    title: "Tu agente en WhatsApp, listo para usarse",
    text: "Lleva tus agentes a producción: conectados a WhatsApp y a bases de datos, para que trabajen con personas reales.",
    topics: ["Integración con WhatsApp", "Bases de datos", "Monitoreo y mejora"],
  },
];

// Professionals: two levels, then the certificate.
export const proLevels = path.slice(0, 2);

export const proPricing = {
  title: "Oficina automática",
  detail: "2 niveles, 12 semanas",
  // TODO: set the price for the 2-level program (null hides it).
  price: null as string | null,
  includes: [
    "Nivel 1: Fundamentos y Nivel 2: Avanzados",
    "Sesión privada 1:1 cada semana",
    "Lecciones en video semanales",
    "Soporte por WhatsApp",
    "Comunidad privada en Skool",
    "Certificado de Riverius AI Academy",
  ],
};

// Entrepreneurs: learn it, then sell it.
export const roadmap = [
  { phase: "Aprende", title: "Crea tus primeros agentes", text: "Las bases de los agentes de IA y tus primeros flujos en n8n, sin programar.", tags: ["Nivel 1: Fundamentos"] },
  { phase: "Aprende", title: "Domina agentes avanzados", text: "Audio, imágenes, memoria y herramientas: agentes que resuelven tareas completas.", tags: ["Nivel 2: Avanzados"] },
  { phase: "Aprende", title: "Llévalos a producción", text: "Agentes en WhatsApp conectados a bases de datos, listos para clientes reales.", tags: ["WhatsApp", "Bases de datos"] },
  { phase: "Vende", title: "Elige tu nicho y tu oferta", text: "Encuentra un problema que duela en un sector que conoces y empaquétalo como solución.", tags: ["Nicho", "Oferta"] },
  { phase: "Vende", title: "Consigue tus primeros clientes", text: "Prospección, demos que convencen y propuestas claras para cerrar tus primeras ventas.", tags: ["Demos", "Propuestas"] },
  { phase: "Vende", title: "Entrega y crece", text: "Precios, mantenimiento y acuerdos mensuales para que tus ingresos sean recurrentes.", tags: ["Precios", "Recurrencia"] },
];

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

export const howItWorks = [
  { title: "Sesión privada 1:1 cada semana", text: "Trabajas directamente con Mariano sobre tu propio proyecto.", icon: "ph:user-focus-light" },
  { title: "Lecciones en video", text: "Contenido nuevo cada semana, para ver a tu ritmo.", icon: "ph:play-circle-light" },
  { title: "Soporte por WhatsApp", text: "Resuelve dudas entre sesiones, sin esperar.", icon: "ph:whatsapp-logo-light" },
  { title: "Llamadas grupales", text: "Encuentros de la comunidad por Zoom y Skool.", icon: "ph:users-three-light" },
  { title: "Proyectos revisados cada semana", text: "Recibes retroalimentación concreta sobre lo que construyes.", icon: "ph:check-circle-light" },
];



// Success stories (Wistia videos, from mriverius.com/testimonios).
export const stories = [
  {
    wistia: "qlse28rrbj",
    name: "Alonso Hidalgo",
    role: "Microbiólogo",
    before: "Venía de un mundo de laboratorio, sin ninguna experiencia en automatización ni herramientas de IA.",
    after: "Hoy vende soluciones de IA a sus clientes y desarrolla sus propios agentes para WhatsApp.",
  },
  {
    wistia: "u8rfe4702b",
    name: "Andrey Espinoza",
    role: "IT Recruiting Manager",
    before: "Gestionaba el reclutamiento a mano: cada candidato, cada correo y cada seguimiento, uno por uno.",
    after: "Automatizó su flujo de reclutamiento: la IA hace el trabajo repetitivo y él se enfoca en las personas.",
  },
  {
    wistia: "co5vl5xkc9",
    name: "Fabián Morales",
    role: "Ingeniero en Telecomunicaciones",
    before: "Conocía la tecnología, pero las tareas operativas del día a día seguían comiéndose sus horas.",
    after: "Sus procesos corren solos con Make.com y n8n, y recuperó horas de trabajo cada semana.",
  },
  {
    wistia: "4dtjtsoyfe",
    name: "Bernal Barrantes",
    role: "Fleet Engineer",
    before: "Gestionaba su flota con reportes y seguimientos manuales que le consumían horas cada semana.",
    after: "Su monitoreo y sus reportes corren solos, y él se concentra en optimizar la operación.",
  },
  {
    wistia: "sthpxqj6jk",
    name: "Esteban Hidalgo",
    role: "Comunicador y periodista",
    before: "Hacía todas sus campañas de marketing a mano, pieza por pieza.",
    after: "La IA le ayuda a crear historias, generar imágenes y publicarlas en redes sociales.",
  },
];

// Final projects defended by students (Wistia videos, from mriverius.com/galeria).
export const projects = [
  {
    wistia: "ydxphe2awn",
    name: "Alonso Hidalgo",
    level: 2,
    title: "Recepcionista IA para una clínica, 24/7",
    text: "Atiende el WhatsApp de la clínica a cualquier hora, informa servicios y requisitos, y agenda citas en Google Calendar sin intervención humana.",
    tags: ["WhatsApp", "Google Calendar", "n8n"],
  },
  {
    wistia: "2zjsooxz9w",
    name: "Mario Madrigal",
    level: 2,
    title: "Agente inmobiliario que filtra interesados",
    text: "Responde consultas sobre alquileres con datos reales de Airtable y solo avisa al propietario cuando alguien está listo para agendar una visita.",
    tags: ["WhatsApp", "Airtable"],
  },
  {
    wistia: "jdl0hssqbz",
    name: "Fabián Morales",
    level: 2,
    title: "Pedidos por WhatsApp para una floristería",
    text: "Muestra el catálogo, calcula el total con adicionales y envío, define la entrega y registra cada pedido en Google Sheets.",
    tags: ["WhatsApp", "Google Sheets"],
  },
];

// Real WhatsApp messages from students (from the previous academy site), in file-number order.
const shotFiles = import.meta.glob<ImageMetadata>("../assets/academy/testimonials/*.webp", { eager: true, import: "default" });
export const testimonialShots = Object.keys(shotFiles)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => shotFiles[k]);

export const faqHub = [
  { q: "¿Necesito saber programar?", a: "No. Trabajamos con n8n, una herramienta visual de arrastrar y soltar. Si sabes usar el correo y una hoja de cálculo, puedes empezar." },
  { q: "¿La comunidad en Skool es gratis?", a: "Sí. Puedes unirte gratis y automatizar la primera parte de tu oficina en 30 minutos. Los programas con acompañamiento 1:1 son aparte." },
  { q: "¿Qué camino es para mí?", a: "Si quieres automatizar tu propio trabajo, el de profesionales. Si quieres vender soluciones de IA, el de emprendedores. Si necesitas formar a un equipo, el de equipos." },
  { q: "¿Quiénes son los mentores?", a: "Aaisha y Mariano Rivera, co-fundadores de Riverius. Acompañan cada programa de principio a fin." },
];

export const faqPro = [
  { q: "¿Necesito saber programar?", a: "No. Todo se construye de forma visual con n8n. Si sabes usar el correo y una hoja de cálculo, puedes empezar." },
  { q: "¿Cuánto tiempo necesito por semana?", a: "Cada nivel dura seis semanas. Con dos o tres horas por semana, más tu sesión 1:1, avanzas a buen ritmo." },
  { q: "¿Puedo probar antes de inscribirme?", a: "Sí. Únete gratis a la comunidad en Skool y automatiza la primera parte de tu oficina en 30 minutos." },
  { q: "¿Recibo un certificado?", a: "Sí. Al completar los dos niveles recibes el certificado de Riverius AI Academy." },
];

export const faqEmprendedor = [
  { q: "¿Necesito experiencia técnica?", a: "No. La ruta empieza desde cero y todo se construye sin programar." },
  { q: "¿Me enseñan a vender, o solo a construir?", a: "Las dos cosas. La primera mitad de la ruta es aprender a construir; la segunda, encontrar tu nicho, conseguir clientes y cobrar por tus soluciones." },
  { q: "¿Alguien ya lo logró?", a: "Sí. Alonso Hidalgo venía de un laboratorio y hoy vende soluciones de IA a sus clientes. Puedes ver su historia en esta página." },
];

export const faqEquipos = [
  { q: "¿Para qué tipo de organizaciones es?", a: "Empresas, centros educativos, instituciones públicas y ONG que quieren usar IA con criterio y resultados medibles." },
  { q: "¿Es virtual o presencial?", a: "Ambas. Adaptamos la modalidad a su equipo: virtual, presencial o mixta." },
  { q: "¿Cuánto tarda la cotización?", a: "Le respondemos en un día hábil para entender su objetivo y enviarle una propuesta." },
];

