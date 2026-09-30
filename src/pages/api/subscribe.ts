// Receives inquiry forms and adds (or updates) the person in the Mailchimp audience,
// tagged by form, with the full inquiry saved as a note on their contact.
import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID } from "astro:env/server";

export const prerender = false;

type FormConfig = {
  tag: string;
  email: string;
  merge: Record<string, string>; // Mailchimp merge tag -> form field
  labels: Record<string, string>; // form field -> label in the note
};

// One entry per form, matched by the hidden "form" field.
const forms: Record<string, FormConfig> = {
  contact: {
    tag: "Agency inquiry",
    email: "email",
    merge: { FNAME: "first_name", LNAME: "last_name", COMPANY: "company" },
    labels: { website: "Website", role: "Role", size: "Company size", budget: "Budget", project: "Project" },
  },
  equipos: {
    tag: "Cotización equipos",
    email: "correo",
    merge: { FNAME: "nombre", LNAME: "apellido", COMPANY: "organizacion" },
    labels: { sitio: "Sitio web", cargo: "Cargo", tipo: "Tipo de organización", personas: "Personas a capacitar", modalidad: "Modalidad", objetivo: "Objetivo" },
  },
};

const json = (status: number, body: object) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData().catch(() => null);
  const config = forms[String(data?.get("form"))];
  if (!data || !config) return json(400, { error: "Unknown form" });

  // Honeypot: people never see this field, bots fill it. Pretend it worked.
  if (data.get("company_url")) return json(200, { ok: true });

  const field = (name: string) => String(data.get(name) ?? "").trim().slice(0, 5000);
  const email = field(config.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: "Invalid email" });

  const dc = MAILCHIMP_API_KEY.split("-").pop();
  const member = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${createHash("md5").update(email).digest("hex")}`;
  const call = (path: string, method: string, body: object) =>
    fetch(member + path, {
      method,
      headers: { Authorization: `Basic ${btoa(`riverius:${MAILCHIMP_API_KEY}`)}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });

  const merge_fields = Object.fromEntries(Object.entries(config.merge).map(([tag, name]) => [tag, field(name)]).filter(([, v]) => v));
  // Only people who tick the box get marketing email; everyone else is stored as transactional.
  const optIn = data.get("newsletter") === "yes";

  try {
    const upsert = { email_address: email, status_if_new: optIn ? "subscribed" : "transactional", merge_fields };
    let res = await call("", "PUT", optIn ? { ...upsert, status: "subscribed" } : upsert);
    // Mailchimp refuses to resubscribe someone who unsubscribed; still save the inquiry.
    if (optIn && res.status === 400) res = await call("", "PUT", upsert);
    if (!res.ok) {
      console.error("Mailchimp upsert failed", res.status, await res.text());
      return json(502, { error: "Could not save" });
    }

    const note = Object.entries(config.labels)
      .map(([name, label]) => [label, field(name)])
      .filter(([, v]) => v)
      .map(([label, v]) => `${label}: ${v}`)
      .join("\n");
    // Tags and notes are extras: the contact is already saved, so don't fail the request on them.
    // Notes are capped at 1,000 characters, so a long inquiry becomes several, posted in order.
    const saveNotes = async () => {
      for (let i = 0; i < note.length; i += 1000) await call("/notes", "POST", { note: note.slice(i, i + 1000) });
    };
    await Promise.allSettled([call("/tags", "POST", { tags: [{ name: config.tag, status: "active" }] }), saveNotes()]);
    return json(200, { ok: true });
  } catch (err) {
    console.error("Mailchimp request error", err);
    return json(502, { error: "Could not save" });
  }
};
