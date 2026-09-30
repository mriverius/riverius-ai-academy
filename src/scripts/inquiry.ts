// Shared behavior for inquiry forms: form[data-inquiry].
// Validates required fields (including radio groups), then posts to the form's action (/api/subscribe).
type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

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

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.disabled = true;
    if (label) label.textContent = msg("sending");
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show(msg("success"));
    } catch {
      show(msg("error"));
    } finally {
      if (button) button.disabled = false;
      if (label) label.textContent = idle;
    }
  });
});
