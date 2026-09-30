// Build-time lookup of a Wistia video's poster and aspect ratio via oEmbed.
// Falls back gracefully (no poster, default aspect) if the network is unavailable.
export type WistiaMeta = { thumb: string | null; aspect: number; title: string };

const cache = new Map<string, Promise<WistiaMeta>>();

export function wistia(id: string, fallbackAspect = 16 / 9): Promise<WistiaMeta> {
  if (!cache.has(id)) {
    cache.set(
      id,
      (async () => {
        try {
          const url = `https://fast.wistia.com/oembed?url=${encodeURIComponent(`https://home.wistia.com/medias/${id}`)}&width=960`;
          const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
          if (!res.ok) throw new Error(String(res.status));
          const d = (await res.json()) as { thumbnail_url?: string; width?: number; height?: number; title?: string };
          const thumb = d.thumbnail_url ?? null;
          return { thumb, aspect: d.width && d.height ? d.width / d.height : fallbackAspect, title: d.title ?? "" };
        } catch {
          return { thumb: null, aspect: fallbackAspect, title: "" };
        }
      })(),
    );
  }
  return cache.get(id)!;
}
