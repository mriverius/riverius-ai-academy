// Shared behavior for inquiry forms: form[data-inquiry].
// Validates required fields (including radio groups), then posts to data-endpoint,
// or falls back to a prefilled email to data-email.
type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const labelFor = (form: HTMLFormElement, el: Field) =>
  (el.type === "radio" ? el.closest("fieldset")?.querySelector("legend") : form.querySelector(`label[for="${el.id}"]`))?.textContent?.trim() ??
  el.name;

document.querySelectorAll<HTMLFormElement>("form[data-inquiry]").forEach((form) => {
  const status = form.querySelector<HTMLElement>("[data-status]");
  const label = form.querySelector<HTMLElement>("[data-label]");
  const idle = label?.textContent ?? "";
  const msg = (key: string) => form.dataset[key] ?? "";

  const show = (text: string) => {
    if (!status) return;
    status.textContent = text;
    status.classList.remove("hidden");
  };

  form.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((r) =>
    r.addEventListener("change", () => document.getElementById(`${r.name}-error`)?.classList.add("hidden")),
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstInvalid: HTMLElement | null = null;
    for (const el of form.querySelectorAll<Field>("[required]")) {
      if (el.type === "radio") {
        const ok = !!form.querySelector(`input[name="${el.name}"]:checked`);
        document.getElementById(`${el.name}-error`)?.classList.toggle("hidden", ok);
        if (!ok && !firstInvalid) firstInvalid = el;
        continue;
      }
      const ok = el.checkValidity() && el.value.trim() !== "";
      el.setAttribute("aria-invalid", String(!ok));
      document.getElementById(`${el.id}-error`)?.classList.toggle("hidden", ok);
      if (!ok && !firstInvalid) firstInvalid = el;
    }
    if (firstInvalid) return firstInvalid.focus();

    const data = new FormData(form);
    const endpoint = form.dataset.endpoint;

    if (!endpoint) {
      const seen = new Set<string>();
      const lines: string[] = [];
      form.querySelectorAll<Field>("input, select, textarea").forEach((el) => {
        if (!el.name || seen.has(el.name)) return;
        seen.add(el.name);
        const value = data.get(el.name);
        if (value) lines.push(`${labelFor(form, el)}: ${value}`);
      });
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(msg("subject"))}&body=${encodeURIComponent(lines.join("\n"))}`;
      show(msg("mailto"));
      return;
    }

    if (label) label.textContent = msg("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show(msg("success"));
    } catch {
      show(msg("error"));
    } finally {
      if (label) label.textContent = idle;
    }
  });
});
