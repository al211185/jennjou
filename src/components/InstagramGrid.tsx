import Image from "next/image";
import type { InstagramMediaItem } from "@/lib/instagram";

interface Props {
  posts: InstagramMediaItem[];
  profileUrl?: string;
}

function formatCaption(caption: string | null): string {
  if (!caption) {
    return "Ver publicación en Instagram";
  }

  const firstLine = caption.split("\n")[0]?.trim() ?? "";
  if (firstLine.length <= 100) {
    return firstLine;
  }

  return `${firstLine.slice(0, 97)}...`;
}

export default function InstagramGrid({ posts, profileUrl }: Props) {
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const label = formatCaption(post.caption);

          return (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex aspect-square flex-col overflow-hidden rounded-3xl border border-black bg-white transition hover:-translate-y-1 hover:shadow-xl"
              aria-label={label}
            >
              <Image
                src={post.mediaUrl}
                alt={label}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-left">
                <p className="text-sm font-medium text-white">{label}</p>
              </div>
            </a>
          );
        })}
      </div>
      {profileUrl ? (
        <div className="text-center sm:text-right">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-600 transition hover:text-black"
            aria-label="Ver más trabajos en Instagram"
          >
            Ver más en Instagram
            <span aria-hidden className="text-base leading-none">↗</span>
          </a>
        </div>
      ) : null}
    </>
  );
}
