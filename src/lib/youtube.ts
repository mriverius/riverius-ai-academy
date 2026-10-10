// Build-time YouTube poster: the custom thumbnail in high resolution when it exists, else the standard one.
const cache = new Map<string, Promise<string>>();

export function youtubeThumb(id: string): Promise<string> {
  if (!cache.has(id)) {
    cache.set(
      id,
      (async () => {
        const hi = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
        try {
          const res = await fetch(hi, { method: "HEAD", signal: AbortSignal.timeout(6000) });
          if (res.ok) return hi;
        } catch {}
        return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      })(),
    );
  }
  return cache.get(id)!;
}
