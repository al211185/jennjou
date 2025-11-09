// src/lib/instagram.ts (reemplaza el tuyo)
export interface InstagramMediaItem {
  id: string;
  caption: string | null;
  mediaUrl: string;
  permalink: string;
  mediaType: string;
  thumbnailUrl?: string | null;
}

const IG_USER_ID = process.env.IG_USER_ID ?? process.env.NEXT_PUBLIC_IG_USER_ID;
const IG_GRAPH_TOKEN = process.env.IG_GRAPH_TOKEN ?? process.env.NEXT_PUBLIC_IG_GRAPH_TOKEN;
export const INSTAGRAM_PROFILE_URL =
  process.env.INSTAGRAM_PROFILE_URL ??
  process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL ??
  "https://www.instagram.com/jennjou_/";

const IG_API_VERSION = process.env.IG_API_VERSION ?? "v20.0";
const DEFAULT_LIMIT = 9;

const ALLOWED_MEDIA_TYPES = new Set(["IMAGE", "CAROUSEL_ALBUM"]);

type RawInstagramItem = {
  id?: string;
  caption?: string | null;
  media_url?: string | null;
  permalink?: string;
  media_type?: string | null;
  thumbnail_url?: string | null;
};


export async function fetchInstagramMedia(limit = DEFAULT_LIMIT): Promise<InstagramMediaItem[]> {
  if (!IG_USER_ID || !IG_GRAPH_TOKEN) {
    console.warn("IG Graph env vars missing; skipping fetch.");
    return [];
  }

  const fields = ["id","caption","media_url","permalink","media_type","thumbnail_url"].join(",");
  const url = new URL(`https://graph.facebook.com/${IG_API_VERSION}/${IG_USER_ID}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("access_token", IG_GRAPH_TOKEN);
  url.searchParams.set("limit", String(limit));

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 * 60 } });
    if (!res.ok) {
      console.error("IG Graph fetch failed", res.status, await res.text());
      return [];
    }
    const payload = (await res.json()) as { data?: RawInstagramItem[] };
    return (payload.data ?? [])
      .map((item) => {
                if (!item) return null;
        const mediaType = item.media_type?.toUpperCase() ?? "";
        if (!ALLOWED_MEDIA_TYPES.has(mediaType)) {
          return null;
        }

        const mediaUrl = item.media_url ?? item.thumbnail_url;
        if (!mediaUrl || !item.id || !item.permalink) {
          return null;
        }
        return {
          id: item.id,
          caption: item.caption ?? null,
          mediaUrl,
          permalink: item.permalink,
          mediaType,
          thumbnailUrl: item.thumbnail_url ?? null,
        } as InstagramMediaItem;
      })
      .filter((item): item is InstagramMediaItem => item !== null);
  } catch (e) {
    console.error("IG Graph error", e);
    return [];
  }
}
