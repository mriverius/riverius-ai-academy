// Course certificates. Each one gets an unguessable page at /academy/certificado/<id> that the student can add to LinkedIn.
// New ID: node -e "console.log('RAA-' + crypto.randomUUID())"
// Pages are public but noindex and left out of the sitemap, so search engines don't list them.

export const issuer = {
  name: "Lic. Mariano Rivera Castillo",
  title: "Director, Riverius AI Academy",
  organization: "Riverius AI Academy",
  // TODO: Riverius AI's numeric LinkedIn company ID (Company page > admin view, in the URL). With it, LinkedIn shows the logo on the certificate.
  linkedinOrgId: null as string | null,
};

export const courses = {
  "mentoria-agentes": {
    name: "Mentoría 1:1 en Agentes de IA",
    duration: "6 semanas",
    proof: "Demostró su dominio mediante la presentación de un agente funcionando en un negocio real.",
    outcome:
      "Ahora es capaz de diseñar, construir y mantener agentes de IA que atienden por WhatsApp, conocen la información de un negocio y se conectan a sus herramientas.",
    skills: ["Agentes de IA", "Agentes para WhatsApp", "Automatización sin código", "Integración de herramientas"],
  },
} satisfies Record<string, { name: string; duration: string; proof: string; outcome: string; skills: string[] }>;

type Certificate = {
  id: string;
  student: string; // first name + last name
  course: keyof typeof courses;
  issued: string; // YYYY-MM-DD
  // Optional final project, shown under the certificate as proof of the work. One video: Wistia or YouTube.
  project?: { wistia?: string; youtube?: string; title: string; text: string };
};

export const certificates: Certificate[] = [
  {
    id: "RAA-cc854610-812d-44ea-9a30-07170d82f42b",
    student: "Alonso Hidalgo",
    course: "mentoria-agentes",
    issued: "2026-07-22",
    project: {
      youtube: "ysut2BtecN0",
      title: "Recepcionista IA para una clínica, 24/7",
      text: "Atiende el WhatsApp de la clínica a cualquier hora, informa servicios y requisitos, y agenda citas en Google Calendar sin intervención humana.",
    },
  },
  {
    id: "RAA-28ad55a6-a20a-49d8-91e3-27ab276ffe01",
    student: "Junior Owens",
    course: "mentoria-agentes",
    issued: "2026-10-08",
    project: {
      youtube: "6vsgJmEb5m0",
      title: "Agente de WhatsApp para un autolavado",
      text: "Atiende por WhatsApp a los clientes del autolavado, entiende qué servicio quieren y agenda la cita en el calendario.",
    },
  },
  {
    id: "RAA-01b29ef9-ba42-4dc5-861f-a3e58349a4b3",
    student: "Fabián Morales",
    course: "mentoria-agentes",
    issued: "2026-08-20",
    project: {
      youtube: "M_8ibeM_Hkw",
      title: "Pedidos por WhatsApp para una floristería",
      text: "Muestra el catálogo, calcula el total con adicionales y envío, define la entrega y registra cada pedido en Google Sheets.",
    },
  },
];

export const certificatePath = (id: string) => `/academy/certificado/${id}`;
export const issuedLabel = (date: string) =>
  new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));

// LinkedIn's "Add to profile" link, prefilled with the certificate.
export const linkedinAddUrl = (c: Certificate, url: string) => {
  const [year, month] = c.issued.split("-");
  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: courses[c.course].name,
    ...(issuer.linkedinOrgId ? { organizationId: issuer.linkedinOrgId } : { organizationName: issuer.organization }),
    issueYear: year,
    issueMonth: String(Number(month)),
    certUrl: url,
    certId: c.id,
  });
  return `https://www.linkedin.com/profile/add?${params}`;
};
