export interface InstagramMediaItem {
  id: string;
  caption: string | null;
  mediaUrl: string;
  permalink: string;
  mediaType: string;
  thumbnailUrl?: string | null;
}

interface InstagramApiResponse {
  data?: Array<{
    id: string;
    caption?: string | null;
    media_url?: string;
    permalink: string;
    media_type: string;
    thumbnail_url?: string;
  }>;
}

const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
export const INSTAGRAM_PROFILE_URL =
  process.env.INSTAGRAM_PROFILE_URL ?? "https://www.instagram.com/jennjou_/";

const DEFAULT_LIMIT = 6;

export async function fetchInstagramMedia(limit = DEFAULT_LIMIT): Promise<InstagramMediaItem[]> {
  if (!INSTAGRAM_USER_ID || !INSTAGRAM_ACCESS_TOKEN) {
    console.warn("Instagram env vars missing; skipping fetch.");
    return [];
  }

  const fields = ["id", "caption", "media_url", "permalink", "media_type", "thumbnail_url"].join(",");
  const url = new URL(`https://graph.instagram.com/${INSTAGRAM_USER_ID}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("access_token", INSTAGRAM_ACCESS_TOKEN);
  url.searchParams.set("limit", limit.toString());

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      console.error("Failed to fetch Instagram media", response.status, response.statusText);
      return [];
    }

    const payload = (await response.json()) as InstagramApiResponse;
    const items = payload.data ?? [];

    return items
      .map((item) => {
        const mediaUrl = item.media_url ?? item.thumbnail_url;
        if (!mediaUrl) {
          return null;
        }

        return {
          id: item.id,
          caption: item.caption ?? null,
          mediaUrl,
          permalink: item.permalink,
          mediaType: item.media_type,
          thumbnailUrl: item.thumbnail_url ?? null,
        } satisfies InstagramMediaItem;
      })
      .filter((item): item is InstagramMediaItem => item !== null);
  } catch (error) {
    console.error("Error fetching Instagram media", error);
    return [];
  }
}
