// src/app/proyectos/[slug]/head.tsx
import { projects } from "@/data/projects";

interface HeadProps {
  params: { slug: string };
}

export default function Head({ params }: HeadProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <>
        <title>Proyecto no encontrado | Jennjou</title>
        <meta name="robots" content="noindex" />
      </>
    );
  }

  return (
    <>
      <title>{`${project.title} | Jennjou`}</title>
      <meta name="description" content={project.description} />

      {/* Open Graph */}
      <meta property="og:title" content={`${project.title} | Jennjou`} />
      <meta property="og:description" content={project.description} />
      <meta property="og:image" content={project.cover} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={project.title} />
    </>
  );
}
