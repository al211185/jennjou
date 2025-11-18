import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  squareMedia?: boolean; // NUEVO
}

export default function ProyectoCard({ project, squareMedia = false }: Props) {
  const { title, slug, cover, videoSrc, tags, description, demoUrl, youtubeId, sketchfabModelId } = project;
  const href = demoUrl ?? `/proyectos/${slug}`;
  const isExternal = /^https?:\/\//.test(href);

  const baseCardClassName =
    "group flex h-full flex-col overflow-hidden rounded-3xl border border-black bg-black/5 transition hover:-translate-y-1 hover:bg-black/10";
  const cardClassName = squareMedia
    ? `${baseCardClassName} min-h-[300px]`
    : `${baseCardClassName} min-h-[360px]`;


  const youtubeEmbed = youtubeId ? (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={`Video de ${title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  ) : null;

    const localVideo = videoSrc ? (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-video w-full">
        <video
          src={videoSrc}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  ) : null;


  const sketchfabEmbed = sketchfabModelId ? (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://sketchfab.com/models/${sketchfabModelId}/embed`}
          title={`Modelo 3D de ${title}`}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  ) : null;


  const media = youtubeEmbed
    ? youtubeEmbed
    : localVideo
      ? localVideo
      : sketchfabEmbed
        ? sketchfabEmbed
        : cover
        ? squareMedia
          ? (
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(min-width:1024px) 460px, (min-width:640px) 380px, 86vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          )
          : (
            <Image
              src={cover}
              alt={title}
              width={640}
              height={400}
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
              className="w-full aspect-[4/3] object-cover transition duration-500 group-hover:scale-105"
            />
          )
        : squareMedia
          ? (
            <div className="flex aspect-square w-full items-center justify-center bg-black/10 text-sm text-gray-600">
              Imagen próximamente
            </div>
          )
          : (
            <div className="flex h-48 w-full items-center justify-center bg-black/10 text-sm text-gray-600">
              Imagen próximamente
            </div>
          );

  const instagramTags = tags.filter((tag) => tag.toLowerCase() === "instagram");

  const content = (
    <>
      {media}
      <div
        className={
          squareMedia
            ? "flex flex-1 flex-col gap-3 p-4 text-left"
            : "flex flex-1 flex-col gap-4 p-6 text-left"
        }
      >
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        {squareMedia ? null : (
          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
        )}
        {(squareMedia ? instagramTags : tags).length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-2">
            {(squareMedia ? instagramTags : tags).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-black px-3 py-1 text-xs uppercase tracking-wider text-black"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClassName}>
      {content}
    </Link>
  );
}
