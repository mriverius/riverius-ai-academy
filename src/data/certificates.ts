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
  "agentes-avanzados-n2": {
    name: "Agentes de IA Avanzados · Nivel 2",
    hours: 15,
    proof: "Demostró su dominio mediante la presentación de un proyecto funcional.",
    outcome:
      "Ahora es capaz de construir agentes de IA con múltiples herramientas, memoria conversacional, integración de APIs, conocimiento sobre documentos propios (RAG) y controles de aprobación humana.",
    skills: ["Agentes de IA", "Memoria conversacional", "Integración de APIs", "RAG", "Aprobación humana"],
  },
} satisfies Record<string, { name: string; hours: number; proof: string; outcome: string; skills: string[] }>;

type Certificate = {
  id: string;
  student: string;
  course: keyof typeof courses;
  issued: string; // YYYY-MM-DD
  // Optional final project defense, shown under the certificate as proof of the work.
  project?: { wistia: string; title: string; text: string };
};

export const certificates: Certificate[] = [
  {
    id: "RAA-cc854610-812d-44ea-9a30-07170d82f42b",
    student: "Jose Alonso Hidalgo Molina",
    course: "agentes-avanzados-n2",
    issued: "2026-07-22",
    project: {
      wistia: "ydxphe2awn",
      title: "Recepcionista IA para una clínica, 24/7",
      text: "Atiende el WhatsApp de la clínica a cualquier hora, informa servicios y requisitos, y agenda citas en Google Calendar sin intervención humana.",
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
