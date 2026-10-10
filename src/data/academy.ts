// Riverius AI Academy: Spanish-first, uses tú (community voice).
// Program details, stats and credentials come from mriverius.com.
import type { ImageMetadata } from "astro";
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
    "Automatiza tu trabajo con IA, conviértelo en negocio o capacita a tu equipo. Sin programar, en español y con acompañamiento.",
  skool: OFFER.skoolUrl,
  booking: OFFER.calUrl,
  whatsapp: OFFER.whatsappUrl,
  cta: { label: "Únete gratis", href: OFFER.skoolUrl },
  nav: [
    { label: "Automatizar", href: "/academy/automatizar" },
    { label: "Vender IA", href: "/academy/vender" },
    { label: "Equipos", href: "/academy/equipos" },
    { label: "Historias", href: "/academy#historias" },
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

// The three paths. The hub sends each visitor to the page made for them.
export const avatars = [
  {
    slug: "automatizar",
    href: "/academy/automatizar",
    who: "Quiero automatizar mi trabajo",
    title: "Construye tu oficina automática",
    text: "Automatiza reportes, correos y tareas repetitivas con agentes de IA. Empieza gratis, aprende con Premium o constrúyela conmigo en la Mentoría.",
    fit: ["Trabajas con correos, datos y documentos", "Quieres recuperar horas de tu semana"],
    icon: "ph:briefcase-light",
    cta: "Ver el programa",
  },
  {
    slug: "vender",
    href: "/academy/vender",
    who: "Quiero vender soluciones de IA",
    title: "Tu primer cliente de IA",
    text: "Construye una solución que los negocios pagan y aprende a venderla, cobrarla bien y cobrarla cada mes.",
    fit: ["Quieres ofrecer soluciones de IA", "Tienes o quieres un negocio propio"],
    icon: "ph:rocket-launch-light",
    cta: "Ver la ruta",
  },
  {
    slug: "equipos",
    href: "/academy/equipos",
    who: "Quiero capacitar a mi equipo",
    title: "Capacitación en IA para su organización",
    text: "Talleres y programas a la medida para empresas, centros educativos e instituciones públicas.",
    fit: ["Necesita formar a varias personas", "Busca resultados medibles en su equipo"],
    icon: "ph:users-three-light",
    cta: "Solicitar cotización",
  },
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

// Mentoría: the route to your WhatsApp sales agent, one step per weekly session.
export const agentSteps = [
  { title: "Tu agente responde", text: "Desde la primera sesión ya le escribes a tu agente y te contesta con la información de tu negocio.", icon: "ph:chat-circle-dots-light" },
  { title: "Conoce tu negocio", text: "Le cargamos tus productos, precios y preguntas frecuentes para que responda como tú lo harías.", icon: "ph:storefront-light" },
  { title: "Vende y registra", text: "Toma los datos del cliente, los guarda en tu hoja de cálculo y te avisa al teléfono.", icon: "ph:table-light" },
  { title: "Llega a tu WhatsApp", text: "Lo conectamos a tu número para que atienda a tus clientes reales.", icon: "ph:whatsapp-logo-light" },
  { title: "Lo afinamos", text: "Lo probamos con conversaciones reales y corregimos lo que haga falta.", icon: "ph:sliders-horizontal-light" },
  { title: "Es tuyo", text: "Queda funcionando y documentado, y sabes cómo mantenerlo y mejorarlo.", icon: "ph:key-light" },
];

// The three ways to buy Automatizar. Prices and links come from academy-offer.ts.
export const mentoriaPromise = "Tu agente de ventas por WhatsApp, funcionando en 6 semanas.";
export const tiers = {
  standard: {
    for: "Para probar antes de decidir.",
    includes: [
      "Tu primera tarea automatizada en 30 minutos, con plantilla lista",
      "Diagnóstico gratis: descubre qué 3 tareas te roban más tiempo",
      "Taller abierto en vivo cada mes: automatizamos juntos",
      "Prompts listos para tu profesión",
      "Casos reales de alumnos: un microbiólogo, un reclutador y más",
    ],
  },
  premium: {
    for: "Para aprender y construir a tu ritmo, con ayuda en grupo.",
    // TODO: verify against Skool's full Premium description.
    includes: [
      "Todo lo de Standard",
      "Las 6 clases del programa en video",
      "Automatizaciones ya hechas: las importas y las adaptas",
      "Tú pides, yo construyo: cada mes armo en vivo una automatización pedida por la comunidad",
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
      "30 días de soporte después de la entrega",
      "Acceso a Premium durante la mentoría y el soporte",
      "Al finalizar, tu certificado de Riverius AI Academy para LinkedIn",
    ],
  },
};

export const entrepreneurOffer = {
  title: "Tu primer cliente, con mentoría",
  includes: [
    "Tu producto definido: qué vender y a qué tipo de negocio",
    "Tu precio, calculado por el valor para tu cliente",
    "Tu demo, lista para mostrar",
    "Tus mensajes y tu guion de llamada, revisados",
    "Cada propuesta revisada antes de que la envíes",
    "Los sistemas que ya vendemos, listos para adaptar a tus clientes",
    "12 meses de Premium en Skool incluidos (valorados en $444)",
  ],
  guarantee: "Te ayudamos a conseguir clientes hasta que recuperes tu inversión.",
  scarcity: "Cupos limitados: la mentoría la damos personalmente.",
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

// tier: which option includes each benefit.
export const howItWorks = [
  { title: "Sesiones privadas 1:1 cada semana", text: "60 minutos con Mariano, construyendo sobre tu negocio.", icon: "ph:user-focus-light", tier: "Mentoría" },
  { title: "WhatsApp directo", text: "Resuelve dudas entre sesiones, sin esperar a la próxima.", icon: "ph:whatsapp-logo-light", tier: "Mentoría" },
  { title: "30 días de soporte después de la entrega", text: "Si algo falla cuando tu agente ya está atendiendo clientes, lo ajustamos contigo.", icon: "ph:lifebuoy-light", tier: "Mentoría" },
  { title: "Las clases como apoyo", text: "Te asigno solo los videos que tu proyecto necesita, no el curso completo.", icon: "ph:books-light", tier: "Mentoría" },
  { title: "Sesiones grupales en vivo", text: "Encuentros de la comunidad por Zoom y Skool para destrabar tu caso.", icon: "ph:users-three-light", tier: "Premium y Mentoría" },
  { title: "Clases en video", text: "Las 6 clases grabadas, para verlas a tu ritmo.", icon: "ph:play-circle-light", tier: "Premium" },
]



// Success stories (Wistia videos, from mriverius.com/testimonios).
// metric: optional headline result (e.g. "6 horas menos por semana"). Only real, confirmed numbers; empty is hidden.
export type Story = { wistia: string; youtube?: string; name: string; role: string; before: string; after: string; metric?: string };
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

// Stories shown only on /academy/automatizar (the shared list above stays as is for /academy and /vender).
export const automatizarStories: Story[] = [
  {
    wistia: "",
    youtube: "S1ail5OKUL0",
    name: "Junior Owens",
    role: "Dueño de agencia",
    before: "Fue agente de call center durante 14 años.",
    after: "Hoy tiene su propia agencia y vende chatbots de WhatsApp a dueños de autolavados.",
  },
  {
    wistia: "",
    youtube: "0AmDTO3CLg8",
    name: "Alonso Hidalgo",
    role: "Microbiólogo y dueño de agencia de IA",
    before: "Microbiólogo de profesión, trabajaba en una clínica.",
    after: "Hoy tiene su propia agencia de IA y vende soluciones de IA a otras clínicas.",
  },
  {
    wistia: "",
    youtube: "dt7cK3FL3hQ",
    name: "Fabián Morales",
    role: "Ingeniero en Telecomunicaciones y dueño de floristería",
    before: "Ingeniero en Telecomunicaciones, decidió emprender y montar un negocio de venta de flores con su esposa.",
    after: "Usa IA para ayudar en las operaciones de su floristería.",
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
  { q: "¿Necesito saber programar?", a: "No. Todo se construye de forma visual, con herramientas como Make y n8n. Si sabes usar el correo y una hoja de cálculo, puedes empezar." },
  { q: "¿La comunidad en Skool es gratis?", a: "Sí. Puedes unirte gratis y automatizar la primera parte de tu oficina en 30 minutos. Los programas con acompañamiento 1:1 son aparte." },
  { q: "¿Qué camino es para mí?", a: "Si quieres que tu propio trabajo se haga solo, el camino Automatizar. Si quieres cobrar por construir soluciones de IA para otros negocios, el camino Vender IA. Si necesitas formar a un equipo, el de Equipos." },
  { q: "¿Quiénes son los mentores?", a: "Aaisha Ali, que te guía en la estrategia y la creatividad de tu proyecto, y Mariano Rivera, tu mentor principal, que te enseña a construir y a vender. Ambos son co-fundadores de Riverius y acompañan cada programa de principio a fin." },
];

// id: anchor for links into the FAQ. links: buttons shown under the answer.
type FaqItem = { q: string; a: string; id?: string; links?: { label: string; href: string }[] };
export const faqPro: FaqItem[] = [
  { id: "que-opcion", q: "¿Qué opción es para mí?", a: "Si quieres probar, empieza gratis con Standard. Si aprendes bien por tu cuenta y quieres automatizar tu trabajo a tu ritmo, con ayuda en grupo, Premium. Si quieres un agente que responda y venda por WhatsApp, construido contigo paso a paso, la Mentoría." },
  { q: "¿Qué diferencia hay entre Premium y la Mentoría?", a: "En Premium aprendes con los videos y construyes por tu cuenta, con apoyo en grupo. En la Mentoría construimos juntos tu agente, en sesiones privadas, y lo ves respondiendo desde la primera semana." },
  { q: "¿Mi agente tiene que ser de ventas?", a: "No. La mayoría de alumnos crea agentes de ventas y atención por WhatsApp, pero también hemos construido agentes de soporte interno y de recordatorios. Antes de empezar revisamos tu caso y definimos el alcance." },
  { q: "¿Qué necesito tener antes de empezar?", a: "Solo la información de tu negocio: productos, precios y las preguntas que más te hacen. La revisamos juntos en una llamada antes de empezar." },
  { q: "¿Hay costos aparte?", a: "Sí. WhatsApp Business, el servicio de IA y el hosting se pagan directamente a cada proveedor. Antes de empezar te explicamos cuánto vas a pagar según tu caso." },
  { q: "¿Qué pasa cuando termino?", a: "Tienes 30 días de soporte. Después, si quieres seguir mejorando tu agente con acompañamiento, puedes quedarte en la comunidad Premium por $37 al mes." },
  { q: "¿Qué cuenta como una automatización?", a: "Un proceso de tu trabajo que antes hacías a mano y ahora corre solo: una cotización que se genera sola, un reporte que te llega listo, una solicitud que se registra y se responde sin que la toques." },
  { q: "¿Qué pasa si mi agente no queda funcionando?", a: "Seguimos contigo hasta 4 semanas más, sin costo, siempre que hayas asistido a tus sesiones y completado las tareas entre ellas." },
  { q: "¿Necesito saber programar?", a: "No. Todo se construye de forma visual, con herramientas como Make y n8n. Si sabes usar el correo y una hoja de cálculo, puedes empezar." },
  { q: "¿Cuánto tiempo necesito por semana?", a: "En la Mentoría, una sesión privada por semana más el tiempo de práctica. Si una semana se te complica, la sesión se reprograma. En Premium avanzas completamente a tu ritmo." },
  { q: "¿Puedo probar antes de inscribirme?", a: "Sí. Únete gratis a Standard en Skool y automatiza tu primera tarea en 30 minutos." },
  { q: "¿Recibo un certificado?", a: "Sí. Al completar las 6 clases en Premium, o al finalizar tu Mentoría, recibes el certificado de Riverius AI Academy para agregarlo a tu perfil de LinkedIn y a tu currículum." },
  {
    q: "¿Tengo dudas antes de decidir?",
    a: "Agenda una llamada de 20 minutos o escríbenos por WhatsApp.",
    links: [
      { label: "Agenda 20 minutos", href: tracked(OFFER.calUrl, "/academy/automatizar", "faq") },
      { label: "Escríbenos por WhatsApp", href: OFFER.whatsappUrl },
    ],
  },
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

