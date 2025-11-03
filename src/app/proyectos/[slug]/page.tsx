// src/app/proyectos/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import { projects, categoryTitles } from "@/data/projects";

interface Props {
  params: { slug: string };
}

// Genera la metadata (title, description, OG) de forma dinámica según el slug
export async function generateMetadata({ params: { slug } }: Props) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | Jennjou",
      description: "No se encontró el proyecto solicitado.",
    };
  }

  return {
    title: `${project.title} | Jennjou`,
    description: project.description,
    openGraph: {
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

// Componente de la página de detalle de proyecto
export default function ProjectPage({ params: { slug } }: Props) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const categoryLabel = categoryTitles[project.category];

  return (
    <article className="mx-auto max-w-4xl py-16">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">{categoryLabel}</p>
        <h1 className="text-4xl font-semibold text-black">{project.title}</h1>
        <p className="text-base text-black/60">{project.description}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white">
        <Image
          src={project.cover}
          alt={project.title}
          width={1200}
          height={720}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/15 px-4 py-2 text-xs uppercase tracking-widest text-black/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center rounded-full border border-black px-8 py-3 font-semibold text-black transition hover:bg-black hover:text-white"
        >
          Ver demo en vivo
        </a>
      )}
    </article>
  );
}

// Define todos los slugs que deben generarse estáticamente
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
