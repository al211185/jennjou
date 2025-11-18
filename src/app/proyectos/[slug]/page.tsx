// src/app/proyectos/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, categoryTitles } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

// Genera la metadata (title, description, OG) de forma dinámica según el slug
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | Jennjou",
      description: "No se encontró el proyecto solicitado.",
    };
  }

  const ogImage = project.cover ?? "/images/logo.png";


  return {
    title: `${project.title} | Jennjou`,
    description: project.description,
    openGraph: {
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

// Componente de la página de detalle de proyecto
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const categoryLabel = categoryTitles[project.category];
  const deliverableType = project.youtubeId
    ? "Video embebido"
    : project.videoSrc
      ? "Secuencia en video"
      : project.sketchfabModelId
        ? "Modelo 3D interactivo"
        : project.figmaEmbedSrc
          ? "Prototipo UI"
          : "Render estático";

  const availability = project.demoUrl ? "Disponible en línea" : "Demo privada";

  const mediaElement = project.youtubeId ? (
    <div className="relative aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${project.youtubeId}`}
        title={`Video de ${project.title}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  ) : project.videoSrc ? (
    <div className="relative aspect-video w-full">
      <video
        src={project.videoSrc}
        controls
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  ) : project.sketchfabModelId ? (
    <div className="relative aspect-video w-full">
      <iframe
        src={`https://sketchfab.com/models/${project.sketchfabModelId}/embed`}
        title={`Modelo 3D de ${project.title}`}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  ) : project.figmaEmbedSrc ? (
    <div className="relative aspect-video w-full">
      <iframe
        src={project.figmaEmbedSrc}
        title={`Diseño Figma de ${project.title}`}
        loading="lazy"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
        className="absolute inset-0 h-full w-full"
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
      />
    </div>
  ) : project.cover ? (
    <Image
      src={project.cover}
      alt={project.title}
      width={1600}
      height={900}
      className="h-auto w-full object-cover"
      sizes="(min-width: 1024px) 960px, 92vw"
      priority
    />
  ) : (
    <div className="flex aspect-[3/2] w-full items-center justify-center text-sm text-gray-500">
      Recurso visual próximamente
    </div>
  );

  return (
    <article className="mx-auto max-w-5xl py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-500">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-gray-600 transition hover:text-black"
        >
          <span aria-hidden>←</span>
          Volver al portfolio
        </Link>
        <span className="hidden text-gray-400 sm:inline">/</span>
        <span className="font-semibold text-black">{categoryLabel}</span>
      </div>

      <div className="space-y-10 rounded-[32px] border border-black bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.07)] sm:p-10">
        <header className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">{categoryLabel}</p>
          <h1 className="text-4xl font-semibold leading-tight text-black sm:text-5xl">{project.title}</h1>
          <p className="text-lg leading-relaxed text-gray-700">{project.description}</p>

          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-2xl border border-black/30 bg-white/70 p-4">
              <dt className="text-[0.65rem] uppercase tracking-[0.35em] text-gray-500">Entregable</dt>
              <dd className="mt-2 text-base font-medium text-black">{deliverableType}</dd>
            </div>
            <div className="rounded-2xl border border-black/30 bg-white/70 p-4">
              <dt className="text-[0.65rem] uppercase tracking-[0.35em] text-gray-500">Estado</dt>
              <dd className="mt-2 text-base font-medium text-black">{availability}</dd>
            </div>
            <div className="rounded-2xl border border-black/30 bg-white/70 p-4">
              <dt className="text-[0.65rem] uppercase tracking-[0.35em] text-gray-500">Categoría</dt>
              <dd className="mt-2 text-base font-medium text-black">{categoryLabel}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/50 px-4 py-1 text-xs uppercase tracking-[0.35em] text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-base font-semibold uppercase tracking-[0.35em] text-gray-600">
            Recurso destacado
          </h2>
          <div className="overflow-hidden rounded-[32px] border border-black bg-white">
            <div className="relative flex w-full flex-col bg-black text-white">{mediaElement}</div>
          </div>
        </section>

        {project.demoUrl && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-dashed border-black/40 bg-white/70 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Explora más</p>
              <p className="text-base text-gray-700">Visita la demo completa y experimenta la pieza en contexto.</p>
            </div>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:translate-x-1"
            >
              Ver demo en vivo
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

// Define todos los slugs que deben generarse estáticamente
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
