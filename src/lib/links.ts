// Skool, booking (Cal.com) and social links open in a new tab, so visitors keep the site open.
export const newTab = (href: string) =>
  /^https:\/\/(www\.)?(skool\.com|cal\.com|linkedin\.com|instagram\.com|youtube\.com|tiktok\.com)\//.test(href) ? { target: "_blank", rel: "noopener" } : {};
