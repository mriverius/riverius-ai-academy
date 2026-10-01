// Skool and booking (Cal.com) links open in a new tab, so visitors keep the site open.
export const newTab = (href: string) =>
  /^https:\/\/(www\.)?(skool\.com|cal\.com)\//.test(href) ? { target: "_blank", rel: "noopener" } : {};
