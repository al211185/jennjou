// src/app/proyectos/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "@/data/projects";

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

  return (
    <article className="prose lg:prose-xl mx-auto py-16 px-4">
      <h1>{project.title}</h1>

      <Image
        src={project.cover}
        alt={project.title}
        width={800}
        height={450}
        className="rounded-lg"
      />

      <p>{project.description}</p>

      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-3 border-2 border-primary hover:bg-primary transition"
        >
          Ver demo
        </a>
      )}

      {/* Aquí puedes agregar más secciones: carruseles de WIP, GIFs, embeds, etc. */}
    </article>
  );
}

// Define todos los slugs que deben generarse estáticamente
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
