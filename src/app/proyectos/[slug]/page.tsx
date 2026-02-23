import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryTitles, projectBySlug, projectSlugs, projects } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

function ellipsize(text: string, max = 130) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3)}...`;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug.get(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | Jennjou",
      description: "No se encontro el proyecto solicitado.",
    };
  }

  const ogImage = project.cover ?? "/images/logo-optimized.png";

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug.get(slug);
  if (!project) return notFound();

  const categoryLabel = categoryTitles[project.category];
  const projectIndex = projectSlugs.indexOf(slug);
  const totalProjects = projectSlugs.length;
  const prevSlug = projectIndex > 0 ? projectSlugs[projectIndex - 1] : null;
  const nextSlug =
    projectIndex >= 0 && projectIndex < projectSlugs.length - 1
      ? projectSlugs[projectIndex + 1]
      : null;

  const relatedProjects = projects
    .filter((item) => item.category === project.category && item.slug !== project.slug)
    .slice(0, 3);

  const deliverableType = project.youtubeId
    ? "Video embebido"
    : project.videoSrc
      ? "Secuencia en video"
      : project.sketchfabModelId
        ? "Modelo 3D interactivo"
        : project.figmaEmbedSrc
          ? "Prototipo UI"
          : project.behanceEmbedSrc
            ? "Proyecto Behance"
            : "Pieza visual";

  const availability = project.demoUrl ? "Disponible en linea" : "Demo privada";

  const interactionHint = project.sketchfabModelId
    ? "Tip: puedes arrastrar para rotar y hacer zoom."
    : project.youtubeId || project.videoSrc
      ? "Tip: usa pantalla completa para revisar detalles."
      : project.figmaEmbedSrc
        ? "Tip: explora el prototipo dentro del frame."
        : "";

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
        className="absolute inset-0 h-full w-full object-contain bg-black"
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
        title={`Diseno Figma de ${project.title}`}
        loading="lazy"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
        className="absolute inset-0 h-full w-full"
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
      />
    </div>
  ) : project.behanceEmbedSrc ? (
    <div className="relative aspect-[404/316] w-full">
      <iframe
        src={project.behanceEmbedSrc}
        title={`Proyecto Behance de ${project.title}`}
        loading="lazy"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  ) : project.cover ? (
    <div className="relative aspect-[4/3] w-full">
      <Image
        src={project.cover}
        alt={project.title}
        fill
        sizes="(min-width: 1024px) 960px, 96vw"
        className="object-contain"
        priority
      />
    </div>
  ) : (
    <div className="flex aspect-[4/3] w-full items-center justify-center text-sm text-gray-400">
      Recurso visual proximo
    </div>
  );

  return (
    <article className="mx-auto max-w-7xl py-16 sm:py-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-gray-500">
          <Link href="/#portfolio" className="btn-secondary px-4 py-2 text-gray-700">
            Volver al portfolio
          </Link>
          <span className="hidden sm:inline">/</span>
          <span className="font-semibold text-black">{categoryLabel}</span>
        </div>

        <span className="chip px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em]">
          Pieza {projectIndex + 1} de {totalProjects}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="section-shell reveal-up overflow-hidden p-4 sm:p-6">
          <div className="overflow-hidden rounded-[30px] border border-black/45 bg-[#0f1014]">
            {mediaElement}
          </div>

          {interactionHint ? (
            <p className="mt-4 text-sm text-gray-600">{interactionHint}</p>
          ) : null}

          {project.demoUrl ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-black/35 bg-white/70 p-4">
              <p className="text-sm text-gray-700">
                Ver la experiencia completa en su contexto original.
              </p>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-2.5 text-xs uppercase tracking-[0.24em]"
              >
                Abrir demo
              </a>
            </div>
          ) : null}
        </section>

        <aside className="section-shell reveal-up space-y-6 p-6 sm:p-8">
          <div className="space-y-4">
            <p className="kicker">{categoryLabel}</p>
            <h1 className="text-3xl font-semibold leading-tight text-black sm:text-4xl">
              {project.title}
            </h1>
            <p className="text-base leading-relaxed text-gray-700">
              {project.description}
            </p>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/25 bg-white/70 p-4">
              <dt className="text-[0.62rem] uppercase tracking-[0.25em] text-gray-500">
                Entregable
              </dt>
              <dd className="mt-2 text-sm font-semibold text-black">
                {deliverableType}
              </dd>
            </div>

            <div className="rounded-2xl border border-black/25 bg-white/70 p-4">
              <dt className="text-[0.62rem] uppercase tracking-[0.25em] text-gray-500">
                Estado
              </dt>
              <dd className="mt-2 text-sm font-semibold text-black">
                {availability}
              </dd>
            </div>

            <div className="rounded-2xl border border-black/25 bg-white/70 p-4 sm:col-span-2">
              <dt className="text-[0.62rem] uppercase tracking-[0.25em] text-gray-500">
                Categoria
              </dt>
              <dd className="mt-2 text-sm font-semibold text-black">
                {categoryLabel}
              </dd>
            </div>
          </dl>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
              Tecnologias y tags
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip px-3 py-1 text-xs uppercase tracking-[0.18em]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {prevSlug ? (
              <Link href={`/proyectos/${prevSlug}`} className="btn-secondary justify-center px-4 py-2.5 text-xs uppercase tracking-[0.2em]">
                Pieza anterior
              </Link>
            ) : (
              <span className="btn-secondary cursor-not-allowed justify-center px-4 py-2.5 text-xs uppercase tracking-[0.2em] opacity-45">
                Pieza anterior
              </span>
            )}

            {nextSlug ? (
              <Link href={`/proyectos/${nextSlug}`} className="btn-secondary justify-center px-4 py-2.5 text-xs uppercase tracking-[0.2em]">
                Siguiente pieza
              </Link>
            ) : (
              <span className="btn-secondary cursor-not-allowed justify-center px-4 py-2.5 text-xs uppercase tracking-[0.2em] opacity-45">
                Siguiente pieza
              </span>
            )}
          </div>
        </aside>
      </div>

      {relatedProjects.length > 0 ? (
        <section className="section-shell reveal-up mt-8 p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-semibold">Mas piezas de {categoryLabel}</h2>
            <span className="kicker">Relacionadas</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link
                key={item.slug}
                href={`/proyectos/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-black/30 bg-white/75 transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(9,10,16,0.15)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/10">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                      Sin preview
                    </div>
                  )}
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gray-500">
                    {categoryLabel}
                  </p>
                  <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {ellipsize(item.description)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
